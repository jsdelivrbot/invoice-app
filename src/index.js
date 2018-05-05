import React, {Component} from "react";
import ReactDOM from "react-dom";

import Field from "./components/field";
import ItemField from "./components/item-field";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleInputUpdate = this.handleInputUpdate.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.caculateAmount = this.caculateAmount.bind(this);

    this.state = {
      form: {
        name: "",
        email: "",
        date: "",
      },
      items: [
        {
          description: "apple",
          amount: "5"
        }
      ]
    }
  }
  handleAddItem() {
    const newItemState = [...this.state.items];
    newItemState.push(
      {
        description: "",
        amount: ""
      }
    );
    this.setState({
      items: newItemState
    });
  }

  handleInputUpdate() {
    const newState = this._getFormData(this.refs);
    this.setState({form: newState});
  }

  handleItemUpdate(e) {
    const itemindex = e.target.getAttribute("itemindex");
    const newItemState = [...this.state.items];
    newItemState[itemindex] = this._getItemData(this.refs, itemindex);

    this.setState({items: newItemState});
  }

  caculateAmount() {
    const { items } = this.state;

    // pass dummy data for calculation
    const dummyItemData = {
      apple: {
        description: "apple",
        price: 10
      },
      orange: {
        description: "orange",
        price: 5
      },
    }

    const total = items.reduce((pre, next) => {
      const itemName = next.description;
      // only calculate known item
      if(!dummyItemData.hasOwnProperty(itemName)) return pre;
      const itemAmount = next.amount;
      const itemPrice = dummyItemData[itemName].price;
      return pre += itemAmount*itemPrice
    }, 0);
    return <span>{Number.parseFloat(total).toFixed(2)}</span>;
  }

  _getItemData(refs, itemindex) {
    return {
      description: this.refs[`item${itemindex}`].refs.desc.value,
      amount: this.refs[`item${itemindex}`].refs.amount.value
    }
  }

  _getFormData(refs) {
    return {
      name: refs.name.refs["Name"].value,
      email: refs.email.refs["Email"].value,
      date: refs.date.refs["Due Date"].value,
    }
  }

  render() {
    const { form: { name, email, date}, items } = this.state;

    return (
      <div>
        <form ref="form" className="form-control invoice-head">
          <Field ref="name" type={"text"} value={name} label={"Name"} onUpdate={this.handleInputUpdate}/>
          <Field ref="email" type={"email"} value={email} label={"Email"} onUpdate={this.handleInputUpdate}/>
          <Field ref="date" type={"text"} value={date} label={"Due Date"} onUpdate={this.handleInputUpdate}/>
        </form>
        <div className="item-list">
          <div>
            <div className="col-md-6">Description</div>
            <div className="col-md-6">Amount</div>
          </div>

          { items.map((item, index)=> (
            <ItemField
              ref={`item${index}`}
              key={index}
              onUpdate={this.handleItemUpdate}
              itemindex={index}
              item={item}/>
          ))
          }

        </div>

         <div>Total: {this.caculateAmount()}</div>


        <button className="btn btn-success btn-sm" onClick={this.handleAddItem}>Add New Item</button>
        <button className="btn btn-primary btn-sm">Send</button>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.querySelector(".container"));
