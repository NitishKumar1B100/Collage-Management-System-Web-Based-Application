import { memo, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const SYSTEM_ACTIONS = [
  { 
    label: "View Audit Logs", 
    description: "Check recent system activities", 
    color: "bg-blue-500",
    result: [
      { time: "2026-01-12 09:00", user: "STU102", action: "Logged In" },
      { time: "2026-01-12 08:50", user: "FAC102", action: "Updated Grades" },
      { time: "2026-01-12 08:45", user: "LIB001", action: "Issued Book" },
    ]
  },
  { 
    label: "Manage Roles", 
    description: "Assign roles or permissions", 
    color: "bg-purple-500",
    result: [
      { role: "Student", count: 1200 },
      { role: "Faculty", count: 150 },
      { role: "Library", count: 5 },
    ]
  },
  { 
    label: "System Config", 
    description: "Update system-wide settings", 
    color: "bg-green-500",
    result: [
      { key: "Site Mode", value: "Production" },
      { key: "Max Login Attempts", value: 5 },
      { key: "Maintenance Mode", value: "Off" },
    ]
  },
  { 
    label: "Database Backup", 
    description: "Trigger full backup manually", 
    color: "bg-amber-500",
    result: [
      { time: "2026-01-11 22:00", status: "Success" },
      { time: "2026-01-10 22:00", status: "Success" },
    ]
  },
  { 
    label: "View Notifications", 
    description: "See system alerts & warnings", 
    color: "bg-pink-500",
    result: [
      { type: "Warning", message: "Server load high" },
      { type: "Info", message: "New user registered" },
    ]
  },
  { 
    label: "Integrations", 
    description: "Manage third-party integrations", 
    color: "bg-cyan-500",
    result: [
      { integration: "Google Classroom", status: "Active" },
      { integration: "Zoom API", status: "Inactive" },
    ]
  },
];

const AdminSystem = memo(function AdminSystem() {
  const rootRef = useRef(null);
  const [selectedAction, setSelectedAction] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: "power2.out" }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="space-y-6 max-h-[calc(100vh-74px)] overflow-y-auto">
      {/* HEADER */}
      <header className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
        <h2 className="text-lg font-semibold">System Dashboard</h2>
        <p className="text-sm text-[var(--muted)]">
          Quick access to core system actions. Click to view details below.
        </p>
      </header>

      {/* ACTION CARDS */}
      <div ref={rootRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {SYSTEM_ACTIONS.map(action => (
          <div
            key={action.label}
            onClick={() => setSelectedAction(action)}
            className={`cursor-pointer rounded-xl shadow hover:shadow-lg ${action.color} text-white p-4`}
          >
            <h3 className="font-semibold text-md">{action.label}</h3>
            <p className="text-xs mt-1 opacity-80">{action.description}</p>
          </div>
        ))}
      </div>

      {/* RESULT PANEL */}
      {selectedAction && (
        <ResultPanel action={selectedAction} />
      )}
    </section>
  );
});

const ResultPanel = memo(function ResultPanel({ action }) {
  const panelRef = useRef(null);

  useLayoutEffect(() => {
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [action]);

  return (
    <section 
      ref={panelRef} 
      className=" 
      bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-4"
    >
      <h3 className="text-md font-semibold mb-2 text-[var(--primary)]">{action.label} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {action.result.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-[var(--input-bg)] p-3 rounded-lg shadow-inner hover:shadow-md flex flex-col gap-1"
          >
            {Object.entries(item).map(([k, v], i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="font-medium text-[var(--muted)]">{k.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-[var(--text)] font-semibold">{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
});

export default AdminSystem;

