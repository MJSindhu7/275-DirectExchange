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
import { Modal } from "react-bootstrap";
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
        if (row.offerStatus == "Open") {
          return (
            <div className="btn-toolbar">
              <Button bsStyle="success" fill type="submit" onClick={() => this.automatchmtd(row)}>
                AutoMatch
                      </Button>
              <Button bsStyle="info" fill type="submit" onClick={() => { this.setState({ rowval: row }); this.handleShow() }}>
                Edit Offer
                      </Button>
              <Button bsStyle="danger" fill type="submit" onClick={() => this.deleteoffer(row.id)}>
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
      rowval: [],
      offers: [],
      automatch: [],
      show: '',
      showautomatch: ''
    }
  }

  showAlert(msg) {
		alert(msg);
	  }
  automatchmtd = (rowval) => {
    console.log("beforee   automatch called"+rowval.id)
    DirectExchangeService.getAutomatchingoffers(rowval.id).then(res => {
      this.setState({ automatch: res.data });  
      console.log("automatch called"+this.state.automatch)
      if(this.state.automatch.length>0){

        this.props.history.push({
          pathname: '/admin/automatch',
          rowfrommyoffer: rowval 
        })
      }
    });
  }

  deleteoffer = (id) => {
    DirectExchangeService.deleteOffer(id).then(res => {
      this.showAlert("Success -- Offer Deleted")
      this.setState({ offers: this.state.offers.filter(offer => offer.id !== id) });
    });

  }


  handleClose = () => {
    this.setState({
      show: false,
    });
    this.showAlert("Success -- Counter Offer")
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
            <Col md={15}>
              <Card
                title="My Offers"
                content={

                  <BootstrapTable
                    striped
                    hover
                    table-layout='auto'
                    pagination={paginationFactory()}
                    //expandRow={true}
                    keyField='id'
                    data={this.state.offers}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                   // expandComponent={this.expandComponent}
                  />

                }
              />
              <Modal show={this.state.show} onHide={this.handleClose} >
                <Modal.Header editbutton>
                  <Modal.Title>Update Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UpdateOffer rowval={this.state.rowval} />
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
