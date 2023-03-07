import React from "react";
import data from "../data/data";
import Product from "../Shared/Product";
import SizeGuide from "../Shared/SizeGuide";

const WinterApparel = () => {
  return (
    <main>
      <section>
        {data.products.fleeceSherpas.map((item) => (
          <Product key={item._id} product={item}></Product>
        ))}
        {data.products.jacketVests.map((item) => (
          <Product key={item._id} product={item}></Product>
        ))}
      </section>
    </main>
  );
};

export default WinterApparel;
