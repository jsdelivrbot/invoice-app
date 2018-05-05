import React, {Component} from "react";

class ItemField extends Component {

  render() {
    const {item: {description, amount}, itemindex, onUpdate} = this.props;

    return (
      <div className="item-field">
        <input className="desc"
          ref="desc"
          type="text"
          itemindex={itemindex}
          value={description}
          onChange={onUpdate}/>
        <input className="amount"
          ref="amount"
          type="text"
          itemindex={itemindex}
          value={amount}
          onChange={onUpdate}/>
      </div>
    );
  }
}

export default ItemField;
