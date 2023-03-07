import { useReducer } from "react";

const initialState = {
  loading: true,
  error: "",
  products: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error("No matching action.type");
  }
};

const useProductReducer = () => {
  const [{ loading, error, products }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return {
    loading,
    error,
    products,
    dispatch,
  };
};
export default useProductReducer;
export { reducer };
