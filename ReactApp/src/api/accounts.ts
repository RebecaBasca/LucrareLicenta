import {myApp} from "./client";

const signup = (name: string, email: string, password: string, accountType: string): Promise<any | null> => {
    return new Promise((resolve, reject) => {
        myApp.post(`/accounts/signup?name=${name}&emailAddress=${email}&password=${password}&accType=${accountType}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const login = (email: string, password: string): Promise<any | null> => {
    return new Promise((resolve, reject) => {
        myApp.post(`/accounts/login?emailAddress=${email}&password=${password}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const validateToken = (id: number, token: string) => {
    return new Promise((resolve, reject) => {
        myApp.get(`/accounts/validateToken?id=${id}&token=${token}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const changeAction = (type: string, id: any, newValue: string, token: string) => {
    return new Promise((resolve, reject) => {
        myApp.post(`/accounts/change${type}?id=${id}&new${type}=${newValue}&token=${token}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const getAccountInfo = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        myApp.get(`/accounts/getAccountInfo?emailAddress=${email}&password=${password}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    })
}

export {
    signup,
    login,
    validateToken,
    changeAction,
    getAccountInfo
}
