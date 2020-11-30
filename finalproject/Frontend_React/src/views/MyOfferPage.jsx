import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import DirectExchangeService from '../services/DirectExchangeService';

const columnname = ["Source Country", "Source Currancy", "Destination Country", "Destination Currancy", "Exchange Rate", "Remit Amount", "Expiration Date", "Offer Status"];

class MyOfferPage extends Component {

  constructor(props) {
    super(props)

    this.state = {

      offers: []
    }


  }


  componentDidMount() {

    DirectExchangeService.listUsersExchangeOffer("test1.shinde1234@gmail.com").then((res) => {
      this.setState({ offers: res.data });
      console.log("**" + this.state.offers)
    });

  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>


            <Col md={12}>
              <Card
                title="My Offers"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <Table hover pagination>
                    <thead>
                      <tr>
                        {columnname.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.offers.map(
                        offer => {
                          return (

                            <tr key={offer.id} >
                              
                              <td> {offer.sourceCountry} </td>
                              <td> {offer.sourceCurrancy} </td>
                              <td> {offer.destinationCountry} </td>
                              <td> {offer.destinationCurrancy} </td>
                              <td> {offer.exchangeRate} </td>
                              <td> {offer.remitAmount}</td>


                              <td> {offer.expirationDate}</td>
                              <td> {offer.offer_status} </td>
                          
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

export default MyOfferPage;
