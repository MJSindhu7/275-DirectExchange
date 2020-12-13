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
import Select from 'react-select';

class UpdateOffer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // step 2
      rowval: this.props.rowval,
      id: '',
      userName: localStorage.getItem("userId"),
      sourceCountry: '',
      sourceCurrency: '',
      remitAmountSource: '',
      destinationCountry: '',
      destinationCurrency: '',
      exchangeRate: '',
      expirationDate: '',
      counteroffers: true,
      newRemitAmount: 0.00,
      splitExchange: true,
      offerStatus: '',
      bankaccounts: [],
      offer: [],
      currency: ['USD', 'INR', 'EUR', 'GBP', 'RMB'],
      listCountries: ['Republic of India','United States of America', 'United Kingdom','People\'s Republic of China','Germany','France','Portugal','Spain','Italy'], 
      // { Currency: 'EUR', EUR: 1.00 , GBP: 0.90, INR: 89.60, RMB: 7.94, USD: 1.21 },
      // { Currency: 'GBP', EUR: 1.11, GBP: 1.00, INR: 99.47, RMB: 8.81, USD: 1.35 },
      // { Currency: 'INR', EUR: 0.011 , GBP: 0.01, INR: 1.00, RMB: 0.089, USD: 0.014 },
      // { Currency: 'RMB', EUR: 0.13, GBP: 0.11, INR: 11.29, RMB: 1.00, USD: 0.15 },
      //  { Currency: 'USD', EUR: 0.82, GBP: 0.74, INR: 73.84, RMB: 6.54, USD: 1.00 }

    }
  }

  componentDidMount() {
    console.log("-------------" + this.state.rowval.id)
    DirectExchangeService.getOfferById(this.state.rowval.id).then((res) => {
      let offer = res.data;
      console.log("===========" + offer)
      //this.setState({ offer: res.data });
      this.setState({
        id: offer.id,
        sourceCountry: offer.sourceCountry,
        sourceCurrency: offer.sourceCurrency,
        remitAmountSource: offer.remitAmountSource,
        destinationCountry: offer.destinationCountry,
        destinationCurrency: offer.destinationCurrency,
        exchangeRate: offer.exchangeRate,
        expirationDate: offer.expirationDate,
        counteroffers: offer.counteroffers,
        newRemitAmount: offer.newRemitAmount,
        splitExchange: offer.splitExchange,
        offerStatus: "Open",


      });
      console.log("**" + this.state.offer)
    });

  }
  updateExchangeOffer = (e) => {
    e.preventDefault();
    let offer = {
      id: this.state.id,
      sourceCountry: this.state.sourceCountry,
      sourceCurrency: this.state.sourceCurrency,
      remitAmountSource: this.state.remitAmountSource,
      remitAmountDestination: this.state.remitAmountDestination,
      destinationCountry: this.state.destinationCountry,
      destinationCurrency: this.state.destinationCurrency,
      exchangeRate: this.state.exchangeRate,
      expirationDate: this.state.expirationDate,
      counteroffers: this.state.counteroffers,
      newRemitAmount: this.state.newRemitAmount,
      splitExchange: this.state.splitExchange,
      offerStatus: "Open",
      user: { userName: localStorage.getItem("userId") },
   //   currency: ['USD', 'INR', 'EUR', 'GBP', 'RMB']
    }

    console.log('offer => ' + JSON.stringify(offer));

    DirectExchangeService.updateOffer(offer).then(res => {
      //  this.props.history.push('/admin/alloffers');
    });
  }

  onChange = (dateval) => {
    this.setState({ expirationDate: dateval });
    console.log((dateval));
  }


  render() {
    var curr = [];
    this.state.currency.forEach(function (element) {
      curr.push({ label: element, value: element })
    });

     var countries = [];
   			this.state.listCountries.forEach(function (element) {
   	   		countries.push({ label: element, value: element })
    });
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
               
                content={
                  <form>

                  <div class=" form-group col-md-16 col-md-19 ">
                        <div style={{ width: '300px', paddingTop:'10px',paddingBottom:'10px'}}>
                        <span>Source Country</span>
                        <Select
                        class= "form-control"
                        name="Source Country"
                        options={countries}
                        defaultValue={{ label: "Select your Source Country ", value: 0 }}
                        onChange={(event) => this.setState({ sourceCountry: event.label })}
                        />
                        </div>
                       
                       <div style={{ width: '300px', paddingTop:'10px',paddingBottom:'10px'}}>
                        <span>Source Currency</span>
                        <Select
                          class="form-control"
                          name="Source Currency"
                          options={curr}
                          defaultValue={this.state.sourceCurrency}
                          onChange={(event) => this.setState({ sourceCurrency: event.label })}
                        />
                      </div>
                   
                      <div style={{ width: '300px', paddingTop:'10px',paddingBottom:'10px'}}>
											<span>Destination Country</span>
											<Select
											class= "form-control"
											name="Destination Country"
											options={countries}
											defaultValue={{ label: "Select your Destination Country ", value: 0 }}
											onChange={(event) => this.setState({ destinationCountry: event.label })}
											/>
										</div>
                      <div style={{ width: '300px', paddingTop:'10px',paddingBottom:'10px'}}>
									     <span>Destination Currency</span>
                        <Select
                          name="Destination Currency"
                          options={curr}
                          defaultValue={this.state.destinationCurrency}
                          onChange={(event) => this.setState({ destinationCurrency: event.label })}
                        />
                      </div>

                      <FormInputs
                        ncols={["col-md-4", "col-md-4"]}
                        properties={[
                          {
                            label: "Remit Amount",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Remit Amount",
                            value: this.state.remitAmountSource,
                            onChange: e => this.setState({ remitAmountSource: e.target.value })
                          },
                          {
                            label: "Exchange Rate",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Exchange Rate",
                            value: this.state.exchangeRate,
                            onChange: e => this.setState({ exchangeRate: e.target.value })

                          }
                        ]}
                      />

                      <FormInputs
                        ncols={["col-md-4", "col-md-2", "col-md-2"]}

                        properties={[

                          {
                            label: "Expiration Date",
                            type: "date",
                            bsClass: "form-control",
                            placeholder: "Expiration Date",
                            value: this.state.expirationDate,
                            onChange: e => this.setState({ expirationDate: e.target.value })

                          },
                          {
                            label: "Counter Offers",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Counter Offers",
                            checked: this.state.counteroffers,
                            onChange: e => this.setState({ counteroffers: e.target.checked })



                          },

                          {
                            label: "Split Exchange",
                            type: "checkbox",
                            bsClass: "form-control",
                            placeholder: "Split Exchange",
                            checked: this.state.splitExchange,
                            onChange: e => this.setState({ splitExchange: e.target.checked })

                          }


                        ]}
                      />

                      <Button bsStyle="info" pullRight fill type="submit" onClick={this.updateExchangeOffer}>
                        Update Offer
                  </Button>
                      <div className="clearfix" />
                    </div>
                  </form>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>

    );
  }
}


export default UpdateOffer;
