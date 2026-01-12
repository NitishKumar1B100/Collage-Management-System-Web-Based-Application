import { memo, useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import AttendanceButton from "./AttendanceButton";
import AttendancePopup from "./AttendancePopup";
import { useModal } from "../../context/ModalContext";
import {fakeAttendance} from '../../StaticDataStructure/stacticattendence.jsx'

const Classes = memo(function Classes() {
  const containerRef = useRef(null);
  const { openModal, closeModal } = useModal();

  const classes = useMemo(() => [
    {
      code: "CS301",
      name: "Data Structures",
      faculty: "Dr. Sharma",
      schedule: "Mon, Wed, Fri",
      time: "10:00 – 11:00 AM",
      room: "Block A · 204",
      credits: 4,
      accent: "from-indigo-500 to-violet-500",
      attendance: { total: 42, present: 38, absent: 4 },
    },
    {
      code: "CS302",
      name: "Operating Systems",
      faculty: "Prof. Verma",
      schedule: "Tue, Thu",
      time: "11:15 – 12:45 PM",
      room: "Block B · 112",
      credits: 3,
      accent: "from-emerald-500 to-teal-500",
      attendance: { total: 36, present: 30, absent: 6 },
    },
    {
      code: "CS303",
      name: "DBMS",
      faculty: "Dr. Rao",
      schedule: "Mon, Thu",
      time: "09:00 – 10:30 AM",
      room: "Block C · Lab 2",
      credits: 4,
      accent: "from-rose-500 to-pink-500",
      attendance: { total: 40, present: 34, absent: 6 },
    },
    {
      code: "CS304",
      name: "Computer Networks",
      faculty: "Dr. Iyer",
      schedule: "Wed, Fri",
      time: "01:00 – 02:30 PM",
      room: "Block A · 310",
      credits: 3,
      accent: "from-amber-500 to-orange-500",
      attendance: { total: 32, present: 28, absent: 4 },
    },
  ], []);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".class-card",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleOpenAttendance = (c) => {
    openModal({
      title: `${c.name} — Attendance`,
      content: <AttendancePopup data={fakeAttendance} />,
      footer: (
        <button
          onClick={closeModal}
          className="px-4 py-2 text-sm font-semibold rounded-md bg-[var(--text)] text-[var(--card)] hover:opacity-90 "
        >
          Close
        </button>
      ),
    });
  };

  return (
    <div ref={containerRef} className="card p-4 space-y-6">
      <h2 className="font-semibold text-[var(--text)]">Classes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {classes.map((c) => (
          <div
            key={c.code}
            className="class-card group relative overflow-hidden rounded-xl bg-[var(--student-class-card)] border border-[var(--border)] shadow-sm hover:-translate-y-1"
          >
            <div className={`h-1.5 w-full bg-gradient-to-r ${c.accent}`} />
            <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl pointer-events-none" />

            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs tracking-wider text-[var(--muted)]">{c.code}</p>
                  <h3 className="font-semibold text-[var(--text)] leading-tight">{c.name}</h3>
                </div>
                <div className="text-xs font-semibold px-2 py-1 rounded-md bg-[var(--border)] text-[var(--text)]">{c.credits} CR</div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div><p className="text-xs text-[var(--muted)]">Faculty</p><p className="text-[var(--text)] font-medium">{c.faculty}</p></div>
                <div><p className="text-xs text-[var(--muted)]">Schedule</p><p className="text-[var(--text)] font-medium">{c.schedule}</p></div>
                <div><p className="text-xs text-[var(--muted)]">Time</p><p className="text-[var(--text)] font-medium">{c.time}</p></div>
                <div><p className="text-xs text-[var(--muted)]">Room</p><p className="text-[var(--text)] font-medium">{c.room}</p></div>
              </div>

              <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs text-[var(--muted)]">Semester Course</span>
                <AttendanceButton onClick={() => handleOpenAttendance(c)} value={
  c.attendance && c.attendance.total > 0 && c.attendance.present != null
    ? (c.attendance.present / c.attendance.total) * 100
    : 'NA'
}
 />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Classes;

