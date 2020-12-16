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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const notify = () => toast("Wow so easy !");
class AllOffers extends Component {
  columns = [
    {
      text: "Id",
      dataField: "id",
      sortable: true,
      headerStyle: () => {
        return { width: "4%" };
      },
    },
    {
      text: "Nick Name",
      dataField: "user.nickName",
      sortable: true,
      headerStyle: () => {
        return { width: "6%" };
      },
    },
    {
      text: "Source Country",
      dataField: "sourceCountry",
      sortable: true,
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      text: "Source Currency",
      dataField: "sourceCurrency",
      sortable: true,
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      text: "Destination Country",
      dataField: "destinationCountry",
      sortable: true,
      headerStyle: () => {
        return { width: "8%" };
      },
    },
    {
      text: "Destination Currency",
      dataField: "destinationCurrency",
      sortable: true,
      headerStyle: () => {
        return { width: "10%" };
      },
    },
    {
      text: "Exchange Rate",
      dataField: "exchangeRate",
      sortable: true,
      headerStyle: () => {
        return { width: "8%" };
      },
      //right: true
    },
    {
      text: "Source Remit Amount",
      dataField: "remitAmountSource",
      sortable: true,
      headerStyle: () => {
        return { width: "10%" };
      },
      //filter: textFilter()
      //right: true
    },
    ,
    {
      text: "Destination Remit Amount",
      dataField: "remitAmountDestination",
      sortable: true,
      headerStyle: () => {
        return { width: "10%" };
      },
      //filter: textFilter()
      //right: true
    },

    {
      text: "Expiration Date",
      dataField: "expirationDate",
      sortable: true,
      headerStyle: () => {
        return { width: "8%" };
      },
      //right: true
    },
    {
      text: "User Rating",
      dataField: "user.rating",
      sortable: true,
      headerStyle: () => {
        return { width: "8%" };
      },
      //right: true
    },
    {
      text: "Offer Status",
      dataField: "offerStatus",
      sortable: true,
      headerStyle: () => {
        return { width: "12%" };
      },
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
        console.log("username is" + row.user.userName);
        if (
          (row.user.userName != localStorage.getItem("userId")) &
          (row.offerStatus == "Open")
        ) {
          if (row.counteroffers & row.splitExchange) {
            return (
              <div className="btn-toolbar">
                <Button
                  bsStyle="info"
                  fill
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({ rowval: row });
                    this.handleShow();
                  }}
                >
                  Counter
                </Button>

                <Button
                  bsStyle="info"
                  fill
                  type="submit"
                  onClick={this.onsplitoffer}
                >
                  Split
                </Button>

                <Button
                  bsStyle="success"
                  fill
                  type="submit"
                  onClick={(event) => {
                    event.preventDefault();
                    this.directacceptoffer(row);
                  }}
                >
                  Accept
                </Button>
              </div>
            );
          } else if (row.counteroffers) {
            return (
              <div className="btn-toolbar">
                <Button
                  bsStyle="success"
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
                  onClick={() => {
                    this.setState({ rowval: row });
                    this.handleShow();
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
          } else {
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
              </div>
            );
          }
        }
        if (
          (row.user.userName == localStorage.getItem("userId")) &
          (row.offerStatus == "countermade")
        ) {
          return (
            <div className="btn-toolbar">
              <Button
                bsStyle="info"
                pullRight
                fill
                type="submit"
                onClick={() => {
                  this.counterofferresponse("accepted");
                }}
              >
                Accept Counter Offer
              </Button>
            </div>
          );
        }
        // console.log("**row.userName" + this.state.offerAccepter)
        // if ((row.user.userName == localStorage.getItem("userId") || this.state.offerAccepter==localStorage.getItem("userId")) & row.offerStatus == "InTransaction") {
        //  return (
        //   <div class="btn-toolbar">
        //    <Link bsStyle="info" pullRight fill type="submit" onClick={() => {this.props.history.push('/admin/transfermoney');}}>
        //     Transfer Money
        //         </Link>
        //    </div>
        //   )
        // }
      },
    },
  ];

  directacceptoffer = (row) => {
    // e.preventDefault()
    console.log(row);
    let transaction = this.settransactionval(row);
    DirectExchangeService.acceptOffer(transaction).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      this.showAlert("Success -- Offer Accepted");
      // this.props.history.push('/admin/transfermoney');
      console.log("**" + res.data);
    });
  };

  settransactionval = (row) => {
    // e.preventDefault()
    console.log(row);
    let transaction = {
      id: row.id,
      userName: row.user.userName,
      nickName: row.user.nickName,
      offerAccepter: localStorage.getItem("userId"),
      sourceCountry: row.sourceCountry,
      sourceCurrency: row.sourceCurrency,
      remitAmountSource: row.remitAmountSource,
      remitAmountDestination: row.remitAmountDestination,
      destinationCountry: row.destinationCountry,
      destinationCurrency: row.destinationCurrency,
      exchangeRate: row.exchangeRate,
      expirationDate: row.expirationDate,
      counteroffers: row.counteroffers,
      newRemitAmount: this.state.newremitAmount,
      splitExchange: row.splitExchange,
      //offerStatus: "InTransaction",
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

  counterofferresponse = (action) => {
    let userid = localStorage.getItem("userId");
    console.log("**offerAccepter" + this.state.offerAccepter);
    DirectExchangeService.exchangeaction(userid, action).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      this.showAlert("Success -- Offer Accepted");
      //this.props.history.push('/admin/alloffers');
    });
    this.setState({ offerAccepter: localStorage.getItem("userId") });
  };

  showAlert(msg) {
    alert(msg);
  }
  counteroffer = (e) => {
    e.preventDefault();
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
      offerAccepter: "",
      offers: [],
      rowval: [],
      newremitAmount: "0.00",
    };
  }

  handleClose = (e) => {
    this.setState({
      show: false,
    });
    this.counteroffer(e);
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

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={16}>
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
              <Card
                title="All Offers"
                content={
                  <BootstrapTable
                    striped
                    pagination={paginationFactory()}
                    keyField="id"
                    data={this.state.offers}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                    //expandComponent={this.expandComponent}
                  />
                }
              />

              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>CounterOffer</Modal.Title>
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
        <ToastContainer />
      </div>
    );
  }
}

export default AllOffers;
