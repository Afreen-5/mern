import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col p-4 h-full">
      <NavLink to="/admin-dashboard" className="mb-4 p-2 rounded hover:bg-gray-700">Dashboard</NavLink>
      <NavLink to="/admin-dashboard/movies" className="mb-4 p-2 rounded hover:bg-gray-700">Movies</NavLink>
      <NavLink to="/admin-dashboard/genres" className="mb-4 p-2 rounded hover:bg-gray-700">Genres</NavLink>
      <NavLink to="/admin-dashboard/users" className="p-2 rounded hover:bg-gray-700">Users</NavLink>
    </aside>
  );
};

export default Sidebar;
