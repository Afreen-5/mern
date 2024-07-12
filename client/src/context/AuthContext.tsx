import React, { ReactNode, createContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService, isAuthenticated as checkAuth } from "../services/auth.service";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<any>;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [auth, setAuth] = useState<boolean>(false);

    useEffect(() => {
        setAuth(checkAuth());
    }, []);

    const login = async(username: string, password: string) => {
        const userData = await loginService(username, password);
        console.log(userData, "User details fetched from AuthContext");
        if(userData.token) {
            setAuth(true);
        }
        return userData;
    };

    const logout = () => {
        logoutService();
        setAuth(false);
    }

    return(
        <AuthContext.Provider value={{isAuthenticated: auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
