import {myApp} from "./client";

const getTherapists = () => {
    return new Promise((resolve, reject) => {
        myApp.get(`/therapists/getTherapists`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const addTherapist = (name: string, speciality: string, picture: string, description: string = '') => {
    return new Promise((resolve, reject) => {
        myApp.post(`/therapists/addTherapist?name=${name}&specialty=${speciality}&picture=${picture}&description=${description}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
}

const deleteTherapist = (id: number) => {
    return new Promise((resolve, reject) => {
        myApp.delete(`/therapists/deleteTherapistById?id=${id}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    })
}

export {
    getTherapists,
    addTherapist,
    deleteTherapist
}
