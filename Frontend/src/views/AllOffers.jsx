import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DirectExchangeService from '../services/DirectExchangeService';
import Button from "components/CustomButton/CustomButton.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
//const columnnames = ["Nick Name", "Source Country", "Source Currancy", "Destination Country", "Destination Currancy", "Exchange Rate", "Remit Amount", "Expiration Date", "Offer Status", "Reputation Rating"];
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
let nameFilter;
let priceFilter;
let stockFilter;
let originFilter;

const columns = [
  {
    text: "Id",
    dataField: "id",
    sortable: true
  },
  {
    text: "Nick Name",
    dataField: "user.nickName",
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
    dataField: "userRating",
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
    formatter: rankFormatter
    //right: true
  }

];
function rankFormatter(cell, row, rowIndex, formatExtraData) {

  if (row.counteroffers & row.splitExchange) {
    return (
      <div class="btn-toolbar"> <Button bsStyle="info" pullRight fill type="submit" onClick={this.oncounteroffer}>
        Counter
                    </Button>
                   
        <Button bsStyle="info" pullRight fill type="submit" onClick={this.onsplitoffer}>
          Split
                    </Button>
                 
        <Button bsStyle="success" pullRight fill type="submit" onClick={() => { onacceptoffer(row)}}>
        
          
          Accept
                     </Button></div>
    )
  }
  else if (row.counteroffers) {
    return (
      <div> <Button bsStyle="info" pullLeft fill type="submit" onClick={this.oncounteroffer}>
        Counter Offer
                    </Button>
        <Button bsStyle="success" pullLeft fill type="submit" onClick={this.onsplitoffer}>
          Accept Offer
                     </Button></div>
    )
  }

  else if (row.splitExchange) {
    return (
      <div>
        <Button bsStyle="success" pullLeft fill type="submit" onClick={this.onsplitoffer}>
          Accept Offer
                     </Button></div>
    )
  }


}
function onacceptoffer(row) {
    console.log(row)
    let transaction = {
      id:row.id,
      userName: row.user.userName,
      nickName: row.user.nickName,
      offerAccepter:"advik.shinde@gmail.com",
      sourceCountry: row.sourceCountry,
      sourceCurrency: row.sourceCurrency,
      remitAmount: row.remitAmount,
      destinationCountry: row.destinationCountry,
      destinationCurrency: row.destinationCurrency,
      exchangeRate: row.exchangeRate,
      expirationDate: row.expirationDate,
      counteroffers: row.counteroffers,
      newRemitAmount: row.newRemitAmount,
      splitExchange: row.splitExchange,
      offerStatus:"InTransaction",
      // split_exchange_partie1:row.split_exchange_partie1,
      // split_exchange_partie2:row.split_exchange_partie2,
      // split_exchange_partie3:row.split_exchange_partie3

       split_exchange_partie1:"",
      split_exchange_partie2:"",
      split_exchange_partie3:""
      

    }

     console.log('transaction => ' + JSON.stringify(transaction));

    DirectExchangeService.startExchaange(transaction).then((res) => {
      // this.setState({ offers: res.data });
      // console.log("**" + this.state.offers)
      console.log("**" + res.data)
    });

  }
class AllOffers extends Component {

  constructor(props) {
    super(props)

    this.state = {

      offers: [],
      dummy:''
    }


  }



  expandRow = {
    renderer:

      row => {
        if (row.counteroffers & row.splitExchange) {
          return (
            <div> <Button bsStyle="info" pullLeft fill type="submit" onClick={this.oncounteroffer}>
              Counter Offer
                    </Button>
                    &nbsp;
              <Button bsStyle="info" pullLeft fill type="submit" onClick={this.onsplitoffer}>
                Split Offer
                    </Button>
                   &nbsp;
              <Button bsStyle="success" pullLeft fill type="submit" onClick={this.onacceptoffer}>
                Accept Offer
               
                     </Button></div>
          )
        }
        else if (row.counteroffers) {
          return (
            <div> <Button bsStyle="info" pullLeft fill type="submit" onClick={this.oncounteroffer}>
              Counter Offer
                    </Button>
              <Button bsStyle="success" pullLeft fill type="submit" onClick={this.onsplitoffer}>
                Accept Offer
                     </Button></div>
          )
        }

        else if (row.splitExchange) {
          return (
            <div>
              <Button bsStyle="success" pullLeft fill type="submit" onClick={this.onacceptoffer}>
                Accept Offer
                     </Button></div>
          )
        }

        // if (row.splitExchange) {
        //   return (
        //     <div> <Button bsStyle="info" pullRight fill type="submit" onClick={this.onsplitoffer}>
        //       Split Offer
        //             </Button></div>
        //   )
        // }


      }
  };


  componentDidMount() {

    DirectExchangeService.listAllExchangeOffer().then((res) => {
      this.setState({ offers: res.data });
      console.log("**" + this.state.offers)
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
                    hover
                    pagination={paginationFactory()}
                    expandRow={true}
                    keyField='id'
                    data={this.state.offers}
                    columns={columns}
                    filter={ filterFactory()}
                    // expandRow={this.expandRow}
                    expandComponent={ this.expandComponent }
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

export default AllOffers;
