import { useState } from "react";
import {
  LuBanknote,
  LuHistory,
  LuLogOut,
  LuSend,
  LuUser,
} from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { logoutUser } from "../../redux/slice/authSlice";
import { logout } from "../../redux/slice/userSlice";
import LogoutModal from "../../modals/LogoutModal";

const Sidebar = () => {
  const baseClass =
    "flex gap-4 cursor-pointer transition-colors duration-300 ease-in-out items-center p-2 rounded-xl hover:bg-brand-secondary hover:text-white";

  const activeClass = "bg-brand-secondary text-white";

  const logoutClass = "flex gap-5 cursor-pointer transition-colors duration-300 ease-in-out text-red-600 items-center p-3 rounded-xl hover:bg-brand-red hover:text-white mt-auto"

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openLogoutModal = () => {
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

  return (
    <>
      <aside className="hidden lg:flex lg:w-1/5 h-full border-r border-gray-300 overflow-y-auto bg-white shrink-0">
        <nav className="flex flex-col gap-2 pl-7 pr-7 pt-6 pb-5 w-full justify-between h-full">
          <div className="flex flex-col gap-2">
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/dashboard"
            >
              <MdSpaceDashboard className="text-xl" />
              <h1 className="font-light">Dashboard</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/transfer"
            >
              <LuSend className="text-xl"/>
              <h1 className="font-light">Transfer</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/history"
            >
              <LuHistory className="text-xl" />
              <h1 className="font-light">History</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/top-up"
            >
              <LuBanknote className="text-xl" />
              <h1 className="font-light">Top Up</h1>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${baseClass} ${activeClass}` : baseClass
              }
              to="/profile"
            >
              <LuUser className="text-xl" />
              <h1 className="font-light">Profile</h1>
            </NavLink>
          </div>

          <button 
            type="button"
            onClick={openLogoutModal}
            className={logoutClass}
          
          >
            <LuLogOut className="text-xl rotate-180" />
            <h3>Keluar</h3>
          </button>
        </nav>
      </aside>

      {isLogoutModalOpen && (
        <LogoutModal closeLogoutModal={closeLogoutModal} handleConfirmLogout={handleConfirmLogout}/>
      )}
    </>
  );
};

export default Sidebar;