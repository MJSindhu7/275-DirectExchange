import React, { Component } from "react";
import {
	Grid,
	Row,
	Col,
	Dropdown
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import Select from 'react-select';
import DirectExchangeService from '../services/DirectExchangeService';

class BankAccountSetup extends Component {
	constructor(props) {
		super(props)

		this.state = {
			// step 2
			id: this.props.match.params.id,
			bankName: '',
			country: '',
			accountNumber: '',
			ownerName: '',
			address: '',
			currency: '',
			primaryCurrency: ['USD', 'INR', 'EUR', 'GBP', 'RMB'],
			listCountries: ['Republic of India','United States of America', 'United Kingdom','People\'s Republic of China','Germany','France','Portugal','Spain','Italy'], 
			sendingOrReceiving: '',
			userName: localStorage.getItem("userId"),
			sendOrRecMap : ['Sending','Receiving','Both'],			 
		}
	}

	// step 3
	componentDidMount() {

	}
	saveOrUpdateBankAcc = (e) => {
		e.preventDefault();
		let bankaccount = { 
			bankName: this.state.bankName, 
			country: this.state.country, 
			accountNumber: this.state.accountNumber,
			ownerName: this.state.ownerName, 
			address: this.state.address, 
			currency: this.state.currency,
      		sendingOrReceiving: this.state.sendingOrReceiving, 
			user:{userName: localStorage.getItem("userId")}};

		console.log('bankaccount => ' + JSON.stringify(bankaccount));

		DirectExchangeService.addBankAccount(bankaccount).then(res => {
			this.props.history.push('/admin/bankaccount');
		});
	}


	cancel() {
		this.props.history.push('/admin/dashboard');
	}

	getTitle() {
		return <h3 className="text-center">Register Bank Account</h3>

	}
	render() {
		 var curr = [];
   			this.state.primaryCurrency.forEach(function (element) {
   	   		curr.push({ label: element, value: element })
		});
		 var countries = [];
   			this.state.listCountries.forEach(function (element) {
   	   		countries.push({ label: element, value: element })
		});
		 var srb = [];
   			this.state.sendOrRecMap.forEach(function (element) {
   	   		srb.push({ label: element, value: element })
		});
		return (
						<div className="content">
				<Grid fluid>
					<Row>
						<Col md={8}>
							<Card
								title="Add Bank Account"
								content={
									<form>
										<FormInputs
											ncols={["col-md-4", "col-md-4"]}
											properties={[
												{
													label: "Bank name",
													type: "text",
													bsClass: "form-control",
													placeholder: "Bank Name",
													value: this.state.bankName,
													onChange: e => this.setState({ bankName: e.target.value })
												},
												{
													label: "Account number",
													type: "text",
													bsClass: "form-control",
													placeholder: "Account number ",
													value: this.state.accountNumber,
													onChange: e => this.setState({ accountNumber: e.target.value })
												}
											]}
										/>
										<FormInputs
											ncols={["col-md-4", "col-md-4"]}
											properties={[
												
												{
													label: "Owner Name",
													type: "text",
													bsClass: "form-control",
													placeholder: "Owner Name",
													value: this.state.ownerName,
													onChange: e => this.setState({ ownerName: e.target.value })

												},
												{
													label: " Owner Address",
													type: "text",
													bsClass: "form-control",
													placeholder: "Owner Address",
													value: this.state.address,
													onChange: e => this.setState({ address: e.target.value })
												}
											]}
										/>
										<div style={{ width: '300px', paddingTop:'10px',paddingBottom:'10px'}}>
											<span>Country</span>
											<Select
											class= "form-control"
											name="Country"
											options={countries}
											defaultValue={{ label: "Select your Country ", value: 0 }}
											onChange={(event) => this.setState({ country: event.label })}
											/>
										</div>
										<div style={{ width: '300px', paddingTop:'10px',paddingBottom:'10px'}}>
										<span>Primary Currency</span>
											<Select
											class= "form-control"
											name="Primary Currency"
											options={curr}
											defaultValue={{ label: "Select Primary Currency ", value: 0 }}
											onChange={(event) => this.setState({ currency: event.label })}
											/>
										</div>
										<div style={{ width: '300px', paddingTop:'10px',paddingBottom:'10px'}}>
										<span>Sending or Receiving or Both</span>
											<Select
											class= "form-control"
											name="Send/Receive/Both"
											options={srb}
											defaultValue={{ label: "Select Option ", value: 0 }}
											onChange={(event) => this.setState({ sendingOrReceiving: event.label })}
											/>
										</div>
										<div className="btn-toolbar">
												
											<Button bsStyle="danger" pullRight fill type="submit" onClick={this.cancel.bind(this)}>
													Cancel
											</Button>
							
											<Button bsStyle="info" pullRight fill type="submit" onClick={this.saveOrUpdateBankAcc}>
													Add Account
										</Button>
										</div>
										<div className="clearfix" />
									</form>
								}
							/>
						</Col>

					</Row>
				</Grid>
			</div>
		)

	}
}

export default BankAccountSetup
