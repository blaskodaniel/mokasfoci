import { useState } from 'react';

const useMsgModal = () => {
  const [msgmodal_isShowing, msgmodal_setIsShowing] = useState(false);

  function msgmodal_toggle() {
    msgmodal_setIsShowing(!msgmodal_isShowing);
  }

  return {
    msgmodal_isShowing,
    msgmodal_toggle,
  }
};

export default useMsgModal;