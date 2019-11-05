import React, { createContext, useRef, useState, useContext, useEffect } from "react";
import useBettingModal from "../hooks/useBettingModal";
import useMsgModal from "../hooks/useMsgModal";
import MsgModal from "../components/Modal/Modal";
import BettingModal from "../components/Modal/BettingModal";
import Notify from "react-notification-alert";
import { AuthenticationContext } from "./AuthenticationContext";
import { getCouponsByUserId } from "../_service/api-func";
import { getsettings } from "../_service/api-public-func";

export const SharedContext = createContext();

const SharedProvider = props => {
  const userinfo = useContext(AuthenticationContext)
  const notify = useRef({});
  const [usercoupons, setUsercoupons] = useState([]);
  const [settings, setSettings] = useState({});
  const [msgmodal_text, msgmodal_settext] = useState("");
  const [betmodal_match, betmodal_setmatch] = useState({});
  const [betmodal_mode, betmodal_setmode] = useState("create");
  const [betmodal_coupon, betmodal_setcoupon] = useState(null);
  const { msgmodal_isShowing, msgmodal_toggle } = useMsgModal();
  const { betmodal_isShowing, betmodal_toggle } = useBettingModal(false);
  const [backurl, setBackurl] = useState("");

  useEffect(() => {
    const downloadSettings = async () => {
      const resultPromise = await getsettings();
      setSettings(resultPromise.data);
    };
    downloadSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadCoupons = async () => {
      const resultPromise = await getCouponsByUserId(userinfo.user.sub);
      setUsercoupons(resultPromise.data);
    };
    loadCoupons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
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
          settings,
          backurl,
          setBackurl,
          usercoupons,
          setUsercoupons,
          openNotify,
          msgmodal_isShowing,
          msgmodal_toggle,
          msgmodal_settext,
          betmodal_isShowing,
          betmodal_toggle,
          betmodal_setmatch,
          betmodal_setmode,
          betmodal_setcoupon
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
            mode={betmodal_mode}
            editcoupon={betmodal_coupon}
          />
        ) : null}
      </SharedContext.Provider>
    </>
  );
};

export default SharedProvider;
