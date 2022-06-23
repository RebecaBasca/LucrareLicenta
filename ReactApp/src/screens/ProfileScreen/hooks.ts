import {HeaderType} from "./types";
import {useCallback, useEffect, useState} from "react";
import {getBookings} from "../../api/bookings";
import {changeAction} from "../../api/accounts";
import {APP_USER} from "../../api/client";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../routes";

export const useProfileScreen = () => {

    const [therapists, setTherapists] = useState<any>([]);
    const [futures, setFutures] = useState<any>([]);
    const [spaceBetween, setSpaceBetween] = useState(95);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [accountType, setAccountType] = useState<any>('');
    const [values, setValues] = useState<any>({
        name: '',
        email: '',
    });
    const [editableFields, setEditableFields] = useState<any>({
        name: false,
        email: false
    });

    const navigate = useNavigate();

    const onChange = useCallback((event: any) => {
        const { name, value } = event?.target;

        setValues((prevState: any) => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('currentUser');

        if(user) {
            const loggedUser = JSON.parse(user);
            setCurrentUser(loggedUser);
            setValues({
                name: loggedUser?.name,
                email: loggedUser?.email
            });
            setAccountType(loggedUser?.accountType);
        } else {
            navigate(ROUTES.login);
        }
    }, [navigate]);

    const handleSpaceBetween = useCallback(() => {
        const trueValues = Object.values(editableFields).reduce((a: any, item) => a + item, 0)

        if(trueValues && typeof trueValues === 'number') {
            const newState = spaceBetween + (7 * trueValues);

            setSpaceBetween(newState);
        }

    }, [editableFields, spaceBetween])

    const handleEditFields = useCallback((targetItem: string) => {

        setEditableFields(((prevState: any) => ({
            ...prevState,
            [targetItem]: !prevState[targetItem]
        })));

        handleSpaceBetween();
    }, [handleSpaceBetween]);

    const handleToggleEditField = useCallback((currentField: string) => {
        if(editableFields[currentField]) {
            const apiName = currentField.charAt(0).toUpperCase() + currentField.slice(1);
            const targetValue = values[currentField];

            const USER_TOKEN = localStorage.getItem(APP_USER) || null;

            if(currentUser && USER_TOKEN) {
                if(targetValue !== '') {
                    changeAction(apiName, currentUser?.id, targetValue, USER_TOKEN)
                        .then(_ => {

                            const newUserObject = {
                                ...currentUser,
                                name: values.name,
                                email: values.email,
                            }

                            localStorage.setItem('currentUser', JSON.stringify(newUserObject));

                            handleEditFields(currentField)
                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    alert(`You can't leave ${currentField} empty.`);
                }
            } else {
                alert('You are not logged in.')
            }
        } else {
            handleEditFields(currentField);
        }
    }, [currentUser, editableFields, handleEditFields, values])

    useEffect(() => {
        const user = localStorage.getItem('currentUser');

        if(user) {
            const currentUser = JSON.parse(user);

            if(currentUser?.email) {
                getBookings('Previous', currentUser?.id)
                    .then((response: any) => {
                        const { data } = response;

                        if(data?.content && Array.isArray(data?.content)) {
                            setTherapists(data?.content.map((dataItem: any, idx: any) => ({
                                name: dataItem.service,
                                data: dataItem.date.slice(0, 10),
                                ora: dataItem.time,
                                terapeut: currentUser.accountType === 'client' ? dataItem.therapist_name : dataItem.client_name
                            })));
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });

                getBookings('Future', currentUser?.id)
                    .then((response: any) => {
                        const { data } = response;

                        if(data?.content && Array.isArray(data?.content)) {
                            setFutures(data?.content.map((dataItem: any, idx: any) => ({
                                name: dataItem.service,
                                data: dataItem.date.slice(0, 10),
                                ora: dataItem.time,
                                terapeut: currentUser.accountType === 'client' ? dataItem.therapist_name : dataItem.client_name
                            })));
                        }
                    })
            }
        }
    }, []);

    const previousSchedulesHeaders: HeaderType[] = [
        {
            name: 'Serviciu',
            type: 'name'
        },
        {
            name: 'Data',
            type: 'data'
        },
        {
            name: 'Ora',
            type: 'ora'
        },
        {
            name: accountType === 'client' ? 'Terapeut' : 'Client',
            type: 'terapeut'
        }
    ]


    const nextScheduleHeaders: HeaderType[] = [
        {
            name: 'Serviciu',
            type: 'name'
        },
        {
            name: 'Data',
            type: 'data'
        },
        {
            name: 'Ora',
            type: 'ora'
        },
        {
            name: accountType === 'client' ? 'Terapeut' : 'Client',
            type: 'terapeut'
        }
    ];

    return {
        spaceBetween,
        previousSchedulesHeaders,
        therapists,
        nextScheduleHeaders,
        futures,
        editableFields,
        handleToggleEditField,
        values,
        onChange,
        currentUser
    }
}