import { memo } from "react";

const StudentCard = memo(function StudentCard({ student }) {
  return (
    <div
      className="p-4 rounded-lg bg-[var(--teacher_student_card_bg)] border border-[var(--border)]
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <h4 className="font-semibold">{student.name}</h4>
      <p className="text-xs text-[var(--muted)]">{student.email}</p>
      <div className="mt-2 text-xs grid grid-cols-2 gap-1">
        <span>Roll: {student.rollNo}</span>
        <span>Year: {student.year}</span>
        <span>{student.course}</span>
        <span>{student.branch}</span>
        <span>Sem {student.semester}</span>
      </div>
    </div>
  );
});
export default StudentCard;