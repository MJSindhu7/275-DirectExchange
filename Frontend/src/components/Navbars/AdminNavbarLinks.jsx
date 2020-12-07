/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import { Route } from "react-router-dom";
import "firebase/firestore";
import { useHistory, withRouter } from "react-router-dom";
import DirectExchangeService from "../../services/DirectExchangeService";

class AdminNavbarLinks extends Component {
  state = {
    nickname: "",
  };
  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.clear();
        console.log("Clicked logout");
        this.props.history.push("/login");
      })
      .catch(function (error) {});
  };

  setNick = (name) => {
    this.setState({
      nickname: name,
    });
  };

  componentDidMount() {
    let userID = localStorage.getItem("userId");
    if (!userID) {
      this.props.history.push("/login");
    } else {
      DirectExchangeService.getNickName(userID)
        .then((res) => {
          this.setNick(res.data);
        })
        .catch(function (error) {
          return null;
        });
    }
  }

  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem>
            {this.state.nickname ? "Welcome " + this.state.nickname : ""}
          </NavItem>
          <NavItem eventKey={1} href="#">
            Account
          </NavItem>
          <NavDropdown
            eventKey={2}
            title="Dropdown"
            id="basic-nav-dropdown-right"
          >
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#" onClick={this.signOut}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default withRouter(AdminNavbarLinks);
