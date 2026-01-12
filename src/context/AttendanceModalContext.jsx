import { createContext, useContext, useState, useMemo, useCallback } from "react";

const AttendanceModalContext = createContext(null);

export function AttendanceModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState(null);

  const openModal = useCallback((data) => {
    setPayload(data);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setPayload(null);
  }, []);

  const value = useMemo(
    () => ({
      open,
      payload,
      openModal,
      closeModal,
    }),
    [open, payload, openModal, closeModal]
  );

  return (
    <AttendanceModalContext.Provider value={value}>
      {children}
    </AttendanceModalContext.Provider>
  );
}

export function useAttendanceModal() {
  const ctx = useContext(AttendanceModalContext);
  if (!ctx) {
    throw new Error("useAttendanceModal must be used inside AttendanceModalProvider");
  }
  return ctx;
}
