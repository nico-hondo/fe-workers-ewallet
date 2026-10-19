import { CiMail } from "react-icons/ci";
import { MdOutlinePhone } from "react-icons/md";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import iconWallet from "../../assets/wallet-icon.png";
const Footer = () => {
  return (
    <footer className="flex flex-col justify-between bg-brand-primary px-5 pt-10 md:px-10 lg:px-25">
      <div className="flex flex-col gap-10 pb-10 lg:flex-row lg:justify-between">
        {/* E-wallet Section */}
          <section className="flex w-full flex-col items-start gap-5 lg:w-1/3">
          <div className="flex w-full items-center gap-4">
            <img src={iconWallet} width={40} />
            <h1 className="text-3xl md:text-2xl font-semibold text-white">E-Wallet</h1>
          </div>

          <p className="text-white text-lg md:text-sm font-light font-montserrat">
            Worker Wallet makes money transfers and top-ups simpler and more affordable for workers, with lower transfer fees to help you save more on every transaction.
          </p>
        </section>

        {/* Get In Touch Section */}
        <section className="flex flex-col gap-5">
          <h1 className="text-left text-lg md:text-base font-montserrat font-medium text-white">GET IN TOUCH</h1>
          {/* Telephone */}
          <div className="flex items-center gap-5">
            <MdOutlinePhone className="text-white text-xl md:text-lg" />
            <h3 className="text-lg md:text-sm font-montserrat text-white">+62 812 8882 9901</h3>
          </div>
          {/* Email */}
          <div className="flex items-center gap-5">
            <CiMail className="text-white text-xl md:text-lg" />
            <h3 className="text-lg md:text-sm font-montserrat text-white">contact@w-wallet.com</h3>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="flex flex-col gap-5">
          <h1 className="text-left text-lg md:text-base font-montserrat font-medium text-white">SOCIAL MEDIA</h1>
          <div className="flex gap-5">
            <FaTwitter className="bg-white w-10 h-10 rounded-[50%] p-2" />
            <FaFacebookF className="bg-white w-10 h-10 rounded-[50%]  p-2" />
            <FaInstagram className="bg-white w-10 h-10 rounded-[50%]  p-2" />
            <FaGithub className="bg-white w-10 h-10 rounded-[50%]  p-2" />
          </div>
        </section>

        {/* Newslatter */}
        <form className="flex flex-col lg:w-1/4 gap-5">
          <h1 className="text-left text-lg md:text-base font-montserrat font-medium text-white">NEWSLETTER</h1>
          <div className="relative w-full h-full flex items-center ">
            <CiMail className="absolute left-3 text-lg font-medium text-gray-800" />
            <input
              type="text"
              name="email"
              placeholder="Enter your Email "
              className="pl-10 bg-white w-full text-base p-3 rounded-xl placeholder:text-base placeholder:text-gray-400"
            />
          </div>
          <button className="w-full bg-white p-2 rounded-xl text-brand-secondary hover:bg-blue-600 hover:text-brand-gray text-lg md:text-base font-medium cursor-pointer">
            Subscribe
          </button>
        </form>
      </div>
      <hr className="text-white" />
      <div className="text-center text-sm py-5 text-white font-montserrat">
        <h3>© Copyright 2026, All Rights Reserved by Worker Wallet</h3>
      </div>
    </footer>
  );
};

export default Footer;
