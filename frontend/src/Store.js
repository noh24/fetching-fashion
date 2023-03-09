import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
  cart: localStorage.cart ? JSON.parse(localStorage.getItem("cart")) : [],
  shippingAddress: localStorage.shippingAddress
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  userInfo: localStorage.user ? JSON.parse(localStorage.getItem("user")) : null,
  price: localStorage.price ? JSON.parse(localStorage.getItem("price")) : {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      const updatedCart = existItem
        ? state.cart.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: updatedCart,
      };

    case "REMOVE_FROM_CART":
      const newCart = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
      return { ...state, userInfo: null, cart: [], shippingAddress: {} };

    case "SAVE_SHIPPING_ADDRESS":
      return { ...state, shippingAddress: action.payload };

    case "CALCULATE_PRICE":
      const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
      const items = round2(
        state.cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
      );
      const shipping = items >= 100 ? round2(0) : round2(10);
      const tax = round2(0.15 * items);
      const total = items + shipping + tax;
      localStorage.setItem(
        "price",
        JSON.stringify({ items, shipping, tax, total })
      );
      return { ...state, price: { items, shipping, tax, total } };

    default:
      throw new Error("No matching action type");
  }
};

const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
};

export { reducer, Store, StoreProvider };
