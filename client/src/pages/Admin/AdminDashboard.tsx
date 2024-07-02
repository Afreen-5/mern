import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="flex min-h-screen">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-4 bg-gray-800 text-white md:hidden"
      >
        Menu
      </button>
      <aside className={`w-64 bg-gray-800 text-white ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
        {/* <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div> */}
        <nav className="mt-50%">
          <ul>
            <li className="p-2">
              <Link to="/admin-dashboard/overview" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link>
            </li>
            <li className="p-2">
              <Link to="/admin-dashboard/movies" className="block p-2 rounded hover:bg-gray-700">Movies</Link>
            </li>
            <li className="p-2">
              <Link to="/admin-dashboard/genres" className="block p-2 rounded hover:bg-gray-700">Genres</Link>
            </li>
            <li className="p-2">
              <Link to="/admin-dashboard/cast" className="block p-2 rounded hover:bg-gray-700">Cast</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white w-full absolute top-0 left-0">
        <div className="p-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
          <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </header>
        <main className="flex-1 bg-gray-100 w-full absolute top-0 left-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
