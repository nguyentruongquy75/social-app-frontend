import { useState } from 'react';

export function useDisplay() {
  const [isDisplay, setIsDisplay] = useState(false);

  const open = () => setIsDisplay(true);

  const close = () => setIsDisplay(false);

  return {
    isDisplay,
    open,
    close,
  };
}
