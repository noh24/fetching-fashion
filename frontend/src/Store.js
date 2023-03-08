import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
  cart: localStorage.cart ? JSON.parse(localStorage.getItem("cart")) : [],
  shippingAddress: {},
  paymentMethod: null,
  userInfo: localStorage.user ? JSON.parse(localStorage.getItem("user")) : null,
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

    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };

    case "USER_SIGNOUT":
      return { ...state, userInfo: null, cart: [] };

    case "SAVE_SHIPPING_ADDRESS":
      return {...state, shippingAddress: action.payload};

    default:
      throw new Error("No matching action.type");
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
