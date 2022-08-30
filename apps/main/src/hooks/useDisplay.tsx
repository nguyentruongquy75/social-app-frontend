import { useState } from 'react';

export function useDisplay(initialDisplay = false) {
  const [isDisplay, setIsDisplay] = useState(initialDisplay);

  const open = () => setIsDisplay(true);

  const close = () => setIsDisplay(false);

  return {
    isDisplay,
    open,
    close,
  };
}
