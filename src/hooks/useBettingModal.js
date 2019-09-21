import { useState } from 'react';

const useBettingModal = () => {
  const [betmodal_isShowing, betmodal_setIsShowing] = useState(false);

  function betmodal_toggle() {
    betmodal_setIsShowing(!betmodal_isShowing);
  }

  return {
    betmodal_isShowing,
    betmodal_toggle,
  }
};

export default useBettingModal;