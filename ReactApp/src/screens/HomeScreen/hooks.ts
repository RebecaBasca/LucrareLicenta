import {useStyles} from "./styles";
import {useEffect, useState} from "react";
import {getTherapists} from "../../api/therapist";
import {getServices} from "../../api/services";

const useHomeScreen = () => {
    const classes = useStyles();
    const [teams, setTeams] = useState([]);
    const [services, setServices] = useState<any>([]);

    const [adultsServices, setAdultsServices] = useState<string[]>([]);
    const [childrenServices, setChildrenServices] = useState<string[]>([]);

    const homeContent = {
        headerText: 'Punem preț pe sănătatea minții tale'
    }

    useEffect(() => {
        getServices('adults')
            .then((response: any) => {
                const { data } = response;

                if(data?.content) {
                    setAdultsServices(data?.content.map((item: any) => item.name));
                }
            });
    }, []);

    useEffect(() => {
        getServices('children')
            .then((response: any) => {
                const { data } = response;

                if(data?.content) {
                    setChildrenServices(data?.content.map((item: any) => item.name))
                }
            })
    }, [])

    useEffect(() => {
        setServices([
            {
                title: 'Adulți',
                services: adultsServices,
                direction: 'left'
            },
            {
                title: 'Copii',
                services: childrenServices,
                direction: 'right'
            }
        ])
    }, [adultsServices, childrenServices]);

    useEffect(() => {
        getTherapists()
            .then((response: any) => {
                const { data } = response;


                if(data?.content && Array.isArray(data?.content)) {
                    const processedTeams = data?.content.map((teamItem: any, idx: any) => ({
                        name: teamItem.name,
                        image: teamItem.picture,
                        specialities: teamItem.specialty.split(',')
                    }));

                    setTeams(processedTeams.slice(0, 4));
                }
            });
    }, []);

    return {
        teams,
        classes,
        homeContent,
        services,
    }
}

export {
    useHomeScreen
}