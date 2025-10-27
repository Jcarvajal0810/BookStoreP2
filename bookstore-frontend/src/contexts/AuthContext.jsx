import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser } from "../services/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (username, password) => {
        const data = await loginUser(username, password);
        if (data.error) throw new Error(data.error);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        return data;
    };

    const register = async (userData) => {
        const data = await registerUser(userData);
        if (data.error) throw new Error(data.error);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        return data;
    };

    const logout = async () => {
        await logoutUser();
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
