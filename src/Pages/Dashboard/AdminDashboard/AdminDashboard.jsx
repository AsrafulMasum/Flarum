import useAuth from "../../../Hooks/useAuth";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";


const AdminDashboard = () => {

  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser } = useLoadSecureData(userURL);

  return (
    <div>
      <div className="flex items-center gap-10">
        <img
          className="w-56 h-56 object-cover rounded-full"
          src={dbUser?.photoURL}
          alt="Image"
        />

        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="font-medium">Name :</p>
            <h2 className="text-xl font-medium">{dbUser?.name}</h2>
          </div>
          <div>
            <p className="font-medium">Email :</p>
            <h4 className="text-xl font-medium">{dbUser?.email}</h4>
          </div>
          <div>
            <p className="font-medium">Badge :</p>
            <p className="text-xl font-medium">
              {dbUser?.badge === "bronze" ? "Bronze" : "Gold"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;