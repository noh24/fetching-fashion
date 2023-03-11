import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section className='relative overflow-hidden flex-nowrap flex'>
        {slideShow.map((slide) => (
          <img
            className='min-w-full sm:h-screen object-cover w-full transition duration-1000 flex items-center justify-center ease-in'
            style={{ transform: `translate(-${currentSlide * 100}%)` }}
            src={slide}
            alt='dog wearing clothes'
            key={slide}
          ></img>
        ))}
      </section>

      <section className='my-20 px-4 flex flex-col items-center text-gray-900'>
        <Link to={`/products/winter-apparel`}>
          <h1 className='text-3xl mb-20'>Shop Winter Apparel</h1>
        </Link>
        <div>
          <FeaturedHomeSection />
        </div>
      </section>
    </main>
  );
};

export default Home;
