import type { NavItem } from "@/types/nav";

// Material UI Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined"; // Thought
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"; // Create
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined"; // Quotes
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined"; // Sites
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined"; // Profile
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined"; // User Management
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined"; // Content Management
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined"; // Terms

// Primary links for public/user browsing
export const userNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: HomeOutlinedIcon },
  { label: "Thought", href: "/thoughts", icon: PsychologyOutlinedIcon },
  { label: "Create", href: "/create", icon: AddCircleOutlineOutlinedIcon },
  { label: "Quotes", href: "/quotes", icon: FormatQuoteOutlinedIcon },
  { label: "Sites", href: "/sites", icon: LanguageOutlinedIcon },
];

// Management links for admin operations
export const adminNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: HomeOutlinedIcon },
  {
    label: "User Management",
    href: "/users",
    icon: ManageAccountsOutlinedIcon,
  },
  {
    label: "Content Management",
    href: "/contents",
    icon: AutoStoriesOutlinedIcon,
  },
  { label: "Create", href: "/create", icon: AddCircleOutlineOutlinedIcon },
  { label: "Profile", href: "/profile", icon: PersonOutlineOutlinedIcon },
];

// Shared links available to every visitor and role
export const sharedUtilityItems: NavItem[] = [
  { label: "Settings", href: "/settings", icon: SettingsOutlinedIcon },
  { label: "About Us", href: "/about", icon: InfoOutlinedIcon },
  { label: "Terms & Conditions", href: "/terms", icon: GavelOutlinedIcon },
];
