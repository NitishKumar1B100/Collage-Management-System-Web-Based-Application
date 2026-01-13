import { memo, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

/* ---------- CONFIG ---------- */

const USER_TYPES = [
  { type: "Student", accent: "--accent-student" },
  { type: "Faculty", accent: "--accent-faculty" },
  { type: "Library", accent: "--accent-library" },
];

/* ---------- COMPONENT ---------- */

const AdminAddUser = memo(function AdminAddUser() {
  const [activeType, setActiveType] = useState(USER_TYPES[0]);
  const rootRef = useRef(null);
  const formRef = useRef(null);

  /* ---------- ANIMATION ---------- */

  useLayoutEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  useLayoutEffect(() => {
    if (!formRef.current) return;

    gsap.fromTo(
      formRef.current.children,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.35, ease: "power2.out" }
    );
  }, [activeType]);

  /* ---------- FIELDS ---------- */

  const fieldsByType = {
    Student: [
      { label: "Student Name" },
      { label: "Semester", type: "number" },
      { label: "Department" },
    ],
    Faculty: [
      { label: "Faculty Name" },
      { label: "Department" },
      { label: "Designation" },
    ],
    Library: [
      { label: "Staff Name" },
      { label: "Role" },
    ],
  };

  /* ---------- UI ---------- */

  return (
    <section
      ref={rootRef}
      style={{ "--accent": `var(${activeType.accent})` }}
      className="
        max-h-[calc(100vh-75px)]
        md:max-h-[calc(100vh-48px)]
        bg-[var(--card)]
        border border-[var(--border)]
        rounded md:rounded-2xl
        px-4 py-6 md:p-8
        flex flex-col
        space-y-8
      "
    >
      {/* HEADER BLOCK */}
      <header className="space-y-2">
        <h2 className="text-xl font-semibold">
          Create {activeType.type} Account
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-xl">
          Identity creation, credential assignment, and role registration
        </p>
      </header>

      {/* USER TYPE SWITCH */}
      <div className="flex gap-2 overflow-x-auto">
        {USER_TYPES.map(t => (
          <button
            key={t.type}
            onClick={() => setActiveType(t)}
            style={{
              background:
                activeType.type === t.type ? "var(--accent)" : "transparent",
              color:
                activeType.type === t.type
                  ? "white"
                  : "var(--muted)",
            }}
            className="
              px-4 py-2
              rounded-full
              text-sm font-medium
              border border-[var(--border)]
              whitespace-nowrap
            "
          >
            {t.type}
          </button>
        ))}
      </div>

      {/* MAIN PANEL */}
      <div
        className="
          flex-1
          bg-[var(--bg-subtle)]
          rounded-xl
          border border-[var(--border)]
          p-6
          flex flex-col
          space-y-6
        "
      >
        {/* CREDENTIALS */}
        <div className="grid gap-6 md:grid-cols-2">
          <FloatingInput label="User ID" />
          <FloatingInput label="Password" type="password" />
        </div>

        {/* TYPE-SPECIFIC FORM */}
        <div
          ref={formRef}
          className="grid gap-6 md:grid-cols-2"
        >
          {fieldsByType[activeType.type].map(f => (
            <FloatingInput key={f.label} {...f} />
          ))}
        </div>

        {/* ACTION */}
        <div className="pt-4">
          <button
            style={{ background: "var(--accent)" }}
            className="
              w-full md:w-1/3
              py-3
              rounded-lg
              text-white
              font-medium
            "
          >
            Add {activeType.type}
          </button>
        </div>
      </div>
    </section>
  );
});

/* ---------- INPUT ---------- */

const FloatingInput = memo(function FloatingInput({
  label,
  type = "text",
}) {
  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        className="
          peer
          w-full
          rounded-md
          border border-[var(--border)]
          bg-[var(--input-bg)]
          px-3 pt-5 pb-2
          text-sm
          outline-none
          focus:border-[var(--accent)]
        "
      />
      <label
        className="
          absolute left-3 top-2
          text-xs
          text-[var(--muted)]
          transition-all
          peer-placeholder-shown:top-5
          peer-placeholder-shown:text-sm
          peer-focus:top-2
          peer-focus:text-xs
          peer-focus:text-[var(--accent)]
        "
      >
        {label}
      </label>
    </div>
  );
});

export default AdminAddUser;
