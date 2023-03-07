import { createContext, useReducer } from "react";

const Store = createContext();

const initialState = {
  cart: [],
  shippingAddress: {},
  paymentMethod: null,
  userInfo: {},
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
            (item._id === existItem._id) ? newItem : item
          )
        : [...state.cart, newItem];
      return {
        ...state,
        cart: updatedCart,
      };
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
