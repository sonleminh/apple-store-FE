import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: [
      {
        id: '',
        name: '',
        image: '',
        description: '',
        price: '',
        discountPrice: '',
        quantity: '',
        // cate: "",
        // countInStock: "",
      },
    ],
    productsList: [],
  },
  reducers: {
    getAllProduct: (state, action) => {
      state.productsList = action.payload;
    },
    addProduct: (state, action) => {
      state.product = [...state.product, action.payload];
    },
    // updateProduct: (state, action) => {
    //   state.products.forEach((item, index) => {
    //     if (item.ID === action.payload.ID) {
    //       item.name = action.payload.ID;
    //       item.image = action.payload.image;
    //       item.desc = action.payload.desc;
    //     }
    //   });
    // },
    // deleteProduct: (state, action) => {
    //   state.product.forEach((item, index) => {
    //     if (item.id === action.payload.ID) {
    //       state.product.splice(index, 1);
    //     }
    //   });
    // },
  },
});

export const { getAllProduct, addProduct } = productSlice.actions;

export default productSlice.reducer;
