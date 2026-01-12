import { memo } from "react";

const AttendanceButton = memo(function AttendanceButton({ value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md px-3 py-1.5 text-xs font-semibold text-[var(--text)] border border-[var(--border)] hover:bg-[var(--border)] hover:text-[var(--text)] transition-colors"
    >
      Attendance: {value !== 'NA'  ? Math.round(value) +'%' :value}
    </button>
  );
});

export default AttendanceButton;
