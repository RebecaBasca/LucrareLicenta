import {useEffect, useState} from "react";
import Modal from "react-modal";
import {addService, deleteService, getServicesList} from "../../api/services";
import {addTherapist, deleteTherapist, getTherapists} from "../../api/therapist";
import {myApp} from "../../api/client";

export const useAdminScreen = () => {
    let subtitle: any;

    const spaceBetween = 95;
    const [serviceRows, setServiceRows] = useState([]);
    const [therapistsRows, setTherapistsRows] = useState([]);

    const [serviceAddModal, setServiceAddModal] = useState(false);

    const [servicePicture, setServicePicture] = useState<any>(null);

    const [therapistAddModal, setTherapistAddModal] = useState(false);
    const [therapistPicture, setTherapistPicture] = useState<any>(null);

    const [therapistValues, setTherapistValues] = useState({
        name: '',
        specialty: '',
        picture: ''
    });


    const [serviceValues, setServiceValues] = useState({
        name: '',
        category: '',
        picture: '',
        description: '',
        price: '',
        time_span: ''
    });

    const onChangeService = (event: any) => {
        const { name, value } = event?.target;
        console.log(name, value)

        setServiceValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const onChangeTherapist = (event: any) => {
        const { name, value } = event?.target;
        setTherapistValues((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    const getServiceList = () => {
        getServicesList()
            .then((response: any) => {
                const { content } = response?.data;

                if(content) {
                    setServiceRows(content.map((item: any, _: any) => ({
                        id: item.id,
                        name: item.name,
                        category: item.category,
                        picture: item.picture,
                        description: item.description,
                        price: item.price,
                        time_span: item.time_span
                    })));
                }
            })
    }

    const getTherapistsList = () => {
        getTherapists()
            .then((response: any) => {
                const { content } = response?.data;

                if(content) {
                    setTherapistsRows(content.map((item: any) => ({
                        id: item.id,
                        name: item.name,
                        specialty: item.specialty,
                        picture: item.picture
                    })))
                }
            })
    }

    const handleAddService = () => {

        if(servicePicture !== null) {
            const formData = new FormData();
            formData.append('myFile', servicePicture);
            myApp.post('/api/uploadFile', formData)
                .then((response: any) => {
                    const { data } = response;
                    const splitValues = data?.filename?.split('/');
                    const imageName = splitValues[splitValues.length - 1];

                    addService(serviceValues.name, serviceValues.price, serviceValues.time_span, serviceValues.category, serviceValues.description, `http://localhost:3000/images/${imageName}`)
                        .then(_ => {
                            setServiceValues({
                                name: '',
                                category: '',
                                picture: '',
                                description: '',
                                price: '',
                                time_span: ''
                            });

                            setServiceAddModal(false);
                            setServicePicture(null);

                            alert('New service has been added.');

                            getServiceList();
                        });
                })
        } else {
            addService(serviceValues.name, serviceValues.price, serviceValues.time_span, serviceValues.category, serviceValues.description, '')
                .then(_ => {
                    setServiceValues({
                        name: '',
                        category: '',
                        picture: '',
                        description: '',
                        price: '',
                        time_span: ''
                    });

                    setServiceAddModal(false);
                    setServicePicture(null);

                    alert('New service has been added.');

                    getServiceList();
                });
        }
    }

    const handleAddTherapist = () => {
        if(therapistPicture !== null) {
            const formData = new FormData();
            formData.append('myFile', therapistPicture);
            myApp.post('/api/uploadFile', formData)
                .then((response: any) => {
                    const {data} = response;
                    const splitValues = data?.filename?.split('/');
                    const imageName = splitValues[splitValues?.length - 1];

                    addTherapist(therapistValues.name, therapistValues.specialty, `http://localhost:3000/images/${imageName}`)
                        .then(_ => {
                            setTherapistValues({
                                name: '',
                                specialty: '',
                                picture: ''
                            });

                            setTherapistAddModal(false);
                            setTherapistPicture(null);

                            alert('New Therapist has been added');

                            getTherapistsList();
                        })
                });
        } else {
            addTherapist(therapistValues.name, therapistValues.specialty, '')
                .then(_ => {
                    setTherapistValues({
                        name: '',
                        specialty: '',
                        picture: ''
                    });

                    setTherapistAddModal(false);
                    setTherapistPicture(null);

                    alert('New Therapist has been added');

                    getTherapistsList();
                })
        }
    }

    useEffect(() => {
        getTherapistsList();
    }, []);

    useEffect(() => {
        getServiceList();
    }, []);

    const therapistsHeaders = [
        {
            name: 'Nume',
            type: 'name'
        },
        {
            name: 'Specializare',
            type: 'specialty'
        },
        {
            name: 'Poză',
            type: 'picture'
        },
        {
            name: 'Actions',
            type: 'actions'
        }
    ];

    const serviceHeaders = [
        {
            name: 'Nume',
            type: 'name'
        },
        {
            name: 'Categorie',
            type: 'category'
        },
        {
            name: 'Poză',
            type: 'picture'
        },
        {
            name: 'Descriere',
            type: 'description'
        },
        {
            name: 'Preț',
            type: 'price'
        },
        {
            name: 'Durată',
            type: 'time_span'
        }
    ];

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteTherapist(id)
                .then(() => getTherapistsList());
        }
    }

    const handleDeleteService = (id: number) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteService(id)
                .then(() => getServiceList());
        }
    }

    const afterOpenModal = () => {
        subtitle.style.color = '#f00';
    }

    return {
        serviceAddModal,
        afterOpenModal,
        setServiceAddModal,
        customStyles,
        serviceValues,
        onChangeService,
        setServicePicture,
        handleAddService,
        therapistAddModal,
        therapistValues,
        onChangeTherapist,
        setTherapistPicture,
        handleAddTherapist,
        spaceBetween,
        therapistsHeaders,
        therapistsRows,
        handleDelete,
        setTherapistAddModal,
        serviceHeaders,
        serviceRows,
        handleDeleteService
    }
}
