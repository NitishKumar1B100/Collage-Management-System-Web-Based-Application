import { memo, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Backdrop = memo(function Backdrop({ onClose }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClose}
      className="absolute inset-0 backdrop-blur-md"
      style={{ backgroundColor: "var(--overlay)" }}
    />
  );
});

export default Backdrop;
