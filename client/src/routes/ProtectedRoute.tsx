import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {

  // const authContext = useContext(AuthContext);
  // if(!authContext?.isAuthenticated) {
  //   return <Navigate to='/login' />
  // }
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return <Outlet />;
};

export default ProtectedRoute;
