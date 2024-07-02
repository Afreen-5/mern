import React from "react";
import AuthProvider from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";

const App: React.FC = () => {
  return (
    <div className="m-0 p-0 bg-gray-200">
      <div className="container mx-full">
        <Router>
          <AuthProvider>
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path='/admin-dashboard' element={<AdminDashboard />} />
              </Route>
          </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
};

export default App;
