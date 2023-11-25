import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";


const UserDropdown = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut().then();
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-slate-400 rounded-box w-52"
        >
          <li>
            <Link className="justify-between text-black">
              Profile({user?.displayName.split(" ")[0]})
              <span className="badge">New</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-black">Dashboard</Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="bg-nav-color text-white mt-1"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
