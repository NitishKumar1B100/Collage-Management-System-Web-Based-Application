import { memo, useMemo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { FaRupeeSign, FaCalendarAlt, FaCreditCard, FaCheckCircle } from "react-icons/fa";

const ExtraPayments = memo(function ExtraPayments() {
  const ref = useRef(null);

  const payments = useMemo(() => [
    {
      name: "Convocation Ceremony",
      amount: "₹1,500",
      paidOn: "2026-03-15",
      method: "Online",
      status: "Completed"
    },
    {
      name: "Technical Fest Registration",
      amount: "₹500",
      paidOn: "2025-09-02",
      method: "Cash",
      status: "Completed"
    },
    {
      name: "Library Security Deposit",
      amount: "₹1,000",
      paidOn: "2024-07-03",
      method: "Online",
      status: "Completed"
    }
  ], []);

  /* ---------- GSAP ANIMATION ---------- */
  useLayoutEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      const cards = ref.current.querySelectorAll(".extra-card");

      // Initial mount animation
      gsap.fromTo(
        cards,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" }
      );

    
    }, ref);

    return () => ctx.revert();
  }, [payments]);

  return (
    <div ref={ref} className="space-y-4">
      <h2 className="text-xl font-semibold text-[var(--text)]">Other University Payments</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {payments.map((p, i) => (
          <div
            key={i}
            className="extra-card relative border border-[var(--border)] rounded-xl bg-[var(--card)] p-4 shadow-md cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-[var(--text)] text-lg">{p.name}</p>
              <span className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full
                ${p.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                <FaCheckCircle className="w-3 h-3" /> {p.status}
              </span>
            </div>

            <div className="flex flex-col gap-1 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <FaRupeeSign className="w-3 h-3" /> Amount: {p.amount}
              </div>
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="w-3 h-3" /> Paid On: {p.paidOn}
              </div>
              <div className="flex items-center gap-2">
                <FaCreditCard className="w-3 h-3" /> Method: {p.method}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
});

export default ExtraPayments;
