import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import LayoutContainer from "../../Layout/LayoutComponent/LayoutContainer";
import UserDropdown from "./UserDropdown";
import useAuth from "../../Hooks/useAuth";


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
    <div className="w-full fixed bg-[#1515157F] z-50">
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
          <p className="flex-1 px-2 mx-2 text-white font-[Cinzel] font-bold leading-none">
            BISTRO BOSS
            <br />
            Restaurant
          </p>
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
                className="btn btn-sm bg-nav-color border-none text-white px-6 hover:bg-text-primary"
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
