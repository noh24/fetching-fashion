import { reducer } from "../Store";

describe("reducer", () => {
  const initialState = {
    cart: [],
    shippingAddress: null,
    paymentMethod: null,
    userInfo: null,
  };

  it("should throw error if no action.type matching", () => {
    expect(() => reducer(initialState, { type: null })).toThrowError(
      "No matching action.type"
    );
  });

  describe("ADD_TO_CART", () => {
    it("action: ADD_TO_CART should return products in cart", () => {
      const existProduct = { name: "existProduct", quantity: 1, _id: 2 };

      const product = { name: "product", _id: 1 };
      expect(
        reducer(
          { ...initialState, cart: [existProduct] },
          { type: "ADD_TO_CART", payload: product }
        )
      ).toEqual({
        ...initialState,
        cart: [existProduct, product],
      });
    });
  });

  describe("REMOVE_FROM_CART", () => {
    it("should remove item from cart", () => {
      const existProduct = { name: "existProduct", quantity: 1, _id: 2 };
      expect(
        reducer(
          { ...initialState, cart: [existProduct] },
          {
            type: "REMOVE_FROM_CART",
            payload: existProduct,
          }
        )
      ).toEqual({
        ...initialState,
        cart: [],
      });
    });
  });

  describe("USER_SIGNIN", () => {
    it("returns user info", () => {
      const user = {
        _id: "1",
        name: "test",
        email: "test@test.com",
        isAdmin: false,
      };
      const state = reducer(
        { ...initialState },
        { type: "USER_SIGNIN", payload: user }
      );
      expect(state.userInfo).toEqual({
        _id: "1",
        name: "test",
        email: "test@test.com",
        isAdmin: false,
      });
    });
  });

  describe("USER_SIGNOUT", () => {
    it("should return state with empty user info property", () => {
      const result = reducer(
        { ...initialState, userInfo: { name: "user" } },
        { type: "USER_SIGNOUT" }
      );
      expect(result).toEqual({ ...initialState });
    });

    it("should return state with empty cart property", () => {
      const result = reducer(
        { ...initialState, cart: [{name: "product"}] },
        { type: "USER_SIGNOUT" }
      );
      expect(result).toEqual({ ...initialState });
    });
  });
});
