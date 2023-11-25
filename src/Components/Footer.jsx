import { FaFacebookF, FaInstagramSquare, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <div className="flex">
        <div className="flex-1 text-center text-white bg-[#1F2937] p-10">
          <h3 className="text-2xl font-medium mb-4 uppercase">CONTACT US</h3>
          <p className="text-sm">
            123 ABS Street, Uni 21, Bangladesh <br /> +88 123456789 <br /> Mon -
            Fri: 08:00 - 22:00 <br /> Sat - Sun: 10:00 - 23:00
          </p>
        </div>
        <div className="flex-1 text-center text-white bg-[#111827] p-10">
          <h3 className="text-2xl font-medium mb-4 uppercase">Follow US</h3>
          <p className="text-sm">Join us on social media</p>
          <div className="flex justify-center items-center gap-4 text-2xl mt-4">
            <FaFacebookF className="cursor-pointer hover:text-[#bb8506]"></FaFacebookF>
            <FaInstagramSquare className="cursor-pointer hover:text-[#bb8506]"></FaInstagramSquare>
            <FaTwitter className="cursor-pointer hover:text-[#bb8506]"></FaTwitter>
          </div>
        </div>
      </div>
      <div className="footer footer-center p-4 bg-text-primary text-white">
        <aside>
          <p>Copyright © 2023 - All right reserved by BISTRO BOSS Restaurant</p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;
