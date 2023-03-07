import { reducer as productReducer } from "./../hooks/useProductReducer";

describe("productReducer", () => {
  const initialState = {
    loading: true,
    error: "",
    products: {},
  };

  it("should throw error if no action.type matching", () => {
    const res = () => productReducer(initialState, { type: null });
    expect(res).toThrowError("No matching action.type");
  });

  it('should change loading to true with "FETCH_REQUEST', () => {
    expect(productReducer(initialState, { type: "FETCH_REQUEST" })).toEqual({
      loading: true,
      error: "",
      products: {},
    });
  });

  it('should change loading to false, products updated w "FETCH_SUCCESS', () => {
    expect(
      productReducer(initialState, {
        type: "FETCH_SUCCESS",
        payload: "products",
      })
    ).toEqual({ loading: false, error: "", products: "products" });
  });

  it('should change loading to false, error to error message w "FETCH_SUCCESS', () => {
    expect(
      productReducer(initialState, {
        type: "FETCH_FAIL",
        payload: "error",
      })
    ).toEqual({ loading: false, error: "error", products: {} });
  });
});
