import { reducer } from "./../Store";

describe("reducer", () => {
  const initialState = {
    cart: [],
    shippingAddress: {},
    paymentMethod: null,
    userInfo: {},
  };

  it("should throw error if no action.type matching", () => {
    expect(() => reducer(initialState, { type: null })).toThrowError(
      "No matching action.type"
    );
  });

  it("action: ADD_TO_CART should add new product to cart with items", () => {
    const product = "product";
    const product2 = "product2";
    expect(
      reducer({...initialState, cart: [product2, ]}, { type: "ADD_TO_CART", payload: product })
    ).toEqual({
      ...initialState,
      cart: [product2, product],
    });
  });
});
