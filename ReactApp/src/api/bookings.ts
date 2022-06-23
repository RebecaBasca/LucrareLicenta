import {myApp} from "./client";

const addBooking = (name: string, email: string, date: string, selectedTime: string, therapistName: string, service: string, childName = '', forChild = false) => {
    return new Promise((resolve, reject) => {
        myApp.post(`/bookings/addBooking?clientName=${name}&clientEmail=${email}&date=${date}&time=${selectedTime}&therapistName=${therapistName}&service=${service}&forChild=${forChild}&childName=${childName}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const getBookings = (direction: string, id: string) => {
    return new Promise((resolve, reject) => {
        myApp.get(`/bookings/get${direction}Bookings?id=${id}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

const getAvailableHours = (therapistName: string, date: string) => {
    return new Promise((resolve, reject) => {
        myApp.get(`/bookings/getAvailableHours?therapistName=${therapistName}&date=${date}`)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
    });
};

export {
    addBooking,
    getAvailableHours,
    getBookings
}
