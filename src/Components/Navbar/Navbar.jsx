import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import LayoutContainer from "../../Layout/LayoutComponent/LayoutContainer";
import UserDropdown from "./UserDropdown";
import useAuth from "../../Hooks/useAuth";
import logo from '/favicon.png'

const Navbar = () => {
  const { user } = useAuth();

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/menus">Menus</NavLink>
      </li>
      <li>
        <NavLink to="/shop">Shop</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full fixed bg-[#27485CFC] z-50">
      <LayoutContainer>
        <div className="navbar">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 flex items-center gap-4 px-2 mx-2 text-2xl text-white font-bold leading-none">
            <img className="w-12" src={logo} alt="LOGO" />
            <p>Flarum</p>
          </div>
          <div className="flex-none hidden lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              {navLinks}
            </ul>
          </div>
          <div>
            {user ? (
              <UserDropdown></UserDropdown>
            ) : (
              <Link
                to="/logIn"
                className="btn btn-sm bg-primary border-none text-white px-6 hover:bg-textColor"
              >
                LogIn
              </Link>
            )}
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Navbar;
