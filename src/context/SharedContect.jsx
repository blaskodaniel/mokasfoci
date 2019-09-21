import React, { createContext, useRef, useState } from "react";
import useBettingModal from "../hooks/useBettingModal";
import useMsgModal from "../hooks/useMsgModal";
import MsgModal from "../components/Modal/Modal";
import BettingModal from "../components/Modal/BettingModal";
import Notify from "react-notification-alert";

export const SharedContext = createContext();

const SharedProvider = props => {
  const notify = useRef({});
  const [msgmodal_text, msgmodal_settext] = useState("");
  const [betmodal_match, betmodal_setmatch] = useState({});
  const { msgmodal_isShowing, msgmodal_toggle } = useMsgModal();
  const { betmodal_isShowing, betmodal_toggle } = useBettingModal(false);

  const openNotify = (msg, type) => {
    const option = {
      place: "br",
      message: msg,
      type: type,
      autoDismiss: 3
    };
    notify.current.notificationAlert(option);
  };

  return (
    <>
      <SharedContext.Provider
        value={{
          openNotify,
          msgmodal_isShowing,
          msgmodal_toggle,
          msgmodal_settext,
          betmodal_isShowing,
          betmodal_toggle,
          betmodal_setmatch
        }}
      >
        {props.children}
        <Notify ref={notify} />
        <MsgModal
          isShowing={msgmodal_isShowing}
          hide={msgmodal_toggle}
          text={msgmodal_text}
        />
        {betmodal_isShowing ? (
          <BettingModal
            isShowing={betmodal_isShowing}
            hide={betmodal_toggle}
            match={betmodal_match}
          />
        ) : null}
      </SharedContext.Provider>
    </>
  );
};

export default SharedProvider;
