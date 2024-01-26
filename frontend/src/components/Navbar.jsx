import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-5 bg-black text-white">
      <h1 className="text-xl md:text-2xl font-extrabold">
        <Link to="/">TechnoBlog</Link>
      </h1>
      {path === "/" && (
        <div className="flex items-center space-x-4">
          
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3 className="hover:underline text-xl transition duration-300">
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3 className="hover:underline text-xl transition duration-300">
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu} className="hover:underline cursor-pointer transition duration-300">
            <p className="relative text-xl">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3 className="text-white text-2xl hover:underline text-xl transition duration-300">
    <Link to="/register">Register</Link>
  </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-xl">
        <p className="cursor-pointer relative hover:text-gray-500 transition duration-300">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
