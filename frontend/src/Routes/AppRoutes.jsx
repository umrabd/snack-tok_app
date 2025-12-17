import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRegister from '../pages/user/UserRegister';
import UserLogin from '../pages/user/UserLogin';
import FoodPartnerRegister from '../pages/food-partner/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/food-partner/FoodPartnerLogin';
import Home from '../pages/general/Home';
import ProtectedRoute from '../auth/ProtectedRoute';
import CreateFood from '../pages/general/CreateFood';
import Profile from '../pages/food-partner/Profile'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />

        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/food-partner/:id" element={<Profile />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-food"
          element={
            <ProtectedRoute>
              <CreateFood />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;