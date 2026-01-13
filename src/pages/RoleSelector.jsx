import { memo, useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import {
  ShieldCheck,
  GraduationCap,
  User,
  Library,
  LogIn,
  Crown,
  Sun,
  Moon,
  X,
} from "lucide-react";
import { push, ref, serverTimestamp } from "firebase/database";
import { db } from "../utils/firebase";

/* ===================== Roles ===================== */
const ROLES = [
  { label: "Admin", path: "/admin", icon: ShieldCheck, bgVar: "--admin-nav-profile-bg", iconVar: "--admin-nav-profile" },
  { label: "HoD", path: "/hod", icon: Crown, bgVar: "--nav-setting-bg", iconVar: "--nav-setting" },
  { label: "Teacher", path: "/teacher", icon: GraduationCap, bgVar: "--nav-work-bg", iconVar: "--nav-work" },
  { label: "Student", path: "/student", icon: User, bgVar: "--student-nav-profile-bg", iconVar: "--student-nav-profile" },
  { label: "Library", path: "/library", icon: Library, bgVar: "--admin-nav-system-bg", iconVar: "--admin-nav-system" },
  { label: "Login", path: "/login", icon: LogIn, bgVar: "--sidebar-item-hover-bg", iconVar: "--text" },
];

/* ===================== Notification ===================== */
const Notification = ({ message, duration = 10000, onClose }) => {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timerRef.current);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-8 right-8 max-w-sm w-[90%] p-4 bg-blue-500 text-white rounded-xl shadow-lg flex justify-between items-start gap-4 z-50 animate-slide-in">
      <div className="text-sm">{message}</div>
      <button
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
        className="p-1 hover:bg-blue-600 rounded-full"
      >
        <X size={18} />
      </button>
    </div>
  );
};

/* ===================== Feedback Component ===================== */
const Feedback = () => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);

    try {
      await push(ref(db, "suggestions"), {
        message: text.trim(),
        createdAt: serverTimestamp(),
      });

      setSubmitted(true);
      setText("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Suggestion failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mt-16 mb-12 p-6 rounded-2xl shadow-lg bg-[var(--card)] text-[var(--text)]">
      <h3 className="text-lg font-semibold mb-2">
        Feedback / Suggestions / Share your thoughts
      </h3>

      {submitted && (
        <p className="text-green-400 mb-2">
          Suggestion submitted successfully.
        </p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Leave your suggestion..."
          className="p-3 rounded-lg bg-[var(--input-bg)] text-[var(--text)] border border-[var(--border)]
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-none"
          rows={4}
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg
                     hover:bg-blue-600 transition-colors duration-300 self-start disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

/* ===================== Role Selector ===================== */
const RoleSelector = memo(function RoleSelector() {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [dark, setDark] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  const goToLiveSuggestion = () => {
  navigate("./live-suggestion");
};


  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    gsap.to(document.documentElement, { duration: 0.5, backgroundColor: dark ? "#020617" : "#f8fafc" });
  }, [dark]);

  useLayoutEffect(() => {
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power3.out" }
    );
  }, []);

  const onEnter = el => gsap.to(el, { y: -8, scale: 1.05, duration: 0.35, ease: "power2.out", boxShadow: "0px 20px 40px rgba(0,0,0,0.2)" });
  const onLeave = el => gsap.to(el, { y: 0, scale: 1, duration: 0.35, ease: "power2.out", boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" });

  const toggleTheme = () => setDark(prev => !prev);

  return (
    <section className="min-h-screen flex flex-col items-center pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative transition-all duration-500" style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
<div className="w-full max-w-5xl flex flex-col items-center gap-4 mb-12 text-center">
  <h1 className="text-5xl font-extrabold bg-clip-text text-[var(--text)] transition-colors duration-500">
    University Portal
  </h1>

  <p className="text-[var(--muted)] text-center max-w-xl">
    Choose your role to access the corresponding panel. This application is still in development; feedback and suggestions are welcome below.
  </p>

  <button
    onClick={goToLiveSuggestion}
    className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-md
               hover:bg-blue-700 transition-colors duration-300"
  >
    View Live Suggestions
  </button>
</div>


      {/* Grid */}
      <div ref={gridRef} className="grid gap-8 w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map(({ label, path, icon: Icon, bgVar, iconVar }) => (
          <div
            key={label}
            onClick={() => navigate(path)}
            onMouseEnter={e => onEnter(e.currentTarget)}
            onMouseLeave={e => onLeave(e.currentTarget)}
            className="cursor-pointer rounded-2xl p-6 backdrop-blur-2xl shadow-2xl transition-all duration-500"
            style={{ backgroundColor: `var(${bgVar})` }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center transition-colors duration-500" style={{ color: `var(${iconVar})` }}>
                <Icon size={26} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--text)] transition-colors duration-500">{label}</h3>
                <p className="text-xs text-[var(--muted)] transition-colors duration-500">Enter {label} panel</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Feedback Form */}
      <Feedback />

      {/* Notification */}
      {showNotification && (
        <Notification
          message="Right now we are showing how the work is done or how it looks from outside. Application is still in progress. If you find anything to improve or fix, please leave your message below."
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 z-50 mt-4 p-3 rounded-full bg-blue-400 shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {dark ? <Sun size={20} color="white" /> : <Moon size={20} />}
      </button>
    </section>
  );
});

export default RoleSelector;
