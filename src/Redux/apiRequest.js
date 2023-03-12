import axiosClient from '../api/axiosClient';
import { login, logout } from './slice/authSlice';
import { addProduct } from './slice/productSlice';
import { getUsers } from './slice/userSlice';

export const loginUser = async (user, dispatch, navigate) => {
  try {
    const res = await axiosClient.post('/api/login', user);
    dispatch(login(res));
    navigate('/');
  } catch (err) {
    return console.log(err);
  }
};

export const register = async (user) => {
  try {
    const res = await axiosClient.post('/api/register', user);
    return res;
  } catch (err) {
    console.log(err.res);
    return err.res;
  }
};

export const getAllUser = async (accessToken, dispatch) => {
  try {
    const res = await axiosClient.get('/api/users', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsers(res));
  } catch (err) {
    return err.res;
  }
};

// export const deleteUser = async (accessToken, dispatch, id) => {
//   try {
//     const res = await axiosClient.delete(`/api/user/${id}`, {
//       headers: { token: `Bearer ${accessToken}` },
//     });
//     dispatch(deleteUsers(res.data));
//   } catch (err) {
//     return console.log(err);
//   }
// };

export const deleteUser = async (id) => {
  const url = `/api/user/${id}`;
  return axiosClient.delete(url, { id });
};

export const logoutUser = async (accessToken, dispatch, navigate) => {
  try {
    await axiosClient.post('/api/logout', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logout());
  } catch (err) {
    return console.log(err);
  }
};

export const addproduct = async (product, dispatch) => {
  try {
    const res = await axiosClient.post('/api/product', product);
    dispatch(addProduct(res.data));
  } catch (err) {
    throw new Error('Invalid Product Data');
  }
};
