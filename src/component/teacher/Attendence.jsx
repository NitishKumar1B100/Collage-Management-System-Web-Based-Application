import { memo, useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { STUDENTS } from "../../StaticDataStructure/batch";
import DayCard from "./Daycard";
import { useAttendanceModal } from "../../context/AttendanceModalContext";

const Attendance = memo(function Attendance() {
  const gridRef = useRef(null);
  const { openModal } = useAttendanceModal();

  const days = [
    { day: "Today", status: "pending", batchId: "B1" },
    { day: "Yesterday", status: "completed", batchId: "B1" },
    { day: "2 Days Ago", status: "completed", batchId: "B2" },
  ];

  useLayoutEffect(() => {
    if (!gridRef.current) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 16, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: "power3.out",
      }
    );
  }, []);

  const openDay = useCallback((day) => {
    openModal({
      students: STUDENTS[day.batchId] || [],
      pending: day.status === "pending",
    });
  }, [openModal]);

  return (
    <div className="space-y-4">
      <div
        ref={gridRef}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {days.map((d) => (
          <DayCard
            key={`${d.day}-${d.batchId}`}
            day={d.day}
            status={d.status}
            onOpen={() => openDay(d)}
          />
        ))}
      </div>
    </div>
  );
});

export default Attendance;
