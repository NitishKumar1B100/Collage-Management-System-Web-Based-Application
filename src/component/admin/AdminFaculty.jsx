import { memo, useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const DUMMY_FACULTY = [
  { id: "FAC101", name: "Dr. Arvind Sharma", department: "CSE", email: "arvind.sharma@college.edu", designation: "Professor" },
  { id: "FAC102", name: "Dr. Meera Jain", department: "ECE", email: "meera.jain@college.edu", designation: "Associate Professor" },
  { id: "FAC103", name: "Dr. Rohit Gupta", department: "ME", email: "rohit.gupta@college.edu", designation: "Assistant Professor" },
  { id: "FAC104", name: "Dr. Ananya Verma", department: "CSE", email: "ananya.verma@college.edu", designation: "Professor" },
];


const AdminFaculty = memo(function AdminFaculty() {
  const rootRef = useRef(null);
  const cardsRef = useRef([]);
  const [search, setSearch] = useState("");

  const filteredFaculty = DUMMY_FACULTY.filter(
    f => f.name.toLowerCase().includes(search.toLowerCase()) || f.id.toLowerCase().includes(search.toLowerCase())
  );

  // Animate section
  useLayoutEffect(() => {
    gsap.fromTo(rootRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }, []);

  // Animate cards
  useLayoutEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 10, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.07, ease: "power2.out" }
    );
  }, [filteredFaculty]);

  return (
    <section
      ref={rootRef}
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-6"
    >
      <header>
        <h2 className="text-lg font-semibold">Faculty Directory</h2>
        <p className="text-sm text-[var(--muted)]">Overview of all faculty members</p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 rounded-md border border-[var(--border)] px-3 py-2 bg-[var(--input-bg)] text-sm outline-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.length === 0 ? (
          <div className="col-span-full text-center py-6 text-[var(--muted)]">No faculty found</div>
        ) : (
          filteredFaculty.map((faculty, idx) => (
            <div
              key={faculty.id}
              ref={el => (cardsRef.current[idx] = el)}
 className={`border border-[var(--border)] rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200`}
  style={{ backgroundColor: `var(--admin-fclt-${idx + 1})` }}            >
              <h3 className="text-md font-semibold">{faculty.name}</h3>
              <p className="text-sm text-[var(--muted)]">{faculty.designation}</p>
              <p className="text-sm">Dept: {faculty.department}</p>
              <p className="text-sm break-all">{faculty.email}</p>
              <p className="text-xs mt-2 text-[var(--muted)]">ID: {faculty.id}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
});

export default AdminFaculty;
