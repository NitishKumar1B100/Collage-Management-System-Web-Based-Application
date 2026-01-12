import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function UniversitySupport() {
  const cardRef = useRef(null);
  const successRef = useRef(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  };

  return (
    <section className="support-root">
      <div ref={cardRef} className="support-card">
        <header className="support-header">
          <h1>University Support</h1>
          <p>Feedback, issues, or requests routed to the administration.</p>
        </header>

        <form onSubmit={handleSubmit} className="support-form">
          <div className="support-grid">
            <select className="ui-field">
              <option>Student</option>
              <option>Faculty</option>
              <option>Staff</option>
              <option>Visitor</option>
            </select>

            <select className="ui-field">
              <option>Feedback</option>
              <option>Technical</option>
              <option>Academic</option>
              <option>Administrative</option>
            </select>
          </div>

          <input className="ui-field" placeholder="Subject" />

          <textarea
            rows={4}
            className="ui-field textarea"
            placeholder="Describe the issue or feedback clearly"
          />

          <button className="submit-btn">Submit</button>
        </form>

        <div ref={successRef} className="success-text">
          Submission registered. Reference ID generated.
        </div>
      </div>

      <style jsx>{`
        .support-root {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          overflow-y: auto;
          margin-top: 1rem;
        }

        .support-card {
          width: 100%;
          max-width: 50rem;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
          color: var(--text);
        }

        .support-header h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--text);
        }

        .support-header p {
          margin-top: 0.25rem;
          font-size: 0.875rem;
          color: var(--muted);
        }

        .support-form {
          margin-top: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
            .support-wrapper::-webkit-scrollbar {
      display: none; /* Chrome/Safari */
    }

        .support-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }

        .ui-field {
          width: 100%;
          padding: 0.6rem 0.75rem;
          border-radius: 0.75rem;
          background: var(--input-bg);
          border: 1px solid var(--border);
          color: var(--text);
          font-size: 0.875rem;
          outline: none;
        }

        .ui-field::placeholder {
          color: var(--muted);
        }

        .ui-field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 1px var(--primary);
        }

        .textarea {
          resize: none;
        }

        .submit-btn {
          margin-top: 0.5rem;
          width: 100%;
          padding: 0.65rem;
          border-radius: 0.75rem;
          background: var(--primary);
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: transform 0.08s ease, opacity 0.15s ease;
        }

        .submit-btn:hover {
          opacity: 0.9;
        }

        .submit-btn:active {
          transform: scale(0.98);
        }

        .success-text {
          margin-top: 1rem;
          font-size: 0.875rem;
          color: var(--book-returned-text);
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
