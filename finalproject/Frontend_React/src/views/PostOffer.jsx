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
      nickName:'pragati',
      userName: 'pragati.shinde@gmail.com',
      sourceCountry: '',
      sourceCurrancy: '',
      remitAmount: '',
      destinationCountry: '',
      destinationCurrancy: '',
      exchangeRate: '',
      expirationDate: '',
      counteroffers: true,
      newRemitAmount: 0.00,
      splitExchange: true,
      splitExchangeParties: '',
      offerStatus:''


    }
  }

  componentDidMount() {

  }
  saveExchangeOffer = (e) => {
    e.preventDefault();
    let offer = {
      userName: this.state.userName,
      nickName: this.state.nickName,
      sourceCountry: this.state.sourceCountry,
      sourceCurrancy: this.state.sourceCurrancy,
      remitAmount: this.state.remitAmount,
      destinationCountry: this.state.destinationCountry,
      destinationCurrancy: this.state.destinationCurrancy,
      exchangeRate: this.state.exchangeRate,
      expirationDate: this.state.expirationDate,
      counteroffers: this.state.counteroffers,
      newRemitAmount: this.state.newRemitAmount,
      splitExchange: this.state.splitExchange,
      splitExchangeParties: this.state.splitExchangeParties,
      offerStatus:"Open"
    }

    console.log('offer => ' + JSON.stringify(offer));

    DirectExchangeService.addExchangeOffer(offer).then(res => {
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
                          label: "Source Currancy",
                          type: "email",
                          bsClass: "form-control",
                          placeholder: "Source Currancy",
                          value: this.state.sourceCurrancy,
                          onChange: e => this.setState({ sourceCurrancy: e.target.value })
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
                          label: "Destination Currancy",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Destination Currancy",
                          value: this.state.destinationCurrancy,
                          onChange: e => this.setState({ destinationCurrancy: e.target.value })
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
