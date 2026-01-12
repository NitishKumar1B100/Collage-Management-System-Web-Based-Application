import { CiLogout } from "react-icons/ci";
import { ThemeCustomeHook } from "../../context/Theme/ThemeCustomeHook";
import UniversitySupport from "../../pages/FeedbackSupport";

function SettingSection() {
  const {theme, toggleTheme } = ThemeCustomeHook()
  return (
<>

    <div className="card relative ">
      <h2 className="font-semibold mb-4">Settings</h2>
      <button
        onClick={()=>toggleTheme()}
        className="px-4 py-2 rounded bg-[var(--primary)] text-white"
      >
        Switch to {theme === "dark" ? "Light" : "Dark"} Theme
      </button>
            <button
          className="md:hidden absolute right-0 top-0  mt-auto px-4 py-2 rounded-lg
           text-red-400 text-sm flex items-center justify-start gap-1 
            cursor-pointer"
        >
        <b> <CiLogout size={16} /> </b> Logout
        </button>

    </div>
          <div className="md:hidden">
        
        <UniversitySupport/>
      </div>
      
  
</>
  );
}
export default SettingSection;