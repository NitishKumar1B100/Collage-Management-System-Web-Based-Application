import { useAttendanceModal } from "../../context/AttendanceModalContext";
import AttendanceModal from "./AttendanceModal";

function GlobalAttendanceModal() {
  const { open, payload, closeModal } = useAttendanceModal();

  if (!open || !payload) return null;

  return (
    <AttendanceModal
      students={payload.students}
      pending={payload.pending}
      onClose={closeModal}
    />
  );
}

export default GlobalAttendanceModal;