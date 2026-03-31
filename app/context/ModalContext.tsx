import { createContext, useContext, useState } from "react";

type ModalType =
  | "ADD_BOX"
  | "EDIT_BOX"
  | "ARCHIVE_BOX"
  | "DELETE_BOX"
  | "ADD_VIAL"
  | null;

type ModalState = {
  type: ModalType;
  data?: any;
};

const ModalContext = createContext<any>(null);

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (type: ModalType, data?: any) => {
    setModal({ type, data });
  };

  const closeModal = () => {
    setModal({ type: null });
  };

  return (
    <ModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}