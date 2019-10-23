import React, { useContext } from "react";
import NumberFormat from 'react-number-format';
import { AuthenticationContext } from "../../context/AuthenticationContext";

const ScoreBar = () => {
  const currentUser = useContext(AuthenticationContext);
  return (
    <React.Fragment>
      <div className="scorebar">
          <NumberFormat value={currentUser.userinfo.score} displayType={'text'} 
            thousandSeparator={true} renderText={value => <span className="colorwhite">{value} pont</span>} />
      </div>
    </React.Fragment>
  );
};

export default ScoreBar;