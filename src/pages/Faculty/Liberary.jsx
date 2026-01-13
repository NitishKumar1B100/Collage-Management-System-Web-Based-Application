import { useState, useCallback, memo } from "react";
import profilepic from "../../assest/profile.webp";
import ProfileSection from "../../component/ProfileSection";
import SettingSection from "../../component/studentcom/SettingSection";
import UniversitySupport from "../FeedbackSupport";
import Books from "../../component/studentcom/Books";
import { CiLogout } from "react-icons/ci";
import { FaClipboardList, FaUserTie } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { ImFeed } from "react-icons/im";
import LibraryWork from "../../component/librarian/LibraryWork";


const LIBERARY_NAV_ITEMS = [
    
      { key: "profile", label: "Profile", icon: FaUserTie },
      { key: "work", label: "Work", icon: FaClipboardList },
      { key: "setting", label: "Setting", icon: IoSettings },
      { key: "Feedback&Support", label: "Feedback & Support", icon: ImFeed },
]

const Liberary = memo(function Liberary({ theme }) {
  const [section, setSection] = useState("profile");

  const renderSection = useCallback(() => {
    switch (section) {
      case "profile":
        return (
     <ProfileSection
  role="library"
  data={{
    libraryId:'CS2599CT',
    name: "Central Library",
    uid: "LIB001",
    avatar: profilepic,
    email: "library@college.edu",
    incharge: "Mr. R. Kumar",
    department: "Library & Information Science",
    totalBooks: 12000,
    issuedBooks: 3500,
  }}
/>

        );
      case "work":
        return <LibraryWork />;
      case "setting":
        return <SettingSection />;
      case "Feedback&Support":
        return <UniversitySupport />;
      default:
        return null;
    }
  }, [section]);

  return (
<div className={`${theme} h-screen flex bg-[var(--bg)] text-[var(--text)]`}>
      {/* DESKTOP SIDEBAR */}
<aside className="hidden md:flex w-64 flex-col teacher-sidebar p-4">
  <h2 className="text-xl font-semibold mb-6 tracking-wide">
          Library Panel
        </h2>

        {LIBERARY_NAV_ITEMS.map(({ key, label, icon: Icon }) => (
<button
      key={key}
      data-key={key}
      onClick={() => setSection(key)}
      className={`teacher-nav-btn student-nav-btn px-4 py-2 rounded-lg mb-2
        ${section === key ? "active" : ""}
      `}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
        ))}

    <button
      className="mt-auto px-4 py-2 rounded-lg text-red-400 text-xl flex items-center justify-start gap-1  hover:bg-[#ff000022] cursor-pointer hidden md:flex"
    >
    <b> <CiLogout size={23} /> </b> Logout
    </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-6">
        {renderSection()}
      </main>

      {/* MOBILE NAV */}
      <nav className="h-15 fixed bottom-0 left-0 right-0 md:hidden bg-[var(--card)] border-t border-[var(--border)]">
        <div className="grid grid-cols-3">
          {LIBERARY_NAV_ITEMS.map(({ key, icon: Icon }) => (
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

export default Liberary;
