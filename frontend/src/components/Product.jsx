import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
  const { product } = props;
  return (
    <div>
      <Link to={`/product/${product._id}`}>
        <img src={product.images[0]} alt={`${product.color} ${product.name}`} />
        <img src={product.images[1]} alt={`${product.color} ${product.name}`} />
          <p>{`${product.color} ${product.name}`}</p>
        <div>
          <p>
            <span>${product.price + 10}</span> ${product.price}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
