import useAuth from "../../../Hooks/useAuth";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";

const UserDashboard = () => {
  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser } = useLoadSecureData(userURL);

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <img
          className="w-56 h-56 object-cover rounded-full"
          src={dbUser?.photoURL}
          alt="Image"
        />
        <div className="flex justify-center items-center">
          <h2 className="text-4xl">{dbUser?.name}</h2>
          <p className="badge badge-info gap-2">
            {dbUser?.badge === "bronze" && "Bronze"}
          </p>
        </div>
        <h4>{dbUser?.email}</h4>
      </div>
    </div>
  );
};

export default UserDashboard;
