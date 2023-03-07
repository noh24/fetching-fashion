import React from "react";
import Product from "../Shared/Product";
import data from "../data/data";

const {
  products: { fleeceSherpas, jacketVests },
} = data;



const FeatureWinter = () => {
  return (
    <div>
      <Product product={fleeceSherpas[0]}></Product>
      <Product product={jacketVests[1]}></Product>
    </div>
  );
};

export default FeatureWinter;
