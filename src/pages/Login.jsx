import {
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
  memo
} from "react";
import gsap from "gsap";
import { GoSun } from "react-icons/go";
import { IoMoon } from "react-icons/io5";


const Login = memo(function Login({theme, toggleTheme}) {
  const containerRef = useRef(null);

  const animationConfig = useMemo(
    () => ({
      from: { opacity: 0, y: 40 },
      to: { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    }),
    []
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        animationConfig.from,
        animationConfig.to
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationConfig]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
  }, []);



  return (
    <main
      className={`${theme} min-h-screen flex items-center justify-center px-4 transition-colors duration-300`}
    >
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 theme-icon-btn"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (<GoSun/>) : (<IoMoon/>)}
      </button>

      <section
        ref={containerRef}
        className="login-card w-full max-w-md rounded-xl p-8 shadow-xl transition-colors duration-300"
      >
        <h1 className="text-2xl font-semibold text-center">
          College Portal
        </h1>

        <p className="text-sm text-center opacity-70 mt-2">
          Student and Faculty Access
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="block text-sm mb-1">College Email</label>
            <input type="email" required className="login-input" />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input type="password" required className="login-input" />
          </div>

          <button type="submit" className="login-btn w-full py-2 rounded-md">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-sm underline cursor-pointer">
          Forget Password
        </p>

        <footer className="mt-6 text-center text-xs opacity-60">
          Authorized users only
        </footer>
      </section>
    </main>
  );
});

export default Login;
