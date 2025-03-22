import { DalogSize, DialogContentType } from '@/types';
import React, { createContext, ReactNode, useContext } from 'react';

type AppDialogContextType = {
  title: string;
  isOpen: boolean;
  openDialog: (dialog: {
    title: string;
    content: DialogContentType;
    buttonOK?: string;
    buttonCancel?: string;
    size?: DalogSize;
  }) => void;
  closeDialog: () => void;
  content: ReactNode | string | null;
  buttonOK?: string | null;
  buttonCancel?: string | null;
  size?: DalogSize;
};

export const AppDialogContext = createContext<AppDialogContextType | undefined>(
  undefined,
);

export const AppDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState<DialogContentType>(null);
  const [title, setTitle] = React.useState<string>('Ojio Dialog');
  const [buttonOK, setButtonOK] = React.useState<string>('Submit');
  const [buttonCancel, setButtonCancel] = React.useState<string>('Close');
  const [size, setSize] = React.useState<DalogSize>('md');

  const openDialog = (dialog: {
    title: string;
    content: DialogContentType;
    buttonOK?: string;
    buttonCancel?: string;
    size?: DalogSize;
  }) => {
    setTitle(dialog.title || 'Ojio Dialog');
    setContent(dialog.content as DialogContentType);
    setButtonOK(dialog?.buttonOK as string);
    setButtonCancel(dialog?.buttonCancel as string);
    setSize(dialog.size || 'md');
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <AppDialogContext.Provider
      value={{
        title,
        buttonOK,
        buttonCancel,
        isOpen,
        openDialog,
        closeDialog,
        content,
        size,
      }}
    >
      {children}
      {isOpen && (
        <DialogBox
          title={title}
          content={content}
          buttonOK={buttonOK}
          buttonCancel={buttonCancel}
          closeDialog={closeDialog}
          size={size}
        />
      )}
    </AppDialogContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppDialog = () => {
  const context = useContext(AppDialogContext);
  if (context === undefined) {
    throw new Error('useAppDialog must be used within a DailogContextProvider');
  }
  return context;
};


const DialogBox = ({
  title,
  content,
  buttonOK,
  buttonCancel,
  closeDialog,
  size = 'md',
}: {
  title: string;
  content: DialogContentType;
  buttonOK?: string;
  buttonCancel?: string;
  closeDialog: () => void;
  size?: DalogSize;
}) => {
  return (
    <>
      <form className="fixed inset-0 bg-gray-800 bg-opacit
      y-75 flex flex-grow items-center justify-center">
        <div
          className={`bg-gray-100 p-4 rounded-lg shadow-lg flex flex-col gap-4 ${size === 'xl' ? 'w-1/2' : size === 'lg' ? 'w-1/3' : 'w-1/4'
            }`}
        >

          <div className="flex justify-between items-center w-full clear-both">
            <h2 className="text-xl font-bold text-gray-600 border-b-4 border-b-red-600">
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
          <div className="my-4 w-full clear-both">{content}
          </div>
          <div className="mt-6 w-full clear-both flex justify-start gap-2">
            {buttonOK && (
              <button type="submit" className="btn text-lg">
                {buttonOK}
              </button>
            )}

            {buttonCancel && (
              <button
                type="button"
                onClick={closeDialog}
                className="btn text-lg"
              >
                {buttonCancel}
              </button>
            )}

          </div>
        </div>
      </form>
    </>
  );
};
