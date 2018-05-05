import React, {Component} from "react";

class ItemField extends Component {

  render() {
    const {item: {description, amount}, itemindex, onUpdate} = this.props;

    return (
      <div className="item-field">
        <input className="col-md-6"
          ref="desc"
          type="text"
          itemindex={itemindex}
          value={description}
          onChange={onUpdate}/>
        <input className="col-md-6"
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
