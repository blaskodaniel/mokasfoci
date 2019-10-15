import React from "react";
import "./simple-widget.css"

const SimpleWidget = ({ amount, text, icon, fontcolor }) => {
  return (
    <div className="widget_container" style={{color: fontcolor}}>
      <span className="widget_text">
        <i className={icon}></i> {text}
      </span>
      <div className="widget_amount">{amount}</div>
    </div>
  );
};

export default SimpleWidget;
