import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import UserProfile from './UserProfile'
import BankAccountSetup from './BankAccountSetup'

class Main extends Component {
  render() {
    return (
      <div className="main-panel">
        <Navbar />
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/bankaccountsetup" component={BankAccountSetup} />

          <Redirect from='*' to='/dashboard' /> 

        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main
