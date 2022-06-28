import {useEffect, useState} from "react";
import {getServices} from "../../api/services";

export const usePriceScreen = () => {

    const [services, setServices] = useState([
        {
            title: 'Servicii pentru copii',
            bgColor: '#368F8B',
            itemsFontColor: '#fff',
            type: 'children',
            items: []
        },
        {
            title: 'Servicii pentru adulți',
            bgColor: '#F3DFC1',
            type: 'adults',
            items: []

        }
    ]);


    useEffect(() => {
        getServices('children')
            .then((response: any) => {
                const { data } = response

                if(data?.content && Array.isArray(data?.content)) {

                    let myServices = [...services];

                    myServices[0].items = data?.content.map((serviceItem: any, idx: any) => ({
                        name: serviceItem.name,
                        duration: serviceItem.time_span,
                        price: serviceItem.price
                    }));

                    setServices(myServices);
                }
            })
    }, [services])

    useEffect(() => {
        getServices('adults')
            .then((response: any) => {
                const { data } = response

                if(data?.content && Array.isArray(data?.content)) {

                    let myServices = [...services];

                    myServices[1].items = data?.content.map((serviceItem: any, idx: any) => ({
                        name: serviceItem.name,
                        duration: serviceItem.time_span,
                        price: serviceItem.price
                    }));

                    setServices(myServices);
                }
            })
    }, [services])

    return {
        services
    }
}