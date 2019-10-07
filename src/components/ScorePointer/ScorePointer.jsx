import React, { useContext } from "react";
import NumberFormat from 'react-number-format';
import { AuthenticationContext } from "../../context/AuthenticationContext";

const ScorePointer = () => {
  const currentUser = useContext(AuthenticationContext);
  return (
    <React.Fragment>
      <div className="fixed-plugin">
        <div className="dropdown">
          <NumberFormat value={currentUser.userinfo.score} displayType={'text'} 
            thousandSeparator={true} renderText={value => <span className="colorwhite">{value} pont</span>} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScorePointer;
