import DialogBox from '@/context/dialog';
import { DalogSize, DialogContentType } from '@/types';
import React, { createContext, ReactNode, useContext } from 'react';

type AppDialogContextType = {
  title: string;
  openDialog: (dialog: {
    title: string;
    content: DialogContentType;
    buttonOK?: string;
    buttonOkAction?: () => void;
    buttonCancel?: string;
    size?: DalogSize;
  }) => void;
  closeDialog: () => void;
  isOpen: boolean;
  content: ReactNode | string | null;
  buttonOK?: string | null;
  buttonOkAction?: () => void;
  buttonCancel?: string | null;
  size?: DalogSize;
};

export const AppDialogContext = createContext<AppDialogContextType | undefined>(
  undefined,
);

export const AppDialogProvider = ({ children }: { children: ReactNode }) => {

  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState<DialogContentType>(null);
  const [title, setTitle] = React.useState<string>("Ojio Dialog");
  const [size, setSize] = React.useState<DalogSize>("md");

  const openDialog = (dialog: {
    title: string;
    content: DialogContentType;
    size?: DalogSize;
  }) => {
    setTitle(dialog.title || "Ojio Dialog Box");
    setContent(dialog.content as DialogContentType);
    setSize(dialog.size as DalogSize);
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
