import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from 'react-select';
import DirectExchangeService from '../services/DirectExchangeService';

class PostOffer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // step 2
      id: this.props.match.params.id,
      userName: localStorage.getItem("userId"),
      sourceCountry: '',
      sourceCurrency: '',
      remitAmountSource: '',
      remitAmountDestintaion: '',
      destinationCountry: '',
      destinationCurrency: '',
      exchangeRate: '',
      expirationDate: '',
      counteroffers: true,
      newRemitAmount: 0.00,
      splitExchange: true,
      offerStatus: '',
      bankaccounts: [],
      currency: ['USD', 'INR', 'EUR', 'GBP', 'RMB']
    }
  }

  componentDidMount() {
    DirectExchangeService.getBankAccountsByUser(localStorage.getItem("userId")).then((res) => {
      this.setState({ bankaccounts: res.data });
      console.log("**" + this.state.offers)
    });

  }
  saveExchangeOffer = (e) => {
    e.preventDefault();
    let offer = {

      sourceCountry: this.state.sourceCountry,
      sourceCurrency: this.state.sourceCurrency,
      remitAmountSource: this.state.remitAmountSource,
      remitAmountDestintaion: this.state.remitAmountDestination,
      destinationCountry: this.state.destinationCountry,
      destinationCurrency: this.state.destinationCurrency,
      exchangeRate: this.state.exchangeRate,
      expirationDate: this.state.expirationDate,
      counteroffers: this.state.counteroffers,
      newRemitAmount: this.state.newRemitAmount,
      splitExchange: this.state.splitExchange,
      offerStatus: "Open",
      user: { userName: localStorage.getItem("userId") }
    }

    console.log('offer => ' + JSON.stringify(offer));

    DirectExchangeService.addPostOffer(offer).then(res => {
      this.props.history.push('/admin/alloffers');
    });
  }

  onChange = (dateval) => {
    this.setState({ expirationDate: dateval });
    console.log((dateval));
  }

  verifybankaccounts() {
    const uniqueCountry = [];
    if (this.state.bankaccounts.length >= 2) {
      this.state.bankaccounts.map(img => {
        console.log(img)

        if (uniqueCountry.indexOf(img.country) === -1) {
          uniqueCountry.push(img.country)
          console.log(uniqueCountry)
        }
      });
    }
    if (uniqueCountry.length >= 2) {
      return true
    } else {
      return false
    }
  }

  render() {
    var curr = [];
    this.state.currency.forEach(function (element) {
      curr.push({ label: element, value: element })
    });
    console.log("****" + this.verifybankaccounts())
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

                      <FormInputs
                        ncols={["col-md-4"]}
                        properties={[
                          {
                            label: "Source Country",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Source Country",
                            value: this.state.sourceCountry,
                            onChange: e => this.setState({ sourceCountry: e.target.value })
                          }
                        ]}
                      />
                      <div style={{ width: '210px' }}>
                        <span>Source Currency</span>
                        <Select
                        class= "form-control"
                          name="Source Currency"
                          options={curr}
                          defaultValue={{ label: "Select Source Currency", value: 0 }}
                          onChange={(event) => this.setState({ sourceCurrency: event.label })}
                        />
                      </div>
                      <FormInputs
                        ncols={["col-md-4"]}
                        properties={[
                          {
                            label: "Destination Country",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Destination Country",
                            value: this.state.destinationCountry,
                            onChange: e => this.setState({ destinationCountry: e.target.value })
                          }
                        ]}

                      />
                      <div style={{ width: '210px' }}>
                        <span>Destination Currency</span>
                        <Select
                          name="Destination Currency"
                          options={curr}
                          defaultValue={{ label: "Select Destination Currency", value: 0 }}
                          onChange={(event) => this.setState({ destinationCurrency: event.label })}
                        />
                      </div>


                      <FormInputs
                        ncols={["col-md-4", "col-md-4", "col-md-4"]}
                        properties={[
                          {
                            label: "Remit Amount",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Remit Amount",
                            value: this.state.remitAmountSource,
                            onChange: e => this.setState({ remitAmountSource: e.target.value })
                          },
                          {
                            label: "Exchange Rate",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Exchange Rate",
                            value: this.state.exchangeRate,
                            onChange: e => this.setState({ exchangeRate: e.target.value })

                          },
                          {
                            label: "Destination Remit Amount",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Destination Remit Amount",
                            value: this.state.remitAmountDestination,
                            onChange: e => this.setState({ remitAmountDestination: e.target.value })

                          }
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
                            onChange: e => this.setState({ expirationDate: e.target.value })

                          },
                          {
                            label: "Counter Offers",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Counter Offers",
                            checked: this.state.counteroffers,
                            onChange: e => this.setState({ counteroffers: e.target.checked })



                          },

                          {
                            label: "Split Exchange",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Split Exchange",
                            checked: this.state.splitExchange,
                            onChange: e => this.setState({ splitExchange: e.target.checked })

                          }


                        ]}
                      />

                      <Button bsStyle="info" pullRight fill type="submit" onClick={this.saveExchangeOffer}>
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
      console.log("Please add min 2 different country bank account")
      return (
        <div className="content">

        </div>
      );
    }
  }
}


export default PostOffer;
