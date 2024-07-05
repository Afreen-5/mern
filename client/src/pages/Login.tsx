import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) throw new Error("useContext(AuthContext) returned undefined. Make sure LoginPage is used within an AuthProvider.");
  const { login } = authContext;
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userData = await login(credentials.username, credentials.password);
      console.log(userData, "User details fetched from Login");
      if (userData && userData.user.role?.role === 'Admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
      onClose();
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('#login-modal-card') === null) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div id="login-modal-card" className="absolute content-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-stone-700 to-stone-500 rounded-lg p-4 max-w-2xl w-80 h-60">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            placeholder="Username"
            onChange={handleChange}
            className="block w-full p-2 mb-4 border rounded-md"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={handleChange}
            className="block w-full p-2 mb-4 border rounded-md"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
