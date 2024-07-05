import React from "react";
import Navbar from "../../components/Admin/DashboardOverview/Navbar";
import Sidebar from "../../components/Admin/DashboardOverview/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./DashboardOverview";
import MoviesPage from "./MoviesPage";
import UserPage from "./UsersPage";

const AdminDashboard: React.FC = () => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="users" element={<UserPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
