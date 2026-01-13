import { memo, useState, useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";

const STUDENTS = [
  { id: "STU1001", name: "Ravi Kumar", department: "CSE", year: "3rd", semester: "6th", email: "ravi.kumar@college.edu" },
  { id: "STU1002", name: "Anjali Sharma", department: "ECE", year: "2nd", semester: "4th", email: "anjali.sharma@college.edu" },
  { id: "STU1003", name: "Siddharth Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
   { id: "STU1004", name: "Rahul Kumar", department: "CSE", year: "3rd", semester: "6th", email: "ravi.kumar@college.edu" },
  { id: "STU1005", name: "Sonu Sharma", department: "ECE", year: "2nd", semester: "4th", email: "anjali.sharma@college.edu" },
  { id: "STU1006", name: "Suman Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
   { id: "STU1007", name: "Siddharth Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
   { id: "STU1008", name: "Rahul Kumar", department: "CSE", year: "3rd", semester: "6th", email: "ravi.kumar@college.edu" },
  { id: "STU1009", name: "Sonu Sharma", department: "ECE", year: "2nd", semester: "4th", email: "anjali.sharma@college.edu" },
  { id: "STU1010", name: "Suman Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
    { id: "STU1011", name: "Siddharth Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
   { id: "STU1012", name: "Rahul Kumar", department: "CSE", year: "3rd", semester: "6th", email: "ravi.kumar@college.edu" },
  { id: "STU1013", name: "Sonu Sharma", department: "ECE", year: "2nd", semester: "4th", email: "anjali.sharma@college.edu" },
  { id: "STU1014", name: "Suman Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
   { id: "STU1015", name: "Siddharth Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
   { id: "STU1016", name: "Rahul Kumar", department: "CSE", year: "3rd", semester: "6th", email: "ravi.kumar@college.edu" },
  { id: "STU1017", name: "Sonu Sharma", department: "ECE", year: "2nd", semester: "4th", email: "anjali.sharma@college.edu" },
  { id: "STU1018", name: "Suman Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
  { id: "STU1019", name: "Vishal Verma", department: "CSE", year: "1st", semester: "2nd", email: "priya.verma@college.edu" },
];

const AdminStudent = memo(function AdminStudent() {
  const rootRef = useRef(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  /* ---------- FILTER OPTIONS ---------- */

  const departments = useMemo(
    () => [...new Set(STUDENTS.map(s => s.department))],
    []
  );

  const years = useMemo(
    () =>
      [...new Set(
        STUDENTS
          .filter(s => !department || s.department === department)
          .map(s => s.year)
      )],
    [department]
  );

  const semesters = useMemo(
    () =>
      [...new Set(
        STUDENTS
          .filter(
            s =>
              (!department || s.department === department) &&
              (!year || s.year === year)
          )
          .map(s => s.semester)
      )],
    [department, year]
  );

  /* ---------- FILTERED DATA ---------- */

  const filtered = useMemo(() => {
    return STUDENTS.filter(s => {
      if (department && s.department !== department) return false;
      if (year && s.year !== year) return false;
      if (semester && s.semester !== semester) return false;

      const q = search.toLowerCase();
      return (s.name + s.id).toLowerCase().includes(q);
    });
  }, [search, department, year, semester]);

  /* ---------- ANIMATIONS ---------- */

  useLayoutEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" },
      ctx => {
        const targets = ctx.conditions.desktop
          ? ".student-row"
          : ".student-card";

        gsap.fromTo(
          targets,
          { opacity: 0, y: 14, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            stagger: 0.06,
            ease: "power2.out",
            clearProps: "transform",
          }
        );
      }
    );

    return () => mm.revert();
  }, [filtered]);

  /* ---------- UI ---------- */

  return (
    <section
      ref={rootRef}
      className="admin-student-root h-[calc(100vh-77px)] md:h-[calc(100vh-48px)] rounded-2xl border p-6 space-y-4 bg-[var(--ast-bg)] border-[var(--ast-border)]"
    >
      <header>
        <h2 className="text-lg font-semibold text-[var(--ast-title)]">
          Student Directory
        </h2>
        <p className="text-sm text-[var(--ast-muted)]">
          Registered students overview
        </p>
      </header>

      {/* SEARCH */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or ID"
        className="w-full rounded-md px-3 py-2 text-sm outline-none bg-[var(--ast-input-bg)] border border-[var(--ast-border)]"
      />

      {/* FILTERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={department}
          onChange={e => {
            setDepartment(e.target.value);
            setYear("");
            setSemester("");
          }}
          className="px-3 py-2 text-sm rounded-md bg-[var(--ast-input-bg)] border border-[var(--ast-border)]"
        >
          <option value="">All Departments</option>
          {departments.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <select
          value={year}
          onChange={e => {
            setYear(e.target.value);
            setSemester("");
          }}
          disabled={!department}
          className="px-3 py-2 text-sm rounded-md bg-[var(--ast-input-bg)] border border-[var(--ast-border)] disabled:opacity-50"
        >
          <option value="">All Years</option>
          {years.map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={semester}
          onChange={e => setSemester(e.target.value)}
          disabled={!year}
          className="px-3 py-2 text-sm rounded-md bg-[var(--ast-input-bg)] border border-[var(--ast-border)] disabled:opacity-50"
        >
          <option value="">All Semesters</option>
          {semesters.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-y-auto max-h-[calc(100vh-255px)]">
        <table className="w-full text-sm border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left text-[var(--ast-muted)]">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Dept</th>
              <th className="px-3 py-2">Year</th>
              <th className="px-3 py-2">Sem</th>
              <th className="px-3 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr
                key={s.id}
                className="student-row"
                style={{ background: `var(--ast-row-${(i % 4) + 1})` }}
              >
                <td className="px-3 py-2">{s.id}</td>
                <td className="px-3 py-2 font-medium">{s.name}</td>
                <td className="px-3 py-2">{s.department}</td>
                <td className="px-3 py-2">{s.year}</td>
                <td className="px-3 py-2">{s.semester}</td>
                <td className="px-3 py-2 break-all">{s.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden grid gap-4 overflow-y-auto max-h-[calc(100vh-375px)]">
        {filtered.map((s, i) => (
          <div
            key={s.id}
            className="student-card rounded-xl p-4 space-y-2 border"
            style={{ background: `var(--ast-card-${(i % 4) + 1})` }}
          >
            <div className="flex justify-between text-sm font-semibold">
              <span>{s.name}</span>
              <span className="text-[var(--ast-muted)]">ID: {s.id}</span>
            </div>
            <div className="text-xs text-[var(--ast-muted)]">
              {s.department} · {s.year} · Sem {s.semester}
            </div>
            <div className="text-xs break-all">{s.email}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default AdminStudent;