import { memo, useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const DAY = 1000 * 60 * 60 * 24;

/* ================= DATA ================= */

const transactions = [
  {
    book: "Introduction to Algorithms",
    type: "Issued",
    receiver: {
      name: "John Doe",
      role: "Student",
      id: "STU1021",
      department: "Computer Science",
      year: "3rd Year",
      semester: "5",
      email: "john.doe@college.edu",
      phone: "+91 98765 43210",
    },
    issuedBy: {
      name: "Mr. R. Kumar",
      role: "Librarian",
      id: "LIB001",
    },
    issueDate: "2025-12-01",
    dueDate: "2025-12-31",
    bookId: "CS-ALG-102",
  },
  {
    book: "Clean Code",
    type: "Returned",
    receiver: {
      name: "Jane Smith",
      role: "Faculty",
      id: "FAC221",
      department: "Software Engineering",
      designation: "Assistant Professor",
      email: "jane.smith@college.edu",
      phone: "+91 91234 56789",
    },
    issuedBy: {
      name: "Mr. R. Kumar",
      role: "Librarian",
      id: "LIB001",
    },
    issueDate: "2025-11-01",
    returnDate: "2025-11-20",
    bookId: "CS-SE-221",
  },
];

/* ================= MAIN ================= */

const LibraryActivity = memo(function LibraryActivity() {
  const [openIndex, setOpenIndex] = useState(null);

  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const contentRefs = useRef([]);

  /* ===== MOUNT / UNMOUNT ANIMATION ===== */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, scale: 0.99},
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
      );

      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 5 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.06,
          ease: "power2.out",
        }
      );
    }, rootRef);

    return () => {
      gsap.to(rootRef.current, {
        opacity: 0,
        y: 5,
        duration: 0.25,
        ease: "power2.in",
      });
      ctx.revert();
    };
  }, []);

  /* ===== EXPAND / COLLAPSE ===== */
  const toggle = useCallback(
    idx => {
      const el = contentRefs.current[idx];
      if (!el) return;

      if (openIndex === idx) {
        gsap.to(el, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        setOpenIndex(null);
      } else {
        if (openIndex !== null) {
          const prev = contentRefs.current[openIndex];
          prev &&
            gsap.to(prev, {
              height: 0,
              opacity: 0,
              duration: 0.25,
            });
        }

        setOpenIndex(idx);

        gsap.fromTo(
          el,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          }
        );
      }
    },
    [openIndex]
  );

  return (
    <div ref={rootRef} className="mt-6">
      <h3 className="text-xl font-semibold mb-4 tracking-wide">
        Library Activity
      </h3>

      <div className="max-h-[calc(100vh-150px)] space-y-3 overflow-y-auto pr-1 md:mb-0 mb-8">
        {transactions.map((txn, idx) => {
          const isOpen = openIndex === idx;

          const issueDate = new Date(txn.issueDate);
          const endDate = txn.returnDate ? new Date(txn.returnDate) : new Date();

          const daysHeld = Math.floor((endDate - issueDate) / DAY);

          const fine =
            txn.type === "Issued" && daysHeld > 30
              ? `₹${(daysHeld - 30) * 5}`
              : null;

          return (
            <div
              key={idx}
              ref={el => (cardRefs.current[idx] = el)}
              onClick={() => toggle(idx)}
              className={`
                cursor-pointer rounded-xl border border-[var(--border)]
                bg-[var(--card)] p-4 transition-colors
                ${isOpen ? "shadow-lg" : "hover:bg-white/5"}
              `}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase tracking-wide opacity-60">
                    {txn.type}
                  </span>
                  <div className="text-base font-medium">
                    {txn.book}
                  </div>
                  <div className="text-sm opacity-70">
                    {txn.receiver.name} · {txn.receiver.role}
                  </div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      txn.type === "Issued"
                        ? "bg-green-500/15 text-green-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                >
                  {txn.type}
                </div>
              </div>

              {/* EXPANDABLE */}
              <div
                ref={el => (contentRefs.current[idx] = el)}
                className="overflow-hidden h-0 opacity-0"
              >
                <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-y-3">
                    <Detail label="Book ID" value={txn.bookId} />
                    <Detail label="Issued Date" value={txn.issueDate} />
                    {txn.dueDate && (
                      <Detail label="Due Date" value={txn.dueDate} />
                    )}
                    {txn.returnDate && (
                      <Detail label="Returned Date" value={txn.returnDate} />
                    )}
                    <Detail
                      label="Issued By"
                      value={`${txn.issuedBy.name} (${txn.issuedBy.role})`}
                    />
                    {fine && (
                      <Detail label="Fine" value={fine} highlight />
                    )}
                  </div>

                  <div className="rounded-lg border border-[var(--border)] p-3 bg-[var(--bg)]">
                    <div className="text-xs uppercase tracking-wide opacity-60 mb-2">
                      Receiver Details
                    </div>

                    <div className="grid grid-cols-2 gap-y-2">
                      {Object.entries(txn.receiver).map(([k, v]) => (
                        <Detail key={k} label={k} value={v} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

/* ================= DETAIL ================= */

const Detail = memo(function Detail({ label, value, highlight }) {
  return (
    <div>
      <span className="opacity-60 capitalize">{label}</span>
      <div className={`font-medium ${highlight ? "text-red-400" : ""}`}>
        {value}
      </div>
    </div>
  );
});

export default LibraryActivity;
