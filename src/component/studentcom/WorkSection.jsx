import { memo, useMemo, useState, useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const WorkSection = memo(function WorkSection() {
  const containerRef = useRef(null);

  const [selectedMainTags, setSelectedMainTags] = useState(["all"]);
  const [selectedSubTags, setSelectedSubTags] = useState(["pending", "completed"]);

  const workData = useMemo(
    () => [
      {
        title: "DSA Assignment",
        subject: "CSE",
        type: "assignment",
        status: "pending",
        teacher: "Dr. Sharma",
        className: "CSE-5A",
        semester: "5",
        year: "2024",
        subjectId: "CS301",
        deadline: "2026-01-15",
        givenDate: "2026-01-08",
      },
      {
        title: "OS Practical",
        subject: "CSE",
        type: "practical",
        status: "completed",
        teacher: "Prof. Verma",
        className: "CSE-5A",
        semester: "5",
        year: "2024",
        subjectId: "CS302",
        deadline: "2026-01-10",
        givenDate: "2026-01-05",
      },
      {
        title: "DBMS Assignment",
        subject: "CSE",
        type: "assignment",
        status: "completed",
        teacher: "Dr. Rao",
        className: "CSE-5B",
        semester: "5",
        year: "2024",
        subjectId: "CS303",
        deadline: "2026-01-18",
        givenDate: "2026-01-09",
      },
      {
        title: "Networks Practical",
        subject: "CSE",
        type: "practical",
        status: "pending",
        teacher: "Prof. Gupta",
        className: "CSE-5B",
        semester: "5",
        year: "2024",
        subjectId: "CS304",
        deadline: "2026-01-20",
        givenDate: "2026-01-10",
      },
            {
        title: "Networks Practical",
        subject: "CSE",
        type: "practical",
        status: "pending",
        teacher: "Prof. Gupta",
        className: "CSE-5B",
        semester: "5",
        year: "2024",
        subjectId: "CS304",
        deadline: "2026-01-20",
        givenDate: "2026-01-10",
      },
    ],
    []
  );

const typeStyles = {
  practical: {
    card:
      "border-l-4 bg-[var(--work-practical-bg)] border-[var(--work-practical-border)]",
    badge:
      "bg-[var(--work-practical-badge)] text-white",
  },
  assignment: {
    card:
      "border-l-4 bg-[var(--work-assignment-bg)] border-[var(--work-assignment-border)]",
    badge:
      "bg-[var(--work-assignment-badge)] text-white",
  },
};


  const toggleMainTag = useCallback(tag => {
    setSelectedMainTags(tag === "all" ? ["all"] : [tag]);
  }, []);

  const toggleSubTag = useCallback(tag => {
    setSelectedSubTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  }, []);

  const filteredData = useMemo(() => {
    return workData.filter(item => {
      const typeMatch =
        selectedMainTags.includes("all") ||
        selectedMainTags.includes(item.type);
      const statusMatch = selectedSubTags.includes(item.status);
      return typeMatch && statusMatch;
    });
  }, [workData, selectedMainTags, selectedSubTags]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".work-card");
    gsap.killTweensOf(cards);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      }
    );
  }, [filteredData]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".work-card");

    cards.forEach(card => {
      const enter = () =>
        gsap.to(card, {
          scale: 1.01,
          boxShadow: "0 15px 25px rgba(0,0,0,0.2)",
          duration: 0.3,
        });
      const leave = () =>
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
          duration: 0.3,
        });

      card.addEventListener("pointerenter", enter);
      card.addEventListener("pointerleave", leave);
    });
  }, [filteredData]);

  const mainTags = ["all", "practical", "assignment"];
  const subTags = ["pending", "completed"];

  return (
    <div
      ref={containerRef}
      className="space-y-6 h-[calc(100vh-80px)] md:h-[calc(100vh-48px)] overflow-y-auto overflow-x-hidden"
    >
      <div className="flex flex-wrap gap-3">
        {mainTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleMainTag(tag)}
            className={`px-4 py-2 rounded-full font-medium ${
              selectedMainTags.includes(tag)
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] text-[var(--text)] border"
            }`}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {subTags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleSubTag(tag)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              selectedSubTags.includes(tag)
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] text-[var(--text)] border"
            }`}
          >
            {tag.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 h-[calc(100vh-200px)] md:h-[calc(100vh-170px)] overflow-x-hidden overflow-y-auto">
        {filteredData.map((item, i) => (
          <div
            key={i}
            className={`work-card rounded-xl shadow-md p-4 cursor-pointer
              ${typeStyles[item.type].card}`}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[var(--text)]">
                {item.title}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs rounded-full font-semibold
                  ${typeStyles[item.type].badge}`}
              >
                {item.type.toUpperCase()}
              </span>
            </div>

            <p className="text-sm text-[var(--muted)] mt-1">{item.subject}</p>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-[var(--muted)]">
              <div>Teacher: {item.teacher}</div>
              <div>Class: {item.className}</div>
              <div>Semester: {item.semester}</div>
              <div>Year: {item.year}</div>
              <div>Subject Code: {item.subjectId}</div>
              <div>Deadline: {item.deadline}</div>
              <div>Given: {item.givenDate}</div>
              <div>Type: {item.type}</div>
<div
  className="col-span-2 font-semibold"
  style={{
    color:
      item.status === "completed"
        ? "var(--work-status-complete)"
        : "var(--work-status-pending)",
  }}
>
  Status: {item.status}
</div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default WorkSection;
