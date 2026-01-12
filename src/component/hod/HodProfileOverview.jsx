import { memo, useState, useEffect, useRef } from "react";
import gsap from "gsap";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaExclamationTriangle,
  FaChevronRight,
  FaChevronDown,
} from "react-icons/fa";

/* ================= STAT CARD ================= */

const StatCard = memo(function StatCard({
  icon: Icon,
  label,
  value,
  tone,
  onClick,
  clickable,
}) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`card flex items-center gap-4 transition ${
        clickable ? "cursor-pointer hover:scale-[1.02]" : ""
      }`}
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

      <div className="flex-1">
        <p className="text-sm text-[var(--muted)]">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>

      {clickable && <FaChevronRight className="opacity-50" />}
    </div>
  );
});

/* ================= SECTION CARD ================= */

const SectionCard = ({ title, tone, children }) => {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div ref={ref} className="card space-y-4">
      <h3
        className="text-lg font-semibold"
        style={{ color: `var(--${tone}-text)` }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
};

/* ================= EXPANDABLE ITEM ================= */

const ExpandableItem = ({ title, meta, status, details }) => {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;

    if (open) {
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [open]);

  return (
    <div className="rounded-lg border border-[var(--border)] overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-[var(--overlay-bg)]"
      >
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-[var(--muted)]">{meta}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded bg-[var(--overlay-bg)]">
            {status}
          </span>
          {open ? <FaChevronDown /> : <FaChevronRight />}
        </div>
      </button>

      <div
        ref={bodyRef}
        style={{ height: 0, overflow: "hidden" }}
        className="px-4 text-sm bg-[var(--overlay-bg)]"
      >
        <div className="py-3 space-y-2">
          {details.map((d, i) => (
            <p key={i}>• {d}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */

const HodProfileOverview = memo(function HodProfileOverview() {
  const [view, setView] = useState(null); // "courses" | "issues"

  return (
    <section className="mt-6 space-y-6">
      {/* ===== SNAPSHOT ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FaUsers}
          label="Total Students"
          value="842"
          tone="stat-students"
        />
        <StatCard
          icon={FaChalkboardTeacher}
          label="Faculty Members"
          value="38"
          tone="stat-faculty"
        />
        <StatCard
          icon={FaBook}
          label="Active Courses"
          value="26"
          tone="stat-books"
          clickable
          onClick={() => setView(view === "courses" ? null : "courses")}
        />
        <StatCard
          icon={FaExclamationTriangle}
          label="Pending Issues"
          value="3"
          tone="stat-active"
          clickable
          onClick={() => setView(view === "issues" ? null : "issues")}
        />
      </div>

      {/* ===== COURSES ===== */}
      {view === "courses" && (
        <SectionCard title="Active Curriculum & Courses" tone="stat-books">
          <ExpandableItem
            title="Data Structures & Algorithms"
            meta="Semester 3 · Core"
            status="Running"
            details={[
              "Last updated: 2 months ago",
              "Course owner: Dr. Sharma",
              "Student feedback score: 4.2/5",
            ]}
          />
          <ExpandableItem
            title="Machine Learning"
            meta="Semester 7 · Elective"
            status="Review Pending"
            details={[
              "Curriculum revision requested",
              "Industry alignment check pending",
              "Awaiting board approval",
            ]}
          />
        </SectionCard>
      )}

      {/* ===== ISSUES ===== */}
      {view === "issues" && (
        <SectionCard title="Pending Issues & Risks" tone="stat-active">
          <ExpandableItem
            title="Accreditation Document Approval"
            meta="NAAC · Deadline in 12 days"
            status="High"
            details={[
              "Missing publication index",
              "Clarification requested",
              "Review meeting scheduled",
            ]}
          />
          <ExpandableItem
            title="Lab Safety Audit"
            meta="Block C · Hardware Lab"
            status="Medium"
            details={[
              "Fire extinguisher replacement",
              "Electrical wiring inspection",
              "Audit date confirmed",
            ]}
          />
        </SectionCard>
      )}

      {/* ===== STATIC OVERVIEW ===== */}
      <SectionCard title="Academic & Research Status" tone="stat-faculty">
        <p>• Faculty research proposals under review: 4</p>
        <p>• Student performance trend: Stable</p>
        <p>• Inter-department collaboration: Active</p>
      </SectionCard>

      <SectionCard title="Compliance & Risk Overview" tone="stat-active">
        <p>• Budget utilization: 72%</p>
        <p>• Safety compliance: No critical violations</p>
        <p>• Policy adherence: Within limits</p>
      </SectionCard>
    </section>
  );
});

export default HodProfileOverview;
