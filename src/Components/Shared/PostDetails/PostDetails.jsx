import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { PiShareFat } from "react-icons/pi";
import { VscSend } from "react-icons/vsc";
import { GoCommentDiscussion } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

const PostDetails = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();
  const postURL = `/post/${id}`;
  const { data: post, refetch } = useLoadSecureData(postURL);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (post?.upVote.includes(user?.email)) {
      setIsLiked(true);
    }
    if (post?.downVote.includes(user?.email)) {
      setIsDisLiked(true);
    }
  }, [post, user]);

  const handleLike = async () => {
    if (user?.email) {
      if (post?.upVote.includes(user?.email)) {
        return;
      }
      setIsLiked(!isLiked);
      let upCount;
      if (!isLiked) {
        upCount = {
          upVote: user?.email,
        };
      } else {
        upCount = {
          upVote: user?.email,
        };
      }
      const res = await axiosPublic.put(`/posts/${post?._id}`, upCount);
      if (res.data.success) {
        refetch();
      }
    } else {
      navigate("/logIn");
    }
  };

  const handleDisLike = async () => {
    if (user?.email) {
      if (post?.downVote.includes(user?.email)) {
        return;
      }
      setIsDisLiked(!isDisLiked);
      let downCount;
      if (!isDisLiked) {
        downCount = {
          downVote: user?.email,
        };
      } else {
        downCount = {
          downVote: user?.email,
        };
      }
      const res = await axiosPublic.put(`/posts/${post?._id}`, downCount);
      if (res.data.success) {
        refetch();
      }
    } else {
      navigate("/logIn");
    }
  };

  return (
    <div className="mt-28 mb-10">
      <LayoutContainer>
        <div className="bg-white border rounded shadow-md hover:shadow-2xl mx-auto duration-500">
          <div className="p-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4 my-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={post?.photoURL}
                  alt="User"
                />
                <p className="text-lg font-bold tracking-tight text-gray-900">
                  {post?.name}
                </p>
              </div>
              <p className="text-2xl font-bold tracking-tight text-gray-900">
                {post?.title}
              </p>
              <p className="tracking-tight text-gray-900">
                {post?.description}
              </p>
              <div className="flex justify-between items-center text-lg">
                <p>{post?.tags}</p>
                <p>{post?.date.split("T")[0]}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 mt-4 border-y p-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-2xl cursor-pointer" onClick={handleLike}>
                    {isLiked ? (
                      <div>
                        <BiSolidLike className="text-primary"></BiSolidLike>
                      </div>
                    ) : (
                      <div>
                        <BiLike></BiLike>
                      </div>
                    )}
                  </div>
                  <div>{post?.upVote?.length}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="text-2xl cursor-pointer"
                    onClick={handleDisLike}
                  >
                    {isDisLiked ? (
                      <div>
                        <BiSolidDislike className="text-primary"></BiSolidDislike>
                      </div>
                    ) : (
                      <div>
                        <BiDislike></BiDislike>
                      </div>
                    )}
                  </div>
                  <div>{post?.downVote?.length}</div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <GoCommentDiscussion className="text-2xl cursor-pointer"></GoCommentDiscussion>
                <PiShareFat className="text-2xl cursor-pointer"></PiShareFat>
              </div>
            </div>
            <div className="mt-10 flex items-center gap-4">
              <div>
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  src={user?.photoURL}
                  alt="User"
                />
              </div>
              <input
                type="text"
                id="title"
                className="block py-2.5 px-4 w-full mx-auto text-sm text-gray-900 bg-transparent border rounded-full border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder="Write an answer..."
                required
              />
              <VscSend className="cursor-pointer text-2xl"></VscSend>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
};

export default PostDetails;
