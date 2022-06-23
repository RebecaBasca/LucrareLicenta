import React from 'react';

const authenticationDefaults = {
    isLoggedIn: null,
    login: async () => Promise.resolve(),
    register: async () => Promise.resolve(),
    user: null,
};

export type AuthenticationState = {
    isLoggedIn: boolean | null;
    login?: (email: string, password:string) => Promise<any>,
    register?: (email: string, password:string) => Promise<any>,
    setIsLoggedIn?: (value: boolean) => void,
    user?: any,
}

export const AuthenticationContext = React.createContext<AuthenticationState>(authenticationDefaults);

const loadingDefaults = {
    isLoading: false,
    setIsLoading: () => {},
};

export type LoadingState = {
    isLoading: boolean;
    setIsLoading: any;
}

export const LoadingContext = React.createContext<LoadingState>(loadingDefaults);