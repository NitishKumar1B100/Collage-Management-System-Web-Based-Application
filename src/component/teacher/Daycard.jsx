/* ---------- Day Card ---------- */

import { memo } from "react";
import { CiCircleInfo } from "react-icons/ci";


const DayCard = memo(function DayCard({ day, status, onOpen }) {
  return (
    <button
      className={`cursor-pointer w-full relative p-4 rounded-lg border text-left transition-transform duration-300
        ${
          status === "pending"
            ? "bg-[var(--card)] border-[var(--border)] hover:scale-[0.97]"
            : "bg-[var(--input-bg)] border-[var(--border)]"
        }`}
        
          onClick={onOpen}
    >
      {/* <span className="absolute right-2 top-2 text-[var(--muted)] " 
    >
        <CiCircleInfo size={14} />
      </span> */}

      <h4 className="font-medium text-sm">{day}</h4>
      <p
        className={`text-xs mt-1 ${
          status === "pending" ? "text-red-400" : "text-green-400"
        }`}
      >
        {status === "pending" ? "Attendance Pending" : "Completed"}
      </p>
    </button>
  );
});

export default DayCard;