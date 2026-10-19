import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaRegUser, FaIdCard } from "react-icons/fa";
import {
  LuBanknote,
  LuChevronDown,
  LuHistory,
  LuLifeBuoy,
  LuLogOut,
  LuMenu,
  LuSend,
  LuUser,
  LuX,
} from "react-icons/lu";
// import { GoAlertFill } from "react-icons/go";

import iconWallet from "../../assets/wallet-icon.png";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slice/authSlice";
import { getProfile, logout } from "../../redux/slice/userSlice";
import LogoutModal from "../../modals/LogoutModal";

const MENU_ITEMS = [
  { to: "/dashboard", label: "Dashboard", Icon: LuLifeBuoy },
  { to: "/transfer", label: "Transfer", Icon: LuSend },
  { to: "/history", label: "History", Icon: LuHistory },
  { to: "/top-up", label: "Top Up", Icon: LuBanknote },
  { to: "/profile", label: "Profile", Icon: LuUser },
];

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.user?.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const displayName = profile?.fullName || user?.fullname || "User";
  const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const userPhoto = profile?.avatar
    ? `${apiBaseUrl}/${profile.avatar.replace(/^\/+/, "")}`
    : user?.avatar || "";

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const openLogoutModal = () => {
    closeMenu();
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logoutUser());
    dispatch(logout());
    setIsLogoutModalOpen(false);
    navigate("/auth");
  };

  const baseClass =
    "flex items-center p-2 gap-5 cursor-pointer rounded-lg text-brand-primary transition-colors duration-300 ease-in-out hover:bg-brand-primary hover:text-white";
  const activeClass = "bg-brand-primary text-white";

  const logoutClass =
    "flex w-full items-center p-2 gap-5 cursor-pointer rounded-lg text-brand-red transition-colors duration-300 ease-in-out hover:bg-brand-red hover:text-white";

  return (
    <>
      <header className="relative z-30 bg-brand-primary text-white shrink-0">
        <nav className="flex items-center justify-between px-5 py-4 lg:px-12">
          <div className="flex flex-row items-center gap-3">
            <img src={iconWallet} width={40} alt="Logo" />
            <Link
              to="/"
              className="hidden md:block font-jakarta text-sm md:text-xl font-semibold"
            >
              Worker Wallet
            </Link>
          </div>

          {!user && (
            <div className="hidden gap-5 justify-between lg:flex">
              <Link
                className="w-25 h-10 border font-semibold rounded-lg cursor-pointer border-white transition-all duration-300 ease-in-out text-center flex items-center justify-center hover:bg-white hover:text-brand-primary"
                to="/auth"
              >
                Sign In
              </Link>
              <Link
                className="w-25 h-10 border font-semibold rounded-lg cursor-pointer border-white bg-white text-brand-primary transition-all duration-300 ease-in-out flex items-center justify-center hover:bg-brand-primary hover:text-white"
                to="/auth/register"
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <button
              type="button"
              onClick={toggleMenu}
              className="relative z-50 hidden cursor-pointer items-center gap-4 lg:flex"
              aria-label="Menu akun"
              aria-expanded={isMenuOpen}
            >
              <span className="text-sm font-medium"> {displayName} </span>
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-brand-white text-brand-primary">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt="Foto profil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <LuUser size={24} />
                )}
              </span>
              <LuChevronDown
                size={24}
                className={`transition-transform duration-300 ${
                  isMenuOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          )}

          <button
            type="button"
            onClick={toggleMenu}
            className="relative z-50 h-7 w-7 cursor-pointer lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <LuMenu
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <LuX
              size={28}
              className={`absolute inset-0 transition-all duration-300 ${
                isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </button>
        </nav>

        {isMenuOpen && (
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
        )}

        {user && (
          <div
            className={`absolute z-50 right-12 top-16 hidden w-48 rounded-xl border border-gray-300 bg-white p-3 shadow-2xl origin-top-right transition-all duration-300 ease-in-out lg:block ${
              isMenuOpen
                ? "visible opacity-100 translate-y-0 scale-100"
                : "invisible opacity-0 -translate-y-2 scale-95"
            }`}
          >
            <div className="flex flex-col gap-1">
              <NavLink
                to="/dashboard"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? `${baseClass} ${activeClass}` : baseClass
                }
              >
                <LuUser className="text-xl" />
                <h3 className="font-light">Dashboard</h3>
              </NavLink>

              <div className="my-1 border-t border-gray-200" />

              <button
                type="button"
                onClick={openLogoutModal}
                className={logoutClass}
              >
                <LuLogOut className="text-xl rotate-180" />
                <h3>Keluar</h3>
              </button>
            </div>
          </div>
        )}

        <div
          className={`absolute z-50 right-5 top-16 w-60 max-h-[80vh] overflow-y-auto rounded-xl border border-gray-300 bg-white p-4 shadow-2xl origin-top-right transition-all duration-300 ease-in-out lg:hidden ${
            isMenuOpen
              ? "visible opacity-100 translate-y-0 scale-100"
              : "invisible opacity-0 -translate-y-2 scale-95"
          }`}
        >
          {user ? (
            <div className="flex flex-col gap-2">
              {MENU_ITEMS.map(({ to, label, Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? `${baseClass} ${activeClass}` : baseClass
                  }
                >
                  <Icon size={24} />
                  <h3 className="font-light">{label}</h3>
                </NavLink>
              ))}

              <div className="my-1 border-t border-gray-200" />

              <button
                type="button"
                onClick={openLogoutModal}
                className={logoutClass}
              >
                <LuLogOut size={24} className="rotate-180" />
                <h3>Keluar</h3>
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-between gap-3">
              <Link
                onClick={closeMenu}
                className="flex items-center p-2 text-brand-primary gap-5 cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-brand-primary hover:text-white"
                to="/auth"
              >
                <FaRegUser />
                <h3>Sign In</h3>
              </Link>
              <Link
                onClick={closeMenu}
                className="flex items-center p-2 text-brand-red gap-5 cursor-pointer rounded-lg transition-colors duration-300 ease-in-out hover:bg-blue-700 hover:text-white"
                to="/auth/register"
              >
                <FaIdCard />
                <h3>Sign Up</h3>
              </Link>
            </div>
          )}
        </div>
      </header>

      {isLogoutModalOpen && (
        <LogoutModal closeLogoutModal={closeLogoutModal} handleConfirmLogout={handleConfirmLogout}/>
      )}
    </>
  );
};

export default Navbar;