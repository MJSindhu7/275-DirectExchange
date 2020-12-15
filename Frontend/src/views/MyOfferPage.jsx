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
              <Button bsStyle="success" fill type="submit" onClick={event => { event.preventDefault(); this.automatchmtd(row)}}>
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
      splitmatch:[],
      show: '',
      showautomatch: ''
    }
  }

  showAlert(msg) {
		alert(msg);
    }
    
  automatchmtd = (rowval) => {
    
    //this.showAlert("automatch called"+rowval.id)
    console.log("before automatch called"+rowval.id)
    
    
    DirectExchangeService.getSingleAutomatchingoffers(rowval.id).then(res => {
      //  console.log("Single offer response data"+JSON.stringify(res.data) )
       this.setState({ automatch: res.data });  
       console.log("automatch called"+JSON.stringify(this.state.automatch)+" length is :" +this.state.automatch.length )

       DirectExchangeService.getSplitAutomatchingoffers(rowval.id).then(res => {
      //  console.log("Split offer response data"+JSON.stringify(res.data) )
       this.setState({ splitmatch: res.data });  
       console.log("splitmatch called"+JSON.stringify(this.state.splitmatch)+" length is :" +this.state.splitmatch.length)

      console.log("splitmatch length is :" +this.state.splitmatch.length + " and automatch length is :" +this.state.automatch.length)
       if(this.state.automatch.length>0 || this.state.splitmatch.length>0 ){
         this.showAlert("Automatching offers found, redirecting now")
         this.props.history.push({
           pathname: '/admin/automatch',
           rowfrommyoffer: rowval 
         })
       }
       else{
         this.showAlert("No Automatching offers found for this offer")
         window.location.reload(false)         
       }
     });      
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
    // this.showAlert("Success -- Counter Offer")
    this.props.history.push('/admin/myoffers');
    window.location.reload(false)
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
          <div>
                  <Button  bsStyle="info" pullRight fill type="submit" onClick={() => { this.componentDidMount() }}>
                    Refresh
                        </Button>
                </div>
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
