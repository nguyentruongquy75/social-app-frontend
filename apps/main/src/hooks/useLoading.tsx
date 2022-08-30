import { useState } from 'react';

export function useLoading() {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);

  const endLoading = () => setIsLoading(false);

  return {
    isLoading,
    startLoading,
    endLoading,
  };
}
