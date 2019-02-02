import React from "react";
import { removeAlert } from "../../actions/index";

class AlertsOverlayComponent extends React.Component {


  removeAlert() {
    var { dispatch, alert } = this.props;
    this.setState({
      open: false
    });
    dispatch(removeAlert(alert.id));
  }

  render() {
    var { alerts, children } = this.props;
  
    var renderAlerts = function() {

      return alerts.alerts.map(function(alert) {
        return React.cloneElement(children, { alert: alert, key: alert.id });
      });
    };

    return (
      <div className="react-alerts-overlay-component-container">
        {renderAlerts()}
      </div>
    );
  }
}

export default AlertsOverlayComponent;
