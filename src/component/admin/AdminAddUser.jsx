import { memo, useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const USER_TYPES = [
  { type: "Student", color: "sky" },
  { type: "Faculty", color: "purple" },
  { type: "Library", color: "amber" },
];

const AdminAddUser = memo(function AdminAddUser() {
  const [activeType, setActiveType] = useState(USER_TYPES[0]);
  const rootRef = useRef(null);
  const formRef = useRef(null);

  // Animate root on mount
  useLayoutEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  // Animate form content when type changes
  useLayoutEffect(() => {
    if (!formRef.current) return;

    gsap.to(formRef.current.children, {
      opacity: 0,
      y: -10,
      stagger: 0.03,
      duration: 0.15,
      onComplete: () => {
        gsap.fromTo(
          formRef.current.children,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  }, [activeType]);

  const renderFields = () => {
    switch (activeType.type) {
      case "Student":
        return [
          { label: "Student Name", placeholder: "John Doe" },
          { label: "Semester", placeholder: "5", type: "number" },
          { label: "Department", placeholder: "CSE" },
        ];
      case "Faculty":
        return [
          { label: "Faculty Name", placeholder: "Dr. Meera Jain" },
          { label: "Department", placeholder: "ECE" },
          { label: "Designation", placeholder: "Associate Professor" },
        ];
      case "Library":
        return [
          { label: "Library Staff Name", placeholder: "Mr. R. Kumar" },
          { label: "Role", placeholder: "Incharge" },
        ];
      default:
        return [];
    }
  };

  const fields = renderFields();

  return (
    <section
      ref={rootRef}
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 space-y-6"
    >
      {/* HEADER */}
      <header className="space-y-1">
        <h2 className="text-lg font-semibold">Add New {activeType.type}</h2>
        <p className="text-sm text-[var(--muted)]">
          Create new accounts and set credentials for all users
        </p>
      </header>

      {/* USER TYPE TABS */}
      <div className="flex gap-4 border-b border-[var(--border)] pb-2">
        {USER_TYPES.map(({ type, color }) => (
          <button
            key={type}
            onClick={() => setActiveType({ type, color })}
            className={`px-4 py-2 rounded-full font-medium transition-all
              ${activeType.type === type
                ? `bg-${color}-500 text-white shadow-md`
                : `text-[var(--muted)] hover:bg-${color}-100`
              }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* UNIVERSAL CREDENTIALS */}
      <FloatingInput label="User ID" placeholder="Set a unique ID" accent={activeType.color} />
      <FloatingInput label="Password" placeholder="Set a secure password" type="password" accent={activeType.color} />

      {/* FORM GRID */}
      <div
        ref={formRef}
        className="grid md:grid-cols-2 gap-4 mt-4 transition-all duration-300"
      >
        {fields.map((f) => (
          <FloatingInput key={f.label} {...f} accent={activeType.color} />
        ))}
      </div>

      <button className={`mt-4 w-full md:w-1/3 px-6 py-2 rounded-lg bg-${activeType.color}-500 text-white font-medium hover:scale-105 transition-transform`}>
        Add {activeType.type}
      </button>
    </section>
  );
});

// Floating label input with dynamic accent color
const FloatingInput = memo(({ label, placeholder, type = "text", accent = "sky" }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder=" "
        className={`peer w-full rounded-md border border-[var(--border)] bg-[var(--input-bg)] px-3 pt-5 pb-2 text-sm outline-none transition-colors focus:border-${accent}-500`}
      />
      <label className={`absolute left-3 top-2 text-xs text-[var(--muted)] transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[var(--muted)] peer-focus:top-2 peer-focus:text-xs peer-focus:text-${accent}-500`}>
        {label}
      </label>
    </div>
  );
});

export default AdminAddUser;
