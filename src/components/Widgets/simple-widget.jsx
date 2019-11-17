import React from "react";
import NumberFormat from "react-number-format";
import "./simple-widget.css";

const SimpleWidget = ({ amount, text, icon, fontcolor }) => {
  return (
    <div className="widget_container" style={{ color: fontcolor }}>
      <span className="widget_text">
        <i className={icon}></i> {text}
      </span>
      <div className="widget_amount">
        <NumberFormat
          value={amount}
          displayType={"text"}
          thousandSeparator={true}
          renderText={value => <span className="playerscore">{value}</span>}
        />
      </div>
    </div>
  );
};

export default SimpleWidget;
