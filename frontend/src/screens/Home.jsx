import React from "react";
import { Link } from "react-router-dom";
import FeaturedHomeSection from "./../components/FeaturedHomeSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <section>
        <img src='/images/home-display1.png' alt='home-display1' />
        <img src='/images/home-display2.png' alt='home-display2' />
        <img src='/images/home-display3.png' alt='home-display3' />
      </section>

      <section>
        <Link to={`/products/winter-apparel`}>
          <h1>Shop Winter Apparel</h1>
        </Link>
        <div>
          <FeaturedHomeSection />
        </div>
      </section>
    </main>
  );
};

export default Home;
