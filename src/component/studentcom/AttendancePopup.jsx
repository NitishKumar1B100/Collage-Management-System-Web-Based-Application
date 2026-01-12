import { useEffect, useRef, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import gsap from "gsap";

/* ---------- CONSTANTS ---------- */
const COLORS = {
  present: "#22c55e",
  absent: "#ef4444",
};

const SIZE = 300;

/* ---------- STAT BOX ---------- */
function StatBox({ title, value, sub, accent, onClick, classvalue }) {
  return (
    <button
      onClick={onClick}
      className={`${classvalue ?? ""} w-full h-15 md:h-20 bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between text-left hover:opacity-90 transition`}
    >
      <div>
        <div className="text-xs text-[var(--profile-content-title)]">{title}</div>
        <div className="text-[14px] md:text-xl font-semibold text-[var(--text)] ">{value}</div>
        {sub && <div className="text-xs text-[var(--muted)]">{sub}</div>}
      </div>
      {accent && <div className="h-10 w-1 rounded-full" style={{ background: accent }} />}
    </button>
  );
}


/* ---------- MAIN COMPONENT ---------- */
export default function AttendancePopup({ data }) {
  const rootRef = useRef(null);
  const animRef = useRef(null);

  const [view, setView] = useState("summary");
  const [filter, setFilter] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const total = data?.total ?? 0;
  const present = data?.present ?? 0;
  const absent = Math.max(total - present, 0);
  const days = Array.isArray(data?.days) ? data.days : [];

  const presentPct = total ? ((present / total) * 100).toFixed(2) : "0.00";
  const absentPct = total ? ((absent / total) * 100).toFixed(2) : "0.00";

  const safePresent = present || 0.0001;
  const safeAbsent = absent || 0.0001;

  const normalizeStatus = (status) => String(status).toLowerCase().trim();

  const filteredDays =
    filter === null
      ? []
      : days.filter((d) => normalizeStatus(d.status) === filter);

  /* ---------- RIGHT PANEL ANIMATION ---------- */
  useEffect(() => {
    const node = rootRef.current?.querySelector(".right-view");
    if (!node) return;
    gsap.killTweensOf(node);
    gsap.fromTo(
      node,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [view, filter, selectedDay]);

  return (
    <div
      ref={rootRef}
      className="grid gap-6 md:grid-cols-[320px_1fr] w-full  p-1 md:p-6"
    >
      {/* ---------- LEFT : CHART (ALWAYS VISIBLE) ---------- */}
      <div className="flex justify-center ">
        <div className="relative outline-none" style={{ width: SIZE, height: SIZE }} tabIndex={-1}>
          <ResponsiveContainer width="100%" height="100%" className="pointer-events-none">
            <PieChart>
              <Pie
                data={[{ value: safePresent }, { value: safeAbsent }]}
                dataKey="value"
                innerRadius="70%"
                outerRadius="92%"
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                <Cell fill={COLORS.present} />
                <Cell fill={COLORS.absent} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-[var(--muted)]">Attendance</span>
            <span className="text-3xl font-semibold text-[var(--text)]">{presentPct}%</span>
          </div>
        </div>
      </div>

      {/* ---------- RIGHT : DYNAMIC CONTENT ---------- */}
      <div className="right-view space-y-2 md:space-y-3 max-h-[200px] md:max-h-[300px] overflow-y-auto slidebar">
        {view === "summary" && (
          <>
            <StatBox title="Total Classes" value={total} />
            <StatBox
              title="Present"
              value={present}
              sub={`${presentPct}%`}
              accent={COLORS.present}
              classvalue="cursor-pointer"
              onClick={() => {
                setSelectedDay(null);
                setFilter("present");
                setView("list");
              }}
            />
            <StatBox
              title="Absent"
              value={absent}
              sub={`${absentPct}%`}
              accent={COLORS.absent}
              classvalue="cursor-pointer"
              onClick={() => {
                setSelectedDay(null);
                setFilter("absent");
                setView("list");
              }}
            />
          </>
        )}

        {view === "list" && (
          <>
            <button
              onClick={() => {
                setSelectedDay(null);
                setFilter(null);
                setView("summary");
              }}
              className="text-sm text-[var(--primary)]"
            >
              ← Back
            </button>

            {filteredDays.length === 0 && (
              <div className="text-sm text-[var(--muted)]">No records available.</div>
            )}

            {filteredDays.map((day, i) => (
              <button
                key={`${day.date}-${i}`}
                onClick={() => {
                  setSelectedDay(day);
                  setView("detail");
                }}
                className="w-full border rounded-lg p-3 text-left hover:opacity-90 transition bg-[var(--card)] border-[var(--border)]"
              >
                <div className="text-sm text-[var(--text)]">{day.date}</div>
                <div className="text-xs text-[var(--muted)]">{day.subject}</div>
              </button>
            ))}
          </>
        )}

      {view === "detail" && selectedDay && (
  <>
    <button
      onClick={() => setView("list")}
      className="text-sm text-[var(--primary)]"
    >
      ← Back
    </button>

    <div className="border rounded-xl p-4 bg-[var(--card)] border-[var(--border)] space-y-2">
      <div className="text-lg font-semibold text-[var(--text)]">{selectedDay.subject}</div>
      <div className="text-sm text-[var(--muted)]">Date: {selectedDay.date}</div>
      <div className="text-sm text-[var(--muted)]">Teacher: {selectedDay.teacher}</div>
      <div className="text-sm text-[var(--muted)]">Time: {selectedDay.time}</div>
      <div className="text-sm text-[var(--muted)]">Duration: {selectedDay.duration}</div>
      <div
        className="mt-2 text-sm font-medium"
        style={{
          color: normalizeStatus(selectedDay.status) === "present" ? COLORS.present : COLORS.absent,
        }}
      >
        Status: {normalizeStatus(selectedDay.status).toUpperCase()}
      </div>
      {selectedDay.remarks && (
        <div className="text-sm text-[var(--muted)]">Remarks: {selectedDay.remarks}</div>
      )}
    </div>
  </>
)}

      </div>
    </div>
  );
}


