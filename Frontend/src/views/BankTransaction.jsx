import React, { Component } from "react";
import {
	Grid,
	Row,
	Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";
import DirectExchangeService from '../services/DirectExchangeService';

class BankTransaction extends Component {
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
			sending: '',
			receiving: '',
			both: '',
			allbankacc: '',
			bankaccounts: []
		}
	}

	// step 3
	componentDidMount() {

		DirectExchangeService.getBankAccountsByUser("de@gmail.com").then((res) => {
			this.setState({ bankaccounts: res.data });

			console.log("**" + JSON.stringify(this.state.bankaccounts))
		});

		


	}
	saveOrUpdateBankAcc = (e) => {
		// e.preventDefault();
		// let bankaccount = { bankName: this.state.bankName, country: this.state.country, accountNumber: this.state.accountNumber, ownerName: this.state.ownerName, address: this.state.address, currency: this.state.currency, sendingOrReceiving: this.state.sendingOrReceiving, userName: "DE@gmail.com" };
		// console.log('bankaccount => ' + JSON.stringify(bankaccount));

		// DirectExchangeService.addBankAccount(bankaccount).then(res => {
		// 	this.props.history.push('/dashboard');
		// });
	}


	cancel() {
		this.props.history.push('/dashboard');
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
								title="Make Transfer"
								content={
									<form>

										<span className="text-small pr-1">DirectExchange Bank Account</span>

	{/* <ul>{ this.state.bankaccounts.map((item, index) => (<li key={index}>{item.bankName}</li>)) }</ul>
	 */}
										<select id="debankacc" className="form-control" onChange={(event) => this.setState({ allbankacc: event.target.value })}>
											<option selected>Choose...</option>
											{

												this.state.bankaccounts.map((item, index) => <option key={index}>{item.bankName}</option>)

											}
										</select>

										<FormInputs
											ncols={["col-md-4", "col-md-4"]}
											properties={[
												{
													label: "Amount",
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
										
									<div className="btn-toolbar">

									
										<Button bsStyle="danger" pullRight fill type="submit" onClick={this.cancel.bind(this)}>
											Cancel
                    </Button>
						
										<Button bsStyle="info" pullRight fill type="submit" onClick={this.saveOrUpdateBankAcc}>
											Transfer Money
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

export default BankTransaction
