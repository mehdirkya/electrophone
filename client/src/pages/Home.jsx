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
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
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
    <section className="w-full flex-col justify-center p-10 overflow-hidden">
      {/* HERO SECTION */}
      <div className="max-h-[632px] bg-[#211C24] w-full flex items-center justify-around">
        <div className="flex flex-col gap-4 max-w-[650px]">
          <h3 className="text-white font-semibold text-[25px]" style={{ opacity: 0.4, fontFamily: "'Inter', sans-serif" }}>
            Pro.Beyond.
          </h3>
          <h1 className="text-white text-[96px] font-thin leading-tight font-Inter">
            <span className="tracking-[0.05em]">IPhone 14</span>{" "}
            <span className="font-semibold">Pro</span>
          </h1>
          <p className="text-[#909090] text-[18px] font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
            Created to change everything for the better. For everyone
          </p>
          <Link to={`/product/688e36e93e811254d7b4b8c1`}>
            <Button bordercolor="border-white" textcolor="text-white" hovertext="hover:text-[#211C24]" hoverbg="hover:bg-white" h="56px" w="191px " />
          </Link>
        </div>
        <img src="/Iphone.png" alt="phone image" className="w-[406px] h-[632px] object-contain" />
      </div>

      {/* PRODUCTS SECTION */}
      <div className="w-full flex px-10 py-16 h-[600px] bg-white font-Inter">
        <div className="w-1/2 h-[600px] flex flex-col pr-4">
          <Link to="/product/688e1b373e811254d7b4b8b7" className="w-full">
            <div className="flex justify-start overflow-hidden bg-[#f9f9f9] rounded-lg p-6 cursor-pointer hover:scale-[1.02] hover:drop-shadow transition-transform duration-300 active:scale-100">
              <div className="w-1/2">
                <img src="/Playstation.png" alt="Playstation 5" className="w-[360px] h-[343px]" />
              </div>
              <div className="w-1/2 flex flex-col justify-center">
                <h1 className="text-black text-[44px] font-Inter font-semibold leading-tight">
                  Playstation 5
                </h1>
                <p className="text-[#707070] text-[16px] mt-2 font-normal">
                  Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.
                </p>
              </div>
            </div>
          </Link>

          <div className="flex">
            <Link to="/product/688f8b380e27658fcb589766" className="w-1/2 bg-[#f4f4f4] p-6 flex justify-start items-center gap-10 cursor-pointer hover:drop-shadow hover:scale-[1.02] transition-transform duration-300 active:scale-100">
              <img src="/airpodsmax.png" alt="AirPods Max" className="w-[104px] h-[272px] object-contain" />
              <div className="flex-col flex gap-2">
                <h2 className="text-black text-[28px] font-light leading-tight">
                  Apple<br />AirPods <br /><span className="font-semibold">Max</span>
                </h2>
                <p className="text-[#707070] text-[14px] mt-2">Computational audio.<br />Listen, it's powerful</p>
              </div>
            </Link>

            <Link to="/product/688e56953e811254d7b4b8cf" className="w-1/2 bg-[#353535] gap-10 flex justify-start items-center cursor-pointer hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 active:scale-100">
              <img src="/Home page pictures/apple watch se.png" alt="Apple Watch SE" className="w-[136px] h-[190px] object-contain scale-130" />
              <div className="flex-col flex gap-2">
                <h2 className="text-white text-[28px] font-light leading-tight">
                  Apple Watch<br /><span className="font-semibold">SE</span>
                </h2>
                <p className="text-gray-300 text-[14px] mt-2">
                  Affordable, fast, essential health tracking watch.
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="w-1/2 bg-[#f0ecec] flex justify-end items-center">
          <div className="w-1/2 flex-col flex justify-around gap-5">
            <h1 className="text-black text-[54px] font-light tracking-wider">
              Ipad Air<div><span className="font-semibold tracking-normal">5th gen</span></div>
            </h1>
            <p className="text-[#707070] text-[16px] leading-relaxed w-[300px]">
              Slim design with M1 chip, Liquid Retina display, 5G, and Apple Pencil support—power meets portability.
            </p>
            <Link to="/product/688f73aafec87c67cc29f123">
              <Button bordercolor="border-black" textcolor="text-black" hovertext="hover:text-white" hoverbg="hover:bg-black" h="48px" w="180px" />
            </Link>
          </div>
          <img src="/Home page pictures/tablet.png" alt="Ipad Air" className="w-[280px] h-[200px] object-contain scale-230" />
        </div>
      </div>

      {/* CATEGORY SECTION */}
      <div id="category" className="flex-col flex gap-10 justify-center items-center w-full h-[352px]">
        <h1 className="text-black text-[24px] font-medium font-Inter">Category</h1>
        <div className="flex gap-8">
          <Link to="/products/Smartphones"><CategoryCard image="catPhones.png" label="Smartphones" /></Link>
          <Link to="/products/Smartwatches"><CategoryCard image="catWatch.png" label="Smartwatches" /></Link>
          <Link to="/products/Consoles"><CategoryCard image="catconsole.png" label="Consoles" /></Link>
          <Link to="/products/Tablets"><CategoryCard image="cattablet.png" label="Tablets" /></Link>
          <Link to="/products/Headphones"><CategoryCard image="catHeadphones.png" label="Headphones" /></Link>
        </div>
      </div>

      {/* NEW ARRIVAL SECTION */}
      <div className="min-h-[900px] w-full flex justify-center">
        <div className="flex-col flex gap-10 items-center">
          <h3 className="text-[22px] font-medium font-Inter underline underline-offset-5">
            New Arrival
          </h3>
          <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {newArrivalProducts.length === 0 ? (
              <p>No new arrivals found.</p>
            ) : (
              newArrivalProducts.map((product) => (
                <Productcard key={product._id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* BANNERS */}
      <div className="h-[640px] w-full flex justify-center items-center flex-wrap gap-4">
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
