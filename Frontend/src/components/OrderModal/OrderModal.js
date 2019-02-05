import React, { PureComponent } from "react";
import { connect } from "react-redux";
import {
  addOrder,
  addAlert,
  loadOrder,
  updateQuantity,
  addItem,
  updateModal,
  removeItem
} from "../../actions/index";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Grid from "@material-ui/core/Grid";
import ItemSuggestion from "../ItemSuggestions/ItemSuggestion.js"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Styles from "../Styles/Styles.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import IconButton from "@material-ui/core/IconButton";

let mapStateToProps = state => ({
  items: state.itemReducer.items,
  userId: state.loginReducer.userId,
  order: state.orderReducer.order,
  isUpdate: state.orderReducer.isUpdate,
  isAuthenticated: state.loginReducer.isAuthenticated,
  add_status: state.orderReducer.add_order
});

function mapDispatchToProps(dispatch) {
  return {
    addOrder: order => dispatch(addOrder(order)),
    alert: (text, style) => dispatch(addAlert(text, style)),
    loadOrder: orderId => dispatch(loadOrder(orderId)),
    updateQuantity: ({ quantity, itemId, orderId }) =>
      dispatch(updateQuantity({ quantity, itemId, orderId })),
    addItem: orderId => dispatch(addItem(orderId)),
    removeItem: ({ orderId, itemId }) =>
      dispatch(removeItem({ orderId, itemId })),
    updateModal: () => dispatch(updateModal())
  };
}

class ConnectedOrderModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quantity,
      isUpdate: this.props.isUpdate
    };
    this._updateQuantity = this._updateQuantity.bind(this);
    this._updateLocalQuantity = this._updateLocalQuantity.bind(this);
    this._removeItem = this._removeItem.bind(this);
    this._validate = this._validate.bind(this);
  }

  _updateLocalQuantity(e) {
    this.setState({
      quantity: {
        ...this.state.quantity,
        [e.target.name]: e.target.value
      }
    });
  }

  _addItem(itemId) {
    // console.log(e.target.selectedIndex);

    const newItem = this.props.items
      .filter(item => item._id === itemId)
      .map(item => {
        return {
          name: item.name,
          price: item.price,
          discountPercentage: item.discountPercentage,
          quantity: 1,
          itemId: item._id,
          amount: item.price * (1 - item.discountPercentage / 100),
          category: item.category
        };
      });
    let filteredItem = this.props.order.items.filter(
      item => item.itemId === newItem[0].itemId
    );
    if (filteredItem.length === 0) {
      if (this.props.isUpdate) {
        this.props
          .addItem({ orderId: this.props.order._id, item: newItem })
          .then(result => {
            this.props.loadOrder(this.props.order._id).then(result => {
              if (result) {
                this.setState({
                  quantity: {
                    ...this.state.quantity,
                    [newItem[0].itemId]: 1
                  }
                });
                this.setState({
                  order: this.props.order
                });
              }
            });
          });
      } else {
        let items = this.props.order.items.concat(newItem);
        let total = items.reduce((total, item) => {
          return total + item.amount;
        }, 0);
        this.setState({
          quantity: {
            ...this.state.quantity,
            [newItem[0].itemId]: 1
          }
        });
        let order = {
          ...this.props.order,
          userId: this.props.userId,
          items: items,
          amount: total * (1 - this.props.order.discountPercentage / 100)
        };

        this.props.addOrder(order).then(order => {
          if (order) {
            this.props.loadOrder(order._id).then(result => {
              if (result) {
                this.setState({
                  order: this.props.order
                });
              }
            });
          }
        });

        this.props.updateModal();
      }
    } else {
      this.props.alert("Alredy Added!", "warning");
    }
  }

  _updateQuantity(e) {
    e.stopPropagation();
    if (this.props.isUpdate) {
      this.props.order.items.filter(item => {
        if (item.itemId === e.target.name) {
          if (e.target.value !== item.quantity) {
            this.props
              .updateQuantity({
                quantity: e.target.value,
                itemId: item.itemId,
                orderId: this.props.order._id
              })
              .then(result => {
                if (result) {
                  this.props.loadOrder(this.props.order._id).then(result => {
                    if (result) {
                      this.setState({
                        order: this.props.order
                      });
                    }
                  });
                } else {
                  let quantity = this.props.order.items.map(item => ({
                    [item.itemId]: item.quantity
                  }));
                  quantity = Object.assign(
                    {},
                    ...quantity.map(element => element)
                  );
                  this.setState({
                    quantity: quantity
                  });
                }
              });
          }
        }
        return item;
      });
    }
  }

  _validate(e) {
    let theEvent = e || window.event;
    let key;
    console.log(theEvent);
    key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
      this.props.alert("Quantity must be numeric", "warning");
    }
  }

  _removeItem(e, item) {
    if (this.props.isUpdate) {
      this.props
        .removeItem({
          itemId: item,
          orderId: this.props.order._id
        })
        .then(result => {
          if (result) {
            this.props.loadOrder(this.props.order._id).then(result => {
              if (result) {
                this.setState({
                  order: this.props.order
                });
              }
            });
          }
        });
    }
  }

  render() {
    const { classes, closeModal, showModal, fullScreen } = this.props;
    return (
      <div>
        <div style={{ width: "100%" }}>
          <Dialog
            open={showModal}
            onClose={closeModal}
            className={classes.modal}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            scroll={"body"}
            fullScreen={fullScreen}
            maxWidth={("sm", "md", "lg")}
          >
            <div style={{ width: "100%" }}>
              <DialogContent>
                <DialogTitle id="alert-dialog-title">
                  {this.props.isUpdate ? "Update Order" : "New Order"}
                </DialogTitle>
                <div>
                  <Card className={classes.card}>
                    <CardContent>
                      <div className="row p-5 text-center">
                        <div className="col-md-6 text-left">
                          <p className="text-muted">
                            Created At:{" "}
                            {new Date(
                              this.props.order.createdDate
                            ).toLocaleString()}
                          </p>
                          <p className="text-muted">
                            Modified At:{" "}
                            {new Date(
                              this.props.order.modifiedDate
                            ).toLocaleString()}
                          </p>
                          {this.props.isUpdate && (
                            <>
                              <p className="text-muted">
                                Order Id: {this.props.order._id}
                              </p>
                            </>
                          )}
                        </div>
                        <div className="col-md-6 text-right">
                          <p className="font-weight-bold mb-4">Order Details</p>
                          <p className="mb-1">
                            <span className="text-muted">UserId: </span>{" "}
                            {this.props.order.userId}
                          </p>
                          <p className="mb-1">
                            <span className="text-muted">Status:</span>{" "}
                            {this.props.order.openStatus && "Open"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <hr className="my-5" />
                  <Grid item xs={12}>
                    <Paper className={classes.rootModal}>
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell className={classes.tablecell2}>
                              #
                            </TableCell>
                            <TableCell className={classes.tablecell}>
                              Name
                            </TableCell>
                            <TableCell
                              className={classes.tablecell}
                              align="right"
                            >
                              Unit Price
                            </TableCell>
                            <TableCell
                              className={classes.tablecell2}
                              align="right"
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              className={classes.tablecell}
                              align="right"
                            >
                              {" "}
                              Discount Percentage
                            </TableCell>
                            <TableCell
                              className={classes.tablecell}
                              align="right"
                            >
                              Total Amount
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.props.order &&
                            this.props.order.items &&
                            this.props.order.items.map(item => (
                              <TableRow key={item.itemId}>
                                <TableCell className={classes.tablecell}>
                                  <div
                                    style={{
                                      // overflow: "hidden",
                                      float: "left"
                                    }}
                                  >
                                    {this.props.order.items.length !== 1 ? (
                                      <IconButton
                                        onClick={e =>
                                          this._removeItem(e, item.itemId)
                                        }
                                        className={classes.button}
                                        aria-label="Remove item from order"
                                      >
                                        <DeleteRoundedIcon />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        disabled
                                        onClick={e =>
                                          this._removeItem(e, item.itemId)
                                        }
                                        // className={classes.button}
                                        aria-label="Remove item from order"
                                      >
                                        <DeleteRoundedIcon />
                                      </IconButton>
                                    )}
                                  </div>
                                </TableCell>
                                <TableCell className={classes.tablecell}>
                                  <div style={{ overflow: "hidden" }}>
                                    <p style={{ marginTop: "20px", paddingTop: "16px" }}>
                                      {item.name}
                                    </p>
                                  </div>
                                  <br style={{ clear: "both" }} />
                                </TableCell>
                                <TableCell
                                  className={classes.tablecell}
                                  align="right"
                                >
                                  {item.price}
                                </TableCell>
                                <TableCell
                                  className={classes.tablecell}
                                  align="right"
                                >
                                  <input
                                    className="form-control"
                                    name={item.itemId}
                                    onKeyPress={this._validate}
                                    onPaste={this._validate}
                                    value={
                                      item.itemId &&
                                      this.state.quantity[item.itemId]
                                        ? this.state.quantity[item.itemId]
                                        : 1
                                    }
                                    onChange={this._updateLocalQuantity}
                                    onBlur={this._updateQuantity}
                                  />
                                </TableCell>
                                <TableCell
                                  className={classes.tablecell}
                                  align="right"
                                >
                                  {`${item.discountPercentage}%`}
                                </TableCell>
                                <TableCell
                                  className={classes.tablecell}
                                  align="right"
                                >
                                  {item.amount}
                                </TableCell>
                              </TableRow>
                            ))}
                          <TableRow>
                            <TableCell colSpan={2}>
                              <ItemSuggestion addItem={itemId => this._addItem(itemId)}/>
                            </TableCell>
                            <TableCell colSpan={4} />
                          </TableRow>
                          {this.props.order &&
                            this.props.order.items.length !== 0 && (
                              <>
                                <TableRow>
                                  <TableCell colSpan={3} />
                                  <TableCell
                                    colSpan={2}
                                    className={classes.tablecell}
                                  >
                                    <strong>Subtotal</strong>
                                  </TableCell>
                                  <TableCell className={classes.tablecell}>
                                    <strong style={{ float: "right" }}>
                                      {this.props.order.amount *
                                        (100 /
                                          (100 -
                                            this.props.order
                                              .discountPercentage))}
                                    </strong>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={3} />
                                  <TableCell className={classes.tablecell}>
                                    <strong>Discount</strong>
                                  </TableCell>
                                  <TableCell className={classes.tablecell}>
                                    <strong style={{ float: "right" }}>
                                      {` ${
                                        this.props.order.discountPercentage
                                      }%`}
                                    </strong>
                                  </TableCell>
                                  <TableCell className={classes.tablecell}>
                                    <strong style={{ float: "right" }}>
                                      {" "}
                                      {this.props.order.amount *
                                        (this.props.order.discountPercentage /
                                          (100 -
                                            this.props.order
                                              .discountPercentage))}
                                    </strong>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell colSpan={3} />
                                  <TableCell
                                    className={classes.tablecell}
                                    colSpan={2}
                                  >
                                    <strong>Total</strong>
                                  </TableCell>
                                  <TableCell className={classes.tablecell}>
                                    <strong style={{ float: "right" }}>
                                      {" "}
                                      {this.props.order.amount}{" "}
                                    </strong>
                                  </TableCell>
                                </TableRow>
                              </>
                            )}
                        </TableBody>
                      </Table>
                    </Paper>
                  </Grid>
                </div>
              </DialogContent>
              <DialogActions>
                <div className="col-md-12">
                  <div className="text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => closeModal()}
                      text="Close"
                    >
                      {"Close"}
                    </button>
                  </div>
                </div>
              </DialogActions>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

ConnectedOrderModal = withMobileDialog()(
  withStyles(Styles, { withTheme: true })(ConnectedOrderModal)
);

const OrderModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedOrderModal);

export default OrderModal;
