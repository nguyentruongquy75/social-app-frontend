import { useCallback, useEffect, useState } from 'react';

export function useLongPress(callback = (e?: any) => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [callback, ms, startLongPress]);

  const start: any = useCallback((e: any) => {
    setStartLongPress(true);
  }, []);
  const end = useCallback(() => setStartLongPress(false), []);

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: end,
    onTouchStart: start,
    onTouchEnd: end,
    onMouseOver: start,
    onMouseOut: end,
    startLongPress,
  };
}
