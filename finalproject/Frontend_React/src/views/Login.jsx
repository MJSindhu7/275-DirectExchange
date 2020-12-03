import React, { Component, useState } from "react";
import ChartistGraph from "react-chartist";
import Card from "react-bootstrap/Card";
//import CustomerNavbarLogin from "./CustomerNavbarLogin";
import { Redirect } from "react-router";
import axios from "axios";
//import Home from "./Home.js";
import { Button, Modal } from "react-bootstrap";
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../firebaseConfig";
import { Route } from "react-router-dom";
import DirectExchangeService from "../services/DirectExchangeService";

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

class Login extends Component {
  state = {
    show: false,
    email: "",
    password: "",
    nickname: "",
    signInShow: false,
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  handleCloseSignIn = () => {
    this.setState({
      signInShow: false,
    });
  };

  handleShowSignIn = () => {
    this.setState({
      signInShow: true,
    });
  };

  signUp = () => {
    console.log(this.state.email);
    console.log(this.state.password);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            // Email verification sent!
            // ...
            console.log("Email sent");
            console.log("Able to sign up");
            this.setState({
              show: false,
            });
            let user = {
              userName: this.state.email,
              nickName: this.state.nickname,
            };
            console.log("user => " + JSON.stringify(user));
            DirectExchangeService.addUsertoDirectExchange(user).then((res) => {
              //this.props.history.push("/dashboard");
            });
            window.alert("SignUp Successful, Verification Email Snet");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error");
            console.log(errorCode);
            console.log(errorMessage);
          });
        //window.location.reload(false);
      });
  };

  signIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((user) => {
        this.setState({
          signInShow: false,
        });
        console.log("Success");
      })
      .catch((error) => {
        window.alert("Invalid Username/Password");
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  changeHandlerEmail = (evt) => {
    this.setState({
      email: evt.target.value,
    });
  };
  changeHandlerNick = (evt) => {
    this.setState({
      nickname: evt.target.value,
    });
  };

  changeHandlerPwd = (evt) => {
    this.setState({
      password: evt.target.value,
    });
  };
  changeHandlerEmail = (evt) => {
    this.setState({
      email: evt.target.value,
    });
  };

  changeHandlerPwd = (evt) => {
    this.setState({
      password: evt.target.value,
    });
  };
  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    const { userFB, signOutFB, signInWithFacebook } = this.props;
    /* const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);*/

    return (
      <div className="container">
        <br />
        <div className="row">
          <div className="col-4"></div>
          {/*  {this.state.email ? (
            <Button onClick={signOut}>Sign out</Button>
          ) : (
            <Button onClick={this.handleShowSignIn}>Sign in </Button>
          )}*/}
          <Button onClick={this.handleShowSignIn}>Sign in </Button>
        </div>
        <Modal show={this.state.signInShow} onHide={this.handleCloseSignIn}>
          {/*window.alert("dfdfdfddf")*/}
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="loginEmail">Username</label>
              <input
                onChange={this.changeHandlerEmail}
                type="email"
                className="form-control"
                id="loginEmail"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.email}
              />
            </div>

            <div className="form-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                onChange={this.changeHandlerPwd}
                type="password"
                className="form-control"
                id="loginPassword"
                placeholder="Password"
                value={this.state.password}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseSignIn}>
              Close
            </Button>
            <Button variant="primary" onClick={this.signIn}>
              Sign In
            </Button>
          </Modal.Footer>
        </Modal>
        <br />
        <div className="row">
          <div className="col-4"></div>
          <Button onClick={this.handleShow}>Create an Account</Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create an Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                onChange={this.changeHandlerEmail}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label>NickName</label>
              <input
                onChange={this.changeHandlerNick}
                type="text"
                className="form-control"
                id="nickName"
                aria-describedby="emailHelp"
                placeholder="Enter Nick Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={this.changeHandlerPwd}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={this.state.password}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.signUp}>
              Sign up
            </Button>
          </Modal.Footer>
        </Modal>

        <br />
        <div className="row">
          <div className="col-4"></div>
          {user ? (
            <Button onClick={signOut}>Sign out</Button>
          ) : (
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          )}
        </div>
        <br />
        <div className="row">
          <div className="col-4"></div>
          <div>
            {userFB ? (
              <Button onClick={signOutFB}>Sign out</Button>
            ) : (
              <Button onClick={signInWithFacebook}>
                Sign in with Facebook
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

//export default Login;
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);
