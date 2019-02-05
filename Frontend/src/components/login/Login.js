import React, { PureComponent } from "react";
import "./Login.css";
import { loginUser } from "../../actions/index";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { addAlert } from "../../actions/index";

import Styles from "../Styles/Styles.js"

// function mapStateToProps(state) {
//   return {
//     // user: state.loginReducer.user,
//     // isAuthenticated: state.loginReducer.isAuthenticated,
//     // alert: state.loginReducer.alert
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    loginFunction: user => dispatch(loginUser(user)),
    addAlert: (text, style) => dispatch(addAlert(text, style))
  };
}

class ConnectedLogin extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }
  componentDidUpdate() {
    if (localStorage.getItem("isLogged")) {
      this.props.history.push("/order");
    }
  }

  handleInput(event) {
    this.setState({
      ...this.states,
      [event.target.id]: event.target.value
    });
  }

  handleEnter(event) {
    if (event.key === 'Enter') {
      this.handleLogin()
    }
  }

  async handleLogin() {
    if (this.state.username) {
      if (this.state.password) {
        await this.props.loginFunction(this.state);
      } else {
        this.props.addAlert("Password is Required!", "warning");
      }
    } else {
      this.props.addAlert("Username is Required!", "warning");
    }
    this.setState({
      username: "",
      password: ""
    })
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={`${classes.login} formContent`}>
      <Card>
        <div className="first">
          <TextField
            required
            id="username"
            type="text"
            label="Username"
            value={this.state.username}
            className={classes.textField}
            margin="normal"
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.resize
              }
            }}
            variant="outlined"
            onChange={this.handleInput}
          />
        </div>
        <div className="second">
          <TextField
            required
            type="password"
            id="password"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            InputProps={{
              classes: {
                input: classes.resize
              }
            }}
            InputLabelProps={{
              classes: {
                root: classes.resize
              }
            }}
            margin="normal"
            variant="outlined"
            onChange={this.handleInput}
            onKeyPress={this.handleEnter}
          />
        </div>
        <div className={classes.classes}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleLogin}
          >
            Login
          </button>
        </div>
        {this.props.alert && (
          <div>
            <label>{this.props.alert}</label>
          </div>
        )}
        </Card>
      </div>
    );
  }
}

const Login = connect(
  null,
  mapDispatchToProps
)(withStyles(Styles)(ConnectedLogin));

export default Login;
