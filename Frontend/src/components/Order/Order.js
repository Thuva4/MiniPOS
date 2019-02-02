import React, { Component } from "react";
import "./Order.css";
import { connect } from "react-redux";
import { loadItems, addOrder, addAlert } from "../../actions/index";
import {
  loadOrder,
  updateQuantity,
  loadOrders,
  addItem,
  removeItem,
  updateModal,
  newModal
} from "../../actions/index";

import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import OrderModal from "../OrderModal/OrderModal";
import EditIcon from "@material-ui/icons/Edit";
import Styles from "../Styles/Styles.js";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";

let mapStateToProps = state => ({
  items: state.itemReducer.items,
  isLogged: state.loginReducer.isLogged,
  order: state.orderReducer.order,
  isUpdate: state.orderReducer.isUpdate,
  orders: state.orderReducer.orders,
  isAuthenticated: state.loginReducer.isAuthenticated,
  add_status: state.orderReducer.add_order
});

function mapDispatchToProps(dispatch) {
  return {
    loadItems: name => dispatch(loadItems(name)),
    addOrder: order => dispatch(addOrder(order)),
    alert: (text, style) => dispatch(addAlert(text, style)),
    loadOrder: orderId => dispatch(loadOrder(orderId)),
    updateQuantity: ({ quantity, itemId, orderId }) =>
      dispatch(updateQuantity({ quantity, itemId, orderId })),
    loadOrders: () => dispatch(loadOrders()),
    addItem: orderId => dispatch(addItem(orderId)),
    removeItem: ({ orderId, itemId }) =>
      dispatch(removeItem({ orderId, itemId })),
    updateModal: () => dispatch(updateModal()),
    newModal: () => dispatch(newModal())
  };
}

class ConnectedOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      order: {
        createdDate: new Date(),
        userId: localStorage.getItem("isLogged"),
        discountPercentage: 10,
        openStatus: true,
        amount: 0,
        items: []
      },
      updateOrderId: "",
      quantity: null,
      isUpdate: false
    };

    this._showModal = this._showModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._showUpdateModal = this._showUpdateModal.bind(this);
  }

  componentDidMount() {
    this.props.loadOrders();
    this.props.loadItems();
  }

  componentWillMount() {
    if (!localStorage.getItem("isLogged")) {
      this.props.history.push("/login");
    }
  }

  componentDidUpdate() {
    if (!localStorage.getItem("isLogged")) {
      this.props.history.push("/login");
    }
  }

  _showUpdateModal(e, orderId) {
    this.props.loadOrder(orderId).then(result => {
      if (result) {
        this.setState({
          order: this.props.order
        });

        let quantity = this.props.order.items.map(item => ({
          [item.itemId]: item.quantity
        }));
        quantity = Object.assign({}, ...quantity.map(element => element));
        this.setState({
          quantity: quantity
        });
        this.props.updateModal();
        this.setState({
          showModal: true
        });
      }
    });
  }

  _showModal() {
    this.setState({ showModal: true });
  }

  async _closeModal() {
    this.setState({
      showModal: false,
      order: {
        createdDate: new Date(),
        userId: localStorage.getItem("isLogged"),
        discountPercentage: 10,
        openStatus: true,
        amount: 0,
        items: []
      }
    });
    await this.props.loadOrders().then(result => {
      if (result) {
        if (this.props.isUpdate) {
          this.props.alert("Order Saved!", "success");
        }
      }
    });
    this.props.newModal();
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className="col-md-10 col-md-offset-1">
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tablecell2}>#</TableCell>
                  <TableCell className={classes.tablecell}> Order Id</TableCell>
                  <TableCell className={classes.tablecell} align="right">
                    Ordered Date
                  </TableCell>
                  <TableCell className={classes.tablecell} align="right">
                    Modified Date
                  </TableCell>
                  <TableCell className={classes.tablecell} align="right">
                    Status
                  </TableCell>
                  <TableCell className={classes.tablecell} align="right">
                    Total Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.orders.map(order => (
                  <TableRow key={order._id}>
                    <TableCell className={classes.tablecell2}>
                      {/* <button
                                    className="btn btn-circle"
                                    style={{ marginLeft: "5px" }}
                                    onClick={e =>
                                      this._removeItem(e, item.itemId)
                                    }
                                    disabled
                                    name={order._id}
                                    text=""
                                  >
                                    <DeleteRoundedIcon />
                                  </button> */}
                      {/* <button
                        name={order._id}
                        onClick={e => this._showUpdateModal(e, order._id)}
                        className="btn btn-circle"
                      >
                        <DeleteRoundedIcon />
                      </button> */}
                      <IconButton
                        onClick={e => this._showUpdateModal(e, order._id)}
                        className={classes.button}
                        aria-label="Add to shopping cart"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell className={classes.tablecell}>
                      {/* <button
                        name={order._id}
                        type="button"
                        onClick={e => this._showUpdateModal(e)}
                        className="btn btn-link"
                      > */}
                      {order._id}
                      {/* </button> */}
                    </TableCell>
                    <TableCell className={classes.tablecell} align="right">
                      {new Date(order.createdDate).toLocaleString()}
                    </TableCell>
                    <TableCell className={classes.tablecell} align="right">
                      {new Date(order.modifiedDate).toLocaleString()}
                    </TableCell>
                    <TableCell className={classes.tablecell} align="right">
                      {order.openStatus ? "Open" : "Closed"}
                    </TableCell>
                    <TableCell className={classes.tablecell} align="right">
                      {order.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
        <Fab
          color="primary"
          onClick={this._showModal}
          aria-label="Add"
          className={classes.float}
        >
          <AddIcon />
        </Fab>
        {/* </div> */}
        <div style={{ width: "100%" }}>
          {this.state.showModal && (
            <OrderModal
              quantity={this.state.quantity}
              showModal={this.state.showModal}
              closeModal={this._closeModal}
            >
              {" "}
            </OrderModal>
          )}
        </div>
      </div>
    );
  }
}

ConnectedOrder = withStyles(Styles, { withTheme: true })(ConnectedOrder);

const Order = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOrder);

export default Order;
