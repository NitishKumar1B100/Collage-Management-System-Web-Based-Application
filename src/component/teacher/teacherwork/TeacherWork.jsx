import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

/* ================= CONSTANTS ================= */

const WORK_TYPES = ["Assignment", "Practical", "Homework"];
const BATCHES = ["B.Tech sem:1", "B.Tech sem:4", "Diploma sem:3"];
const STATUS_FILTERS = ["pending", "completed"];

const STUDENTS_INIT = {
  "B.Tech sem:1": [
    { id: "S1", name: "Arjun", roll: "21CS01", status: "completed" },
    { id: "S2", name: "Ravi", roll: "21CS02", status: "pending" },
  ],
  "B.Tech sem:4": [
    { id: "S3", name: "Neha", roll: "20CS11", status: "completed" },
  ],
  "Diploma sem:3": [
    { id: "S4", name: "Aman", roll: "23DP07", status: "pending" },
  ],
};

/* ================= PRIMITIVES ================= */

const Field = memo(({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-[var(--muted)]">{label}</label>
    {children}
  </div>
));

const Input = memo(props => (
  <input
    {...props}
    className="w-full rounded-md bg-transparent border border-[var(--border)]
               px-3 py-2 text-sm text-[var(--text)] outline-none"
  />
));

const Select = memo(({ options, ...props }) => (
  <>

  <select
    {...props}
    className="w-full rounded-md bg-[var(--select-option)] border border-[var(--border)]
               px-3 py-2 text-sm text-[var(--text)] outline-none"
  >
    <option value="" className="bg-[var(--select-options)] outline-none">Select</option>
    {options.map(o => (
      <option key={o} value={o} className="bg-[var(--select-options)] outline-none">{o}</option>
    ))}
  </select>
  </>
));

/* ================= WORK CARD ================= */

const WorkCard = memo(({ work, onOpen }) => {
  const isOverdue =
    work.due && new Date(work.due) < new Date() && !work.allCompleted;

  return (
    <button
      onClick={() => onOpen(work)}
      className="w-full text-left rounded-xl border border-[var(--border)]
                 p-4 transition hover:bg-white/5
                 flex justify-between items-start gap-4"
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-[var(--text)]">
          {work.title}
        </h3>
        <p className="text-xs text-[var(--muted)]">
          {work.type} · {work.batch}
        </p>
        <p className="text-[11px] text-[var(--muted)]">
          Due: {work.due || "—"}
        </p>
      </div>

      <span
        className={`text-[10px] px-2 py-1 rounded-full border uppercase shrink-0
          ${
            work.allCompleted
              ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
              : isOverdue
              ? "border-rose-500/40 text-rose-400 bg-rose-500/10"
              : "border-amber-500/40 text-amber-400 bg-amber-500/10"
          }`}
      >
        {work.allCompleted ? "Completed" : isOverdue ? "Overdue" : "Pending"}
      </span>
    </button>
  );
});

/* ================= MODAL ================= */

const WorkModal = memo(({ work, students, onToggle, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" }
    );
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-[var(--card)]
                   rounded-2xl p-6 z-10"
      >
        <header className="mb-4 flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold text-[var(--text)]">
              {work.title}
            </h2>
            <p className="text-xs text-[var(--muted)]">
              {work.type} · {work.batch}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center
                       border border-[var(--border)] text-xs text-[var(--muted)]
                       hover:bg-white/10"
          >
            ✕
          </button>
        </header>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
          {students.map(s => (
            <div
              key={s.id}
              className={`flex justify-between items-center rounded-md
                px-3 py-2 border transition
                ${
                  s.status === "completed"
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : "bg-rose-500/10 border-rose-500/30"
                }`}
            >
              <div>
                <p className="text-sm text-[var(--text)]">{s.name}</p>
                <p className="text-[10px] text-[var(--muted)]">
                  Roll: {s.roll}
                </p>
              </div>

              <button
                onClick={() => onToggle(s.id)}
                className="text-[10px] px-2 py-1 rounded-full border uppercase
                           border-[var(--border)] hover:bg-white/10"
              >
                {s.status}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ================= MAIN ================= */

const TeacherWork = memo(function TeacherWork() {
  const [form, setForm] = useState({
    title: "",
    type: "",
    batch: "",
    due: "",
  });

  const [works, setWorks] = useState([]);
  const [activeWork, setActiveWork] = useState(null);
  const [studentsMap, setStudentsMap] = useState(STUDENTS_INIT);

  const [filterType, setFilterType] = useState("");
  const [filterBatch, setFilterBatch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const update = useCallback(
    key => e => setForm(f => ({ ...f, [key]: e.target.value })),
    []
  );

  const submit = useCallback(() => {
    if (!form.title || !form.type || !form.batch) return;

    const students = studentsMap[form.batch] || [];
    const allCompleted = students.every(s => s.status === "completed");

    setWorks(w => [
      { id: crypto.randomUUID(), ...form, allCompleted },
      ...w,
    ]);

    setForm({ title: "", type: "", batch: "", due: "" });
  }, [form, studentsMap]);

  const toggleStudent = useCallback(
    id => {
      setStudentsMap(map => {
        const updated = map[activeWork.batch].map(s =>
          s.id === id
            ? { ...s, status: s.status === "completed" ? "pending" : "completed" }
            : s
        );

        setWorks(ws =>
          ws.map(w =>
            w.id === activeWork.id
              ? { ...w, allCompleted: updated.every(s => s.status === "completed") }
              : w
          )
        );

        return { ...map, [activeWork.batch]: updated };
      });
    },
    [activeWork]
  );

  const activeStudents = useMemo(
    () => (activeWork ? studentsMap[activeWork.batch] : []),
    [activeWork, studentsMap]
  );

  const filteredWorks = useMemo(() => {
    return works.filter(w => {
      if (filterType && w.type !== filterType) return false;
      if (filterBatch && w.batch !== filterBatch) return false;
      if (filterStatus) {
        if (filterStatus === "completed" && !w.allCompleted) return false;
        if (filterStatus === "pending" && w.allCompleted) return false;
      }
      return true;
    });
  }, [works, filterType, filterBatch, filterStatus]);

  return (
    <div className="w-full h-[calc(100vh-30px)] overflow-y-auto px-4 py-6 space-y-10">

      {/* CREATE */}
      <section className="max-w-[1150px] mx-auto bg-[var(--card)] rounded-2xl p-6">
        <h1 className="text-xl font-semibold text-[var(--text)] mb-4">
          Create Academic Work
        </h1>

        <div className="space-y-4">
          <Field label="Title">
            <Input value={form.title} onChange={update("title")} />
          </Field>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Type">
              <Select options={WORK_TYPES} value={form.type} onChange={update("type")} />
            </Field>
            <Field label="Batch">
              <Select options={BATCHES} value={form.batch} onChange={update("batch")} />
            </Field>
          </div>

          <Field label="Due Date">
            <Input type="date" value={form.due} onChange={update("due")} />
          </Field>

          <button
            onClick={submit}
            className="px-6 py-2 rounded-md
                       bg-emerald-500/20 border border-emerald-500/40
                       text-sm text-emerald-400"
          >
            Publish Work
          </button>
        </div>
      </section>

      {/* LIST + FILTER */}
      <section className="max-w-[1150px] mx-auto bg-[var(--card)] rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[var(--text)]">
          Assigned To Classes
        </h2>

        <div className="grid md:grid-cols-3 gap-3">
          <Select
            options={WORK_TYPES}
            value={filterType}
            onChange={e => {
              setFilterType(e.target.value);
              setFilterBatch("");
              setFilterStatus("");
            }}
          />

          {filterType && (
            <Select
              options={BATCHES}
              value={filterBatch}
              onChange={e => {
                setFilterBatch(e.target.value);
                setFilterStatus("");
              }}
            />
          )}

          {filterType && filterBatch && (
            <Select
              options={STATUS_FILTERS}
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
            />
          )}
        </div>

        <div className="grid gap-3 max-h-[55vh] overflow-y-auto pr-1">
          {filteredWorks.length === 0 && (
            <p className="text-xs text-[var(--muted)]">No matching records</p>
          )}
          {filteredWorks.map(w => (
            <WorkCard key={w.id} work={w} onOpen={setActiveWork} />
          ))}
        </div>
      </section>

      {activeWork && (
        <WorkModal
          work={activeWork}
          students={activeStudents}
          onToggle={toggleStudent}
          onClose={() => setActiveWork(null)}
        />
      )}
    </div>
  );
});

export default TeacherWork;
