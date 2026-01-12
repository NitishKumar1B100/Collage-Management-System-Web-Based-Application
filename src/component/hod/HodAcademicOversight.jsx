import { memo, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import {
  FaUserGraduate,
  FaChartLine,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

/* ================= DATA ================= */
const STUDENTS = [
  { id: 1, name: "Amit Verma", year: "2nd Year", cgpa: 5.4 },
  { id: 2, name: "Sneha Patel", year: "3rd Year", cgpa: 6.1 },
  { id: 3, name: "Rahul Singh", year: "1st Year", cgpa: 6.8 },
  { id: 4, name: "Neha Sharma", year: "4th Year", cgpa: 8.4 },
  { id: 5, name: "Karan Mehta", year: "4th Year", cgpa: 7.9 },
];

/* ================= UTILS ================= */
const riskLevel = cgpa =>
  cgpa < 6 ? "High" : cgpa < 7 ? "Medium" : "Low";

/* ================= METRIC CARD ================= */
const MetricCard = memo(function MetricCard({
  icon: Icon,
  label,
  value,
  tone,
  active,
  onClick,
  index,
}) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, delay: index * 0.1, ease: "power2.out" }
    );
  }, [index]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`card flex items-center gap-4 text-left transition
        ${active ? "ring-2 ring-[var(--primary)]" : ""}
        hover:scale-[1.02]`}
    >
      <div
        className="p-3 rounded-xl"
        style={{
          background: `var(--${tone}-bg)`,
          color: `var(--${tone}-text)`,
        }}
      >
        <Icon size={22} />
      </div>

      <div>
        <p className="text-sm text-[var(--muted)]">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </button>
  );
});

/* ================= STUDENT ROW ================= */
const StudentRow = memo(({ student, index }) => {
  const rowRef = useRef(null);
  const risk = riskLevel(student.cgpa);

  useEffect(() => {
    gsap.fromTo(
      rowRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, delay: index * 0.1, ease: "power2.out" }
    );
  }, [index]);

  return (
    <div
      ref={rowRef}
      className="flex justify-between items-center p-3 rounded-lg border border-[var(--border)]"
    >
      <div>
        <p className="font-medium">{student.name}</p>
        <p className="text-xs text-[var(--muted)]">{student.year}</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">CGPA: {student.cgpa}</span>

        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            background:
              risk === "High"
                ? "var(--danger-bg)"
                : risk === "Medium"
                ? "var(--warn-bg)"
                : "var(--success-bg)",
            color:
              risk === "High"
                ? "var(--danger-text)"
                : risk === "Medium"
                ? "var(--warn-text)"
                : "var(--success-text)",
          }}
        >
          {risk}
        </span>
      </div>
    </div>
  );
});

/* ================= MAIN COMPONENT ================= */
const HodAcademicOversight = memo(function HodAcademicOversight() {
  const [active, setActive] = useState('all');
  const containerRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4 }
    );
  }, []);

  /* ===== METRICS ===== */
  const totalStudents = STUDENTS.length;
  const avgCgpa = useMemo(
    () => (STUDENTS.reduce((sum, s) => sum + s.cgpa, 0) / totalStudents).toFixed(2),
    [totalStudents]
  );
  const atRisk = STUDENTS.filter(s => s.cgpa < 6);
  const graduating = STUDENTS.filter(s => s.cgpa >= 6.5);

  /* ===== ANIMATE RESULTS ON CHANGE ===== */
  useEffect(() => {
    if (resultsRef.current) {
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [active]);

  /* ===== SELECT DATA BASED ON ACTIVE METRIC ===== */
  const displayStudents =
    active === "all"
      ? STUDENTS
      : active === "risk"
      ? atRisk
      : active === "grad"
      ? graduating
      : STUDENTS;

  return (
    <section ref={containerRef} className="space-y-6">
      {/* HEADER */}
      <header>
        <h2 className="text-xl font-semibold">Academic Oversight</h2>
        <p className="text-sm text-[var(--muted)]">
          Student performance and academic health
        </p>
      </header>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          icon={FaUserGraduate}
          label="Total Students"
          value={totalStudents}
          tone="stat-students"
          active={active === "all"}
          onClick={() => setActive(active === "all" ? null : "all")}
          index={0}
        />
        <MetricCard
          icon={FaChartLine}
          label="Average CGPA"
          value={avgCgpa}
          tone="stat-books"
          active={active === "cgpa"}
          onClick={() => setActive(active === "cgpa" ? null : "cgpa")}
          index={1}
        />
        <MetricCard
          icon={FaExclamationTriangle}
          label="At-Risk Students"
          value={atRisk.length}
          tone="stat-danger"
          active={active === "risk"}
          onClick={() => setActive(active === "risk" ? null : "risk")}
          index={2}
        />
        <MetricCard
          icon={FaCheckCircle}
          label="Graduation Eligible"
          value={`${Math.round((graduating.length / totalStudents) * 100)}%`}
          tone="stat-success"
          active={active === "grad"}
          onClick={() => setActive(active === "grad" ? null : "grad")}
          index={3}
        />
      </div>

      {/* RESULTS */}
      {active && (
        <div ref={resultsRef} className="card space-y-3">
          <h3 className="text-lg font-semibold">
            {active === "all" && "All Students"}
            {active === "cgpa" && "CGPA Overview"}
            {active === "risk" && "At-Risk Students"}
            {active === "grad" && "Graduation Eligible"}
          </h3>

          {displayStudents.map((s, i) => (
            <StudentRow key={s.id} student={s} index={i} />
          ))}
        </div>
      )}
    </section>
  );
});

export default HodAcademicOversight;
