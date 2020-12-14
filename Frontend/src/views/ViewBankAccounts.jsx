import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import DirectExchangeService from '../services/DirectExchangeService';
import Button from "components/CustomButton/CustomButton.jsx";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";


class ViewBankAccounts extends Component {

  columns = [
    {
      text: "Bank Name",
      dataField: "bankName",
      sortable: true
    },
    {
      text: "Account Number",
      dataField: "accountNumber",
      sortable: true
    },
    {
      text: "Owner Name",
      dataField: "ownerName",
      sortable: true
    },
    {
      text: "Owner Address",
      dataField: "address",
      sortable: true
    }
    ,
    {
      text: "Country Rate",
      dataField: "country",
      sortable: true,
      //right: true
    },,
    {
      text: "Primary Currency",
      dataField: "currency",
      sortable: true
    },
    {
      text: "Type",
      dataField: "sendingOrReceiving",
      sortable: true,
      //filter: textFilter()
      //right: true
    },
    
  ];

  
  constructor(props) {
    super(props)

    this.state = {
      accounts: [],
      show:''
    }
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
    this.props.history.push('/admin/viewaccounts');
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  componentDidMount() {

    DirectExchangeService.getBankAccountsByUser(localStorage.getItem("userId")).then((res) => {
      this.setState({ accounts: res.data });
      console.log("**" + this.state.accounts)
    });

  }
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>


            <Col md={16}>
              <Card
                title="All Accounts"
                content={

                  <BootstrapTable
                    striped
                    hover
                    pagination={paginationFactory()}
                    expandRow={true}
                    keyField='id'
                    data={this.state.accounts}
                    columns={this.columns}
                    filter={filterFactory()}
                    // expandRow={this.expandRow}
                    expandComponent={this.expandComponent}
                  />

                }
              />
            </Col>
          </Row>
        </Grid >
      </div >
    );
  }
}

export default ViewBankAccounts;
