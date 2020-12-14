
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "firebaseConfig";
///Users/sindhuram/Documents/Mine/SJSU/Sem4/275/275JSP/Frontend/src
import { Route } from "react-router-dom";
import "firebase/firestore";
import { useHistory, withRouter } from "react-router-dom";
//import login from "/Users/sindhuram/Documents/Mine/SJSU/Sem4/275/JSP/Frontend/src/views/firebaseConfig";

/*const MyComponent = (props) => {
  const history = useHistory();
  handleOnSubmit = () => {
    history.push(`/dashboard`);
  };
};*/
class AdminNavbarLinks extends Component {
           signOut = () => {
    //const history = useHistory();

    firebase
      .auth()
      .signOut()
      .then(() => {
        window.localStorage.clear();
        console.log("Clicked logout");
        // debugger;
        this.props.history.push("/login");
        //window.history.replaceState(null, null, "/");
      })
      .catch(function (error) {
        //window.alert("Error while logging out");
      });
  };

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
        
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
          {localStorage.getItem("userId")}
          </NavItem>
          <NavItem eventKey={3} href="#" onClick={this.signOut}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default withRouter(AdminNavbarLinks);