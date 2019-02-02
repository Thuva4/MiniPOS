import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {connect} from "react-redux";
import {logout} from "../../actions/index"
const styles = {
  right:{
    marginLeft: "90%",
    float: "right",
    fontSize: 14
  }
};

function mapDispatchToProps(dispatch) {
    return {
      logout: () => dispatch(logout())
    };
  }

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this._handleLogout = this._handleLogout.bind(this);
        this._handlelogin = this._handlelogin.bind(this);
    }
    _handleLogout(){
        this.props.logout()
    }

    _handlelogin() {
      this.props.history.push("/login")
    }
    render() {
          const { classes } = this.props;
  return (
    <div>
      <AppBar position="static">
        {/* <Toolbar className={classes.right}> */}
          { localStorage.getItem("isLogged")  && true ? <Button className={classes.right} onClick={this._handleLogout} color="inherit">Logout</Button> : <Button className={classes.right} onClick={this._handlelogin} color="inherit">Login</Button>
        
        }
        {/* </Toolbar> */}
      </AppBar>
    </div>
  );
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(NavBar));
