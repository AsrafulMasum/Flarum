import { useState } from "react";
import user from "../../../assets/user.png"
import { BiLike, BiSolidLike, BiDislike, BiSolidDislike } from "react-icons/bi";
import { GoCommentDiscussion } from "react-icons/go";
import { Link } from "react-router-dom";

const PostCard = () => {
  const [isLiked, setIsLiked] = useState(true);
  const [isDisLiked, setIsDisLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDisLike = () => {
    setIsDisLiked(!isDisLiked);
  };

  return (
    <div>
      <div className="max-w-sm my-10 bg-white border rounded shadow-md hover:shadow-2xl mx-auto duration-500">
        <div className="p-5">
          <div>
            <div className="flex justify-between items-center gap-4 my-4">
              <img className="w-20" src={user} alt="User" />
              <Link className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Noteworthy technology acquisitions 2021
              </Link>
            </div>
            <div className="flex justify-between items-center text-lg">
              <Link>tags</Link>
              <p>time</p>
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
                <div>4</div>
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
                <div>1</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p>5</p>
              <GoCommentDiscussion className="text-2xl cursor-pointer"></GoCommentDiscussion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
