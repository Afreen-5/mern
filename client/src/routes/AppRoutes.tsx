import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from '../pages/Admin/AdminDashboard';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/admin-dashboard/*' element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
