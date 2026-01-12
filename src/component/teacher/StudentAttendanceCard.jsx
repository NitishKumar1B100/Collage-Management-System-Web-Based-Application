/* ---------- Student Attendance Card ---------- */

import { memo } from "react";

const StudentAttendanceCard = memo(function StudentAttendanceCard({
  student,
  value,
  onToggle,
}) {
  return (
    <div
      onClick={onToggle}
      className={`p-3 rounded-lg border cursor-pointer transition-all duration-300
        ${
          value === "present"
            ? "bg-green-500/10 border-green-500"
            : "bg-red-500/10 border-red-500"
        }`}
    >
      <h5 className="text-sm font-medium">{student.name}</h5>
      <p className="text-xs text-[var(--muted)]">{student.rollNo}</p>
      <p className="mt-1 text-xs uppercase">
        {value}
      </p>
    </div>
  );
});
export default StudentAttendanceCard;