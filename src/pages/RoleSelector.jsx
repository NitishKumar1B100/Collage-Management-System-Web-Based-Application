import { memo, useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  ShieldCheck,
  GraduationCap,
  User,
  Library,
  LogIn,
  Crown,
} from "lucide-react";

const ROLES = [
  {
    label: "Admin",
    path: "/admin",
    icon: ShieldCheck,
    bg: "bg-[var(--admin-nav-profile-bg)]",
    iconColor: "text-[var(--admin-nav-profile)]",
  },
  {
    label: "HoD",
    path: "/hod",
    icon: Crown,
    bg: "bg-[var(--nav-setting-bg)]",
    iconColor: "text-[var(--nav-setting)]",
  },
  {
    label: "Teacher",
    path: "/teacher",
    icon: GraduationCap,
    bg: "bg-[var(--nav-work-bg)]",
    iconColor: "text-[var(--nav-work)]",
  },
  {
    label: "Student",
    path: "/student",
    icon: User,
    bg: "bg-[var(--student-nav-profile-bg)]",
    iconColor: "text-[var(--student-nav-profile)]",
  },
  {
    label: "Library",
    path: "/library",
    icon: Library,
    bg: "bg-[var(--admin-nav-system-bg)]",
    iconColor: "text-[var(--admin-nav-system)]",
  },
  {
    label: "Login",
    path: "/login",
    icon: LogIn,
    bg: "bg-[var(--sidebar-item-hover-bg)]",
    iconColor: "text-[var(--text)]",
  },
];

const RoleSelector = memo(function RoleSelector() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 28, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  }, []);

  const onEnter = el => {
    gsap.to(el, { y: -10, scale: 1.03, duration: 0.25, ease: "power2.out" });
  };

  const onLeave = el => {
    gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "power2.out" });
  };

  return (
    <section className="min-h-screen bg-[var(--bg)] grid place-items-center">
      <div
        ref={gridRef}
        className="grid gap-6 w-[92%] max-w-5xl
                   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {ROLES.map(({ label, path, icon: Icon, bg, iconColor }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            onMouseEnter={e => onEnter(e.currentTarget)}
            onMouseLeave={e => onLeave(e.currentTarget)}
            className={`
              ${bg}
              cursor-pointer
              rounded-2xl p-6
              backdrop-blur-2xl
              shadow-2xl
              shadow-2xl
            `}
          >
            <div className="flex items-center gap-4">
              <div
                className={`
                  p-3 rounded-xl
                  bg-black/10 dark:bg-white/10
                  ${iconColor}
                `}
              >
                <Icon size={26} />
              </div>

              <div>
                <h3 className="text-base font-semibold text-[var(--text)]">
                  {label}
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Enter {label} panel
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default RoleSelector;
