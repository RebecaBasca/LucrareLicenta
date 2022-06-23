import {useCallback, useEffect, useState} from "react";
import {ValuesTypes} from "./types";
import moment from "moment";
import {addBooking, getAvailableHours} from "../../api/bookings";
import {getTherapists} from "../../api/therapist";
import {getServicesList} from "../../api/services";
import emailjs from '@emailjs/browser';


export const useScheduleScreen = () => {

    const [service, setService] = useState<string>('');
    const [therapist, setTherapist] = useState<string>('');
    const [therapists, setTherapists] = useState<any>([]);
    const [services, setServices] = useState<any>([]);

    const [availableHours, setAvailableHours] = useState<any[]>([]);
    const [selectedHour, setSelectedHour] = useState<number>(-1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [showChildInput, setShowChildInput] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const [values, setValues] = useState<ValuesTypes>({
        firstName: '',
        lastName: '',
        email: '',
        childName: '',
        selectedService: '',
        selectedTherapist: '',
        selectedHour: ''
    });

    const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    useEffect(() => {
        getServicesList()
            .then((response: any) => {
                const { data } = response;

                if(data?.content) {
                    setServices(data?.content.map((serviceItem: any, idx: any) => ({
                        id: idx,
                        text: `${serviceItem.name} (${capitalizeFirstLetter(serviceItem.category)})`
                    })));
                }
            })
    }, []);

    useEffect(() => {
        getTherapists()
            .then((response: any) => {
                const { data } = response;

                if(data?.content) {
                    setTherapists(data?.content.map((item: any, idx: any) => ({
                        id: item.id,
                        text: item.name
                    })));
                }
            })
    }, []);

    useEffect(() => {
        const formattedDate = moment(selectedDate, "MM-DD-YYYY").format('DD-MM-YYYY');

        if(formattedDate && therapist !== '') {
            const selectedTherapist: any = therapists.find((item: any, idx: any) => item.id === therapist);

            if(selectedTherapist) {
                getAvailableHours(selectedTherapist.text, formattedDate)
                    .then((response: any) => {
                        const { data } = response;

                        if(data?.content && Array.isArray(data?.content)) {
                            setAvailableHours(data?.content);
                        }
                    })
            }
        }
    }, [selectedDate, therapist, therapists]);

    useEffect(() => {
        setShowSummary(
            service !== '' &&
            therapist !== '' &&
            selectedHour !== -1 &&
            selectedDate !== null &&
            values.firstName !== '' &&
            values.lastName !== '' &&
            values.email !== '' &&
            values.selectedService !== '' &&
            values.selectedTherapist !== '' &&
            values.selectedHour !== ''
        );
    }, [service, therapist, selectedHour, selectedDate, values.firstName, values.lastName, values.email, values.childName, values.selectedService, values.selectedTherapist, values.selectedHour]);

    const setNewValue = (name: any, value: any) => {
        setValues((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const onChange = useCallback((event: any) => {
        const {
            name,
            value
        } = event.target;

        setNewValue(name, value);
    }, []);

    const content = {
        leftFirstHeading: '1. Alege serviciu',
        leftSecondHeading: '2. Alege terapeut',
        leftThirdHeading: '4. Alege ora disponibila'
    };

    const selectCurrentHour = (idx: number) => {
        setSelectedHour(idx);

        setNewValue('selectedHour', availableHours[idx]);
    }

    const setCurrentSelect = useCallback((value: any, name: string) => {
        if(name === 'service') {
            setService(value);
            const myService: any = services.find((x: any) => x.id === value);

            setNewValue('selectedService', myService.text);
        } else {
            setTherapist(value);
            const myTherapist: any = therapists.find((x: any) => x.id === value);

            setNewValue('selectedTherapist', myTherapist.text);
        }
    }, [services, therapists]);

    const handleSubmit = () => {
        const fullName = values.firstName + ' ' + values.lastName;
        const formattedDate = moment(selectedDate, "MM-DD-YYYY").format('DD-MM-YYYY');

        addBooking(fullName, values.email, formattedDate, values.selectedHour, values.selectedTherapist, values.selectedService, values.childName, showChildInput)
            .then((response: any) => {
                alert('Booked.')
            })

        sendEmail(formattedDate);
    }

    const sendEmail = (formattedDate: string) => {
        let templateParams = {
            to_address: values.email,
            date: formattedDate,
            time: values.selectedHour,
            reply_to: "Reply to this email address if you want to make changes to this booking."
        };

        emailjs.send('service_k3cc586', 'template_qn69xak', templateParams, '1dYZTc5-RDrE_tVmT');
    }

    return {
        service,
        setService,
        therapist,
        setTherapist,
        content,
        services,
        therapists,
        availableHours,
        selectCurrentHour,
        selectedHour,
        selectedDate,
        setSelectedDate,
        showChildInput,
        setShowChildInput,
        values,
        onChange,
        showSummary,
        setCurrentSelect,
        handleSubmit
    }
}
