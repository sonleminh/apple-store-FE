import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AdminCategory from '../pages/AdminCategory';
import AdminProduct from '../pages/AdminProduct';
import AdminUser from '../pages/AdminUser';
import RegisterForm from '../pages/Auth/components/RegisterForm';
import SignInForm from '../pages/Auth/components/SignInForm';
import Dashboard from '../pages/Dashboard';
import Homepage from '../pages/Home';
import News from '../pages/News';
import ProductDetail from '../pages/ProductDetail/ProductDetail';
import MainLayout from '../Layouts/MainLayout';
import EditProductForm from '../pages/AdminProduct/components/EditProduct';
import Cart from '../pages/Cart';
import ProductByModel from '../pages/ProductByModel';
import ProductByCategory from '../pages/ProductByCategory';
import Order from '../pages/Order';

function Routers() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Routes>
      {!user.id ? (
        <React.Fragment>
          <Route path='/login' element={<SignInForm />} />
          <Route path='/register' element={<RegisterForm />} />
        </React.Fragment>
      ) : (
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<Homepage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<Order />} />
          {/* <Route path='/history' element={<HistoryOrder />} /> */}
        </Route>
      )}
      <Route path='/' element={<MainLayout />}>
        <Route path='/' element={<Homepage />} />
        <Route path='/news' element={<News />} />
        <Route path='/:id' element={<ProductByCategory />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/model/:id' element={<ProductByModel />} />
        <Route path='*' element={<Homepage />} />
      </Route>
      {user.isAdmin === true ? (
        <Route path='dashboard' element={<Dashboard />}>
          <Route path='product' element={<AdminProduct />}>
            <Route path='edit/:id' element={<EditProductForm />} />
          </Route>
          <Route path='category' element={<AdminCategory />} />
          <Route path='user' element={<AdminUser />} />
        </Route>
      ) : (
        <Route path='/' element={<Homepage />} />
      )}
    </Routes>
  );
}

export default Routers;
