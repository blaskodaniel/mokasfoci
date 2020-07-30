import React, {useEffect,useState} from "react";
import NumberFormat from "react-number-format";
import "./simple-widget.css";

const SimpleWidget = ({ amount, text, icon, fontcolor, imagepath }) => {
  const [data, setdata] = useState(null)
  
  useEffect(()=>{
    if(amount){
      setdata(amount)
    }
  },[amount])

  return (
    <div className="widget_container" style={{ color: fontcolor }}>
      <span className="widget_text">
        <i className={icon}></i> {text}
      </span>
      <div className="widget_amount">
        {data && !isNaN(Number(data)) ? 
        <NumberFormat
          value={data}
          displayType={"text"}
          thousandSeparator={true}
          renderText={value => <span className="playerscore">{value}</span>}
        /> :
        <div className={"textcontainer"}> 
          <p style={{marginBottom:"0"}}>{data}</p>
          {imagepath ? <img className={"image"} src={imagepath} alt={"img"} /> : null}
        </div>
        }
      </div>
    </div>
  );
};

export default SimpleWidget;
