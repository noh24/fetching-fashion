import axios from "axios";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import getError from "../utility/getError";
import { Helmet } from "react-helmet-async";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const ModalCart = (props) => {
  const navigate = useNavigate();
  const { state, dispatch: storeDispatch } = useContext(Store);
  const { cart } = state;

  const updatedCartItem = async (item, quantity) => {
    try {
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
        throw new Error(`${item.name || item.name} is out of stock.`);
      }
      storeDispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
    } catch (err) {
      toast.error(getError(err));
    }
  };

  const removeCartItems = (item) => {
    storeDispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const proceedToCheckout = () => {
    navigate("/signin?redirect=/shipping");
    props.toggleCart((prev) => !prev);
  };

  return (
    <main className='flex flex-col sm:items-end h-screen'>
      <section
        className='bg-transparent w-full flex-1 fixed inset-0'
        onClick={() => props.toggleCart((prev) => !prev)}
      ></section>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {/* Cart items */}
      <section className='relative flex-1 flex flex-col items-center space-y-2 bg-white overflow-y-auto no-scrollbar z-40 md:w-1/2 lg:w-1/3 xl:w-1/3 2xl:w-1/4'>
        <h1 className='text-2xl p-4 flex items-center justify-between bg-white sticky top-0 font-light z-50 w-full'>
          <span>
            Cart <span className='font-normal'>({cart.length})</span>
          </span>
          <CloseIcon
            onClick={() => props.toggleCart((prev) => !prev)}
            className='cursor-pointer'
          />
        </h1>
        <section className='relative'>
          {cart.length <= 0 ? (
            <div className='px-14'>
              Shopping cart empty. <Link to='/' className='underline text-gray-800'>Go shopping</Link>
            </div>
          ) : (
            <>
              <section className='mb-6 flex flex-col items-center space-y-8 flex-1 opacity-100 px-2 sm:px-8'>
                {cart.map((item) => (
                  <article
                    key={item._id}
                    className='flex grid-cols-3 items-center justify-between w-full space-x-2'
                  >
                    <div className=''>
                      <img
                        className='w-24 object-cover'
                        src={item.images[0]}
                        alt={item.name}
                      />
                    </div>

                    <div className='flex-1 flex flex-col justify-between space-y-1'>
                      <div>
                        <Link
                          to={`/product/${item._id}`}
                          onClick={() => props.toggleCart((prev) => !prev)}
                        >
                          <p className='font-medium'>{`${item.color} ${item.name}`}</p>
                        </Link>
                      </div>
                      <p className='text-gray-800'>${item.price}</p>

                      <div className='flex justify-between pr-4'>
                        <div className='space-x-2'>
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              updatedCartItem(item, item.quantity - 1)
                            }
                          >
                            <RemoveCircleOutlineIcon
                              className=''
                              fontSize='small'
                            />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            disabled={item.quantity >= item.countInStock}
                            onClick={() =>
                              updatedCartItem(item, item.quantity + 1)
                            }
                          >
                            <AddCircleOutlineIcon fontSize='small' />
                          </button>
                        </div>
                        <button
                          className='text-xs border-b border-gray-600 font-light'
                          onClick={() => removeCartItems(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </section>

              <section className='sticky bottom-0 bg-white p-4 flex flex-col justify-around items-center space-y-4 py-4'>
                <h1 className='text-2xl'>
                  Subtotal ({cart.reduce((acc, curr) => acc + curr.quantity, 0)}{" "}
                  Items): $
                  {cart.reduce(
                    (acc, curr) => acc + curr.price * curr.quantity,
                    0
                  )}{" "}
                </h1>
                <div className='self-center'>
                  <button
                    className='bg-gray-800 px-12 py-3 text-sm rounded-full text-white'
                    disabled={cart.length <= 0}
                    onClick={proceedToCheckout}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </section>
            </>
          )}
        </section>
      </section>
    </main>
  );
};

export default ModalCart;
