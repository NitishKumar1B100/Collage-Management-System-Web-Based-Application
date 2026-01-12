import React, { useState, useMemo, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import dayjs from "dayjs";

/* ---------- CONSTANTS ---------- */
const FREE_DAYS = 30;
const DAILY_FINE = 5;
const DUE_SOON_DAYS = 5;

/* ---------- SAMPLE DATA ---------- */
const borrowedBooksData = [
  { id: 1, title: "Introduction to Algorithms", author: "Cormen", borrowedOn: "2026-01-01", returned: false },
  { id: 2, title: "Database Systems", author: "Ramakrishnan", borrowedOn: "2025-12-20", returned: false },
  { id: 3, title: "Computer Networks", author: "Tanenbaum", borrowedOn: "2026-01-10", returned: false },
  { id: 4, title: "Operating Systems", author: "Silberschatz", borrowedOn: "2025-12-01", returned: true },
  { id: 5, title: "Software Engineering", author: "Sommer", borrowedOn: "2025-10-15", returned: false },
  { id: 6, title: "Artificial Intelligence", author: "Russell", borrowedOn: "2025-11-15", returned: false },
];

/* ---------- HELPER ---------- */
const calculateDue = (borrowedOn) => {
  const today = dayjs();
  const borrowedDate = dayjs(borrowedOn);
  const diffDays = today.diff(borrowedDate, "day");
  const overdueDays = Math.max(0, diffDays - FREE_DAYS);
  return overdueDays * DAILY_FINE;
};

/* ---------- COMPONENT ---------- */
function StudentLibrary() {
  const ref = useRef(null);
  const [filter, setFilter] = useState("all"); // all | returned | notReturned | due

  /* ---------- MEMOIZED BOOKS WITH STATUS ---------- */
  const booksWithStatus = useMemo(() => {
    const today = dayjs();
    return borrowedBooksData.map((book) => {
      const borrowedDate = dayjs(book.borrowedOn);
      const due = calculateDue(book.borrowedOn);
      const overdue = !book.returned && due > 0;
      const freePeriod = !book.returned && due === 0;
      const dueSoon = !book.returned && !overdue && today.add(DUE_SOON_DAYS, "day").isAfter(borrowedDate.add(FREE_DAYS, "day"));
      return { ...book, due, overdue, freePeriod, dueSoon };
    });
  }, []);

  /* ---------- FILTERED BOOKS ---------- */
  const filteredBooks = useMemo(() => {
    if (filter === "all") return booksWithStatus;
    if (filter === "returned") return booksWithStatus.filter(b => b.returned);
    if (filter === "notReturned") return booksWithStatus.filter(b => !b.returned);
    if (filter === "due") return booksWithStatus.filter(b => b.overdue || b.dueSoon);
    return booksWithStatus;
  }, [booksWithStatus, filter]);

  /* ---------- GSAP ANIMATION ON MOUNT & FILTER CHANGE ---------- */
  useLayoutEffect(() => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll(".book-card");

    gsap.killTweensOf(cards); // stop any existing tweens

    gsap.fromTo(
      cards,
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: "power3.out" }
    );
  }, [filteredBooks]);

  return (
    <div className="student-library card p-4">
      <h2 className="font-bold text-xl text-[var(--text)] mb-4">My Borrowed Books</h2>

      {/* ---------- FILTER BUTTONS ---------- */}
      <div className="flex gap-3 mb-4 flex-wrap">
        {["all", "returned", "notReturned", "due"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === f
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] text-[var(--text)] border border-[var(--border)]"
            }`}
          >
            {f === "notReturned" ? "Not Returned" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div
        ref={ref}
        className="grid md:grid-cols-2 gap-6 max-h-[540px] overflow-y-auto pr-2"
      >
        {filteredBooks.map((book) => {
          let bgColor = "";
          let statusLabel = "";
          let statusColor = "";

          if (book.overdue) {
              bgColor = "bg-[var(--book-overdue-bg)] border-[var(--book-overdue-border)]";
            statusLabel = `Overdue: ₹${book.due}`;
            statusColor = "text-[var(--book-overdue-text)]";
          } else if (book.dueSoon) {
            bgColor = "bg-[var(--book-dueSoon-bg)] border-[var(--book-dueSoon-border)]";
            statusLabel = "Due Soon";
statusColor = "text-[var(--book-dueSoon-text)]";
          } else if (book.freePeriod) {
             bgColor = "bg-[var(--book-freePeriod-bg)] border-[var(--book-freePeriod-border)]";
            statusLabel = "Within Free Period";
           statusColor = "text-[var(--book-freePeriod-text)]";
          } else if (book.returned) {
           bgColor = "bg-[var(--book-returned-bg)] border-[var(--book-returned-border)]";
            statusLabel = "Returned";
  statusColor = "text-[var(--book-returned-text)]";
          }

          return (
            <div
              key={book.id}
              className={`book-card p-4 rounded-xl shadow-md flex flex-col gap-2 ${bgColor}`}
            >
              <div className="font-semibold text-[var(--text)] text-lg">{book.title}</div>
              <div className="text-sm text-[var(--muted)]">Author: {book.author}</div>
              <div className="text-sm text-[var(--muted)]">
                Borrowed On: {dayjs(book.borrowedOn).format("YYYY-MM-DD")}
              </div>
              <div className={`mt-1 font-medium ${statusColor}`}>{statusLabel}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StudentLibrary;
