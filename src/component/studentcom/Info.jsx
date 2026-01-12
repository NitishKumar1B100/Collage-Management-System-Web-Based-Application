import { memo } from "react";

const Info = memo(function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-[var(--profile-content-title)]">
        {label}
      </p>
      <p className="text-sm text-[var(--profile-content)]">
        {value}
      </p>
    </div>
  );
});

export default Info