import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useProductReducer from "../hooks/useProductReducer";
import { useParams } from "react-router-dom";
import getError from "../Utility/getError";
import { Helmet } from "react-helmet-async";
import SizeTable from "../components/SizeTable";
import SizeGuide from "../components/SizeGuide";
import Rating from "../components/Rating";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { nanoid } from "nanoid";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { ToggleCartStore } from "../Utility/toggleCartStore";
import LoadingSpinner from "../components/LoadingSpinner";

const SingleWinterApparel = () => {
  const params = useParams();
  const {
    toggleCart: [, setToggleCart],
  } = useContext(ToggleCartStore);
  const { loading, error, products: product, dispatch } = useProductReducer();

  const { state, dispatch: storeDispatch } = useContext(Store);

  const [images, setImages] = useState(0);
  const prevSlide = () => {
    setImages(images === 0 ? product.images.length - 1 : images - 1);
  };
  const nextSlide = () => {
    setImages(images === product.images.length - 1 ? 0 : images + 1);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_REQUEST" });
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/${params.id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [params, dispatch]);

  const addToCartHandler = async (product) => {
    try {
      const itemExist = state.cart.find((item) => item._id === product._id);
      const quantity = itemExist ? itemExist.quantity + 1 : 1;
      const { data } = await axios.get(`/api/products/${product._id}`);
      if (data.countInStock < quantity) {
        throw new Error(`${itemExist.name || product.name} is out of stock.`);
      }
      storeDispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
      setToggleCart((prev) => !prev);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <section className='px-2 sm:px-4'>
      {loading ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='flex flex-col items-center lg:grid lg:grid-cols-2 justify-items-center'>
          <Helmet>
            <title>{`${product.name}`}</title>
          </Helmet>
          <section className=''>
            <div className='h-[350px] w-full md:h-[500px] md:w-[500px] overflow-hidden relative mb-4'>
              {product.images.map((item, index) => (
                <div
                  key={nanoid()}
                  className={`${
                    index === images
                      ? `h-full w-full object-cover md:absolute flex`
                      : "hidden"
                  }`}
                >
                  <img src={item} alt={product.name} />
                </div>
              ))}
              <div
                className='absolute top-0 h-full px-4 pr-12 z-30 flex items-end pb-20 lg:hidden cursor-pointer hover:opacity-80'
                onClick={prevSlide}
              >
                <ArrowBackIosNewOutlinedIcon fontSize='medium' />
              </div>
              <div
                className='absolute top-0 right-0 h-full px-4 pl-12 z-30 flex items-end pb-20 lg:hidden cursor-pointer hover:opacity-80'
                onClick={nextSlide}
              >
                <ArrowForwardIosOutlinedIcon fontSize='medium' />
              </div>
            </div>
            <div className='lg:flex hidden lg:gap-4 lg:justify-center'>
              {product.images.map((item, index) => (
                <div
                  key={nanoid()}
                  className={`w-20 cursor-pointer`}
                  onClick={() => setImages(index)}
                >
                  <img
                    src={item}
                    alt={product.name}
                    className={index === images ? `` : `opacity-50`}
                  />
                </div>
              ))}
            </div>
          </section>

          <section className='text-left flex flex-col items-center lg:items-start lg:px-16 lg:self-start'>
            <div className='space-y-4'>
              <Rating rating={product.rating} reviews={product.reviews} />
              <h3 className='text-2xl'>{`${product.color} ${product.name}`}</h3>
              <p className='font-medium'>
                <span className='line-through text-gray-400'>
                  ${product.price + 10}
                </span>{" "}
                <span className='text-green-500'>${product.price}</span>
              </p>
              <div>
                <button
                  type='button'
                  onClick={() => addToCartHandler(product)}
                  className='bg-gray-800 text-white text-sm font-medium px-8 py-3 rounded-full shadow-sm hover:opacity-90'
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <div className='mt-8'>
              <ul className='space-y-2 px-6 pl-12 list-disc text-gray-800'>
                {product.description.map((desc) => (
                  <li key={nanoid()}>{desc}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className='flex flex-col items-center lg:col-span-2'>
            <SizeTable />
            <SizeGuide />
          </section>
        </div>
      )}
    </section>
  );
};

export default SingleWinterApparel;
