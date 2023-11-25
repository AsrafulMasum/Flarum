import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <div className="flex flex-col p-10 gap-4">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/dashboard/cart">Cart</Link>
        <Link to="/dashboard/payments/history">Payment History</Link>
        <div className="divider"></div> 
        <Link to="/">Home</Link>
        <Link to="/menus">Menus</Link>
      </div>
    </div>
  );
};

export default SideBar;
