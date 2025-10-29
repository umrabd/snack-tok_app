import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/register" element={<h1 className=''>User Register Page</h1>} />
        <Route path="/user/login" element={<h1>User Login Page</h1>} />

        <Route path="/food-partner/register" element={<h1>Food Partner Register Page</h1>} />
        <Route path="/food-partner/login" element={<h1>Food Partner Login Page</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes