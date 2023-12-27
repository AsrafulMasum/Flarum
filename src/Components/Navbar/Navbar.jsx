import "./Navigation.css";
import UserDropdown from "./UserDropdown";
import { IoMdNotifications } from "react-icons/io";
import logo from "/favicon.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import LayoutContainer from "../../Layout/LayoutComponent/LayoutContainer";
import useLoadPublicData from "../../Hooks/useLoadPublicData";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser } = useLoadPublicData(userURL);

  const announcementsURL = "/announcement";
  const { data: allAnnouncements, refetch } = useLoadPublicData(announcementsURL);

  const [announcementCount, setAnnouncementCount] = useState(0)
  const [oldAnnouncementCount, setOldAnnouncementCount] = useState(0)
  const [newAnnouncementCount, setNewAnnouncementCount] = useState(0)

  useEffect(() => {
    setAnnouncementCount(allAnnouncements?.length)
    refetch();
  }, [announcementCount, refetch, allAnnouncements]);

  useEffect(() => {
    if(announcementCount > oldAnnouncementCount){
      const newAnnouncements = announcementCount - oldAnnouncementCount
      setNewAnnouncementCount(newAnnouncements)
      setOldAnnouncementCount(announcementCount)
    }
  }, [announcementCount, oldAnnouncementCount]);

  // console.log(newAnnouncementCount);

const handleNewAnnouncement = () => {
  setNewAnnouncementCount(0)
}

  // const notificationCountURL = "/announcement/count";
  // const { data: notificationCount } = useLoadPublicData(notificationCountURL);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {dbUser?.badge === "bronze" && (
        <li>
          <NavLink to="/membership">Membership</NavLink>
        </li>
      )}
      <li>
        <div className="text-right">
          <Menu as="div" className="relative inline-block text-left">
            <NavLink>
              <Menu.Button onClick={handleNewAnnouncement} className="relative text-white ">
                <IoMdNotifications className="text-2xl"></IoMdNotifications>
                {newAnnouncementCount > 0 && (
                  <p className="absolute -top-2 -right-1 rounded-full bg-red-500 px-1 tew">
                    {newAnnouncementCount}
                  </p>
                )}
              </Menu.Button>
            </NavLink>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-4 space-y-2">
                  {
                    allAnnouncements?.map(announcement => <Menu.Item key={announcement?._id}>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-primary text-white flex items-center gap-4" : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-4`}
                        >
                          <img className="w-10 rounded-full" src={announcement?.photoURL} alt="" />
                          <p>{announcement?.title}</p>
                        </button>
                      )}
                    </Menu.Item>)
                  }
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </li>
    </>
  );

  return (
    <div className="w-full fixed bg-[#27485C] bg-opacity-90 z-50">
      <LayoutContainer>
        <div className="w-full navbar px-0">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-white"
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
          <div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {navLinks}
              </ul>
            </div>
            <div className="ml-4">
              {user ? (
                <UserDropdown></UserDropdown>
              ) : (
                <Link
                  to="/logIn"
                  className="btn btn-sm btn-outline text-white px-6 hover:bg-textColor"
                >
                  Join Us
                </Link>
              )}
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Navbar;
