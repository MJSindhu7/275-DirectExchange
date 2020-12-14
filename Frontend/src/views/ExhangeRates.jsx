import React, { Component } from 'react'
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
    text: "Currency",
    dataField: "Currency",
    sortable: true
  },
  {
    text: "EUR",
    dataField: "EUR",
    sortable: true
  },
   {
    text: "GBP",
    dataField: "GBP",
    sortable: true
  },
   {
    text: "INR",
    dataField: "INR",
    sortable: true
  },
   {
    text: "RMB",
    dataField: "RMB",
    sortable: true
  },
   {
    text: "USD",
    dataField: "USD",
    sortable: true
  }
];



class ExhangeRates extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
         rates: [
            { Currency: 'EUR', EUR: 1.0000 , GBP: 0.9112, INR: 89.4227, RMB: 7.9564, USD: 1.2145 },
            { Currency: 'GBP', EUR: 1.0971, GBP: 1.0000, INR: 98.1184, RMB: 8.7301, USD: 1.3326},
            { Currency: 'INR', EUR: 0.0112 , GBP: 0.1021, INR: 1.0000, RMB: 0.0891, USD: 0.0136 },
            { Currency: 'RMB', EUR: 0.1256, GBP: 0.1145, INR: 11.2358, RMB: 1.0000, USD: 0.1526 },
            { Currency: 'USD', EUR: 0.8233, GBP: 0.7503, INR: 73.6293, RMB: 6.5512, USD: 1.0000 }
         ]
      }
   }

   renderTableData() {
      return this.state.rates.map((rate, index) => {
         const { Currency, EUR, GBP, INR , RMB , USD } = rate //destructuring
         return (
            <tr key={Currency}>
               <td>{Currency}</td>
               <td>{EUR}</td>
               <td>{GBP}</td>
               <td>{INR}</td>
			   <td>{RMB}</td>
               <td>{USD}</td>
            </tr>
         )
      })
   }

   renderTableHeader() {
      let header = Object.keys(this.state.rates[0])
      return header.map((key, index) => {
         return <th key={index}>{key.toUpperCase()}</th>
      })
   }

    render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>


            <Col md={16}>
              <Card
                title="Prevailing Exhange Rates"
               content={

                  <BootstrapTable
                    striped
                    hover
                    pagination={paginationFactory()}
                    //expandRow={true}
                    keyField='Currency'
                    data={this.state.rates}
                    columns={columns}
                    filter={ filterFactory()}
                    // expandRow={this.expandRow}
                    //expandComponent={ this.expandComponent }
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

export default ExhangeRates //exporting a component make it reusable and this is the beauty of react