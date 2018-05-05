import React, {Component} from "react";

class Field extends Component {

  render() {
    const {label, type, value, onUpdate} = this.props;

    return (
      <div className="input-group">
        <span className="form-label">{label}</span>
      <input className="input-form" ref={label} type={type} value={value} onChange={onUpdate}/>
      </div>
    );
  }
}

export default Field;
