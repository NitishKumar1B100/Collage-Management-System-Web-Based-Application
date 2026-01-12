import { memo, useMemo, useState, useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const WorkSection = memo(function WorkSection() {
  const containerRef = useRef(null);

  const [selectedMainTags, setSelectedMainTags] = useState(["all"]);
  const [selectedSubTags, setSelectedSubTags] = useState(["pending", "completed"]);

  const workData = useMemo(() => [
    { title: "DSA Assignment", subject: "CSE", type: "assignment", status: "pending", teacher: "Dr. Sharma", className: "CSE-5A", semester: "5", year: "2024", subjectId: "CS301", deadline: "2026-01-15", givenDate: "2026-01-08" },
    { title: "OS Practical", subject: "CSE", type: "practical", status: "completed", teacher: "Prof. Verma", className: "CSE-5A", semester: "5", year: "2024", subjectId: "CS302", deadline: "2026-01-10", givenDate: "2026-01-05" },
    { title: "DBMS Assignment", subject: "CSE", type: "assignment", status: "completed", teacher: "Dr. Rao", className: "CSE-5B", semester: "5", year: "2024", subjectId: "CS303", deadline: "2026-01-18", givenDate: "2026-01-09" },
    { title: "Networks Practical", subject: "CSE", type: "practical", status: "pending", teacher: "Prof. Gupta", className: "CSE-5B", semester: "5", year: "2024", subjectId: "CS304", deadline: "2026-01-20", givenDate: "2026-01-10" }
  ], []);

  const toggleMainTag = useCallback(tag => {
    setSelectedMainTags(tag === "all" ? ["all"] : [tag]);
  }, []);

  const toggleSubTag = useCallback(tag => {
    setSelectedSubTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  }, []);

  const filteredData = useMemo(() => {
    return workData.filter(item => {
      const typeMatch = selectedMainTags.includes("all") || selectedMainTags.includes(item.type);
      const statusMatch = selectedSubTags.includes(item.status);
      return typeMatch && statusMatch;
    });
  }, [workData, selectedMainTags, selectedSubTags]);

  /* ---------- GSAP APPEARANCE ANIMATION ---------- */
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".work-card");
    gsap.killTweensOf(cards);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
    );
  }, [filteredData]);

  /* ---------- GSAP HOVER EFFECTS ---------- */
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".work-card");

    cards.forEach(card => {
      const enter = () => gsap.to(card, { scale: 1.03, boxShadow: "0 15px 25px rgba(0,0,0,0.2)", duration: 0.3, ease: "power3.out" });
      const leave = () => gsap.to(card, { scale: 1, boxShadow: "0 5px 15px rgba(0,0,0,0.1)", duration: 0.3, ease: "power3.out" });

      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);

      // cleanup
      return () => {
        card.removeEventListener("pointerenter", enter);
        card.removeEventListener("pointerleave", leave);
      };
    });
  }, [filteredData]);

  const mainTags = ["all", "practical", "assignment"];
  const subTags = ["pending", "completed"];

  return (
    <div ref={containerRef} className="space-y-6">
      {/* MAIN TAGS */}
      <div className="flex flex-wrap gap-3">
        {mainTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleMainTag(tag)}
            className={`px-4 py-2 rounded-full font-medium 
              ${selectedMainTags.includes(tag)
                ? "bg-[var(--primary)] text-white shadow-lg"
                : "bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"}`
            }
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      {/* SUB TAGS */}
      <div className="flex flex-wrap gap-3">
        {subTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleSubTag(tag)}
            className={`px-3 py-1 rounded-lg text-sm font-medium 
              ${selectedSubTags.includes(tag)
                ? "bg-[var(--primary)] text-white shadow-sm"
                : "bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"}`
            }
          >
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </button>
        ))}
      </div>

      {/* WORK CARDS */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredData.map((item, i) => (
          <div
            key={i}
            className="work-card bg-[var(--card)] rounded-xl shadow-md p-5 cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-[var(--text)]">{item.title}</h3>
            <p className="text-sm text-[var(--muted)] mt-1">{item.subject}</p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--muted)]">
              <div><strong>Teacher:</strong> {item.teacher}</div>
              <div><strong>Class:</strong> {item.className}</div>
              <div><strong>Semester:</strong> {item.semester}</div>
              <div><strong>Year:</strong> {item.year}</div>
              <div><strong>Subject Code:</strong> {item.subjectId}</div>
              <div><strong>Deadline:</strong> {item.deadline}</div>
              <div><strong>Given:</strong> {item.givenDate}</div>
              <div><strong>Type:</strong> {item.type}</div>
              <div className="col-span-2"><strong>Status:</strong> {item.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default WorkSection;
