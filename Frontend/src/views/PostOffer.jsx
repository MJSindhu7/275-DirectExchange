import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from "react-select";
import DirectExchangeService from "../services/DirectExchangeService";

class PostOffer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      userName: localStorage.getItem("userId"),
      sourceCountry: "",
      sourceCurrency: "",
      remitAmountSource: "",
      remitAmountDestination: "",
      destinationCountry: "",
      destinationCurrency: "",
      exchangeRate: "",
      expirationDate: "",
      counteroffers: true,
      newRemitAmount: 0.0,
      splitExchange: true,
      offerStatus: "",
      bankaccounts: [],
      currency: ["USD", "INR", "EUR", "GBP", "RMB"],
      listCountries: [
        "Republic of India",
        "United States of America",
        "United Kingdom",
        "People's Republic of China",
        "Germany",
        "France",
        "Portugal",
        "Spain",
        "Italy",
      ],
      rates: [],
      exchangeRates: [],
      customRate: true,
    };
  }

  componentDidMount() {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      alert("Please log in");
    }
    //e.preventDefault()
    DirectExchangeService.getBankAccountsByUser(
      localStorage.getItem("userId")
    ).then((res) => {
      this.setState({ bankaccounts: res.data });
      console.log("**" + this.state.offers);
    });

    DirectExchangeService.listAllCurrecyRates().then((res) => {
      var er = [];
      this.setState({ rates: res.data });
      res.data.map((value, key) => {
        er.push(value);
      });
      this.setState({ exchangeRates: er });
    });
  }

  handleValidation(fields) {
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["sourceCountry"]) {
      formIsValid = false;
      errors["sourceCountry"] = "Cannot be empty";
    }

    if (!fields["sourceCurrency"]) {
      formIsValid = false;
      errors["sourceCurrency"] = "Cannot be empty";
    }

    if (!fields["remitAmountSource"]) {
      formIsValid = false;
      errors["remitAmountSource"] = "Cannot be empty";
    }

    if (!fields["remitAmountDestination"]) {
      formIsValid = false;
      errors["remitAmountDestination"] = "Cannot be empty";
    }

    if (!fields["destinationCountry"]) {
      formIsValid = false;
      errors["destinationCountry"] = "Cannot be empty";
    }

    if (!fields["destinationCurrency"]) {
      formIsValid = false;
      errors["destinationCurrency"] = "Cannot be empty";
    }

    if (!fields["exchangeRate"]) {
      formIsValid = false;
      errors["exchangeRate"] = "Cannot be empty";
    }

    if (!fields["expirationDate"]) {
      formIsValid = false;
      errors["expirationDate"] = "Cannot be empty";
    }

    if (!fields["offerStatus"]) {
      formIsValid = false;
      errors["offerStatus"] = "Cannot be empty";
    }
    if (!formIsValid) {
      alert(JSON.stringify(errors));
    }
    return formIsValid;
  }

  saveExchangeOffer = (e) => {
    e.preventDefault();
    let offer = {
      sourceCountry: this.state.sourceCountry,
      sourceCurrency: this.state.sourceCurrency,
      remitAmountSource: this.state.remitAmountSource,
      remitAmountDestination: this.state.remitAmountDestination,
      destinationCountry: this.state.destinationCountry,
      destinationCurrency: this.state.destinationCurrency,
      exchangeRate: this.state.exchangeRate,
      expirationDate: this.state.expirationDate,
      counteroffers: this.state.counteroffers,
      newRemitAmount: this.state.newRemitAmount,
      splitExchange: this.state.splitExchange,
      customOffer: this.state.customRate,
      offerStatus: "Open",
      user: { userName: localStorage.getItem("userId") },
    };
    if (this.handleValidation(offer)) {
      if (offer.customOffer) {
        offer.exchangeRate = this.getRates();
      }

      console.log("offer => " + JSON.stringify(offer));

      DirectExchangeService.addPostOffer(offer).then((res) => {
        this.showAlert("Success -- Posted Offer");
        this.props.history.push("/admin/alloffers");
      });
    }
  };

  showAlert(msg) {
    alert(msg);
  }

  onChange = (dateval) => {
    this.setState({ expirationDate: dateval });
    console.log(dateval);
  };

  verifybankaccounts() {
    const uniqueCountry = [];
    if (this.state.bankaccounts.length >= 2) {
      this.state.bankaccounts.map((img) => {
        console.log(img);

        if (uniqueCountry.indexOf(img.country) === -1) {
          uniqueCountry.push(img.country);
          console.log(uniqueCountry);
        }
      });
    }
    if (uniqueCountry.length >= 2) {
      return true;
    } else {
      return false;
    }
  }

  getRates() {
    var r1 = "";
    var r2 = "";
    if (
      this.state.sourceCurrency === this.state.destinationCurrency &&
      this.state.sourceCurrency !== "" &&
      this.state.destinationCurrency !== ""
    ) {
      return 1.0;
    }
    if (
      this.state.sourceCurrency !== "" &&
      this.state.destinationCurrency !== "" &&
      this.state.sourceCurrency !== this.state.destinationCurrency &&
      this.state.customRate
    ) {
      for (var i = 0; i < this.state.exchangeRates.length; i++) {
        var element = this.state.exchangeRates[i];
        if (element["currency"] === this.state.sourceCurrency) {
          r1 = element["currenyToUSD"];
        }
        if (element["currency"] === this.state.destinationCurrency) {
          r2 = element["usdtoCurrency"];
        }
      }
      console.log(
        "Exhange rate for 1 " +
          this.state.sourceCurrency +
          " is " +
          r1 * r2 +
          " " +
          this.state.destinationCurrency
      );
      var returnRate = r1 * r2;
      return returnRate.toFixed(4);
    }
  }

  render() {
    var curr = [];
    this.state.currency.forEach(function (element) {
      curr.push({ label: element, value: element });
    });
    var countries = [];
    this.state.listCountries.forEach(function (element) {
      countries.push({ label: element, value: element });
    });
    var prate = this.getRates();
    console.log("****" + this.verifybankaccounts());
    if (this.verifybankaccounts()) {
      return (
        <div className="content">
          <Grid fluid>
            <Row>
              <Col md={8}>
                <Card
                  title="Post Exchange Offer"
                  content={
                    <form>
                      <div
                        style={{
                          width: "300px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <label class="control-label">Source Country</label>

                        <Select
                          class="form-control"
                          name="Source Country"
                          options={countries}
                          defaultValue={{
                            label: "Select your Source Country ",
                            value: 0,
                          }}
                          onChange={(event) =>
                            this.setState({ sourceCountry: event.label })
                          }
                        />
                      </div>
                      <div
                        style={{
                          width: "300px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <label class="control-label">Source Currency</label>

                        <Select
                          class="form-control"
                          name="Source Currency"
                          options={curr}
                          defaultValue={{
                            label: "Select Source Currency",
                            value: 0,
                          }}
                          onChange={(event) =>
                            this.setState({ sourceCurrency: event.label })
                          }
                        />
                      </div>
                      <div
                        style={{
                          width: "300px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <span>Destination Country</span>
                        <Select
                          class="form-control"
                          name="Destination Country"
                          options={countries}
                          defaultValue={{
                            label: "Select your Destination Country ",
                            value: 0,
                          }}
                          onChange={(event) =>
                            this.setState({ destinationCountry: event.label })
                          }
                        />
                      </div>

                      <div
                        style={{
                          width: "300px",
                          paddingTop: "10px",
                          paddingBottom: "10px",
                        }}
                      >
                        <label class="control-label">
                          Destination Currency
                        </label>

                        <Select
                          name="Destination Currency"
                          options={curr}
                          defaultValue={{
                            label: "Select Destination Currency",
                            value: 0,
                          }}
                          onChange={(event) =>
                            this.setState({ destinationCurrency: event.label })
                          }
                          onBlur={(e) =>
                            this.setState({ exchangeRate: this.getRates() })
                          }
                        />
                      </div>

                      <FormInputs
                        ncols={["col-md-4", "col-md-2"]}
                        properties={[
                          {
                            label: "Exchange Rate",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Exchange Rate",
                            value: this.getRates(),
                            onChange: (e) =>
                              this.setState({ exchangeRate: e.target.value }),
                          },
                          {
                            label: "Use Prevailing Rate",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Use Prevailing Rate",
                            checked: this.state.customRate,
                            onChange: (e) =>
                              this.setState({ customRate: e.target.checked }),
                          },
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-4", "col-md-4"]}
                        properties={[
                          {
                            label: "Remit Amount",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "1000.00",
                            value: this.state.remitAmountSource,
                            onChange: (e) =>
                              this.setState({
                                remitAmountSource: e.target.value,
                              }),
                            onBlur: (e) =>
                              this.setState({
                                remitAmountDestination: (
                                  this.state.exchangeRate *
                                  this.state.remitAmountSource
                                ).toFixed(2),
                              }),
                          },
                          {
                            label: "Destination Remit Amount",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Destination Remit Amount",
                            // value: this.state.remitAmountDestination,
                            // onChange: e => this.setState({ remitAmountDestination: e.target.value })
                            value: this.state.remitAmountDestination,
                            onclick: (e) =>
                              this.setState({
                                remitAmountDestination: e.target.value,
                              }),
                          },
                        ]}
                      />

                      <FormInputs
                        ncols={["col-md-4", "col-md-2", "col-md-2"]}
                        properties={[
                          {
                            label: "Expiration Date",
                            type: "date",
                            bsClass: "form-control",
                            placeholder: "Expiration Date",
                            value: this.state.expirationDate,
                            onChange: (e) =>
                              this.setState({ expirationDate: e.target.value }),
                          },
                          {
                            label: "Counter Offers",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Counter Offers",
                            checked: this.state.counteroffers,
                            onChange: (e) =>
                              this.setState({
                                counteroffers: e.target.checked,
                              }),
                          },

                          {
                            label: "Split Exchange",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Split Exchange",
                            checked: this.state.splitExchange,
                            onChange: (e) =>
                              this.setState({
                                splitExchange: e.target.checked,
                              }),
                          },
                        ]}
                      />

                      <Button
                        bsStyle="info"
                        pullRight
                        fill
                        type="submit"
                        onClick={this.saveExchangeOffer}
                      >
                        Post Offer
                      </Button>
                      <div className="clearfix" />
                    </form>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      );
    } else {
      console.log("Please add min 2 different country bank account");
      return (
        <div className="content">
          <label class="control-label">
            PLEASE ADD BANK ACCOUNTS FOR MIN 2 COUNTRIES
          </label>
        </div>
      );
    }
  }
}

export default PostOffer;
