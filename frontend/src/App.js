import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Login from './pages/Login';
import ScrollToTop from './hooks/useScrollToTop';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import DashboardMain from './pages/DashboardMain';
import Customers from './pages/Customers';
import Customer from './pages/Customer';
import Users from './pages/users/Users';
import User from './pages/users/User';
import Accessories from './pages/accessories/Accessories';
import Accessory from './pages/accessories/Accessory';
import Phones from './pages/phones/Phones';
import Phone from './pages/phones/Phone';
import CreatePhone from './pages/phones/CreatePhone';
import CreateAccessory from './pages/accessories/CreateAccessory';
import Register from './pages/Register';
import VerifiedAccount from './pages/VerifiedAccount';
import CreateUser from './pages/users/CreateUser';
import PhonesStore from './pages/phones/PhonesStore';
import AccessoriesStore from './pages/accessories/AccessoriesStore';
import PhonePreview from './pages/phones/PhonePreview';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';

function App() {

  const GlobalStyle = createGlobalStyle`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Raleway', sans-serif;
    }
    body {
      transition: background .3s ease;
    }
    a{
      text-decoration: none;
      color: #000;
    }
    header{
      grid-area: header;
    }
    footer {
      grid-area: footer;
    }
  `;

  return (
    <>
      <GlobalStyle />
      <Helmet><title>Intecel</title></Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path="dashboard/*" exact element={<Dashboard />}>
              <Route path="customers" exact element={<Customers />} />
              <Route path="customers/:id" exact element={<Customer />} />
              <Route path="phones" exact element={<Phones />} />
              <Route path="phones/add" exact element={<CreatePhone />} />
              <Route path="phones/details/:id" exact element={<Phone />} />
              <Route path="accessories" exact element={<Accessories />} />
              <Route path="accessories/add" exact element={<CreateAccessory />} />
              <Route path="accessories/details/:id" exact element={<Accessory />} />
              <Route path="users/*" exact element={<Users />} />
              <Route path="users/add" exact element={<CreateUser />} />
              <Route path="users/details/:id" exact element={<User />} />
              <Route index element={<DashboardMain />} />
            </Route>
            <Route path="/*" exact element={
              <>
                <header>
                  <Navbar />
                </header>
                <main>
                  <Routes>
                    <Route path="login" exact element={<Login />} />
                    <Route path="register" exact element={<Register />} />
                    <Route path="recovery/forgot-password" exact element={<ForgotPassword />} />
                    <Route path="recovery/reset-password/:token" exact element={<ResetPassword />} />
                    <Route path="confirm-account/:token" exact element={<VerifiedAccount />} />
                    <Route path="phones" exact element={<PhonesStore />} />
                    <Route path="phones/:id/details" exact element={<PhonePreview />} />
                    <Route path="accessories" exact element={<AccessoriesStore />} />
                    <Route path="cart" exact element={<Cart />} />
                    <Route path="checkout" exact element={<Checkout />} />
                    <Route path="settings" exact element={<Settings />} />
                    <Route path="/" exact element={<Home />}>
                      
                    </Route>
                  </Routes>
                </main>
              </>
            } />
          </Routes>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;