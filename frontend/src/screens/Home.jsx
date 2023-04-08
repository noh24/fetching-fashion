import React, { useEffect, useState } from "react";
import FeaturedHomeSection from "./../components/FeaturedHomeSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideShow = [
    "/images/home-display1.png",
    "/images/home-display2.png",
    "/images/home-display3.png",
  ];
  const carouselInfiniteScroll = () => {
    if (currentSlide === slideShow.length - 1) {
      return setCurrentSlide(0);
    }
    return setCurrentSlide(currentSlide + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      carouselInfiniteScroll();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <section className=''>
      <Helmet>
        <title>Fetching Fashion</title>
      </Helmet>
      <div className='relative overflow-hidden flex-nowrap flex flex-col'>
        <div className='xl:flex xl:w-[60vw] xl:h-[60vh] hidden'>
          {slideShow.map((slide) => (
            <img
              className='object-cover w-full transition duration-1500 flex items-center justify-center ease-in'
              style={{ transform: `translate(-${currentSlide * 60}vw)` }}
              src={slide}
              alt='dog wearing clothes'
              key={slide}
            ></img>
          ))}
        </div>
        <div className='flex xl:hidden'>
          {slideShow.map((slide) => (
            <img
              className='object-cover w-full transition duration-1000 flex items-center justify-center ease-in'
              style={{ transform: `translate(-${currentSlide * 100}%)` }}
              src={slide}
              alt='dog wearing clothes'
              key={slide}
            ></img>
          ))}
        </div>
      </div>
      <FeaturedHomeSection />
    </section>
  );
};

export default Home;
