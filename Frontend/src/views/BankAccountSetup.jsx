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
		let bankaccount = { bankName: this.state.bankName, country: this.state.country, accountNumber: this.state.accountNumber,
			 ownerName: this.state.ownerName, address: this.state.address, currency: this.state.currency, 
			 sendingOrReceiving: this.state.sendingOrReceiving, user:{userName: localStorage.getItem("userId")}};
		console.log('bankaccount => ' + JSON.stringify(bankaccount));

		DirectExchangeService.addBankAccount(bankaccount).then(res => {
			this.props.history.push('/admin/dashboard');
		});
	}


	cancel() {
		this.props.history.push('/admin/dashboard');
	}

	getTitle() {
		return <h3 className="text-center">Register Bank Account</h3>

	}
	render() {

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
													label: "Country",
													type: "text",
													bsClass: "form-control",
													placeholder: "Country",
													value: this.state.country,
													onChange: e => this.setState({ country: e.target.value })
												}
											]}
										/>
										<FormInputs
											ncols={["col-md-4", "col-md-4"]}
											properties={[
												{
													label: "Account number",
													type: "text",
													bsClass: "form-control",
													placeholder: "Account number ",
													value: this.state.accountNumber,
													onChange: e => this.setState({ accountNumber: e.target.value })
												},
												{
													
													label: "Primary Currency",
													type: "Dropdown",
													bsClass: "form-control",
													placeholder: "Primary Currency",
													value: this.state.currency,
													onChange: e => this.setState({ currency: e.target.value })

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

											<span className="text-small pr-1">Sending / Receiving / Both</span>

										<select id="debankacc" className="form-control" onChange={(event) => this.setState({ sendingOrReceiving: event.target.value })}>
											<option selected>Choose...</option>
											{

												this.state.sendOrRecMap.map((item, index) => <option key={index}>{item}</option>)

											}
										</select>
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
