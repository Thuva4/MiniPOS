import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
function mapStateToProps(state) {
  return {
    items: state.itemReducer.items
  };
}
class ItemSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeitem: 0,
      filtereditems: [],
      showitems: false,
      userInput: ""
    };

    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
  }

  onChange = e => {
    const { items } = this.props;
    const userInput = e.currentTarget.value;
    if(userInput) {
    const filtereditems = items.filter(
      item => item.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );


    this.setState({
      activeitem: 0,
      filtereditems,
      showitems: true,
      userInput: e.currentTarget.value
    });
    } else {
        this.setState({
      activeitem: 0,
      filtereditems: [],
      showitems: false,
      userInput: ""
    });
    }
  };

  async _onClick(itemId) {
    await this.props.addItem(itemId);
    this.setState({
      activeitem: 0,
      filtereditems: [],
      showitems: false,
      userInput: ""
    });
  }

  _onMouseOver(e) {
    this.setState({ activeitem: e.target.name });
  }

  _onMouseLeave(e) {
    this.setState({ activeitem: 0 });
  }

  async _onKeyDown(e) {
    const { activeitem, filtereditems, showitems  } = this.state;
    if (showitems) {
      if (e.keyCode === 13) {
        await this.props.addItem(filtereditems[activeitem]._id);
        this.setState({
          activeitem: 0,
          showitems: false,
          filtereditems: [],
          userInput: ""
        });
      } else if (e.keyCode === 38) {
        if (activeitem === 0) {
          return;
        }

        this.setState({ activeitem: activeitem - 1 });
      } else if (e.keyCode === 40) {
        if (activeitem - 1 === filtereditems.length) {
          return;
        }

        this.setState({ activeitem: activeitem + 1 });
      }
    }
  }

  render() {
    const {
      onChange,
      _onClick,
      _onKeyDown,
      _onMouseOver,
      _onMouseLeave,
      state: { activeitem, filtereditems, showitems, userInput }
    } = this;

    let itemsListComponent;

    if (showitems && userInput) {
      if (filtereditems.length) {
        itemsListComponent = (
          <Paper>
            <List>
              {filtereditems.map((item, index) => {
                let style;
                if (index === activeitem) {
                  style = { backgroundColor: "#e0e0e0" };
                }

                return (
                  <ListItem
                    onMouseOver={_onMouseOver}
                    onMouseLeave={_onMouseLeave}
                    name={index}
                    key={item._id}
                    button
                    onClick={() => _onClick(item._id)}
                    style={style}
                  >
                    <ListItemText primary={item.name} />
                  </ListItem>
                );
              })}
            </List>

            {/* <ul className="items">
            {filtereditems.map((item, index) => {
              let className;

              // Flag the active item with a class

              return (
                <li
                  className={className}
                  key={item._id}
                  onClick={onClick}
                >
                  {item.name}
                </li>
              );
            })}
          </ul> */}
          </Paper>
        );
      } else {
        itemsListComponent = (
          <div className="no-items">
            <em>No items, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <>
        <input
          type="text"
          onChange={onChange}
          onKeyDown={_onKeyDown}
          value={userInput}
          className="form-control   "
        />
        {itemsListComponent}
      </>
    );
  }
}

export default connect(mapStateToProps)(ItemSuggestion);
