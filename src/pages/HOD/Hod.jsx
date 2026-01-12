import { useState, useCallback, memo } from "react";
import profilepic from "../../assest/profile.webp";
import ProfileSection from "../../component/ProfileSection";
import SettingSection from "../../component/studentcom/SettingSection";
import { CiLogout } from "react-icons/ci";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaDatabase,
  FaUserShield,
  FaBook,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

/* ================= HOD SECTIONS ================= */

import HodAcademicOversight from "../../component/hod/HodAcademicOversight";
import HodFacultyResearch from "../../component/hod/HodFacultyResearch";
import HodCurriculum from "../../component/hod/HodCurriculum";
import HodPlanningCompliance from "../../component/hod/HodPlanningCompliance";
import { ImFeed } from "react-icons/im";
import UniversitySupport from "../FeedbackSupport";

/* ================= NAV ================= */

const HOD_NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: FaUserShield },
  { key: "students", label: "Academic Oversight", icon: FaUsers },
  { key: "faculty", label: "Faculty & Research", icon: FaChalkboardTeacher },
  { key: "curriculum", label: "Curriculum", icon: FaBook },
  { key: "planning", label: "Planning & Compliance", icon: FaDatabase },
  { key: "setting", label: "Setting", icon: IoSettings },
    { key: "Feedback&Support", label: "Feedback & Support", icon: ImFeed },
  
];

/* ================= MAIN ================= */

const Hod = memo(function Hod({ theme }) {
  const [section, setSection] = useState("profile");

  const renderSection = useCallback(() => {
    switch (section) {
      case "profile":
        return (
<ProfileSection
  role="hod"
  data={{
    name: "Head of Department",
    uid: "HOD001",
    avatar: profilepic,

    employeeId: "EMP-HOD-001",
    email: "hod@college.edu",
    department: "Computer Science & Engineering",
    office: "Block A · Room 302",
    experience: "14 Years",
  }}
/>

        );

      case "students":
        return <HodAcademicOversight />;

      case "faculty":
        return <HodFacultyResearch />;

      case "curriculum":
        return <HodCurriculum />;

      case "planning":
        return <HodPlanningCompliance />;

      case "setting":
        return <SettingSection />;
      case "Feedback&Support":
        return  <UniversitySupport/>;
      default:
        return null;
    }
  }, [section]);

  return (

        <div className={`${theme} h-screen flex bg-[var(--bg)] text-[var(--text)] `}>
          {/* DESKTOP SIDEBAR */}
    <aside className="hidden md:flex w-64 flex-col teacher-sidebar p-4">
      <h2 className="text-xl font-semibold mb-6 tracking-wide">
        HOD Panel
      </h2>
    
      {HOD_NAV_ITEMS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          data-key={key}
          onClick={() => setSection(key)}
          className={`teacher-nav-btn student-nav-btn hod-nav-btn px-4 py-2 rounded-lg mb-2
            ${section === key ? "active" : ""}
          `}
        >
          <Icon size={18} />
          <span className="text-[15.22px]">{label}</span>
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
            <div className="grid grid-cols-4">
              {HOD_NAV_ITEMS.map(({ key, icon: Icon }) => (
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

export default Hod;
