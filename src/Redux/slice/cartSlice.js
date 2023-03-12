import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartList: [],
  cartTotalQuantity: 0,
  cartTotalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartList.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartList[itemIndex].quantity += 1;
      } else {
        const tempProduct = { ...action.payload, quantity: 1 };
        state.cartList.push(tempProduct);
        // const itemCart = {
        //   cartId: tempProduct.cartId,
        //   productId: tempProduct.id,
        //   quantity: tempProduct.quantity,
        // };
        // const addItemCart = async () => {
        //   try {
        //     const res = await axiosClient.post('/api/cartitem', itemCart);
        //     console.log(res);
        //   } catch (error) {
        //     return console.log(error);
        //   }
        // };
        // addItemCart();
      }
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartList.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartList[itemIndex].quantity > 1) {
        state.cartList[itemIndex].quantity -= 1;
      } else if (state.cartList[itemIndex].quantity === 1) {
        const nextCartList = state.cartList.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartList = nextCartList;
      }
    },
    removeCartItem: (state, action) => {
      const cartItems = state.cartList.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartList = cartItems;
    },
    removeCartList: (state) => {
      state.cartList = [];
    },
    getTotal(state, action) {
      let { total, quantity } = state.cartList.reduce(
        (cartTotal, cartItem) => {
          const { discountPrice, quantity } = cartItem;
          const itemTotal = discountPrice * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      state.cartTotalQuantity = quantity;
      state.cartTotalPrice = total;
    },
  },
});

export const {
  addToCart,
  decreaseCart,
  removeCartItem,
  removeCartList,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;
