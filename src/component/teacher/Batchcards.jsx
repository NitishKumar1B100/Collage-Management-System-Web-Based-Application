import { memo } from "react";

const BatchCard = memo(function BatchCard({ batch, onSelect }) {
  return (
    <button
      onClick={() => onSelect(batch.id)}
      className="w-full p-4 rounded-lg bg-[var(--teacher_student_card_bg)] border border-[var(--border)]
                 hover:scale-[0.98] transition-transform duration-300 text-left"
    >
      <h3 className="font-semibold">{batch.label}</h3>
      <p className="text-xs text-[var(--muted)]">
        {batch.course} · {batch.branch} · Sem {batch.semester}
      </p>
    </button>
  );
});
export default BatchCard;