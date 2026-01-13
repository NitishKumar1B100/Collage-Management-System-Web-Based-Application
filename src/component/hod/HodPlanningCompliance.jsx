import React, { useEffect, useRef, memo, useState, useMemo } from "react";
import gsap from "gsap";

/* ---------------- DATA ---------------- */

const COMPLIANCE_DATA = [
  {
    id: 1,
    title: "Academic Calendar Planning",
    description: "Semester-wise academic calendar approval and circulation",
    status: "Completed",
    owner: "Dean Academics",
  },
  {
    id: 2,
    title: "Course Outcome Mapping",
    description: "CO–PO mapping validation and documentation",
    status: "In Progress",
    owner: "IQAC",
  },
  {
    id: 3,
    title: "Faculty Workload Allocation",
    description: "Teaching load and lab allocation approval",
    status: "Completed",
    owner: "HOD",
  },
  {
    id: 4,
    title: "Syllabus Compliance",
    description: "University syllabus adherence verification",
    status: "Pending",
    owner: "Board of Studies",
  },
  {
    id: 5,
    title: "Internal Audit Preparation",
    description: "NAAC / NBA documentation readiness",
    status: "In Progress",
    owner: "Quality Cell",
  },
];

/* ---------------- HELPERS ---------------- */

const statusStyle = {
  Completed: "bg-green-500/10 text-green-600 border-green-500/30",
  "In Progress": "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
  Pending: "bg-red-500/10 text-red-600 border-red-500/30",
};

/* ---------------- CARD ---------------- */

const ComplianceCard = memo(({ item }) => (
  <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h4 className="font-semibold text-[var(--text)]">{item.title}</h4>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {item.description}
        </p>
      </div>

      <span
        className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium ${statusStyle[item.status]}`}
      >
        {item.status}
      </span>
    </div>

    <div className="mt-4 text-xs text-[var(--muted)]">
      Responsible:{" "}
      <span className="font-medium text-[var(--text)]">
        {item.owner}
      </span>
    </div>
  </div>
));

/* ---------------- COMPONENT ---------------- */

function HodPlanningCompliance() {
  const containerRef = useRef(null);
  const [activeStatus, setActiveStatus] = useState(null);

  const filteredData = useMemo(() => {
    if (!activeStatus) return COMPLIANCE_DATA;
    return COMPLIANCE_DATA.filter(i => i.status === activeStatus);
  }, [activeStatus]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.4 }
    );
  }, [filteredData]);

  return (
    <div className="mx-auto max-w-5xl p-6 text-[var(--text)] max-h-[calc(100vh-60px)] md:max-h-[calc(100vh-25px)] overflow-y-auto">
      {/* HEADER */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-[var(--profile-content-title)]">
          Planning & Compliance
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Department-level academic planning and statutory compliance overview
        </p>
      </div>

      {/* SUMMARY STRIP */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          onClick={() =>
            setActiveStatus(s => (s === "Completed" ? null : "Completed"))
          }
          className="cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition hover:shadow-md"
        >
          <div className="text-sm text-[var(--muted)]">Completed</div>
          <div className="mt-1 text-xl font-semibold text-green-600">
            {COMPLIANCE_DATA.filter(i => i.status === "Completed").length}
          </div>
        </div>

        <div
          onClick={() =>
            setActiveStatus(s => (s === "In Progress" ? null : "In Progress"))
          }
          className="cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition hover:shadow-md"
        >
          <div className="text-sm text-[var(--muted)]">In Progress</div>
          <div className="mt-1 text-xl font-semibold text-yellow-600">
            {COMPLIANCE_DATA.filter(i => i.status === "In Progress").length}
          </div>
        </div>

        <div
          onClick={() =>
            setActiveStatus(s => (s === "Pending" ? null : "Pending"))
          }
          className="cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--card)] p-4 transition hover:shadow-md"
        >
          <div className="text-sm text-[var(--muted)]">Pending</div>
          <div className="mt-1 text-xl font-semibold text-red-600">
            {COMPLIANCE_DATA.filter(i => i.status === "Pending").length}
          </div>
        </div>
      </div>

      {/* LIST */}
      <div
        ref={containerRef}
        className="grid gap-5 sm:grid-cols-1 md:grid-cols-2"
      >
        {filteredData.map(item => (
          <ComplianceCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HodPlanningCompliance;
