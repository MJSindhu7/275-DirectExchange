import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DirectExchangeService from '../services/DirectExchangeService';
import Button from "components/CustomButton/CustomButton.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { Link } from "react-router-dom";


class Automatch extends Component {

  columns = [
    {
      text: "Id",
      dataField: "id",
      sortable: true
    },
    {
      text: "Source Country",
      dataField: "sourceCountry",
      sortable: true
    },
    {
      text: "Source Currancy",
      dataField: "sourceCurrency",
      sortable: true
    },
    {
      text: "Destination Country",
      dataField: "destinationCountry",
      sortable: true
    },
    {
      text: "Destination Currency",
      dataField: "destinationCurrency",
      sortable: true
    }
    ,
    {
      text: "Exchange Rate",
      dataField: "exchangeRate",
      sortable: true,
      //right: true
    },
    {
      text: "Source Remit Amount",
      dataField: "remitAmountSource",
      sortable: true,
      //filter: textFilter()
      //right: true
    },
    {
      text: "Destination Remit Amount",
      dataField: "remitAmountDestination",
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
        return { width: "30%" };
      }
      ,
      formatter: (cell, row, rowIndex, formatExtraData) => {

        if (row.offerStatus == "countermade") {
          return (
            <div className="btn-toolbar">
              <Button bsStyle="info" pullRight fill type="submit" onClick={() => { this.counterofferresponse("accepted") }}>
                Accept Counter Offer
                    </Button>
            </div>
          )
        }
       // if (row.offerStatus == "InTransaction") {
        //  return (
          //  <div className="btn-toolbar">
           //   <Link bsStyle="info" pullRight fill type="submit" onClick={() => { this.props.history.push('/admin/transfermoney'); }}>
            //    Transfer Money
            //        </Link>
         //   </div>
       //   )
       // }
        if (row.user.userName != localStorage.getItem("userId") & row.offerStatus == "Open") {
          if (row.counteroffers & row.splitExchange) {
            return (
              <div class="btn-toolbar"> <Button bsStyle="info" pullRight fill type="submit" onClick={() => { this.setState({ rowval: row }); this.handleShow() }}>
                Counter
                    </Button>

                <Button bsStyle="info" pullRight fill type="submit" onClick={this.onsplitoffer}>
                  Split
                    </Button>

                <Button bsStyle="success" pullRight fill type="submit" onClick={() => { this.directacceptoffer(row) }}>


                  Accept
                     </Button></div>
            )
          }
          else if (row.counteroffers) {
            return (
              <div class="btn-toolbar">
                <Button bsStyle="success" fill type="submit" onClick={() => { this.directacceptoffer(row) }}>
                  Accept Offer
                     </Button>

                <Button bsStyle="info"  fill type="submit" onClick={() => { this.counteroffer(row) }}>
                  Counter Offer
                    </Button>
              </div>
            )
          }

          else if (row.splitExchange) {
            return (
              <div class="btn-toolbar">
                <Button bsStyle="success" pullLeft fill type="submit" onClick={() => { this.directacceptoffer(row) }}>
                  Accept Offer
                     </Button>
                <Button bsStyle="info" fill type="submit" onClick={this.onsplitoffer}>
                  Split
                    </Button>

              </div>


            )
          } else {
            return (
              <div class="btn-toolbar">
                <Button bsStyle="success" pullLeft fill type="submit" onClick={() => { this.directacceptoffer(row) }}>
                  Accept Offer
                </Button></div>)
          }
        }
      }
    }

  ];

  showAlert(msg) {
		alert(msg);
	  }
  directacceptoffer = (row) => {
    console.log(row)
    let transaction = this.settransactionval(row)
    DirectExchangeService.acceptOffer(transaction).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      this.showAlert("Success -- Accepted Offer")
      //this.props.history.push('/admin/transfermoney');
      console.log("**" + res.data)
    });

  }

  settransactionval = (row) => {
    console.log(row)
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
      split_exchange_partie3: ""


    }

    console.log('transaction => ' + JSON.stringify(transaction));
    return transaction
  }

  counteroffer = () => {
    let transaction = this.settransactionval(this.state.rowval)
    DirectExchangeService.counterOffer(transaction).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      this.showAlert("Success -- You Made Counter Offer")
     // this.props.history.push('/admin/alloffers');
      console.log("**" + res.data)
    });

  }



  constructor(props) {
    super(props)

    this.state = {
      rowfrommyoffer: this.props.location.rowfrommyoffer,
      rowval: [],
      automatch: [],
      splitmatch:[],
      show: ''
    }
  }

  counterofferresponse = (action) => {
    let userid = localStorage.getItem("userId")
    DirectExchangeService.exchangeaction(userid, action).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      this.setState({ automatch: res.data });
      this.showAlert("Success -- Counter Offer Accepted")
      this.props.history.push('/admin/transfermoney');
    });
  }
  componentDidMount() {
    if(this.state.rowfrommyoffer!=undefined){
    console.log("before automatch called"+this.state.rowfrommyoffer)
    DirectExchangeService.getSingleAutomatchingoffers(this.state.rowfrommyoffer.id).then(res => {
      this.setState({ automatch: res.data });  
      console.log("automatch called"+this.state.automatch)
   
    });

    DirectExchangeService.getSplitAutomatchingoffers(this.state.rowfrommyoffer.id).then(res => {
      this.setState({ splitmatch: res.data });  
      console.log("splitmatch called"+this.state.splitmatch)
   
    });

  }}
  render() {
    return (
      <div>
        <Grid fluid>
          <Row>
          <div>
                  <Button  bsStyle="info" pullRight fill type="submit" onClick={() => { this.componentDidMount() }}>
                    Refresh
                        </Button>
                </div>
            <Col md={16}>
              <Card
                title="Single Matching Offers"
                content={

                  <BootstrapTable
                    striped
                    hover
                    pagination={paginationFactory()}
                    expandRow={true}
                    keyField='id'
                    data={this.state.automatch}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                   // expandComponent={this.expandComponent}
                  />

                }
              />

            </Col>

            <Col md={16}>
              <Card
                title="Split Matching Offers"
                content={

                  <BootstrapTable
                    striped
                    hover
                    pagination={paginationFactory()}
                    expandRow={true}
                    keyField='id'
                    data={this.state.splitmatch}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                   // expandComponent={this.expandComponent}
                  />

                }
              />

            </Col>
          </Row>
        </Grid >
      </div >
    );
  }
}

export default Automatch;
