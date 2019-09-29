import React, { useContext } from "react";
import { AuthenticationContext } from "../../context/AuthenticationContext";

const ScorePointer = () => {
  const currentUser = useContext(AuthenticationContext);
  return (
    <React.Fragment>
      <div className="fixed-plugin">
        <div className="dropdown">
          <span>{currentUser.userinfo.score} pont</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScorePointer;
