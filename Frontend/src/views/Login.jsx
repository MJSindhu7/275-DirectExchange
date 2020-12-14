import React, { Component, useState } from "react";
import ChartistGraph from "react-chartist";

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
import "firebase/firestore";
//import { AccessToken, LoginManager, LoginButton } from "react-native-fbsdk";

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
//import styles from './login.css';

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();

//const userRef = firestore.doc(`users/${user.uid}`);
//const snapshot = userRef.get();

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
    signUpEmail: "",
    signUpPwd: "",
    signInShow: false,
    //user: null,
    test1: [],
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
    console.log(this.state.signUpEmail);
    console.log(this.state.signUpPwd);
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        this.state.signUpEmail,
        this.state.signUpPwd
      )
      .then((user) => {
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(async () => {
            console.log("Email sent");
            console.log("Able to sign up");
            this.setState({
              show: false,
            });
            let userSignUp = {
              userName: this.state.email,
              nickName: this.state.nickname,
              rating: 0,
            };
            console.log("user => " + JSON.stringify(userSignUp));

            localStorage.setItem("userId", this.state.email);

            DirectExchangeService.addUsertoDirectExchange(userSignUp).then(
              (res) => {
                //this.props.history.push("/dashboard");
              }
            );
            this.state.email = "";
            this.state.nickname = "";
            this.state.password = "";
            window.alert("SignUp Successful, Verification Email Snet");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            //console.log(errorCode);
            //console.log(errorMessage);
          });

        //window.location.reload(false);
      })
      .catch((error) => {
        window.alert(error.message);
        console.log(error.message);
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
        localStorage.setItem("userId", this.state.email);
        console.log("Success");
        this.state.email = "";
        this.state.password = "";
        this.props.history.push("/admin/dashboard");
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
        window.localStorage.clear();
        // Sign-out successful.
        this.state.email = "";
        this.state.password = "";
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  fromEmail = (userEmail, userName) => {
    {
      DirectExchangeService.addUsertoDirectExchange({
        userName: userEmail,
        nickName: userName,
      }).then((res) => {
        this.props.history.push("/admin/dashboard");
      });
    }
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

  changeHandlerSignUpPwd = (evt) => {
    this.setState({
      signUpPwd: evt.target.value,
    });
  };

  changeHandlerSignUpEmail = (evt) => {
    this.setState({
      signUpEmail: evt.target.value,
    });
  };

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    const { userFB, signOutFB, signInWithFacebook } = this.props;
    let userEmail, userName;
    let userEmailSignUp;
    return (
      <div className="Login" style={{ margin: "auto", width: "30%" }}>
        <div className="row"></div>

        <div className="form-group">
          <h1 align="center">Direct Exchange</h1>
          <br />
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
          <br></br>
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

        <div class="btn-toolbar">
          <Button variant="secondary" onClick={this.handleCloseSignIn}>
            Close
          </Button>
          <Button variant="primary" onClick={this.signIn}>
            Sign In
          </Button>
        </div>

        <br />

        <br />
        <div className="row">
          <div class="btn-toolbar">
            {user ? (
              <GoogleLoginButton
                onClick={signOut}
                style={{ margin: "auto", width: "50%" }}
              ></GoogleLoginButton>
            ) : (
              <GoogleLoginButton
                onClick={signInWithGoogle}
                style={{ margin: "auto", width: "50%" }}
              ></GoogleLoginButton>
            )}
            <div></div>
            {user ? localStorage.setItem("userId", user.email) : ""}
            {user ? this.fromEmail(user.email, user.displayName) : ""}
          </div>
          <br></br>
          <div class="btn-toolbar">
            {userFB ? (
              <FacebookLoginButton
                onClick={signOutFB}
                style={{ margin: "auto", width: "50%" }}
              >
                {" "}
              </FacebookLoginButton>
            ) : (
              <FacebookLoginButton
                onClick={signInWithFacebook}
                style={{ margin: "auto", width: "50%" }}
              >
                Login with Facebook{" "}
              </FacebookLoginButton>
            )}
          </div>
        </div>
        <br />
        <div className="row"></div>
        <div className="row" style={{ margin: "auto", width: "30%" }}>
          <div className="col-4"></div>
          <Button variant="primary" onClick={this.handleShow}>
            Create an Account
          </Button>
        </div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create an Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                onChange={this.changeHandlerSignUpEmail}
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={this.state.signUpEmail}
              />
            </div>
            <div className="form-group">
              <label>NickName</label>
              <input
                onChange={this.changeHandlerNick}
                type="text"
                className="form-control"
                id="nickName"
                aria-describedby="nickName"
                placeholder="Enter Nick Name"
                value={this.state.nickname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={this.changeHandlerSignUpPwd}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={this.state.signUpPwd}
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
      </div>
    );
  }
}

//export default Login;
export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(Login);
