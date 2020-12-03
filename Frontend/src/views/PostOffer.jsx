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

class PostOffer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // step 2
      id: this.props.match.params.id,
      userName:'',
      sourceCountry: '',
      sourceCurrency: '',
      remitAmount: '',
      destinationCountry: '',
      destinationCurrency: '',
      exchangeRate: '',
      expirationDate: '',
      counteroffers: true,
      newRemitAmount: 0.00,
      splitExchange: true,
      offerStatus:'',
    }
  }

  componentDidMount() {

  }
  saveExchangeOffer = (e) => {
    e.preventDefault();
    let offer = {
      sourceCountry: this.state.sourceCountry,
      sourceCurrency: this.state.sourceCurrency,
      remitAmount: this.state.remitAmount,
      destinationCountry: this.state.destinationCountry,
      destinationCurrency: this.state.destinationCurrency,
      exchangeRate: this.state.exchangeRate,
      expirationDate: this.state.expirationDate,
      counteroffers: this.state.counteroffers,
      newRemitAmount: this.state.newRemitAmount,
      splitExchange: this.state.splitExchange,
      offerStatus:"Open", 
      user:{userName: this.state.userName}
    }

    console.log('offer => ' + JSON.stringify(offer));

    DirectExchangeService.addPostOffer(offer).then(res => {
      this.props.history.push('/dashboard');
    });
  }

  onChange = (dateval) => {
    this.setState({ expirationDate: dateval });
    console.log((dateval));
  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Post Exchange Offer"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Source Country",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          value: this.state.sourceCountry,
                          onChange: e => this.setState({ sourceCountry: e.target.value })
                        },
                        {
                          label: "Source Currency",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Source Currency",
                          value: this.state.sourceCurrency,
                          onChange: e => this.setState({ sourceCurrency: e.target.value })
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Destination Country",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Last name",
                          value: this.state.destinationCountry,
                          onChange: e => this.setState({ destinationCountry: e.target.value })
                        },
                        {
                          label: "Destination Currency",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Destination Currency",
                          value: this.state.destinationCurrency,
                          onChange: e => this.setState({ destinationCurrency: e.target.value })
                        }
                      ]}

                    />
                    <FormInputs
                      ncols={["col-md-4", "col-md-4"]}
                      properties={[
                        {
                          label: "Remit Amount",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "First name",
                          value: this.state.remitAmount,
                          onChange: e => this.setState({ remitAmount: e.target.value })
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

                    <FormInputs
                      ncols={["col-md-4"]}
                      properties={[
                          {
													label: "User Name",
													type: "text",
													bsClass: "form-control",
													placeholder: "User Name",
													value: this.state.userName,
													onChange: e => this.setState({ userName: e.target.value })
												}	
                      ]}
                    />


                    <Button bsStyle="info" pullRight fill type="submit" onClick={this.saveExchangeOffer}>
                      Post Offer
                    </Button>
                    <div className="clearfix" />
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

export default PostOffer;
