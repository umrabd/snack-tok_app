import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/user/UserRegister';
import UserLogin from '../pages/user/UserLogin';
import FoodPartnerRegister from '../pages/food-partner/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/food-partner/FoodPartnerLogin';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;