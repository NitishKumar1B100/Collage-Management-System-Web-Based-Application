import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

/* ================= CONSTANTS ================= */

const DAY = 1000 * 60 * 60 * 24;
const ROLES = ["Student", "Faculty"];

const SORTS = {
  AZ: "AZ",
  FINE_ASC: "FINE_ASC",
  FINE_DESC: "FINE_DESC",
  DATE: "DATE",
};

/* ================= PRIMITIVES ================= */

const Field = memo(({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-[var(--muted)]">{label}</label>
    {children}
  </div>
));

const Input = memo(props => (
  <input
    {...props}
    className="w-full rounded-md bg-transparent border border-[var(--border)]
               px-3 py-2 text-sm outline-none"
  />
));

const Select = memo(({ options, ...props }) => (
  <select
    {...props}
    className="w-full rounded-md bg-transparent border border-[var(--border)]
               px-3 py-2 text-sm outline-none"
  >
    {options.map(o => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
));

/* ================= HELPERS ================= */

const calcFine = issueDate => {
  const days =
    Math.floor((Date.now() - new Date(issueDate)) / DAY) - 30;
  return Math.max(0, days * 5);
};

/* ================= TRANSACTION CARD ================= */

const TransactionCard = memo(({ txn, onToggle, onReturn }) => {
  const fine = txn.status === "Issued" ? calcFine(txn.issueDate) : 0;

  return (
    <div
      onClick={onToggle}
      className="rounded-xl border border-[var(--border)]
                 bg-[var(--card)] p-4 cursor-pointer
                 hover:bg-white/5 transition"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm font-medium">{txn.book}</div>
          <div className="text-xs opacity-70">
            {txn.receiver.name} · {txn.receiver.role}
          </div>
        </div>

        <span
          className={`text-[10px] px-2 py-1 rounded-full border uppercase
            ${
              txn.status === "Issued"
                ? fine > 0
                  ? "border-rose-500/40 text-rose-400 bg-rose-500/10"
                  : "border-amber-500/40 text-amber-400 bg-amber-500/10"
                : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
            }`}
        >
          {txn.status}
        </span>
      </div>

      {txn.open && (
        <div className="mt-4 pt-4 border-t border-[var(--border)] space-y-3 text-sm">
          <Detail label="Book ID" value={txn.bookId} />
          <Detail label="Issue Date" value={txn.issueDate} />
          {txn.returnDate && (
            <Detail label="Return Date" value={txn.returnDate} />
          )}
          {fine > 0 && (
            <Detail label="Fine" value={`₹${fine}`} highlight />
          )}

          {txn.status === "Issued" && (
            <button
              onClick={e => {
                e.stopPropagation();
                onReturn(txn.id);
              }}
              className="mt-2 px-4 py-1 rounded-md
                         bg-sky-500/20 border border-sky-500/40
                         text-xs text-sky-400"
            >
              Mark as Returned
            </button>
          )}
        </div>
      )}
    </div>
  );
});

/* ================= MAIN ================= */

const LibraryWork = memo(function LibraryWork() {
  const rootRef = useRef(null);

  const [form, setForm] = useState({
    book: "",
    bookId: "",
    receiverName: "",
    receiverId: "",
    role: "",
  });

  const [transactions, setTransactions] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [sortBy, setSortBy] = useState(SORTS.DATE);

  useEffect(() => {
    gsap.fromTo(
      rootRef.current,
      { opacity: 0,   },
      { opacity: 1,  duration: 0.4, ease: "power2.out" }
    );
  }, []);

  const update = useCallback(
    key => e => setForm(f => ({ ...f, [key]: e.target.value })),
    []
  );

  const issueBook = useCallback(() => {
    if (!form.book || !form.receiverName || !form.role) return;

    setTransactions(t => [
      {
        id: crypto.randomUUID(),
        status: "Issued",
        issueDate: new Date().toISOString().slice(0, 10),
        ...form,
        receiver: {
          name: form.receiverName,
          id: form.receiverId,
          role: form.role,
        },
      },
      ...t,
    ]);

    setForm({
      book: "",
      bookId: "",
      receiverName: "",
      receiverId: "",
      role: "",
    });
  }, [form]);

  const markReturnedByTxn = useCallback(id => {
    setTransactions(txns =>
      txns.map(t =>
        t.id === id
          ? {
              ...t,
              status: "Returned",
              returnDate: new Date().toISOString().slice(0, 10),
            }
          : t
      )
    );
  }, []);

  const toggleOpen = useCallback(id => {
    setTransactions(txns =>
      txns.map(t =>
        t.id === id ? { ...t, open: !t.open } : t
      )
    );
  }, []);

  const filteredTransactions = useMemo(() => {
    if (!searchId) return transactions;
    return transactions.filter(
      t => t.receiver.id === searchId
    );
  }, [transactions, searchId]);

  const sortedTransactions = useMemo(() => {
    const list = [...filteredTransactions];

    switch (sortBy) {
      case SORTS.AZ:
        return list.sort((a, b) => a.book.localeCompare(b.book));
      case SORTS.FINE_ASC:
        return list.sort(
          (a, b) => calcFine(a.issueDate) - calcFine(b.issueDate)
        );
      case SORTS.FINE_DESC:
        return list.sort(
          (a, b) => calcFine(b.issueDate) - calcFine(a.issueDate)
        );
      case SORTS.DATE:
      default:
        return list.sort(
          (a, b) =>
            new Date(b.issueDate) - new Date(a.issueDate)
        );
    }
  }, [filteredTransactions, sortBy]);

  return (
    <div
      ref={rootRef}
      className="w-full h-[calc(100vh-30px)]
                 overflow-y-auto px-4 py-6 space-y-10"
    >
      {/* ISSUE BOOK */}
      <section className="max-w-[1150px] mx-auto bg-[var(--card)] rounded-2xl p-6">
        <h1 className="text-xl font-semibold mb-4">
          Library Issue Desk
        </h1>

        <div className="space-y-4">
          <Field label="Book Title">
            <Input value={form.book} onChange={update("book")} />
          </Field>

          <Field label="Book ID">
            <Input value={form.bookId} onChange={update("bookId")} />
          </Field>

          <div className="grid md:grid-cols-2 gap-4">
            <Field label="Receiver Name">
              <Input value={form.receiverName} onChange={update("receiverName")} />
            </Field>

            <Field label="Receiver ID">
              <Input value={form.receiverId} onChange={update("receiverId")} />
            </Field>
          </div>

          <Field label="Role">
            <select
              value={form.role}
              onChange={update("role")}
              className="w-full rounded-md bg-transparent border border-[var(--border)]
                         px-3 py-2 text-sm outline-none"
            >
              <option value="">Select</option>
              {ROLES.map(r => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Field>

          <button
            onClick={issueBook}
            className="px-6 py-2 rounded-md
                       bg-emerald-500/20 border border-emerald-500/40
                       text-sm text-emerald-400"
          >
            Issue Book
          </button>
        </div>
      </section>

      {/* RETURN + FILTER */}
      <section className="max-w-[1150px] mx-auto bg-[var(--card)] rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          Search / Filter
        </h2>

        <Field label="Search by Receiver ID">
          <Input
            value={searchId}
            onChange={e => setSearchId(e.target.value)}
            placeholder="e.g. STU1021"
          />
        </Field>

        <Field label="Sort Transactions">
          <Select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            options={[
              { value: SORTS.DATE, label: "Issued Date (Latest)" },
              { value: SORTS.AZ, label: "Book Name A–Z" },
              { value: SORTS.FINE_ASC, label: "Fine Ascending" },
              { value: SORTS.FINE_DESC, label: "Fine Descending" },
            ]}
          />
        </Field>
      </section>

      {/* TRANSACTIONS */}
      <section className="max-w-[1150px] mx-auto bg-[var(--card)] rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">
          Transactions
        </h2>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {searchId && sortedTransactions.length === 0 && (
            <p className="text-xs text-rose-400">
              No records found for this Receiver ID
            </p>
          )}

          {!searchId && sortedTransactions.length === 0 && (
            <p className="text-xs opacity-60">
              No records
            </p>
          )}

          {sortedTransactions.map(t => (
            <TransactionCard
              key={t.id}
              txn={t}
              onToggle={() => toggleOpen(t.id)}
              onReturn={markReturnedByTxn}
            />
          ))}
        </div>
      </section>
    </div>
  );
});

/* ================= DETAIL ================= */

const Detail = memo(function Detail({ label, value, highlight }) {
  return (
    <div>
      <span className="text-xs opacity-60">{label}</span>
      <div className={`font-medium ${highlight ? "text-rose-400" : ""}`}>
        {value}
      </div>
    </div>
  );
});

export default LibraryWork;
