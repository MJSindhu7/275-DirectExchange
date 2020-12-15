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


class BankTransaction extends Component {
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
		  text: "Source Currency",
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
		}
		,{
			text: "Destination Remit Amount",
			dataField: "remitAmountDestination",
			sortable: true,
			//filter: textFilter()
			//right: true
		  }
		  ,
		{
		  text: "Expiration Date",
		  dataField: "expirationDate",
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
	
			if (row.offerStatus == "InTransaction") {
			  return (
				<div class="btn-toolbar">
				  <Button bsStyle="info"  fill type="submit" onClick={() => { this.counterofferresponse("transfered")}}>
					Transfer Money
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
	
			transactions: []
		}
	  }
	
	  counterofferresponse=(action) => {
		let userid=localStorage.getItem("userId")
		DirectExchangeService.exchangeaction(userid,action).then((res) => {
		this.showAlert("Success -- Money Transfered")
		console.log("**" + res.data)
		this.props.history.push('/admin/alloffers');
		
		});
	
	  }
	
	  showAlert(msg) {
		alert(msg);
	  }
	  componentDidMount() {
	
		DirectExchangeService.listUsersTransactions(localStorage.getItem("userId"),"InTransaction").then((res) => {
		  this.setState({ transactions: res.data });
		  console.log("**" + this.state.transactions)
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
				<Col md={16}>
				  <Card
					title="All Transactions"
					content={
	
					  <BootstrapTable
						striped
						hover
						pagination={paginationFactory()}
						//expandRow={true}
						keyField='id'
						data={this.state.transactions}
						columns={this.columns}
						filter={filterFactory()}
						// expandRow={this.expandRow}
						//expandComponent={this.expandComponent}
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
	
export default BankTransaction
