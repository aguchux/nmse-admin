'use client';

import { DalogSize } from '@/types';
import { ReactNode } from 'react';
type DialogContentType = ReactNode;

const DialogBox = ({
  title,
  content,
  closeDialog,
  size,
}: {
  title: string;
  content: DialogContentType;
  closeDialog: () => void | null;
  size?: DalogSize;
}) => {

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75  flex items-center justify-center z-[900]">
        <div
          className={`bg-gray-100 p-4 rounded-lg shadow-lg w-96 flex flex-col justify-between`}
        >
          <div className="flex justify-between items-center w-full clear-both">
            <h2 className="text-xl font-semibold text-gray-600 border-b border-b-red-600 w-2/3">
              {title}
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              className="text-gray-500 text-2xl font-extrabold hover:text-gray-900"
            >
              &times;
            </button>
          </div>
          <div className="my-4 w-full clear-both">{content}</div>
        </div>
      </div>
    </>
  );
};

export default DialogBox;
