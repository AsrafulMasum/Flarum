import { useLocation } from "react-router-dom";
import PostCard from "../../../Components/Shared/PostCard/PostCard";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useState } from "react";

const SearchPosts = () => {
  const location = useLocation();
  const searchPosts = location.state.data;

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());

  function getSlidesPerView() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else {
      return 3;
    }
  }

  window.addEventListener('resize', () => {
    setSlidesPerView(getSlidesPerView());
  });

  return (
    <div>
      {searchPosts.length ? (
        <div className="pb-20 pt-40">
          <LayoutContainer>
            <Swiper
              slidesPerView={slidesPerView}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {searchPosts?.map((post) => (
                <SwiperSlide key={post?._id}>
                  <PostCard post={post}></PostCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </LayoutContainer>
        </div>
      ) : (
        <div className="min-h-[54.2vh] flex justify-center items-center">
          <p className="text-4xl">No data found</p>
        </div>
      )}
    </div>
  );
};

export default SearchPosts;
