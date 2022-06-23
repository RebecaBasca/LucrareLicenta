import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import {AuthenticationContext} from "./context";
import {AxiosResponse} from "axios";
import Layout from "./components/Layout";

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any>(null);

    const login = (email: string, password: string): Promise<AxiosResponse<any> | null> => {
        return new Promise((resolve, reject) => {
            resolve(null); // todo auth logic
        })
    }

    const register = (email: string, password: string): Promise<AxiosResponse<any> | null> => {
        return new Promise((resolve, reject) => {
            resolve(null); // todo auth logic
        })
    }

    return (
        <BrowserRouter>
            <AuthenticationContext.Provider
               value={{
                   isLoggedIn,
                   login,
                   register,
                   user
               }}
            >
                <Layout />
            </AuthenticationContext.Provider>
        </BrowserRouter>
    );
}

export default App;
