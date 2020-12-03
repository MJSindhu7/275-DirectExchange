import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import DirectExchangeService from '../services/DirectExchangeService';

const columnname = ["Source Country", "Source Currency", "Destination Country", "Destination Currency", "Exchange Rate", "Remit Amount", "Expiration Date", "Offer Status"];

class MyOfferPage extends Component {

  constructor(props) {
    super(props)

    this.state = {

      offers: []
    }


  }


  componentDidMount() {

    DirectExchangeService.listUsersExchangeOffer(localStorage.getItem("userId")).then((res) => {
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
                              <td> {offer.sourceCurrency} </td>
                              <td> {offer.destinationCountry} </td>
                              <td> {offer.destinationCurrency} </td>
                              <td> {offer.exchangeRate} </td>
                              <td> {offer.remitAmount}</td>
                              <td> {offer.expirationDate}</td>
                              <td> {offer.offerStatus} </td>
                          
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
