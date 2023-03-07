import React from "react";
import { Link } from "react-router-dom";
import FeaturedWinterApparel from "./FeaturedWinterApparel";

const Home = () => {
  return (
    <main>
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
            <FeaturedWinterApparel />
          </div>
      </section>
    </main>
  );
};

export default Home;
