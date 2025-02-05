import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  selectedCategory: '',
  cart: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { 
  updateSearchTerm, 
  selectCategory, 
  addToCart, 
  removeFromCart, 
  updateQuantity 
} = shopSlice.actions;

export default shopSlice.reducer;