import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {

    addItem: (state, action) => {
      console.log("Adding item to cart:", action.payload);
      // Destructure product details from the action payload
      const { name, image, cost } = action.payload;
      // Check if the item already exists in the cart
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        // If the item exists, increment its quantity
        existingItem.quantity += 1;
      } else {
        // If the item does not exist, add it to the cart with quantity 1
        state.items.push({
          name,
          image,
          cost,
          quantity: 1, // Initialize quantity to 1
        });
      }
    },

    removeItem: (state, action) => {
      console.log("Removing item from cart:", action.payload);

      const name = action.payload;
      
      // Filter out the item to be removed
      state.items = state.items.filter(item => item.name !== name);
    },

    updateQuantity: (state, action) => {
      console.log("Updating item from cart:", action.payload);
    
      const { name, amount } = action.payload;
      // Find the item in the cart
      const item = state.items.find(item => item.name === name);
      if (item) {
        // Update the quantity of the item
        item.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
