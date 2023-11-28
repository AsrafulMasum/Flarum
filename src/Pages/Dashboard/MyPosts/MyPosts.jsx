import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import useAuth from "../../../Hooks/useAuth";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const MyPosts = () => {
  const { user } = useAuth();
  const postURL = `/posts-by-email/${user?.email}`;
  const { data: userPost, refetch } = useLoadSecureData(postURL);

  const axiosSecure = useAxiosSecure()

  const handleDelete = async (id) => {
    const res = await axiosSecure.delete(`/posts/${id}`)
    if(res.data.success){
      toast.success("Deleted")
      refetch()
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>VoteCount</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userPost?.map((post, idx) => (
              <tr key={post?._id}>
                <th>{idx + 1}</th>

                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{post?.title}</div>
                    </div>
                  </div>
                </td>

                <td className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <BiSolidLike className="text-primary"></BiSolidLike>
                    <p>{post?.upVote}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <BiSolidDislike className="text-primary"></BiSolidDislike>
                    <p>{post?.downVote}</p>
                  </div>
                </td>

                <td>
                  <button className="btn btn-xs text-white bg-textColor hover:text-textColor duration-300">Comments</button>
                </td>

                <th>
                  <button onClick={() => handleDelete(post?._id)} className="btn btn-outline btn-xs hover:bg-textColor duration-300">Delete</button>
                </th>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPosts;