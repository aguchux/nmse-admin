'use client';

import toast from 'react-hot-toast';

export const useClipbord = (): {
  copyToClipboard: (text: string) => Promise<void>;
} => {
  const copyToClipboard = async (text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      toast.success('Copied to clipboard');
    }
  };
  return { copyToClipboard };
};
