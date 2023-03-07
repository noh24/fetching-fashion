// import { reducer } from "../Store";

// describe("reducer", () => {
//   const initialState = {
//     cart: [],
//     shippingAddress: {},
//     paymentMethod: null,
//     userInfo: {},
//   };

//   it("should throw error if no action.type matching", () => {
//     expect(() => reducer(initialState, { type: null })).toThrowError(
//       "No matching action.type"
//     );
//   });

//   it("action: ADD_TO_CART should add new product to cart with items", () => {
//     const existProduct = { name: "existProduct", quantity: 1, _id: 2 };
//     const product = { name: "product", _id: 1 };
//     expect(
//       reducer(
//         { ...initialState, cart: [existProduct] },
//         { type: "ADD_TO_CART", payload: product }
//       )
//     ).toEqual({
//       ...initialState,
//       cart: [
//         { ...existProduct, quantity: 1 },
//         { ...product, quantity: 1 },
//       ],
//     });
//   });

//   it("action: ADD_TO_CART should add quantity + 1 to existing products in cart, if adding same product", () => {
//     const existingProduct = { name: "product", quantity: 1, _id: 1 };
//     const newProduct = { name: "product", _id: 1 };
//     expect(
//       reducer(
//         { ...initialState, cart: [existingProduct] },
//         { type: "ADD_TO_CART", payload: newProduct }
//       )
//     ).toEqual({
//       ...initialState,
//       cart: [{ ...newProduct, quantity: 2 }],
//     });
//   });
// });
