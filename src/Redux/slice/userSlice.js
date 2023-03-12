import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      isAdmin: '',
    },
    userlist: [],
    msg: '',
  },
  reducers: {
    getUsers: (state, action) => {
      state.list = action.payload;
    },
    deleteUsers: (state, action) => {
      state.msg = action.payload;
    },
  },
});

export const { getUsers, deleteUsers } = userSlice.actions;

export default userSlice.reducer;
