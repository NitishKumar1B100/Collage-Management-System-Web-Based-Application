import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import gsap from "gsap";

/* ---------------- DATA ---------------- */

const CURRICULUM = {
  UG: [
    {
      id: 1,
      course: "B.Tech",
      branches: [
        {
          name: "CSE",
          semesters: [
            { sem: 1, subjects: ["Maths I", "Engineering Physics", "C Programming", "Basic Electrical"] },
            { sem: 2, subjects: ["Maths II", "Data Structures", "Digital Logic", "Environmental Science"] },
            { sem: 3, subjects: ["Discrete Mathematics", "OOPS with Java", "Computer Organization", "Operating Systems"] },
            { sem: 4, subjects: ["Design & Analysis of Algorithms", "DBMS", "Software Engineering", "Microprocessors"] },
            { sem: 5, subjects: ["Computer Networks", "Theory of Computation", "Web Technologies", "Open Elective I"] },
            { sem: 6, subjects: ["Compiler Design", "Machine Learning", "Cloud Computing", "Professional Elective I"] },
            { sem: 7, subjects: ["Artificial Intelligence", "Big Data Analytics", "Professional Elective II", "Project Phase I"] },
            { sem: 8, subjects: ["Cyber Security", "Professional Elective III", "Project Phase II"] },
          ],
        },
        {
          name: "ECE",
          semesters: [
            { sem: 1, subjects: ["Maths I", "Engineering Physics", "Basic Electronics", "Programming Fundamentals"] },
            { sem: 2, subjects: ["Maths II", "Circuit Theory", "Electronic Devices", "Signals & Systems"] },
            { sem: 3, subjects: ["Analog Circuits", "Digital Electronics", "Network Analysis", "Electromagnetic Theory"] },
            { sem: 4, subjects: ["Control Systems", "Microprocessors", "Communication Theory", "Linear ICs"] },
            { sem: 5, subjects: ["Digital Signal Processing", "VLSI Design", "Embedded Systems", "Open Elective I"] },
            { sem: 6, subjects: ["Wireless Communication", "Optical Communication", "Professional Elective I"] },
            { sem: 7, subjects: ["IoT Systems", "Advanced VLSI", "Professional Elective II", "Project Phase I"] },
            { sem: 8, subjects: ["Nano Electronics", "Professional Elective III", "Project Phase II"] },
          ],
        },
        {
          name: "ME",
          semesters: [
            { sem: 1, subjects: ["Maths I", "Engineering Physics", "Engineering Mechanics", "Workshop Practice"] },
            { sem: 2, subjects: ["Maths II", "Thermodynamics", "Material Science", "Manufacturing Processes"] },
            { sem: 3, subjects: ["Strength of Materials", "Kinematics of Machines", "Fluid Mechanics"] },
            { sem: 4, subjects: ["Dynamics of Machines", "Heat Transfer", "Metrology", "CAD/CAM"] },
            { sem: 5, subjects: ["Design of Machine Elements", "IC Engines", "Industrial Engineering"] },
            { sem: 6, subjects: ["Refrigeration & AC", "Finite Element Methods", "Professional Elective I"] },
            { sem: 7, subjects: ["Robotics", "Automobile Engineering", "Professional Elective II", "Project Phase I"] },
            { sem: 8, subjects: ["Renewable Energy Systems", "Professional Elective III", "Project Phase II"] },
          ],
        },
      ],
    },
  ],

  PG: [
    {
      id: 1,
      course: "M.Tech",
      branches: [
        {
          name: "CSE",
          semesters: [
            { sem: 1, subjects: ["Advanced Algorithms", "Advanced Operating Systems", "Mathematical Foundations of CS"] },
            { sem: 2, subjects: ["Machine Learning", "Distributed Systems", "Advanced DBMS"] },
            { sem: 3, subjects: ["Deep Learning", "Cloud Architecture", "Research Methodology", "Project Phase I"] },
            { sem: 4, subjects: ["Thesis / Dissertation", "Project Phase II"] },
          ],
        },
        {
          name: "VLSI",
          semesters: [
            { sem: 1, subjects: ["CMOS VLSI Design", "Semiconductor Physics", "Advanced Digital Design"] },
            { sem: 2, subjects: ["Low Power VLSI", "Analog IC Design", "FPGA Architectures"] },
            { sem: 3, subjects: ["System on Chip", "Nano Electronics", "Project Phase I"] },
            { sem: 4, subjects: ["Thesis / Dissertation", "Project Phase II"] },
          ],
        },
        {
          name: "Power Systems",
          semesters: [
            { sem: 1, subjects: ["Advanced Power System Analysis", "Power Electronics", "High Voltage Engineering"] },
            { sem: 2, subjects: ["Power System Protection", "Smart Grid Technologies"] },
            { sem: 3, subjects: ["Renewable Energy Systems", "Energy Management", "Project Phase I"] },
            { sem: 4, subjects: ["Thesis / Dissertation", "Project Phase II"] },
          ],
        },
      ],
    },
  ],
};


/* ---------------- MEMO ---------------- */

const SemesterRow = memo(({ sem }) => (
  <div className="relative rounded-lg border border-[var(--border)] bg-[var(--bg)] p-4 shadow-sm  hover:shadow-md">
    <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[var(--primary)]" />

    <div className="pl-3">
      <div className="mb-2 text-sm font-semibold tracking-wide text-[var(--text)]">
        SEMESTER {sem.sem}
      </div>

      <ul className="space-y-1 text-sm text-[var(--muted)]">
        {sem.subjects.map(sub => (
          <li key={sub} className="leading-relaxed">
            • {sub}
          </li>
        ))}
      </ul>
    </div>
  </div>
));


function HodCurriculum() {
  const [level, setLevel] = useState("UG");
  const [course, setCourse] = useState(null);
  const [branch, setBranch] = useState(null);

  const courseRef = useRef(null);
  const branchRef = useRef(null);
  const semRef = useRef(null);

  /* ---------- STABLE HANDLERS ---------- */

  const handleLevelChange = useCallback((lvl) => {
    setLevel(lvl);
    setCourse(null);
    setBranch(null);
  }, []);

  const handleCourseSelect = useCallback((c) => {
    setCourse(c);
    setBranch(null);
  }, []);

  const handleBranchSelect = useCallback((b) => {
    setBranch(b);
  }, []);

  /* ---------- ISOLATED ANIMATIONS ---------- */

  useEffect(() => {
    if (!courseRef.current) return;
    gsap.fromTo(
      courseRef.current.children,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08 }
    );
  }, [level]);

  useEffect(() => {
    if (!branchRef.current) return;
    gsap.fromTo(
      branchRef.current.children,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.06 }
    );
  }, [course]);

  useEffect(() => {
    if (!semRef.current) return;
    gsap.fromTo(
      semRef.current.children,
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.05 }
    );
  }, [branch]);

  /* ---------- RENDER ---------- */

  return (
    <div className="mx-auto max-w-5xl bg-[var(--bg)] p-6 text-[var(--text)] max-h-[calc(100vh-60px)] md:max-h-[calc(100vh-30px)] overflow-y-auto">
      {/* LEVEL SWITCH */}
      <div className="mb-10 flex justify-start gap-4">
        {["UG", "PG"].map(lvl => (
          <button
            key={lvl}
            onClick={() => handleLevelChange(lvl)}
            className={`rounded-lg px-8 py-2 font-medium transition
              ${
                level === lvl
                  ? "bg-[var(--primary)] text-white"
                  : "border border-[var(--border)] bg-[var(--border)] hover:bg-[var(--card)]"
              }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* COURSES */}
      <section className="mb-10">
        <h3 className="mb-4 text-lg font-semibold text-[var(--profile-content-title)]">
          Courses
        </h3>

        <div ref={courseRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {CURRICULUM[level].map(c => (
            <div
              key={c.id}
              onClick={() => handleCourseSelect(c)}
              className={`cursor-pointer rounded-xl border p-6 text-center
                ${
                  course?.id === c.id
                    ? "border-[var(--primary)] bg-[var(--card)]"
                    : "border-[var(--mute)] hover:bg-[var(--card)]"
                }`}
            >
              {c.course}
            </div>
          ))}
        </div>
      </section>

      {/* BRANCHES */}
      {course && (
        <section className="mb-10">
          <h3 className="mb-4 text-lg font-semibold text-[var(--profile-content-title)]">
            Branches
          </h3>

          <div ref={branchRef} className="flex flex-wrap gap-3">
            {course.branches.map(b => (
              <button
                key={b.name}
                onClick={() => handleBranchSelect(b)}
                className={`rounded-full px-5 py-2 text-sm font-medium 
                  ${
                    branch?.name === b.name
                      ? "bg-[var(--primary)] text-white"
                      : "border border-[var(--border)] bg-[var(--border)] hover:bg-[var(--card)]"
                  }`}
              >
                {b.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* CURRICULUM */}
      {branch && (
        <section className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
          <h3 className="mb-6 border-b border-[var(--border)] pb-3 text-lg font-semibold text-[var(--profile-content-title)]">
            Semester Curriculum
          </h3>

          <div ref={semRef} className="grid gap-7 sm:grid-cols-1 md:grid-cols-2">
            {branch.semesters.map(s => (
              <SemesterRow key={s.sem} sem={s} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default HodCurriculum;


