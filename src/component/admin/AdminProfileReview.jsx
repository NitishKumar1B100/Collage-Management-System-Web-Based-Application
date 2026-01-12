import { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import AdminSystem from "./AdminSystem";

/*
  PURPOSE
  -------
  Adds a system overview block at the top showing counts like total students, teachers, issued books, etc.
  Keeps AdminProfileReview clean and readable.
*/

const STATS = [
  ["Total Students", 4200, "var(--stat-students-text)", "var(--stat-students-bg)"],
  ["Active Students", 3980, "var(--stat-active-text)", "var(--stat-active-bg)"],
  ["Total Faculty", 210, "var(--stat-faculty-text)", "var(--stat-faculty-bg)"],
  ["Issued Books", 3500, "var(--stat-books-text)", "var(--stat-books-bg)"],
];


const SYSTEM_CONTROL = [
  ["User Management", "Full Access"],
  ["Role Assignment", "Allowed"],
  ["System Configuration", "Allowed"],
  ["Critical Overrides", "Restricted Log-Based", "text-rose-400"],
];

const AUDIT_SECURITY = [
  ["Audit Logs", "Enabled"],
  ["Login Monitoring", "Active"],
  ["Privilege Escalation", "Approval Required", "text-amber-400"],
  ["Account Integrity", "Verified", "text-emerald-400"],
];

const AdminProfileReview = memo(function AdminProfileReview() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-6"
    >
      {/* HEADER */}
      <header>
        <h2 className="text-lg font-semibold">
          Administrative 
          {/* Authority */}
        </h2>
        <p className="text-sm text-[var(--muted)]">
          System-level visibility and responsibility scope
        </p>
      </header>

      {/* SYSTEM OVERVIEW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {STATS.map(([label, value, text, bg]) => (
          <div
            key={label}
            style={{backgroundColor:bg}}
            className={` border border-[var(--border)] rounded-lg p-3 flex flex-col items-center justify-center`}
          >
            <span className=" text-xs " 
            style={{color:text}}>{label}</span>
            <span className={`font-semibold text-lg ${text || ""}`}>
              {value}
            </span>
          </div>
        ))} 
     
      </div>

      {/* CONTENT GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <Block title="System Control" items={SYSTEM_CONTROL} />
        <Block title="Audit & Security" items={AUDIT_SECURITY} />
      </div>

      {/* FOOTNOTE */}
      <footer className="pt-4 border-t border-[var(--border)] text-xs text-[var(--muted)]">
        Highest permission tier. All actions are logged and policy-governed.
      </footer>
    </section>
  );
});

const Block = memo(function Block({ title, items }) {
  return (
    <div className="rounded-xl border border-[var(--border)] p-4">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map(([label, value, color]) => (
          <li key={label} className="flex justify-between">
            <span className="text-[var(--muted)]">{label}</span>
            <span className={`font-medium ${color || ""}`}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default AdminProfileReview;
