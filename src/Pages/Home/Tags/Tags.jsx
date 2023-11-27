import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import LayoutContainer from "../../../Layout/LayoutComponent/LayoutContainer";
import TagsCard from "../../../Components/Shared/TagsCard/TagsCard";
import useLoadPublicData from "../../../Hooks/useLoadPublicData";

const Tags = () => {
  const tagsURL = "/tags";
  const { data: allTags } = useLoadPublicData(tagsURL);
  return (
    <div>
      <LayoutContainer>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {allTags?.map((tag) => (
            <SwiperSlide key={tag?._id}>
              <TagsCard tag={tag}></TagsCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </LayoutContainer>
    </div>
  );
};

export default Tags;
