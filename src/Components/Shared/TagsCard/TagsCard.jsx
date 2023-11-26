import { FaArrowAltCircleRight } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoIosChatbubbles } from "react-icons/io";
import img from "../../../assets/bannerBG.jpg";
import { Link } from "react-router-dom";

const TagsCard = () => {
  return (
    <div>
      <div className="max-w-sm my-10 bg-white rounded shadow-md hover:shadow-2xl mx-auto duration-500">
        <div className="relative">
          <Link className="absolute top-3 left-3 py-1 px-3 bg-textColor rounded text-white flex items-center gap-1">
            <BiSolidMessageRounded className="text-lg"></BiSolidMessageRounded> <span className="font-semibold text-lg">4</span>
          </Link>

          <Link className="absolute top-3 left-20 py-1 px-3 bg-textColor rounded text-white flex items-center gap-1">
            <IoIosChatbubbles className="text-lg"></IoIosChatbubbles> <span className="font-semibold text-lg">10</span>
          </Link>
          <img className="rounded-t-lg" src={img} alt="" />
        </div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
              Noteworthy technology acquisitions 2021
            </h5>
          </div>
          <div className="flex justify-center items-center">
            <p className="mb-3 font-normal text-gray-700">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <div className="cursor-pointer">
              <FaArrowAltCircleRight className="text-3xl"></FaArrowAltCircleRight>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsCard;
