import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.loginReducer.isAuthenticated
  };
}

class ConnectedHome extends Component {
  componentWillMount() {
    if (!localStorage.getItem("isLogged")) {
      this.props.history.push("/login");
    } else {
      this.props.history.push("/order");
    }
  }

  render() {
    return <div />;
  }
}

const Home = connect(mapStateToProps)(ConnectedHome);

export default Home;
