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
      return {
        ...state,
        cart: [...state.cart, action.payload],
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
