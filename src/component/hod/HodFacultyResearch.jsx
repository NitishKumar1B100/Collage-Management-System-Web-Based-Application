import { memo, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FaChalkboardTeacher,
  FaFlask,
  FaBookOpen,
  FaExclamationTriangle,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

/* ================= MOCK DATA ================= */

const FACULTY = [
  {
    id: "F001",
    name: "Dr. A. Sharma",
    role: "Professor",
    specialization: "Algorithms",
    experience: "18 yrs",
    publications: 24,
    projects: 3,
  },
  {
    id: "F002",
    name: "Dr. R. Sen",
    role: "Associate Professor",
    specialization: "AI & ML",
    experience: "12 yrs",
    publications: 19,
    projects: 2,
  },
  {
    id: "F003",
    name: "Ms. P. Iyer",
    role: "Assistant Professor",
    specialization: "Networks",
    experience: "7 yrs",
    publications: 11,
    projects: 1,
  },
];

const PUBLICATIONS = [
  { id: 1, title: "Advanced Algorithms", type: "Journal", status: "Published" },
  { id: 2, title: "Deep Learning in Healthcare", type: "Conference", status: "Published" },
  { id: 3, title: "AI Ethics", type: "Journal", status: "Revision" },
  { id: 4, title: "5G Security", type: "Conference", status: "Published" },
];

const RESEARCH_PROJECTS = [
  { id: 1, title: "AI Healthcare", status: "Ongoing", lead: "Dr. R. Sen" },
  { id: 2, title: "Smart Grid Security", status: "Review", lead: "Dr. A. Sharma" },
  { id: 3, title: "Network Optimization", status: "Completed", lead: "Ms. P. Iyer" },
];

const ISSUES = [
  { id: 1, title: "Grant Utilization Delay", severity: "High", due: "10 Jan 2026" },
  { id: 2, title: "Journal Revision Pending", severity: "Medium", due: "5 Jan 2026" },
  { id: 3, title: "Project Report Late", severity: "Low", due: "12 Jan 2026" },
];

/* ================= METRIC CARD ================= */

const MetricCard = memo(({ icon: Icon, label, value, tone, active, onClick, index }) => {
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
        style={{ background: `var(--${tone}-bg)`, color: `var(--${tone}-text)` }}
      >
        <Icon size={22} />
      </div>
      <div className="flex-1">
        <p className="text-sm text-[var(--muted)]">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
      <FaChevronRight className="opacity-50" />
    </button>
  );
});

/* ================= EXPANDABLE ROW ================= */

const ExpandableRow = ({ title, meta, details, index }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const rowRef = useRef(null)

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      height: open ? "auto" : 0,
      opacity: open ? 1 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
    
        gsap.fromTo(
      rowRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, delay: index * 0.1, ease: "power2.out" }
    );
  }, [open]);

  return (
    <div
    ref={rowRef}
    className="border border-[var(--border)] rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full p-3 flex justify-between hover:bg-[var(--overlay-bg)]"
      >
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-[var(--muted)]">{meta}</p>
        </div>
        {open ? <FaChevronDown /> : <FaChevronRight />}
      </button>

      <div ref={ref} className="h-0 overflow-hidden bg-[var(--overlay-bg)]">
        <div className="p-4 text-sm space-y-1">
          {details.map((d, i) => (
            <p key={i}>• {d}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ================= RESULT VIEWS ================= */

const FacultyList = () => {

    
    return(
       <div className="card space-y-3">
    <h3 className="text-lg font-semibold">Faculty Members</h3>
    <div className="max-h-[420px] lg:max-h-[450px] space-y-3 overflow-y-auto">
    {FACULTY.map((f, i) => (
      <ExpandableRow
        key={f.id}
        index={i}
        title={f.name}
        meta={`${f.role} · ${f.specialization}`}
        details={[
          `Experience: ${f.experience}`,
          `Publications: ${f.publications}`,
          `Research Projects: ${f.projects}`,
        ]}
      />
    ))}
  </div>
  </div>
    )
}
 


const PublicationsView = () => (
  <div className="card space-y-3">
    <h3 className="text-lg font-semibold">Publications</h3>
    <div className="max-h-[420px] lg:max-h-[450px] space-y-3 overflow-y-auto">
    {PUBLICATIONS.map((p, i) => (
      <ExpandableRow
        key={p.id}
        index={i}
        title={p.title}
        meta={p.type}
        details={[`Status: ${p.status}`]}
      />
    ))}</div>
  </div>
);

const ResearchView = () => (
  <div className="card space-y-3">
    <h3 className="text-lg font-semibold">Research Projects</h3>
    <div className="max-h-[420px] lg:max-h-[450px] space-y-3 overflow-y-auto">

    {RESEARCH_PROJECTS.map((p, i) => (
      <ExpandableRow
        key={p.id}
        index={i}
        title={p.title}
        meta={`Lead: ${p.lead}`}
        details={[`Status: ${p.status}`]}
      />
    ))}
    </div>
  </div>
);

const IssuesView = () => (
  <div className="card space-y-3">
    <h3 className="text-lg font-semibold">Pending Issues</h3>
    <div className="max-h-[420px] lg:max-h-[450px] space-y-3 overflow-y-auto">

    {ISSUES.map((i, idx) => (
      <ExpandableRow
        key={i.id}
        index={idx}
        title={i.title}
        meta={`Severity: ${i.severity} · Due: ${i.due}`}
        details={[`Action required: Review & Resolve`]}
      />
    ))}
    </div>
  </div>
);

/* ================= MAIN COMPONENT ================= */

const HodFacultyResearch = memo(() => {
  const [active, setActive] = useState("faculty");
  const containerRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (!resultsRef.current) return;
    gsap.fromTo(
      resultsRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [active]);

  return (
    <section ref={containerRef}  className="space-y-6 pb-10 md:pb-0 max-h-[calc(100vh-40px)] overflow-y-auto p-2">
      <header>
        <h2 className="text-xl font-semibold">Faculty & Research</h2>
        <p className="text-sm text-[var(--muted)]">
          Faculty strength, research output, and pending academic issues
        </p>
      </header>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <MetricCard
          icon={FaChalkboardTeacher}
          label="Faculty"
          value={FACULTY.length}
          tone="stat-faculty"
          active={active === "faculty"}
          onClick={() => setActive(active === "faculty" ? null : "faculty")}
          index={0}
        />
        <MetricCard
          icon={FaBookOpen}
          label="Publications"
          value={PUBLICATIONS.length}
          tone="stat-books"
          active={active === "pub"}
          onClick={() => setActive(active === "pub" ? null : "pub")}
          index={1}
        />
        <MetricCard
          icon={FaFlask}
          label="Research Projects"
          value={RESEARCH_PROJECTS.length}
          tone="stat-students"
          active={active === "res"}
          onClick={() => setActive(active === "res" ? null : "res")}
          index={2}
        />
        <MetricCard
          icon={FaExclamationTriangle}
          label="Pending Issues"
          value={ISSUES.length}
          tone="stat-active"
          active={active === "issue"}
          onClick={() => setActive(active === "issue" ? null : "issue")}
          index={3}
        />
      </div>

      {/* RESULT SECTION */}
      <div ref={resultsRef} className="h-full">
        {active === "faculty" && <FacultyList />}
        {active === "pub" && <PublicationsView />}
        {active === "res" && <ResearchView />}
        {active === "issue" && <IssuesView />}
      </div>
    </section>
  );
});

export default HodFacultyResearch;
