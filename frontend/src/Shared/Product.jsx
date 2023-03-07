import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;
  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <img src={product.images[0]} alt={product.name} />
        <img src={product.images[1]} alt={product.name} />
        <div>
          <p>{product.name}</p>
          <p>
            <span>${product.price + 10}</span> ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
