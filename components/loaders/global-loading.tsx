'use client';

import { enableGlobalLoader } from '@/config';
import { useAuthContext } from '@/context/AuthContext';
import { useAppDialog } from '@/context/DialogContext';

export const GlobalLoader = () => {
  const { isBusy } = useAuthContext();
  const { isOpen, closeDialog } = useAppDialog();
  if (!enableGlobalLoader) return null;
  if (!isBusy) return null;

  if (!isOpen) {
    closeDialog();
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999] flex justify-center items-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  );
};
