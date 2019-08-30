import React, { createContext, useRef } from "react";
import Notify from "react-notification-alert";

export const SharedContext = createContext();

const SharedProvider = props => {
    const notify = useRef({});
    const openNotify = (msg, type) => {
        const option = {
          place: "tc",
          message: msg,
          type: type,
          autoDismiss: 3
        };
        notify.current.notificationAlert(option);
    };


    return (
        <>
          <SharedContext.Provider value={{openNotify}}>
            {props.children}
            <Notify ref={notify} />
          </SharedContext.Provider>
        </>
      );
}

export default SharedProvider;