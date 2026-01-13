import { memo, useState, useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
const DUMMY_FACULTY = [
  { id: "FAC101", name: "Dr. Arvind Sharma", department: "CSE", email: "arvind.sharma@college.edu", designation: "Professor" },
  { id: "FAC102", name: "Dr. Meera Jain", department: "ECE", email: "meera.jain@college.edu", designation: "Associate Professor" },
  { id: "FAC103", name: "Dr. Rohit Gupta", department: "ME", email: "rohit.gupta@college.edu", designation: "Assistant Professor" },
  { id: "FAC104", name: "Dr. Ananya Verma", department: "CSE", email: "ananya.verma@college.edu", designation: "Professor" },
  { id: "FAC105", name: "Dr. Nikhil Reddy", department: "ECE", email: "nikhil.reddy@college.edu", designation: "Professor" },
  { id: "FAC106", name: "Dr. Priya Kapoor", department: "ME", email: "priya.kapoor@college.edu", designation: "Associate Professor" },
  { id: "FAC107", name: "Dr. Sameer Khanna", department: "CSE", email: "sameer.khanna@college.edu", designation: "Assistant Professor" },
  { id: "FAC108", name: "Dr. Ritu Malhotra", department: "ECE", email: "ritu.malhotra@college.edu", designation: "Assistant Professor" },
  { id: "FAC109", name: "Dr. Anil Joshi", department: "ME", email: "anil.joshi@college.edu", designation: "Professor" },
  { id: "FAC110", name: "Dr. Kavita Sharma", department: "CSE", email: "kavita.sharma@college.edu", designation: "Associate Professor" },
  { id: "FAC111", name: "Dr. Mohit Singh", department: "ECE", email: "mohit.singh@college.edu", designation: "Professor" },
  { id: "FAC112", name: "Dr. Sneha Rao", department: "ME", email: "sneha.rao@college.edu", designation: "Assistant Professor" },
  { id: "FAC113", name: "Dr. Rajesh Agarwal", department: "CSE", email: "rajesh.agarwal@college.edu", designation: "Professor" },
  { id: "FAC114", name: "Dr. Pooja Desai", department: "ECE", email: "pooja.desai@college.edu", designation: "Associate Professor" },
  { id: "FAC115", name: "Dr. Arjun Mehta", department: "ME", email: "arjun.mehta@college.edu", designation: "Assistant Professor" }
];


const AdminFaculty = memo(function AdminFaculty() {
  const rootRef = useRef(null);
  const cardsRef = useRef([]);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  /* ---------- FILTER OPTIONS ---------- */
  const departments = useMemo(
    () => [...new Set(DUMMY_FACULTY.map(f => f.department))],
    []
  );

  /* ---------- FILTERED DATA ---------- */
  const filteredFaculty = useMemo(() => {
    return DUMMY_FACULTY.filter(f => {
      if (department && f.department !== department) return false;
      const q = search.toLowerCase();
      return (f.name + f.id).toLowerCase().includes(q);
    });
  }, [search, department]);

  /* ---------- ANIMATIONS ---------- */
  useLayoutEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  useLayoutEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 14, scale: 0.97 },
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
  }, [filteredFaculty]);

  /* ---------- UI ---------- */
  return (
    <section
      ref={rootRef}
      className="h-[calc(100vh-7px)] md:h-[calc(100vh-48px)] rounded-2xl border p-6 space-y-6
                 bg-[var(--card)] border-[var(--border)]"
    >
      <header>
        <h2 className="text-lg font-semibold">Faculty Directory</h2>
        <p className="text-sm text-[var(--muted)]">
          Registered faculty members
        </p>
      </header>

      {/* SEARCH + FILTER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or ID"
          className="rounded-md px-3 py-2 text-sm outline-none
                     bg-[var(--input-bg)] border border-[var(--border)]"
        />

        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="rounded-md px-3 py-2 text-sm outline-none
                     bg-[var(--input-bg)] border border-[var(--border)]"
        >
          <option value="">All Departments</option>
          {departments.map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto
                      max-h-[calc(100vh-290px)]">
        {filteredFaculty.length === 0 && (
          <div className="col-span-full text-center text-sm text-[var(--muted)] py-6">
            No faculty found
          </div>
        )}

        {filteredFaculty.map((f, idx) => (
          <div
            key={f.id}
            ref={el => (cardsRef.current[idx] = el)}
            className="rounded-xl border p-4 space-y-3"
            style={{
              background: `var(--admin-fclt-${(idx % 4) + 1})`,
              borderColor: "var(--border)",
            }}
          >
         <div className="">
          
             {/* NAME */}
            <span className="text-base font-semibold leading-tight">
              {f.name}
            </span>

            {/* DESIGNATION */}
            <span className="text-[10px] md:text-sm text-[var(--muted)]">
                {` (${f.designation})`}
            </span>
         </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-[90px_1fr] gap-y-1 text-sm">
              <div className="">
                              <span className="text-[var(--muted)]"><b>Dept</b> </span>
              <span>{f.department}</span>
              </div>

          <div className="">
                <span className="text-[var(--muted)]"><b>Email</b> </span>
              <span className="break-all">{f.email}</span>

          </div>
        <div className="">
          
                <span className="text-[var(--muted)]"><b>ID</b> </span>
              <span>{f.id}</span>
        </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default AdminFaculty;
