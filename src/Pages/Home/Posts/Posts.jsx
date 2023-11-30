import { useEffect, useState } from "react";
import PostCard from "../../../Components/Shared/PostCard/PostCard";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";

const Posts = () => {
  const [allPosts, setAllPosts] = useState()
  const axiosPublic = useAxiosPublic()
  const allPostsURL = "/posts";
  const { data, refetch } = useLoadPublicData(allPostsURL);

  useEffect(() => {
    setAllPosts(data)
  }, [data])

  const handleSort = async () => {
    const res = await axiosPublic.get(`/posts?sort=true`)
    setAllPosts(res.data);
  }

  return (
    <div>
      <LayoutContainer>
        <div className="flex justify-end">
          <button onClick={handleSort} className="btn btn-sm bg-primary text-white hover:text-textColor mb-10 duration-300">Sort by Popularity</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPosts?.map((post) => (
            <PostCard key={post?._id} post={post} refetch={refetch}></PostCard>
          ))}
        </div>
      </LayoutContainer>
    </div>
  );
};

export default Posts;
