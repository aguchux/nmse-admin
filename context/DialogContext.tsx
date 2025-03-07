import DialogBox from '@/components/dialog';
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
    setButtonOK(dialog.buttonOK || 'Submit');
    setButtonCancel(dialog.buttonCancel || 'Close');
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
