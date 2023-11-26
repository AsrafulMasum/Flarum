import bannerBG from "../../assets/bannerBG.jpg";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${bannerBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="h-full flex justify-center items-center">
      <form className="w-2/3 flex">
        <input className="w-full h-12 outline-none px-10 rounded-l" type="text" name="search" />
        <button className="bg-primary w-28 rounded-r text-white flex items-center justify-center text-xl"><FaSearch /></button>
      </form>
      </div>
    </div>
  );
};

export default Home;
