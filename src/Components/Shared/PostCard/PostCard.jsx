import PropTypes from "prop-types";
import { useState } from "react";
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { Link } from "react-router-dom";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const PostCard = ({ post, refetch }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisLiked, setIsDisLiked] = useState(false);

  const axiosPublic = useAxiosPublic();
  const postURL = `/posts/${post?._id}`;
  const { data: voteCount } = useLoadPublicData(postURL);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    let upCount;
    if (!isLiked) {
      upCount = {
        upVote: voteCount?.upVote + 1,
      };
    } else {
      upCount = {
        upVote: voteCount?.upVote,
      };
    }
    const res = await axiosPublic.put(`/posts/${post?._id}`, upCount);
    if (res.data.success) {
      refetch();
    }
  };

  const handleDisLike = async () => {
    setIsDisLiked(!isDisLiked);
    let downCount;
    if (!isDisLiked) {
      downCount = {
        downVote: voteCount?.downVote + 1,
      };
    } else {
      downCount = {
        downVote: voteCount?.downVote,
      };
    }
    const res = await axiosPublic.put(`/posts/${post?._id}`, downCount);
    if (res.data.success) {
      refetch();
    }
  };

  return (
    <div>
      <div className="max-w-sm my-10 bg-white border rounded shadow-md hover:shadow-2xl mx-auto duration-500">
        <div className="p-5">
          <div>
            <div className="flex items-center gap-4 my-4">
              <img
                className="w-20 h-20 object-cover rounded-full"
                src={post?.photoURL}
                alt="User"
              />
              <Link className="text-2xl font-bold tracking-tight text-gray-900">
                {post?.title}
              </Link>
            </div>
            <div className="flex justify-between items-center text-lg">
              <Link>{post?.tags}</Link>
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
                <div>{post?.upVote}</div>
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
                <div>{post?.downVote}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>{post?.commentsCount}</p>
              <GoCommentDiscussion className="text-2xl cursor-pointer"></GoCommentDiscussion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

PostCard.propTypes = {
  post: PropTypes.object,
  refetch: PropTypes.func,
};
