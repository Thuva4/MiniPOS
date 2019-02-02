import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import { removeAlert } from "../../actions/index";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Styles from "../Styles/Styles.js";

function mapDispatchToProps(dispatch){
  return {
    removeAlert: (id) => dispatch(removeAlert(id))
  }
}
class Alert extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true
    };
    this.handleClose = this.handleClose.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }

  handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  }

  removeAlert(e, reason) {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false
    });
    this.props.removeAlert(alert.id);
  }

  render() {
    var { alert, style } = this.props;
    const { classes } = this.props;
    return (
      <div key={alert.id} style={style}>
        <Snackbar
          key={alert.key}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          onClose={this.removeAlert}
          autoHideDuration={1000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
        >
          <SnackbarContent
            className={classes[alert.style]}
            aria-describedby="client-snackbar"
            message={<span id="message-id">{alert.text}</span>}
          />
        </Snackbar>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(withStyles(Styles)(Alert));
