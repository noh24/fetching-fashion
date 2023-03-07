import React from "react";
import data from "../data";
import Product from "../Shared/Product";

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
      <section></section>
    </main>
  );
};

export default WinterApparel;
