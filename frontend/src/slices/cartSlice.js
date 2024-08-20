import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: "",
      shippingPrice: 0,
      totalPrice: Number(0.0),
    };

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const updateCart = (state) => {
  // Calculate Items Price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // Calculate Shipping Price ()
  state.shippingPrice = state.itemsPrice
    ? addDecimals(state.itemsPrice > 100 ? 0 : 10)
    : 0;
  // Calculate Tax Price
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice).toFixed(2));
  // Calculate Total Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save to local storage
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find((i) => i._id === item._id);
      if (existingItem) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === existingItem._id ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },

    /**
     * Removes an item from cart
     * @param   state current "cart" state
     * @param   action payload => itemID
     * @returns updated cartstate
     */
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== itemId);
      return updateCart(state);
    },

    /**
     * Save Shipping Address to state
     */
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    /**
     * Save Payment Method
     */
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },

    clearCart: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
