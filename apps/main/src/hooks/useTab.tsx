import React, { useState } from 'react';

export function useTab() {
  const [tabIndex, setTabIndex] = useState(0);

  const tabChangeHandler = (e: React.SyntheticEvent, index: number) => {
    setTabIndex(index);
  };

  return {
    tabIndex,
    onChange: tabChangeHandler,
  };
}
