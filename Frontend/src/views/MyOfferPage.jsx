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
import {Modal } from "react-bootstrap";
import UpdateOffer from "./UpdateOffer";


class MyOfferPage extends Component {

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
      text: "Source Currancye",
      dataField: "sourceCurrency",
      sortable: true
    },
    {
      text: "Destination Country",
      dataField: "destinationCountry",
      sortable: true
    },
    {
      text: "Destination Currancy",
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
        return { width: "25%" };
      }
      ,
      formatter: (cell, row, rowIndex, formatExtraData) => {

        if (row.offerStatus == "countermade") {
          return (
            <div class="btn-toolbar">
              <Button bsStyle="info" pullRight fill type="submit" onClick={() => { this.counterofferresponse("accepted")}}>
                Accept Counter Offer
                    </Button>
            </div>
          )
        }
        if (row.offerStatus == "InTransaction") {
          return (
            <div class="btn-toolbar">
              <Link bsStyle="info" pullRight fill type="submit" onClick={() => {this.props.history.push('/admin/transfermoney');}}>
                Transfer Money
                    </Link>
            </div>
          )
        }
        if(row.offerStatus=="Open") {
          return (
          <div class="btn-toolbar">
          <Button bsStyle="info" pullLeft fill type="submit" onClick={() => {this.setState({rowval:row}); this.handleShow()}}>
           Edit Offer
                      </Button>
         <Button bsStyle="danger"  fill type="submit" onClick={() => this.deleteoffer(row.id)}>
           Delete
                     </Button>
  
                     </div>
          )
        }
      }
    }

  ];

  
  constructor(props) {
    super(props)

    this.state = {
      rowval:[],
      offers: [],
      show:''
    }
  }

  deleteoffer = (id) => {
    DirectExchangeService.deleteOffer(id).then(res => {
      console.log("delteeeee called")
      this.setState({ offers: this.state.offers.filter(offer => offer.id !== id) });
    });

  }
  counterofferresponse=(action) => {
    let userid=localStorage.getItem("userId")
    DirectExchangeService.exchangeaction(userid,action).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
     
      console.log("**" + res.data)
    });

  }

  handleClose = () => {
    this.setState({
      show: false,
    });
    this.props.history.push('/admin/alloffers');
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  componentDidMount() {

    DirectExchangeService.listUsersExchangeOffer(localStorage.getItem("userId")).then((res) => {
      this.setState({ offers: res.data });
      console.log("**" + this.state.offers)
    });

  }
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
                    hover
                    pagination={paginationFactory()}
                    expandRow={true}
                    keyField='id'
                    data={this.state.offers}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                    expandComponent={this.expandComponent}
                  />

                }
              />
 <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header editbutton>
            <Modal.Title>Update Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <UpdateOffer rowval={this.state.rowval}/>
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

            </Col>


          </Row>
        </Grid >
      </div >
    );
  }
}

export default MyOfferPage;
