import { createContext, useContext, useState } from "react";
import ModalShell from "../component/ModalShell";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalProps, setModalProps] = useState({
    isOpen: false,
    title: "",
    content: null,
    footer: null,
  });

  const openModal = ({ title, content, footer }) => {
    setModalProps({ isOpen: true, title, content, footer });
  };

  const closeModal = () => {
    setModalProps((prev) => ({ ...prev, isOpen: false, content: null }));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modalProps.isOpen && (
        <ModalShell
          title={modalProps.title}
          onClose={closeModal}
          footer={modalProps.footer}
        >
          {modalProps.content}
        </ModalShell>
      )}
    </ModalContext.Provider>
  );
};
