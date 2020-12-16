import React, { Component } from "react";
import { Grid, Row, Col, Alert } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from "react-select";
import DirectExchangeService from "../services/DirectExchangeService";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

class BankAccountSetup extends Component {
  columns = [
    {
      text: "Bank Name",
      dataField: "bankName",
      sortable: true,
    },
    {
      text: "Account Number",
      dataField: "accountNumber",
      sortable: true,
    },
    {
      text: "Owner Name",
      dataField: "ownerName",
      sortable: true,
    },
    {
      text: "Owner Address",
      dataField: "address",
      sortable: true,
    },
    {
      text: "Country Rate",
      dataField: "country",
      sortable: true,
      //right: true
    },
    ,
    {
      text: "Primary Currency",
      dataField: "currency",
      sortable: true,
    },
    {
      text: "Type",
      dataField: "sendingOrReceiving",
      sortable: true,
      //filter: textFilter()
      //right: true
    },
  ];

  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      bankName: "",
      country: "",
      accountNumber: "",
      ownerName: "",
      address: "",
      currency: "",
      primaryCurrency: ["USD", "INR", "EUR", "GBP", "RMB"],
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
      sendingOrReceiving: "",
      userName: localStorage.getItem("userId"),
      sendOrRecMap: ["Sending", "Receiving", "Both"],
      accounts: [],
    };
  }

  // step 3
  componentDidMount() {
    //e.preventDefault()
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      alert("Please log in");
    }
    console.log("username is" + localStorage.getItem("userId"));
    DirectExchangeService.getBankAccountsByUser(
      localStorage.getItem("userId")
    ).then((res) => {
      this.setState({ accounts: res.data });
      console.log("**" + this.state.accounts);
    });
  }

  handleValidation(fields) {
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["bankName"]) {
      formIsValid = false;
      errors["bankName"] = "Cannot be empty";
    }

    if (!fields["country"]) {
      formIsValid = false;
      errors["country"] = "Cannot be empty";
    }

    if (!fields["accountNumber"]) {
      formIsValid = false;
      errors["accountNumber"] = "Cannot be empty";
    }

    if (!fields["ownerName"]) {
      formIsValid = false;
      errors["ownerName"] = "Cannot be empty";
    }

    if (!fields["address"]) {
      formIsValid = false;
      errors["address"] = "Cannot be empty";
    }

    if (!fields["currency"]) {
      formIsValid = false;
      errors["currency"] = "Cannot be empty";
    }

    if (!fields["sendingOrReceiving"]) {
      formIsValid = false;
      errors["sendingOrReceiving"] = "Cannot be empty";
    }
    if (!formIsValid) {
      alert(JSON.stringify(errors));
    }
    return formIsValid;
  }

  saveOrUpdateBankAcc = (e) => {
    e.preventDefault();
    let bankaccount = {
      bankName: this.state.bankName,
      country: this.state.country,
      accountNumber: this.state.accountNumber,
      ownerName: this.state.ownerName,
      address: this.state.address,
      currency: this.state.currency,
      sendingOrReceiving: this.state.sendingOrReceiving,
      user: { userName: localStorage.getItem("userId") },
    };
    if (this.handleValidation(bankaccount)) {
      console.log("bankaccount details are => " + JSON.stringify(bankaccount));

      DirectExchangeService.addBankAccount(bankaccount).then((res) => {
        this.showAlert("Success -- Bank Account Added");
        //this.props.history.push('/admin/bankaccount');
        window.location.reload(false);
      });
    }
  };
  cancel(e) {
    e.preventDefault();
    this.showAlert("Canceled -- Bank Account Not Added");
    this.props.history.push("/admin/dashboard");
  }

  getTitle() {
    return <h3 className="text-center">Register Bank Account</h3>;
  }

  showAlert(msg) {
    alert(msg);
  }
  render() {
    var curr = [];
    this.state.primaryCurrency.forEach(function (element) {
      curr.push({ label: element, value: element });
    });
    var countries = [];
    this.state.listCountries.forEach(function (element) {
      countries.push({ label: element, value: element });
    });
    var srb = [];
    this.state.sendOrRecMap.forEach(function (element) {
      srb.push({ label: element, value: element });
    });
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <div>
              <Button
                bsStyle="info"
                pullRight
                fill
                type="submit"
                onClick={() => {
                  this.componentDidMount();
                }}
              >
                Refresh
              </Button>
            </div>
            <Col md={5}>
              <Card
                justify="center"
                title="Add Bank Account"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Bank Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Bank Name",
                          value: this.state.bankName,
                          onChange: (e) =>
                            this.setState({ bankName: e.target.value }),
                        },
                        {
                          label: "Account number",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Account number ",
                          value: this.state.accountNumber,
                          onChange: (e) =>
                            this.setState({ accountNumber: e.target.value }),
                        },
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Owner Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Owner Name",
                          value: this.state.ownerName,
                          onChange: (e) =>
                            this.setState({ ownerName: e.target.value }),
                        },
                        {
                          label: " Owner Address",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Owner Address",
                          value: this.state.address,
                          onChange: (e) =>
                            this.setState({ address: e.target.value }),
                        },
                      ]}
                    />
                    <div
                      style={{
                        width: "270px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <label className="control-label">Country</label>
                      <Select
                        class="dropdown-menu"
                        name="Country"
                        options={countries}
                        defaultValue={{
                          label: "Select your Country ",
                          value: 0,
                        }}
                        onChange={(event) =>
                          this.setState({ country: event.label })
                        }
                      />
                    </div>
                    <div
                      style={{
                        width: "270px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <label className="control-label">Primary Currency</label>
                      <Select
                        class="dropdown-menu"
                        name="Primary Currency"
                        options={curr}
                        defaultValue={{
                          label: "Select Primary Currency ",
                          value: 0,
                        }}
                        onChange={(event) =>
                          this.setState({ currency: event.label })
                        }
                      />
                    </div>
                    <div
                      style={{
                        width: "270px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                      }}
                    >
                      <label className="control-label">
                        Sending or Receiving or Both
                      </label>
                      <Select
                        class="dropdown-menu"
                        name="Send/Receive/Both"
                        options={srb}
                        defaultValue={{ label: "Select Option ", value: 0 }}
                        onChange={(event) =>
                          this.setState({ sendingOrReceiving: event.label })
                        }
                      />
                    </div>
                    <div className="btn-toolbar">
                      <Button
                        bsStyle="info"
                        fill
                        type="submit"
                        onClick={this.saveOrUpdateBankAcc}
                      >
                        Add Account
                      </Button>
                      <Button
                        bsStyle="danger"
                        fill
                        type="submit"
                        onClick={this.cancel.bind(this)}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={10}>
              <Card
                title="All Bank Accounts"
                content={
                  <BootstrapTable
                    striped
                    hover
                    pagination={paginationFactory()}
                    // expandRow={true}
                    keyField="id"
                    data={this.state.accounts}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                    //expandComponent={this.expandComponent}
                  />
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default BankAccountSetup;
