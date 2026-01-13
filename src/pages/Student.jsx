import { useState, useCallback, memo } from "react";
import { FaUserGraduate } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { ImFeed } from "react-icons/im";

import ProfileSection from "../component/ProfileSection";
import WorkSection from "../component/studentcom/WorkSection";
import PaymentSection from "../component/studentcom/PaymentSection";
import SettingSection from "../component/studentcom/SettingSection";
import { FaBookOpen } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";

import profilepic from "../assest/profile.webp"
import Books from "../component/studentcom/Books";
import FeedbackSupport from "./FeedbackSupport";

const NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: FaUserGraduate},
  { key: "work", label: "Work", icon: FaClipboardList},
  { key: "payment", label: "Payment", icon: BsFillCreditCard2BackFill },
  { key: "Books", label: "Books", icon: FaBookOpen },
  { key: "setting", label: "Setting", icon: IoSettings },
  { key: "Feedback&Support", label: "Feedback & Support", icon: ImFeed },
];

const Student = memo(function Student({theme}) {
  const [section, setSection] = useState("profile");
  const [workFilter, setWorkFilter] = useState("all");

 
  const renderSection = useCallback(() => {
    switch (section) {
      case "profile":
        return <ProfileSection
  role="student"
  data={{
    name: "Nitish Kumar",
    uid: "STU20240123",
    avatar: profilepic,
    enrollmentNo: "ENR12345",
    rollNo: "21CSE045",
    email: "student@college.edu",
    father: "Raj Kumar",
    mother: "Sita Devi",
    course: "B.Tech",
    branch: "CSE",
    semester: "5",
    joinedYear: "2022",
  }}
/>
;
      case "work":
        return <WorkSection workFilter={workFilter} setWorkFilter={setWorkFilter} />;
      case "payment":
        return <PaymentSection />;
      case "setting":
        return <SettingSection />;
      case "Books":
        return  <Books/>;
      case "Feedback&Support":
        return  <FeedbackSupport/>;
      default:
        return null;
    }
  }, [section, workFilter]);

  return (
    <div className={`${theme} h-screen flex bg-[var(--bg)] text-[var(--text)] `}>
      {/* ---------- DESKTOP SIDEBAR ---------- */}
  <aside className="hidden md:flex w-64 flex-col student-sidebar p-4">
  <h2 className="text-xl font-semibold mb-6 tracking-wide">
    Student Panel
  </h2>

  {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
    <button
      key={key}
      data-key={key}
      onClick={() => setSection(key)}
      className={`student-nav-btn px-4 py-2 rounded-lg mb-2
        ${section === key ? "active" : ""}
      `}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  ))}

  {/* ---------- LOGOUT BUTTON ---------- */}
  <button
    className="mt-auto px-4 py-2 rounded-lg text-red-400 text-xl flex items-center justify-start gap-1  hover:bg-[#ff000022] cursor-pointer hidden md:flex"
  >
  <b> <CiLogout size={23} /> </b> Logout
  </button>
</aside>



      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1 p-4 md:p-6 transition-opacity duration-300">
        {renderSection()}
      </main>

      {/* ---------- MOBILE BOTTOM NAV ---------- */}
      <nav className="h-15 fixed bottom-0 left-0 right-0 md:hidden bg-[var(--card)] border-t border-[var(--border)]">
        <div className="grid grid-cols-5">
          {NAV_ITEMS.map(({key, icon:Icon}) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`flex flex-col items-center justify-center py-3 transition-all duration-200
                ${section === key
                  ? "text-[var(--primary)] scale-110"
                  : "opacity-70"
                }`}
            >
                <Icon size={25} />
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
});

export default Student;

