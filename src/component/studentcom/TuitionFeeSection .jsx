import { memo, useMemo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const TuitionFeeSection = memo(function TuitionFeeSection() {
  const ref = useRef(null);

  const feeData = useMemo(() => ([
    { sem: 1, total: 40000, payments: [{ amount: 40000, method: "Online (UPI)", date: "2024-07-10" }] },
    { sem: 2, total: 40000, payments: [{ amount: 20000, method: "Cash (Office)", date: "2025-01-05" }] },
    { sem: 3, total: 40000, payments: [] }
  ]), []);

  const computed = useMemo(() => {
    const firstUnpaidIndex = feeData.findIndex(s => {
      const paid = s.payments.reduce((a, p) => a + p.amount, 0);
      return s.total - paid > 0;
    });

    return feeData.map((s, i) => {
      const paid = s.payments.reduce((a, p) => a + p.amount, 0);
      const due = s.total - paid;
      return { ...s, paid, due, completed: due === 0, showPay: i === firstUnpaidIndex && due > 0 };
    });
  }, [feeData]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".fee-card",
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }
      );
    }, ref);
    return () => ctx.revert();
  }, [computed]);

  return (
    <div ref={ref} className="space-y-6">
      <h2 className="text-xl font-semibold text-[var(--text)]">Tuition Fees</h2>

      {/* ---------- DESKTOP TABLE ---------- */}
      <div className="hidden md:block border rounded-xl overflow-hidden shadow-md">
        <div className="grid grid-cols-12 text-xs opacity-70 bg-[var(--card)] border-b px-4 py-2 font-medium">
          <span className="col-span-1">Sem</span>
          <span className="col-span-3">Paid</span>
          <span className="col-span-3">Due</span>
          <span className="col-span-2">Total</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-1"></span>
        </div>

        {computed.map(s => (
          <div key={s.sem} className="fee-card grid grid-cols-12 px-4 py-3 border-b hover:bg-[var(--primary-light)] transition-colors rounded-md">
            <span className="col-span-1 font-medium">{s.sem}</span>

            <div className="col-span-3 text-xs space-y-1">
              {s.payments.length ? s.payments.map((p, i) => (
                <div key={i}>
                  ₹{p.amount} <br /> <span className="opacity-70">{p.date} · {p.method}</span>
                </div>
              )) : "-"}
            </div>

            <span className="col-span-3 text-xs">{s.due > 0 ? `₹${s.due}` : "-"}</span>
            <span className="col-span-2 font-medium">₹{s.total}</span>

            <span className={`col-span-2 text-xs px-2 py-1 rounded w-fit h-6 flex items-center justify-center font-medium
              ${s.completed ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
              {s.completed ? "Completed" : "Pending"}
            </span>

            <div className="col-span-1 flex justify-center items-center">
              {s.showPay && (
                <button className="text-xs px-3 py-1 rounded bg-[var(--primary)] text-white shadow-sm hover:scale-105 transition-transform">
                  Pay
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- MOBILE CARDS ---------- */}
      <div className="md:hidden space-y-4">
        {computed.map(s => (
          <div key={s.sem} className="fee-card bg-[var(--card)] border rounded-xl p-4 shadow hover:shadow-lg transition-all">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-[var(--text)]">Semester {s.sem}</span>
              <span className={`text-xs px-2 py-1 rounded font-medium
                ${s.completed ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
                {s.completed ? "Completed" : "Pending"}
              </span>
            </div>

            <div className="text-sm space-y-1">
              <div className="opacity-70">Paid:</div>
              {s.payments.length
                ? s.payments.map((p, i) => (
                    <div key={i} className="ml-2">₹{p.amount} · {p.method} · {p.date}</div>
                  ))
                : <div className="ml-2">-</div>
              }
            </div>

            {s.due > 0 && (
              <div className="text-sm mt-2">
                <div className="opacity-70">Due:</div>
                <div className="ml-2 font-medium">₹{s.due}</div>
              </div>
            )}

            <div className="text-sm mt-2 font-medium">Total: ₹{s.total}</div>

            {s.showPay && (
              <button className="mt-3 w-full py-2 rounded bg-[var(--primary)] text-white font-medium hover:scale-[1.03] transition-transform">
                Pay Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default TuitionFeeSection;
