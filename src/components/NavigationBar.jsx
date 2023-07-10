import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosCreate } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.includes("/slideshow");

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (hideNavbar) {
    return null; // Render nothing if in the /slideshow route (This would be middleware for Admin users instead of useLocation)
  }

  return (
    <nav className="flex justify-between md:justify-around items-center py-8 px-4 sm:px-8 text-[18px] md:text-[24px]">
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-16" />
      </div>

      <div className="sm:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <RxHamburgerMenu size={25} />
        </button>
      </div>

      <ul
        className={`flex flex-col sm:flex-row gap-12 ${
          menuOpen ? "block" : "hidden"
        } sm:flex`}
      >
        <li className="flex items-center gap-2">
          <MdDashboard size={25} />
          <Link to="/">Dashboard</Link>
        </li>
        <li className="flex items-center gap-2">
          <IoIosCreate size={25} />
          <Link to="/create">Create Quiz</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
