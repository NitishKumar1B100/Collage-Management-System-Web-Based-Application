import { FaBook, FaBookOpen, FaUserTie } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { ImFeed } from "react-icons/im";
import { IoSettings } from "react-icons/io5";

export const TEACHER_NAV_ITEMS = [
  { key: "profile", label: "Profile", icon: FaUserTie },
  { key: "work", label: "Work", icon: FaClipboardList },
  { key: "Books", label: "Books", icon: FaBookOpen },
  { key: "curriculum", label: "Curriculum", icon: FaBook },
  { key: "setting", label: "Setting", icon: IoSettings },
  { key: "Feedback&Support", label: "Feedback & Support", icon: ImFeed },
];
