import { MouseEvent, useState } from 'react';

export function usePopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = (e: MouseEvent<HTMLElement> | null, element?: any) => {
    if (!e) setAnchorEl(element ?? null);
    if (e) setAnchorEl(e.currentTarget);
  };

  const close = () => setAnchorEl(null);

  return {
    open,
    close,
    isDisplay: Boolean(anchorEl),
    anchorEl,
  };
}
