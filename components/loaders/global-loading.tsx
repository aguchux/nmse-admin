'use client';

import { useAppContext } from '@/context/AppContext';
import { enableGlobalLoader } from '@/config';

export const GlobalLoader = () => {
  const { loading } = useAppContext();
  if (!enableGlobalLoader) return null;
  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999] flex justify-center items-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );
};
