import { useEffect, useRef, useState } from "react";
import { ref, onChildAdded } from "firebase/database";
import { db } from "../../utils/firebase";
import gsap from "gsap";
import { Sun, Moon } from "lucide-react";

const LiveSuggestion = ({ theme, toggleTheme }) => {
  const [list, setList] = useState([]);
  const containerRef = useRef(null);

  /* ===================== REALTIME (INCREMENTAL) ===================== */
  useEffect(() => {
    const q = ref(db, "suggestions");

    return onChildAdded(q, snap => {
      const value = snap.val();
      if (!value) return;

      setList(prev => {
        // prevent duplicates on reconnect
        if (prev.some(i => i.id === snap.key)) return prev;
        return [{ id: snap.key, ...value }, ...prev];
      });
    });
  }, []);

  /* ===================== ANIMATE ONLY NEW CARD ===================== */
  useEffect(() => {
    if (!containerRef.current) return;
    const first = containerRef.current.firstElementChild;
    if (!first) return;

    gsap.fromTo(
      first,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" }
    );
  }, [list.length]);

  return (
    <section
      className={`${theme} min-h-screen px-4 py-8 bg-[var(--bg)] text-[var(--text)] transition-colors duration-500`}
    >
{/* Header */}
<div className="max-w-4xl mx-auto mb-10 text-center">
  <h1 className="text-4xl sm:text-5xl font-extrabold mb-3">
    Live Suggestions
  </h1>

  <p className="text-[var(--muted)] max-w-xl mx-auto mb-2">
    Real-time feedback stream. Messages appear instantly.
  </p>

  <p className="text-xs sm:text-sm text-[var(--muted)] opacity-80">
    Someone, somewhere, just typed a thought and pressed submit.
  </p>
</div>


      {/* List */}
      <div ref={containerRef} className="max-w-4xl mx-auto space-y-4">
        {list.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[var(--card)] shadow-xl border border-[var(--border)]"
          >
            <p className="text-sm sm:text-base leading-relaxed mb-2">
              {item.message}
            </p>
            <div className="text-xs text-[var(--muted)]">
              {new Date(item.createdAt).toLocaleString()}
            </div>
          </div>
        ))}

        {list.length === 0 && (
          <div className="text-center text-[var(--muted)] py-16">
            No suggestions yet.
          </div>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-blue-500 text-white shadow-2xl transition-transform duration-300 hover:scale-110"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </section>
  );
};

export default LiveSuggestion;
