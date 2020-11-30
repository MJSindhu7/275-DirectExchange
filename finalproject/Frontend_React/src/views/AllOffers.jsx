import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DirectExchangeService from '../services/DirectExchangeService';
import Button from "components/CustomButton/CustomButton.jsx";

const columnnames = ["Nick Name", "Source Country", "Source Currancy", "Destination Country", "Destination Currancy", "Exchange Rate", "Remit Amount", "Expiration Date", "Offer Status", "Reputation Rating"];

class AllOffers extends Component {

  constructor(props) {
    super(props)

    this.state = {

      offers: []
    }


  }


  componentDidMount() {

    DirectExchangeService.listAllExchangeOffer().then((res) => {
      this.setState({ offers: res.data });
      console.log("**" + this.state.offers)
    });

  }

  oncounteroffer() {

  }
  onsplitoffer() {

  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>


            <Col md={15}>
              <Card
                title="All Offers"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover pagination>
                    <thead>
                      <tr>
                        {columnnames.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.offers.map(
                        offer => {
                          return (

                            <tr key={offer.id} >
                              
                              <td> {offer.nickName} </td>

                              <td> {offer.sourceCountry} </td>
                              <td> {offer.sourceCurrancy} </td>
                              <td> {offer.destinationCountry} </td>
                              <td> {offer.destinationCurrancy} </td>
                              <td> {offer.exchangeRate} </td>
                              <td> {offer.remitAmount}</td>


                              <td> {offer.expirationDate}</td>
                              <td> {offer.offer_status} </td>
                              <td> {offer.user_rating} </td>
                              <td>

                                {(() => {
                                  if (offer.counteroffers) {
                                    return (
                                      <div> <Button bsStyle="info" pullRight fill type="submit" onClick={this.oncounteroffer}>
                                        Counter
                    </Button></div>
                                    )
                                  }
                                })()}
                              </td>
                              <td>

                                {(() => {
                                  if (offer.splitExchange) {
                                    return (
                                      <div> <Button bsStyle="info" pullRight fill type="submit" onClick={this.onsplitoffer}>
                                        Split
                    </Button></div>
                                    )
                                  }
                                })()}
                              </td>

                              <td>


                                <div> <Button bsStyle="success" pullRight fill type="submit" onClick={this.onsplitoffer}>
                                  Accept
                    </Button></div>

                              </td>
                              {/* if (offer.splitExchange) {
                                    return (
                                   <div> <Button bsStyle="info" pullRight fill type="submit" onClick={this.onsplitoffer}>
                                  Accept Offer
                    </Button></div> 
                                    )
                                  }  */}


                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                }
              />
            </Col>

          </Row>
        </Grid >
      </div >
    );
  }
}

export default AllOffers;
