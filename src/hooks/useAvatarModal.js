import { useState } from 'react';

const useAvatarModal = () => {
  const [avatarmodal_isShowing, setavatarmodal_setIsShowing] = useState(false);

  function avatarmodal_toggle() {
    setavatarmodal_setIsShowing(!avatarmodal_isShowing);
  }

  return {
    avatarmodal_isShowing,
    avatarmodal_toggle,
  }
};

export default useAvatarModal;