import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DirectExchangeService from "../services/DirectExchangeService";
import Button from "components/CustomButton/CustomButton.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import { Modal } from "react-bootstrap";

class Verification extends Component {
  columns = [
    {
      text: "Id",
      dataField: "id",
      sortable: true,
    },
    {
      text: "Nick Name",
      dataField: "user.nickName",
      sortable: true,
    },
    {
      text: "Source Country",
      dataField: "sourceCountry",
      sortable: true,
    },
    {
      text: "Source Currancye",
      dataField: "sourceCurrency",
      sortable: true,
    },
    {
      text: "Destination Country",
      dataField: "destinationCountry",
      sortable: true,
    },
    {
      text: "Destination Currancy",
      dataField: "destinationCurrency",
      sortable: true,
    },
    {
      text: "Exchange Rate",
      dataField: "exchangeRate",
      sortable: true,
      //right: true
    },
    {
      text: "Remit Amount",
      dataField: "remitAmount",
      sortable: true,
      //filter: textFilter()
      //right: true
    },

    ,
    {
      text: "Expiration Date",
      dataField: "expirationDate",
      sortable: true,
      //right: true
    },
    {
      text: "User Rating",
      dataField: "user.rating",
      sortable: true,
      //right: true
    },
    {
      text: "Offer Status",
      dataField: "offerStatus",
      sortable: true,
      //right: true
    },

    {
      text: "Actions",
      dataField: "action",
      isDummyField: true,
      headerStyle: () => {
        return { width: "25%" };
      },
      formatter: (cell, row, rowIndex, formatExtraData) => {
        if (
          (row.user.userName != localStorage.getItem("userId")) &
          (row.offerStatus == "Open")
        ) {
          if (row.counteroffers & row.splitExchange) {
            return (
              <div class="btn-toolbar">
                {" "}
                <Button
                  bsStyle="info"
                  pullRight
                  fill
                  type="submit"
                  onClick={() => {
                    this.setState({ rowval: row });
                    this.handleShow();
                  }}
                >
                  Counter
                </Button>
                <Button
                  bsStyle="info"
                  pullRight
                  fill
                  type="submit"
                  onClick={this.onsplitoffer}
                >
                  Split
                </Button>
                <Button
                  bsStyle="success"
                  pullRight
                  fill
                  type="submit"
                  onClick={() => {
                    this.directacceptoffer(row);
                  }}
                >
                  Accept
                </Button>
              </div>
            );
          } else if (row.counteroffers) {
            return (
              <div class="btn-toolbar">
                <Button
                  bsStyle="success"
                  pullLeft
                  fill
                  type="submit"
                  onClick={() => {
                    this.directacceptoffer(row);
                  }}
                >
                  Accept Offer
                </Button>

                <Button
                  bsStyle="info"
                  pullLeft
                  fill
                  type="submit"
                  onClick={() => {
                    this.counteroffer(row);
                  }}
                >
                  Counter Offer
                </Button>
              </div>
            );
          } else if (row.splitExchange) {
            return (
              <div class="btn-toolbar">
                <Button
                  bsStyle="success"
                  pullLeft
                  fill
                  type="submit"
                  onClick={() => {
                    this.directacceptoffer(row);
                  }}
                >
                  Accept Offer
                </Button>
                <Button
                  bsStyle="info"
                  fill
                  type="submit"
                  onClick={this.onsplitoffer}
                >
                  Split
                </Button>
              </div>
            );
          }
        }
        if (
          (row.user.userName == localStorage.getItem("userId")) &
          (row.offerStatus == "Open")
        ) {
          return (
            <div class="btn-toolbar">
              <Button
                bsStyle="info"
                pullLeft
                fill
                type="submit"
                onClick={() => {}}
              >
                Edit Offer
              </Button>
              <Button bsStyle="danger" fill type="submit" onClick={() => {}}>
                Delete
              </Button>
            </div>
          );
        }
      },
    },
  ];

  directacceptoffer = (row) => {
    console.log(row);
    let transaction = this.settransactionval(row);
    DirectExchangeService.acceptOffer(transaction).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      console.log("**" + res.data);
    });
  };

  settransactionval = (row) => {
    console.log(row);
    let transaction = {
      id: row.id,
      userName: row.user.userName,
      nickName: row.user.nickName,
      offerAccepter: localStorage.getItem("userId"),
      sourceCountry: row.sourceCountry,
      sourceCurrency: row.sourceCurrency,
      remitAmount: row.remitAmount,
      destinationCountry: row.destinationCountry,
      destinationCurrency: row.destinationCurrency,
      exchangeRate: row.exchangeRate,
      expirationDate: row.expirationDate,
      counteroffers: row.counteroffers,
      newRemitAmount: this.state.newremitAmount,
      splitExchange: row.splitExchange,
      offerStatus: "InTransaction",
      // split_exchange_partie1:row.split_exchange_partie1,
      // split_exchange_partie2:row.split_exchange_partie2,
      // split_exchange_partie3:row.split_exchange_partie3

      split_exchange_partie1: "",
      split_exchange_partie2: "",
      split_exchange_partie3: "",
    };

    console.log("transaction => " + JSON.stringify(transaction));
    return transaction;
  };

  counteroffer = () => {
    let transaction = this.settransactionval(this.state.rowval);
    DirectExchangeService.counterOffer(transaction).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      console.log("**" + res.data);
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      offers: [],
      rowval: [],
      newremitAmount: "0.00",
    };
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
    this.counteroffer();
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  setNewRemitAmount = (evt) => {
    this.setState({
      newremitAmount: evt.target.value,
    });
  };
  componentDidMount() {
    if (!localStorage.getItem("userId")) {
      this.props.history.push("/login");
      alert("Please log in");
    }
    DirectExchangeService.listAllExchangeOffer().then((res) => {
      this.setState({ offers: res.data });
      console.log("**" + this.state.offers);
    });
  }

  // onacceptoffer(row) {
  //    this.setState({ this.row.userRating : "InTrasaction"});
  // }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={16}>
              <Card
                title="All Offers"
                content={
                  <BootstrapTable
                    striped
                    pagination={paginationFactory()}
                    expandRow={true}
                    keyField="id"
                    data={this.state.offers}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                    expandComponent={this.expandComponent}
                  />
                }
              />

              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Create an Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">
                      Enter New Remit Amount
                    </label>
                    <input
                      onChange={this.setNewRemitAmount}
                      type="text"
                      className="form-control"
                      id="newremitamount"
                      aria-describedby="emailHelp"
                      placeholder="Enter New Remit Amount"
                      value={this.state.newremitAmount}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={this.handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Verification;
