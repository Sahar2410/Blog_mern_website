const Footer = () => {
  return (
    <>
      <div className=" w-full bg-black px-8 md:px-[300px] py-8 flex md:flex-row flex-col space-y-6 md:space-y-0 items-start md:justify-between text-md md:text-lg">
        <div className="flex flex-col text-white">
          <p className="pb-2">Featured Blogs</p>
          <p className="pb-2">Most viewed</p>
          <p className="pb-2">Readers Choice</p>
        </div>

        <div className="flex flex-col text-white">
          <p className="pb-2">Forum</p>
          <p className="pb-2">Support</p>
          <p className="pb-2">Recent Posts</p>
        </div>

        <div className="flex flex-col text-white">
          <p className="pb-2">Privacy Policy</p>
          <p className="pb-2">About Us</p>
          <p className="pb-2">Terms & Conditions</p>
          <p className="pb-2">Terms of Service</p>
        </div>
      </div>
      <p className="py-4 text-center text-white bg-black text-md md:text-lg">All rights reserved @TechnoBlog</p>
    </>
  );
};

export default Footer;
