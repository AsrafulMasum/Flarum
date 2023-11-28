import PostCard from "../../../Components/Shared/PostCard/PostCard";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";

const Posts = () => {
  const allPostsURL = "/posts";
  const { data: allPosts, refetch } = useLoadPublicData(allPostsURL);

  return (
    <div>
      <LayoutContainer>
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
