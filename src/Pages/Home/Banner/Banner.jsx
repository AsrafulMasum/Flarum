import bannerBG from "../../../assets/bannerBG.jpg";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bannerBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(10, 34, 57, 0.6)",
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="min-h-screen flex flex-col justify-center items-center text-center">
        <div className="mb-10">
          <h2 className="text-white text-5xl font-semibold">WELCOME TO OUR FORUM</h2>
          <h4 className="text-white italic text-3xl mt-2">The most popular forum on the internet!</h4>
        </div>
        <form className="w-2/3 flex">
          <input
            className="w-full h-12 md:h-16 lg:h-20 text-xl outline-none px-5 rounded-l text-white bg-[#0A22398C] placeholder:text-white"
            type="text"
            name="search"
            placeholder="Enter a keyword..."
          />
          <button className="bg-primary w-24 rounded-r text-white flex items-center justify-center text-xl">
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Banner;
