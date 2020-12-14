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
            { Currency: 'EUR', EUR: 1.00 , GBP: 0.90, INR: 89.60, RMB: 7.94, USD: 1.21 },
            { Currency: 'GBP', EUR: 1.11, GBP: 1.00, INR: 99.47, RMB: 8.81, USD: 1.35 },
            { Currency: 'INR', EUR: 0.011 , GBP: 0.01, INR: 1.00, RMB: 0.089, USD: 0.014 },
            { Currency: 'RMB', EUR: 0.13, GBP: 0.11, INR: 11.29, RMB: 1.00, USD: 0.15 },
            { Currency: 'USD', EUR: 0.82, GBP: 0.74, INR: 73.84, RMB: 6.54, USD: 1.00 }
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