import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const Navbar: React.FC = () => {

  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "AuthContext is not available. Make sure to wrap your component tree with <AuthProvider />"
    );
  }

  const { logout } = authContext;

  return (
    <nav className="bg-gray-800 text-white p-5 flex justify-between items-center w-full">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
