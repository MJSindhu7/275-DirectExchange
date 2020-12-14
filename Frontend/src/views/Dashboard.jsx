import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DirectExchangeService from '../services/DirectExchangeService';
import Button from "components/CustomButton/CustomButton.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import DropdownDate from "react-dropdown-date";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

 
class Dashboard extends Component {

  columns = [
  {
    text: "Id",
    dataField: "id",
    sortable: true,
    headerStyle: () => {
      return { width: "4%" };
    }
  },
  {
    text: "Timestamp",
    dataField: "timestamp",
    sortable: true,
    headerStyle: () => {
      return { width: "14%" };
    }
  },
  {
    text: "Source Country",
    dataField: "sourceCountry",
    sortable: true,
    headerStyle: () => {
      return { width: "8%" };
    }
  },
  {
    text: "Source Currency",
    dataField: "sourceCurrency",
    sortable: true,
    headerStyle: () => {
      return { width: "8%" };
    }
  },
  {
    text: "Destination Country",
    dataField: "destinationCountry",
    sortable: true,
    headerStyle: () => {
      return { width: "8%" };
    }
  },
  {
    text: "Destination Currency",
    dataField: "destinationCurrency",
    sortable: true,
    headerStyle: () => {
      return { width: "10%" };
    }
  }
  ,
  {
    text: "Exchange Rate",
    dataField: "exchangeRate",
    sortable: true,
    headerStyle: () => {
      return { width: "8%" };
    }
    //right: true
  },
  {
    text: "Source Remit Amount",
    dataField: "remitAmountSource",
    sortable: true,
    headerStyle: () => {
      return { width: "10%" };
    }
    //filter: textFilter()
    //right: true
  },,
  {
    text: "Destination Remit Amount",
    dataField: "remitAmountDestination",
    sortable: true,
    headerStyle: () => {
      return { width: "10%" };
    }
    //filter: textFilter()
    //right: true
  },
  {
    text: "Offer Status",
    dataField: "offerStatus",
    sortable: true,
    headerStyle: () => {
      return { width: "12%" };
    }
    //right: true
  }
];

  constructor(props) {
    super(props)

    this.state = {

      offers: [],
      rowval:[],
      newremitAmount:'0.00',
      date: null, selectedDate: "2012-11-15"
    }
  }

  componentDidMount() {

    DirectExchangeService.getTransactionHistory(localStorage.getItem("userId")).then((res) => {
      this.setState({ offers: res.data });
      console.log("**" + this.state.offers)
    });

    DirectExchangeService.updateUserRating(localStorage.getItem("userId")).then((res) => {
      console.log("**" + res)
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
          <Row>
            <Col lg={4} sm={6}>
              <StatsCard
               bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Total Transactions"
                statsValue={this.state.offers.length}
              />
            </Col>
            <Col lg={4} sm={5}>
              <StatsCard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Total Amount Transfered In USD"
                statsValue="$1,345"
              />
            </Col>
           
          
          </Row>
          
            <Col md={16}>
              <Card
                title="Transaction History"
               content={
                 

                  <BootstrapTable
                    striped
                    pagination={paginationFactory()}
                    keyField='id'
                    data={this.state.offers}
                    columns={this.columns}
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

export default Dashboard;
