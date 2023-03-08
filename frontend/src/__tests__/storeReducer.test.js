import { reducer } from "../Store";

describe("reducer", () => {
  let initialState;

  it("should throw error if no action.type matching", () => {
    expect(() => reducer(initialState, { type: null })).toThrowError(
      "No matching action.type"
    );
  });

  describe("ADD_TO_CART", () => {
    it("action: ADD_TO_CART should return products in cart", () => {
      const existProduct = { name: "existProduct", quantity: 1, _id: 2 };
      initialState = {
        cart: [existProduct],
        shippingAddress: {},
        paymentMethod: null,
        userInfo: {},
      };
      const product = { name: "product", _id: 1 };
      expect(
        reducer(initialState, { type: "ADD_TO_CART", payload: product })
      ).toEqual({
        ...initialState,
        cart: [existProduct, product],
      });
    });
  });

  describe("REMOVE_FROM_CART", () => {
    it("should remove item from cart", () => {
      const existProduct = { name: "existProduct", quantity: 1, _id: 2 };
      initialState = {
        cart: [existProduct],
        shippingAddress: {},
        paymentMethod: null,
        userInfo: {},
      };
      expect(
        reducer(initialState, {
          type: "REMOVE_FROM_CART",
          payload: existProduct,
        })
      ).toEqual({
        ...initialState,
        cart: [],
      });
    });
  });
});
