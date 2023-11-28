import PostCard from "../../../Components/Shared/PostCard/PostCard";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";

const Posts = () => {
  const allPostsURL = "/posts";
  const { data: allPosts, refetch } = useLoadPublicData(allPostsURL);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allPosts?.map((post) => (
          <PostCard key={post?._id} post={post} refetch={refetch}></PostCard>
        ))}
      </div>
    </div>
  );
};

export default Posts;
