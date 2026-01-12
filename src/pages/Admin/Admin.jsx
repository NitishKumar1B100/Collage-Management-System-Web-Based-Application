import { useState, useCallback, memo } from "react";
import profilepic from "../../assest/profile.webp";
import ProfileSection from "../../component/ProfileSection";
import SettingSection from "../../component/studentcom/SettingSection";
import { CiLogout } from "react-icons/ci";
import { FaChalkboardTeacher, FaDatabase, FaUserPlus, FaUserShield, FaUsers, FaUsersCog } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { ImFeed } from "react-icons/im";
import AdminStudent from "../../component/admin/AdminStudent";
import AdminFaculty from "../../component/admin/AdminFaculty";
import AdminSystem from "../../component/admin/AdminSystem";
import AdminAddUser from "../../component/admin/AdminAddUser";

/* ================= NAV ================= */

const ADMIN_NAV_ITEMS = [
 { key: "profile", label: "Profile", icon: FaUserShield },

  { key: "students", label: "Students", icon: FaUsers },
  { key: "faculty", label: "Faculty", icon: FaChalkboardTeacher },

  { key: "addUser", label: "Add User", icon: FaUserPlus },

  { key: "system", label: "System", icon: FaDatabase },

  { key: "setting", label: "Setting", icon: IoSettings },
];

/* ================= MAIN ================= */

const Admin = memo(function Admin({ theme }) {
  const [section, setSection] = useState("profile");

  const renderSection = useCallback(() => {
    switch (section) {
      case "profile":
        return (
     <ProfileSection
  role="admin"
  data={{
    name: "System Administrator",
    uid: "ADMIN001",
    avatar: profilepic,

    adminId: "ADM-ROOT-01",
    email: "admin@college.edu",
    scope: "University System Control",
  }}
/>

        );
    case "students":
        return <AdminStudent />;
    case "faculty":
        return <AdminFaculty/>
    case "addUser":
        return <AdminAddUser/>
    case "system":
        return <AdminSystem/>
    case "setting":
        return <SettingSection />;

    default:
        return null;
    }
  }, [section]);

  return (
    <div className={`${theme} h-screen flex bg-[var(--bg)] text-[var(--text)]`}>
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col teacher-sidebar p-4">
        <h2 className="text-xl font-semibold mb-6 tracking-wide">
          Admin Panel
        </h2>

        {ADMIN_NAV_ITEMS.map(({ key, label, icon: Icon }) => (
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
          className="mt-auto px-4 py-2 rounded-lg text-red-400 text-xl
                     flex items-center gap-1 hover:bg-[#ff000022]"
        >
          <CiLogout size={23} /> Logout
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-6">
        {renderSection()}
      </main>

      {/* MOBILE NAV */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden
                      bg-[var(--card)] border-t border-[var(--border)]">
        <div className="grid grid-cols-6">
          {ADMIN_NAV_ITEMS.map(({ key, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`flex flex-col items-center justify-center py-3
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

export default Admin;
