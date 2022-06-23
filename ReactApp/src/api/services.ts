import {myApp} from "./client";

const addService = (name: string, price: string, timeSpan: string, category: string, description: string, picture: string) => {
    return new Promise((resolve, reject) => {
        myApp.post(`/services/addService?name=${name}&price=${price}&timeSpan=${timeSpan}&category=${category}&picture=${picture}&description=${description}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const getServices = (category: string) => {
    return new Promise((resolve, reject) => {
        myApp.get(`/services/getServicesByCategory?category=${category}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    })
}

const getServicesList = () => {
    return new Promise((resolve, reject) => {
        myApp.get('/services/getServices')
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const deleteService = (id: number) => {
    return new Promise((resolve, reject) => {
        myApp.delete(`/services/deleteServiceById?id=${id}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    })
}

export {
    addService,
    getServices,
    getServicesList,
    deleteService
}
