import {
  memo,
  useCallback,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { BATCHES, STUDENTS } from "../../StaticDataStructure/batch";
import StudentCard from "./Studentcard";
import BatchCard from "./Batchcards";
import Attendence from "./Attendence";

const Teacherstudentlist = memo(function Teacherstudentlist() {
  const [activeBatch, setActiveBatch] = useState(null);

  const containerRef = useRef(null);
  const batchWrapRef = useRef(null);
  const studentSectionRef = useRef(null);
  const studentWrapRef = useRef(null);
  const attendanceRef = useRef(null);

  /* ---------- handlers ---------- */

  const selectBatch = useCallback((id) => {
    setActiveBatch(id);
  }, []);

  /* ---------- data ---------- */

  const students = useMemo(() => {
    if (!activeBatch) return [];
    return STUDENTS[activeBatch] || [];
  }, [activeBatch]);

  /* ---------- animations ---------- */

  // page enter
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: "power1.out" }
    );
  }, []);

  // batches appear
  useLayoutEffect(() => {
    if (!batchWrapRef.current) return;

    gsap.fromTo(
      batchWrapRef.current.children,
      { opacity: 0, y: 20, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: "power3.out",
      }
    );
  }, []);

  // students section appear / disappear
  useLayoutEffect(() => {
    if (!studentSectionRef.current) return;

    if (activeBatch) {
      gsap.fromTo(
        studentSectionRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        }
      );
    }
  }, [activeBatch]);

  // students cards
  useLayoutEffect(() => {
    if (!studentWrapRef.current || !activeBatch) return;

    gsap.fromTo(
      studentWrapRef.current.children,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }, [students, activeBatch]);

  // attendance section
  useLayoutEffect(() => {
    if (!attendanceRef.current) return;

    gsap.fromTo(
      attendanceRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  }, []);

  /* ---------- render ---------- */

  return (
    <div
      ref={containerRef}
      className="bg-[var(--card)] p-4 rounded-lg space-y-6"
    >
      <h1 className="text-[var(--text)] font-normal">Classes</h1>

      {/* ----------- CLASSES ----------- */}
      <div
        ref={batchWrapRef}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {BATCHES.map((batch) => {
          const isActive = batch.id === activeBatch;

          return (
            <div
              key={batch.id}
              onClick={() => selectBatch(batch.id)}
              className={`cursor-pointer rounded-lg
                ${isActive ? "ring-2 ring-[var(--primary)]" : ""}`}
            >
              <BatchCard batch={batch} />
            </div>
          );
        })}
      </div>

      {/* ----------- STUDENTS ----------- */}
      {activeBatch && (
        <div ref={studentSectionRef} className="space-y-4">
          <h2 className="text-[var(--text)] font-normal">Students</h2>

          <div
            ref={studentWrapRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
              />
            ))}
          </div>
        </div>
      )}

      {/* ----------- ATTENDANCE ----------- */}
      <div ref={attendanceRef} className="space-y-4">
        <h2 className="text-[var(--text)] font-normal">Attendance</h2>
        <Attendence />
      </div>
    </div>
  );
});

export default Teacherstudentlist;
