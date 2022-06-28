import {useEffect, useState} from "react";
import {getServices} from "../../api/services";

export const useServiceScreen = () => {
    const DIRECTION_RIGHT = 'right';
    const DIRECTION_LEFT = 'left';

    const [adultsServices, setAdultsServices] = useState([]);
    const [childrenServices, setChildrenServices] = useState([]);

    const [services, setServices] = useState<any>([]);

    useEffect(() => {
        getServices('adults')
            .then((response: any) => {
                const { data } = response;

                if(data?.content) {
                    setAdultsServices(data?.content.map((item: any, idx: any) => ({
                        title: item.name,
                        content: item.description,
                        image: item.picture,
                        imageDirection: idx % 2 === 0 ? DIRECTION_RIGHT : DIRECTION_LEFT
                    })))
                }
            });
    }, []);

    useEffect(() => {
        getServices('children')
            .then((response: any) => {
                const { data } = response;

                if(data?.content) {
                    setChildrenServices(data?.content.map((item: any, idx: any) => ({
                        title: item.name,
                        content: item.description,
                        image: item.picture,
                        imageDirection: idx % 2 === 0 ? DIRECTION_RIGHT : DIRECTION_LEFT
                    })));
                }
            })
    }, [])

    useEffect(() => {
        setServices([
            {
                name: "Servicii pentru adulți",
                items: adultsServices
            },
            {
                name: 'Servicii pentru copii',
                items: childrenServices
            }
        ])
    }, [adultsServices, childrenServices])

    return {
        services
    }
}