import React, { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    if(!authContext) throw new Error("useContext(AuthContext) returned undefined. Make sure LoginPage is used within an AuthProvider.")
    const {login} = authContext;
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        try {
            const userData = await login(credentials.username, credentials.password);
            console.log(userData, "User details fetched from Login");
            if(userData && userData.user.role?.role === 'Admin') {
                navigate('/admin-dashboard', {replace: true})
            } else {
               navigate('/', {replace: true})
            }
        } catch (error) {
            console.log("Login failed", error);
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" value={credentials.username} placeholder="Username" onChange={handleChange} />
            <input type="password" name="password" value={credentials.password} placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
        </form>
    )
}

export default Login;

