import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";
import { RiAdminLine } from "react-icons/ri";

const ManageUsers = () => {
  const usersURL = "/users";
  const { data: allUsers, refetch } = useLoadSecureData(usersURL);

  const axiosSecure = useAxiosSecure();

  const handleMakeUser = async (email) => {
    const userInfo = {
      role: "admin",
    };
    const res = await axiosSecure.put(`/users/${email}`, userInfo);
    if(res.data.modifiedCount){
      refetch()
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.map((user, idx) => (
              <tr key={user?._id}>
                <th>{idx + 1}</th>

                <td>
                  <div className="font-bold">{user?.name}</div>
                </td>

                <td>
                  <div>{user?.email}</div>
                </td>

                <th className="">{user?.role}</th>

                <td>
                  {user?.role === "user" && (
                    <button
                      onClick={() => handleMakeUser(user?.email)}
                      title="Make Admin"
                      className="btn btn-xs text-white bg-textColor hover:text-textColor duration-300"
                    >
                      <RiAdminLine></RiAdminLine>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
