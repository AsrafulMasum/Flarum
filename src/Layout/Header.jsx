import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Drawer from "../Components/Navbar/Drawer";


const Header = () => {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <Navbar></Navbar>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <Drawer></Drawer>
    </div>
  );
};

export default Header;
