import { memo, useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const DUMMY_STUDENTS = [
  { id: "STU1001", name: "Ravi Kumar", department: "CSE", year: "3rd", semester: "6th", email: "ravi.kumar@college.edu" },
  { id: "STU1002", name: "Anjali Sharma", department: "ECE", year: "2nd", semester: "4th", email: "anjali.sharma@college.edu" },
  { id: "STU1003", name: "Siddharth Singh", department: "ME", year: "4th", semester: "8th", email: "siddharth.singh@college.edu" },
  { id: "STU1004", name: "Priya Verma", department: "CSE", year: "1st", semester: "2nd", email: "priya.verma@college.edu" },
];

const AdminStudent = memo(function AdminStudent() {
  const rootRef = useRef(null);
  const rowsRef = useRef([]);
  const cardsRef = useRef([]);
  const [search, setSearch] = useState("");

  const filteredStudents = DUMMY_STUDENTS.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  useLayoutEffect(() => {
    gsap.fromTo(
      [...rowsRef.current, ...cardsRef.current],
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.05,
      }
    );
  }, [filteredStudents]);

  return (
    <section
      ref={rootRef}
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-6"
    >
      <header>
        <h2 className="text-lg font-semibold">Student Directory</h2>
        <p className="text-sm text-[var(--muted)]">
          Overview of all registered students
        </p>
      </header>

      <input
        type="text"
        placeholder="Search by name or ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full rounded-md border border-[var(--border)] px-3 py-2 bg-[var(--input-bg)] text-sm outline-none"
      />

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-[var(--input-bg)]">
            <tr className="border-b border-[var(--border)] text-left">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Department</th>
              <th className="px-3 py-2">Year</th>
              <th className="px-3 py-2">Semester</th>
              <th className="px-3 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, idx) => (
              <tr
                key={student.id}
                ref={el => (rowsRef.current[idx] = el)}
                style={{ backgroundColor: `var(--admin-std-${(idx % 4) + 1})` }}
                className="border-b border-[var(--border)] hover:bg-[var(--sidebar-item-hover-bg)] transition-colors"
              >
                <td className="px-3 py-2">{student.id}</td>
                <td className="px-3 py-2">{student.name}</td>
                <td className="px-3 py-2">{student.department}</td>
                <td className="px-3 py-2">{student.year}</td>
                <td className="px-3 py-2">{student.semester}</td>
                <td className="px-3 py-2 break-all">{student.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden grid gap-4"
  
      >
        {filteredStudents.map((student, idx) => (
          <div
            key={student.id}
            ref={el => (cardsRef.current[idx] = el)}
            style={{ backgroundColor: `var(--admin-std-${(idx % 4) + 1})` }}
            className="rounded-xl border border-[var(--border)] p-4 space-y-2"
          >
            <div className="flex justify-between text-sm font-medium">
              <span>{student.name}</span>
              <span className="text-[var(--border)]/80">{student.id}</span>
            </div>

            <div className="text-xs text-[var(--border)]/90 font-semibold">
              {student.department} · {student.year} · Sem {student.semester}
            </div>

            <div className="text-xs break-all">{student.email}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default AdminStudent;
