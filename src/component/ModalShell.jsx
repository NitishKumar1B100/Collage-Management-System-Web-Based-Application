// ModalShell.jsx
import { memo, useCallback, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Backdrop from "./Backdrop";

const ModalShell = memo(function ModalShell({
  title,
  children,
  footer,
  onClose,
}) {
  const modalRef = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 24, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35 }
    );
  }, []);

  // INTERNAL close (ref-based)
  const animateClose = useCallback(() => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 16,
      scale: 0.96,
      duration: 0.25,
      onComplete: onClose,
    });
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <Backdrop onClose={animateClose} />

      <div className="relative w-full h-full flex items-center justify-center">
        <div
          ref={modalRef}
          className="w-[90%] max-w-4xl rounded-xl p-6
                     bg-[var(--overlay-bg)] shadow-2xl"
        >
          {title && <h3 className="mb-8 text-[var(--text)]">{title}</h3>}

          {children}

          {footer && (
            <div className="mt-5" onClickCapture={(e) => {
              if (e.target.closest("[data-modal-close]")) {
                animateClose();
              }
            }}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ModalShell;
