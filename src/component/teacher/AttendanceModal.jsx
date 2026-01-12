// AttendanceModal.jsx
import { memo, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ModalShell from "../ModalShell";
import AttendencePopUpFooter from "./AttendencePopUpFooter";

import { BATCHES, STUDENTS } from "../../StaticDataStructure/batch";

/* ================= STUDENT ROW ================= */

const StudentRow = memo(function StudentRow({
  student,
  value,
  onToggle,
  disabled,
}) {
  const ref = useRef(null);

  const click = () => {
    if (disabled) return;

    gsap.fromTo(
      ref.current,
      { scale: 1 },
      { scale: 0.96, duration: 0.12, yoyo: true, repeat: 1 }
    );

    onToggle();
  };

  return (
    <div
      ref={ref}
      onClick={click}
      className={`p-3 rounded-md border transition-colors
        ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
        ${
          value === "present"
            ? "bg-emerald-500/10 border-emerald-500/40"
            : "bg-rose-500/10 border-rose-500/40"
        }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-[var(--text)]">
            {student.name}
          </p>
          <p className="text-xs text-[var(--muted)]">
            {student.rollNo} · {student.branch} · Sem {student.semester}
          </p>
        </div>
        <span className="text-xs uppercase text-[var(--muted)]">
          {value}
        </span>
      </div>
    </div>
  );
});

/* ================= BATCH CARD ================= */

const BatchCard = memo(function BatchCard({ batch, onSelect }) {
  return (
    <button
      onClick={() => onSelect(batch.id)}
      className="w-full p-4 rounded-lg bg-[var(--teacher_student_card_bg)]
                 border border-[var(--border)]
                 hover:scale-[0.98] transition-transform duration-300 text-left"
    >
      <h3 className="font-semibold text-[var(--text)]">
        {batch.label}
      </h3>
      <p className="text-xs text-[var(--muted)]">
        {batch.course} · {batch.branch} · Sem {batch.semester}
      </p>
    </button>
  );
});

/* ================= MODAL ================= */

const AttendanceModal = memo(function AttendanceModal({
  pending = false,
  onClose,
}) {
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [attendance, setAttendance] = useState({});
  const listRef = useRef(null);

  const selectedBatch = selectedBatchId
    ? BATCHES.find(b => b.id === selectedBatchId)
    : null;

  const students = selectedBatchId
    ? STUDENTS[selectedBatchId] || []
    : [];

  /* init attendance */
  useEffect(() => {
    if (!students.length) return;

    const init = {};
    students.forEach(s => {
      init[s.id] = "present";
    });
    setAttendance(init);
  }, [students]);

  /* animate rows */
  useEffect(() => {
    if (!listRef.current) return;

    gsap.fromTo(
      listRef.current.children,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 }
    );
  }, [selectedBatchId]);

  const toggle = useCallback((id) => {
    setAttendance(p => ({
      ...p,
      [id]: p[id] === "present" ? "absent" : "present",
    }));
  }, []);

  return (
    <ModalShell
      title={selectedBatch ? "Attendance" : "Select Class"}
      onClose={onClose}
      footer={
     
           <AttendencePopUpFooter pending={pending} />
      }
    >
      {/* CLASS SELECTION */}
      {!selectedBatch && (
        <div className="space-y-3">
          {BATCHES.map(batch => (
            <BatchCard
              key={batch.id}
              batch={batch}
              onSelect={setSelectedBatchId}
            />
          ))}
        </div>
      )}

      {/* STUDENT LIST */}
      {selectedBatch && (
        <>
          <button
            onClick={() => setSelectedBatchId(null)}
            className="mb-3 text-xs text-[var(--muted)] hover:underline"
          >
            ← Back to classes
          </button>

          <div
            ref={listRef}
            className="max-h-[55vh] overflow-y-auto space-y-2 pr-1"
          >
            {students.map(s => (
              <StudentRow
                key={s.id}
                student={s}
                value={attendance[s.id]}
                disabled={!pending}
                onToggle={() => toggle(s.id)}
              />
            ))}
          </div>
        </>
      )}
    </ModalShell>
  );
});

export default AttendanceModal;
