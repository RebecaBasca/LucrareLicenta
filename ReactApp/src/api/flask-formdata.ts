import axios from 'axios';

export const BACKEND_URL_FLASK = "http://localhost:5000";

export const myFlaskApp = axios.create({
    baseURL: BACKEND_URL_FLASK,
    withCredentials: false
});


const getFormData = (data: any) => {
    return new Promise((resolve, reject) => {
        myFlaskApp.get(`/getFormData?data=${data}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

export {
    getFormData
}