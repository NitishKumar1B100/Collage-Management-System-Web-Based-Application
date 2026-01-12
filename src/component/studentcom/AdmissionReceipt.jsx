import { memo, useMemo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FaUniversity, FaReceipt, FaUser, FaBook, FaCalendarAlt, FaRupeeSign, FaCreditCard, FaRegCalendar } from "react-icons/fa";

const AdmissionReceipt = memo(function AdmissionReceipt() {
  const ref = useRef(null);

  const receipt = useMemo(() => ({
    university: "ABC University of Technology",
    receiptNo: "ADM-2024-00921",
    student: "Nitish Kumar",
    course: "B.Tech Computer Science",
    year: "2024–2028",
    amount: "₹40,000",
    mode: "Online (UPI)",
    date: "2024-07-01"
  }), []);

  const rows = useMemo(() => [
    { label: "University", value: receipt.university, icon: <FaUniversity /> },
    { label: "Receipt No", value: receipt.receiptNo, icon: <FaReceipt /> },
    { label: "Student", value: receipt.student, icon: <FaUser /> },
    { label: "Course", value: receipt.course, icon: <FaBook /> },
    { label: "Academic Year", value: receipt.year, icon: <FaCalendarAlt /> },
    { label: "Amount Paid", value: receipt.amount, icon: <FaRupeeSign /> },
    { label: "Payment Mode", value: receipt.mode, icon: <FaCreditCard /> },
    { label: "Date", value: receipt.date, icon: <FaRegCalendar /> },
  ], [receipt]);

  /* ---------- GSAP APPEARANCE ---------- */
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const items = ref.current.querySelectorAll(".receipt-row");
      gsap.fromTo(
        items,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );

      // Hover animation
      items.forEach(item => {
        const enter = () => gsap.to(item, { scale: 1.03, boxShadow: "0 12px 20px rgba(0,0,0,0.15)", duration: 0.3, ease: "power3.out" });
        const leave = () => gsap.to(item, { scale: 1, boxShadow: "0 4px 8px rgba(0,0,0,0.08)", duration: 0.3, ease: "power3.out" });
        item.addEventListener("pointerenter", enter);
        item.addEventListener("pointerleave", leave);

        // cleanup
        return () => {
          item.removeEventListener("pointerenter", enter);
          item.removeEventListener("pointerleave", leave);
        };
      });
    }, ref);

    return () => ctx.revert();
  }, [rows]);

  return (
    <div ref={ref} className="card bg-[var(--card)] shadow-lg rounded-xl p-6 space-y-4">
      <h2 className="text-xl font-semibold text-[var(--text)] ">Admission Receipt</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {rows.map((row, i) => (
          <div
            key={i}
            className="receipt-row flex items-center gap-3 p-3 bg-[var(--card-light)] rounded-lg shadow-sm cursor-pointer"
          >
            <div className="text-[var(--primary)] text-lg">{row.icon}</div>
            <div className="flex-1">
              <p className="text-xs text-[var(--muted)]">{row.label}</p>
              <p className="font-medium text-[var(--text)]">{row.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default AdmissionReceipt;
