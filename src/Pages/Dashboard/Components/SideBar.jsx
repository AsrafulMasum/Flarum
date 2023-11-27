import { IoMdNotifications } from "react-icons/io";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div>
      <div className="flex flex-col p-10 gap-4">
        <Link to="/dashboard">My Profile</Link>
        <Link to="/dashboard/addPost">Add Post</Link>
        <Link to="/dashboard/myPosts">My Posts</Link>
        <div className="divider"></div>
        <Link to="/">Home</Link>
        <Link className="flex " to="/notification">
          Notification
          <IoMdNotifications className="text-2xl"></IoMdNotifications>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
