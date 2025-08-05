import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import Button from "../components/Button";
import Bannercomp from "../components/Bannercomp";
import Productcard from "../components/Productcard";

export default function Home() {
  const location = useLocation();
  const [newArrivalProducts, setNewArrivalProducts] = useState([]);

  // Scroll to category section if needed
  useEffect(() => {
  if (location.state?.scrollTo === "category") {
    const el = document.getElementById("category");
    const navbar = document.querySelector("header");
    if (el && navbar) {
      const navbarHeight = navbar.offsetHeight;
      const yOffset = -navbarHeight;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
}, [location]);

  // Fetch and randomly pick 8 new arrival products
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((product) => product.newArrival);
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        const limited = shuffled.slice(0, 8);
        setNewArrivalProducts(limited);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  return (
    <section >
    {/* HERO SECTION */}
    <div className="min-h-[632px] bg-[#211C24] w-full flex flex-col lg:flex-row items-center justify-center lg:justify-around py-8 px-4 sm:px-8 gap-8 lg:gap-0">
      <div className="flex flex-col gap-4 max-w-[650px] text-center lg:text-left order-2 lg:order-1">
        <h3 className="text-white font-semibold text-xl sm:text-2xl opacity-40 font-Inter">
          Pro.Beyond.
        </h3>
        <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-thin leading-tight font-Inter">
          <span className="tracking-wider">IPhone 14</span>{" "}
          <span className="font-semibold">Pro</span>
        </h1>
        <p className="text-[#909090] text-base sm:text-lg font-medium font-Inter">
          Created to change everything for the better. For everyone
        </p>
        <Link to={`/product/688e36e93e811254d7b4b8c1`} className="w-fit mx-auto lg:mx-0">
          <Button 
            bordercolor="border-white" 
            textcolor="text-white" 
            hovertext="hover:text-[#211C24]" 
            hoverbg="hover:bg-white" 
            h="56px" 
            w="191px" 
          />
        </Link>
      </div>
      <div className="order-1 lg:order-2 flex items-center justify-center">
        <img 
          src="/Iphone.png" 
          alt="phone image" 
          className="w-64 sm:w-80  sm:h-auto lg:max-h-auto lg:w-96 h-full max-h-[632px] object-contain" 
        />
      </div>
    </div>


      {/* PRODUCTS SECTION */}
<div className="w-full lg:h-[520px] h-auto flex flex-col lg:flex-row bg-white font-Inter">
  {/* Left Column */}
  <div className="w-full h-full lg:w-1/2 flex flex-col">
    {/* Playstation Card */}
    <Link to="/product/688e1b373e811254d7b4b8b7" className="w-full h-1/2">
      <div className="flex flex-col sm:flex-row justify-start lg:py-0 py-16  bg-[#f9f9f9] rounded-lg  cursor-pointer hover:scale-[1.02] hover:drop-shadow transition-transform duration-300 active:scale-100">
        <div className="w-full sm:w-1/2 flex lg:justify-start justify-center">
          <img 
            src="/Playstation.png" 
            alt="Playstation 5" 
            className="  h-auto sm:h-64 object-contain flex justify-center " 
          />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col justify-center px-5 text-center lg:text-left lg:px-0 mt-4 sm:mt-0">
          <h1 className="text-black text-3xl sm:text-4xl font-semibold leading-tight">
            Playstation 5
          </h1>
          <p className="text-[#707070] text-sm sm:text-base mt-2 px-5 font-normal">
            Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
          </p>
        </div>
      </div>
    </Link>

    {/* Bottom Row */}
    <div className="flex h-1/2 flex-col sm:flex-row">
      {/* AirPods Max Card */}
      <Link to="/product/688f8b380e27658fcb589766" className="w-full sm:w-1/2 bg-[#f4f4f4]  flex flex-row justify-start items-center gap-4 sm:gap-6 cursor-pointer hover:drop-shadow hover:scale-[1.02] transition-transform duration-300 active:scale-100">
        <img 
          src="/airpodsmax.png" 
          alt="AirPods Max" 
          className="w-24 sm:w-32 h-auto object-contain " 
        />
        <div className="flex flex-col gap-1 w-full items-center lg:items-start sm:gap-2">
          <h2 className="text-black text-xl sm:text-2xl font-light leading-tight">
            Apple<br />AirPods <br /><span className="font-semibold">Max</span>
          </h2>
          <p className="text-[#707070] text-xs sm:text-sm">Computational audio.<br />Listen, it's powerful</p>
        </div>
      </Link>

      {/* Apple Watch Card */}
      <Link to="/product/688e56953e811254d7b4b8cf" className="w-full sm:w-1/2  bg-[#353535] gap-4 sm:gap-6 flex flex-col sm:flex-row justify-start items-center cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 active:scale-100 py-16 px-4 sm:p-8">
        <img 
          src="/Home page pictures/apple watch se.png" 
          alt="Apple Watch SE" 
          className="w-24 sm:w-32 h-auto object-contain" 
        />
        <div className="flex flex-col gap-1 px-5 py-5 sm:gap-2">
          <h2 className="text-white text-xl sm:text-2xl font-light leading-tight text-center lg:text-left ">
            Apple Watch<br /><span className="font-semibold">SE</span>
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm text-center lg:text-left">
            Affordable, fast, essential health tracking watch.
          </p>
        </div>
      </Link>
    </div>
  </div>

  {/* Right Column - iPad - Removed top margin and added height match */}
  <div className="w-full h-full lg:w-1/2 bg-[#f0ecec] flex flex-col-reverse lg:flex-row justify-center items-stretch p-0 lg:p-8">
    <div className="w-full px-5 lg:w-1/2 flex items-center my-10 flex-col justify-center gap-3 sm:gap-5">
      <h1 className="text-black text-3xl sm:text-4xl lg:text-5xl font-light tracking-wider">
        Ipad Air<div><span className="font-semibold tracking-normal">5th gen</span></div>
      </h1>
      <p className="text-[#707070] text-sm sm:text-base leading-relaxed max-w-xs">
        Slim design with M1 chip, Liquid Retina display, 5G, and Apple Pencil support—power meets portability.
      </p>
      <Link to="/product/688f73aafec87c67cc29f123" className="w-fit">
        <Button 
          bordercolor="border-black" 
          textcolor="text-black" 
          hovertext="hover:text-white" 
          hoverbg="hover:bg-black" 
          h="48px" 
          w="180px" 
        />
      </Link>
    </div>
    <div className="w-full lg:w-1/2 flex mt-10 items-center justify-center">
      <img 
        src="/Home page pictures/tablet.png" 
        alt="Ipad Air" 
        className=" max-w-xs lg:max-w-xl h-full "
      />
    </div>
  </div>
</div>

      {/* CATEGORY SECTION */}
      <div id="category" className="flex flex-col gap-6 sm:gap-10 justify-center items-center w-full py-12 sm:py-16 px-4 sm:px-6">
        <h1 className="text-black text-xl sm:text-2xl font-medium font-Inter">Category</h1>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
          <Link to="/products/Smartphones"><CategoryCard image="catPhones.png" label="Smartphones" /></Link>
          <Link to="/products/Smartwatches"><CategoryCard image="catWatch.png" label="Smartwatches" /></Link>
          <Link to="/products/Consoles"><CategoryCard image="catconsole.png" label="Consoles" /></Link>
          <Link to="/products/Tablets"><CategoryCard image="cattablet.png" label="Tablets" /></Link>
          <Link to="/products/Headphones"><CategoryCard image="catHeadphones.png" label="Headphones" /></Link>
        </div>
      </div>

      {/* NEW ARRIVAL SECTION */}
      <div className="mt-16 max-w-6xl mx-auto px-2">
        <h3 className="text-[24px] font-medium font-Inter underline underline-offset-4 text-center mb-6">
          New Arrival
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-10">
          {newArrivalProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">No new arrivals found.</p>
          ) : (
            newArrivalProducts.map((product) => (
              <Productcard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>


      {/* BANNERS */}
      <div className="w-full flex flex-col lg:flex-row flex-wrap mt-56 ">
        <Bannercomp 
          category="Headphones" 
          brand="Huawei"
          label="Huawei Airbuds"
          desc="Huawei Buds deliver crisp sound with noise cancellation, seamless connectivity, and comfortable all-day wear."
          labelcolor="text-black" 
          desccolor="text-[#909090]" 
          bgcolor="bg-white" 
          bgcolordesc="white" 
          img="/Home page pictures/airbuds.jpg"
        />
        <Bannercomp 
          category="Tablets"
          brand="Apple"
          label="Ipad Pro"
          desc="iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use."
          labelcolor="text-black" 
          desccolor="text-[#909090]" 
          bgcolor="bg-[#F9F9F9]" 
          bgcolordesc="white" 
          img="/Home page pictures/ipad.png" 
        />
        <Bannercomp 
          category="Smartphones" 
          brand="Samsung"
          label="Samsung Galaxy" 
          desc="Galaxy: Vibrant AMOLED displays, powerful performance, and all-day battery in premium designs." 
          labelcolor="text-black" 
          desccolor="text-[#909090]" 
          bgcolor="bg-[#EAEAEA]" 
          bgcolordesc="white" 
          img="/Home page pictures/galaxy.png" 
        />
        <Bannercomp 
          category="Smartwatches" 
          brand="Samsung"
          label="Galaxy Watch" 
          desc="The Galaxy Watch 8 features advanced health sensors, a vibrant display, multi-day battery, and ultra-smooth Wear OS performance." 
          labelcolor="text-white" 
          desccolor="text-[#909090]" 
          bgcolor="bg-[#2C2C2C]" 
          bgcolordesc="black" 
          img="/Home page pictures/smartwatches.png" 
        />
      </div>
  </section>

  );
}