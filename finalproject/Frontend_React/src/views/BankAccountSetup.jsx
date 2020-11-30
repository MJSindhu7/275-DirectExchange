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
			sending: '',
			receiving: '',
			both: ''
		}
	}

	// step 3
	componentDidMount() {

	}
	saveOrUpdateBankAcc = (e) => {
		e.preventDefault();
		let bankaccount = { bankName: this.state.bankName, country: this.state.country, accountNumber: this.state.accountNumber, ownerName: this.state.ownerName, address: this.state.address, currency: this.state.currency, sendingOrReceiving: this.state.sendingOrReceiving };
		console.log('bankaccount => ' + JSON.stringify(bankaccount));

		DirectExchangeService.addBankAccount(bankaccount).then(res => {
			this.props.history.push('/dashboard');
		});
	}


	cancel() {
		this.props.history.push('/dashboard');
	}

	getTitle() {
		return <h3 className="text-center">Register Bank Account</h3>

	}
	render() {

		return (
			// <div>
			// 	<br></br>
			// 	<div className="container">
			// 		<div className="row">
			// 			<div className="card col-md-6 offset-md-3 offset-md-3">
			// 				{
			// 					this.getTitle()
			// 				}
			// 				<div className="card-body">
			// 					<form>


			// 						<div className="form-group">
			// 							<label> Bank name </label>
			// 							<input type="text" placeholder="bank name" name="bank name" className="form-control"
			// 								value={this.state.bankName} onChange={(event) => this.setState({ bankName: event.target.value })} />
			// 						</div>

			// 						<div className="form-group">
			// 							<label> Country </label>
			// 							<input type="text" placeholder="country" name="country" className="form-control"
			// 								value={this.state.country} onChange={(event) => this.setState({ country: event.target.value })} />
			// 						</div>
			// 						<div className="form-group">
			// 							<label> Account number </label>
			// 							<input type="text" placeholder="account number" name="account number" className="form-control"
			// 								value={this.state.accountNumber} onChange={(event) => this.setState({ accountNumber: event.target.value })} />
			// 						</div>
			// 						<div className="form-group">
			// 							<label> Owner Name </label >
			// 							<input type="text" placeholder="owner name" name="owner name" className="form-control"
			// 								value={this.state.ownerName} onChange={(event) => this.setState({ ownerName: event.target.value })} />
			// 						</div>
			// 						<div className="form-group">
			// 							<label> Owner Address </label >
			// 							<input type="text" placeholder="owner name" name="owner name" className="form-control"
			// 								value={this.state.address} onChange={(event) => this.setState({ address: event.target.value })} />
			// 						</div>
			// 						<div className="form-group">
			// 							<label> Primary currency</label >
			// 							<input type="text" placeholder="owner name" name="owner name" className="form-control"
			// 								value={this.state.currency} onChange={(event) => this.setState({ currency: event.target.value })} />
			// 						</div>
			// 						<div className="form-group">
			// 							<label> Sending/Receiving</label >
			// 							<input type="text" placeholder="sending/receiving" name="sending/receiving" className="form-control"
			// 								value={this.state.sendingOrReceiving} onChange={(event) => this.setState({ sendingOrReceiving: event.target.value })} />
			// 						</div>

			// 						<button className="btn btn-success" onClick={this.saveOrUpdateBankAcc}>Save</button>
			// 						<button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
			// 					</form>
			// 				</div>
			// 			</div>
			// 		</div>

			// 	</div>
			// </div >

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
													
													label: "Primary currency",
													type: "text",
													bsClass: "form-control",
													placeholder: "Exchange Rate",
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

										<FormInputs
											ncols={["col-md-4"]}

											properties={[
												{
													label: "Sending Amount",
													type: "select",
													bsClass: "form-control",
													placeholder: "Counter Offers",
													value: this.state.sendingOrReceiving,
													onChange: e => this.setState({ sendingOrReceiving: e.target.checked })



												}

												
											]}
										/>

										<Button bsStyle="info" pullRight fill type="submit" onClick={this.saveOrUpdateBankAcc}>
											Add Account
                    </Button>
										<Button bsStyle="info" pullRight fill type="submit" onClick={this.cancel.bind(this)}>
											Cancel
                    </Button>
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
