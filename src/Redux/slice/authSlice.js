import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      isAdmin: '',
      cartId: '',
    },
    accessToken: '',
  },
  reducers: {
    login: (state, action) => {
      state.user.id = action.payload.user.id;
      state.user.firstName = action.payload.user.firstName;
      state.user.lastName = action.payload.user.lastName;
      state.user.email = action.payload.user.email;
      state.user.isAdmin = action.payload.user.isAdmin;
      state.user.cartId = action.payload.user.cart?.userId;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state, action) => {
      state.user.id = '';
      state.user.firstName = '';
      state.user.lastName = '';
      state.user.email = '';
      state.user.isAdmin = '';
      state.accessToken = '';
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
