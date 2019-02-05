import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/login/Login";

import Order from "./components/Order/Order";
import { Router, Route, Switch } from "react-router-dom";
import Alert from "./components/Alert/Alert";
import { connect } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import AlertsOverlayComponent from "./components/Alert/AlertsOverlayComponent";

let mapStateToProps = state => ({
  alerts: state.alertReducer
});

class App extends Component {


  render() {
    var { alerts } = this.props;
    return (
      <div className="App">
        <NavBar history={this.props.history} />
        <Router history={this.props.history}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/order" component={Order} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
        <div>
          <AlertsOverlayComponent alerts={alerts}>
            <Alert />
          </AlertsOverlayComponent>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
