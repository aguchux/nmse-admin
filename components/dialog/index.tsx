import { DalogSize } from '@/types';
import { ReactNode } from 'react';
type DialogContentType = ReactNode | string | null;

const DialogBox = ({
  title,
  content,
  closeDialog,
  size,
}: {
  title: string;
  content: DialogContentType;
  closeDialog: () => void;
  size?: DalogSize;
}) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
        <div
          className={`bg-gray-100 p-6 rounded-lg shadow-lg w-96 flex flex-col`}
        >
          <div className="flex justify-between items-center w-full clear-both">
            {title ? (
              <h2 className="text-xl font-bold text-gray-600 border-b-4 border-b-red-600">
                {title}
              </h2>
            ) : (
              <>
                <span></span>
              </>
            )}
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
