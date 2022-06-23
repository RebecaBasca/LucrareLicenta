import React from 'react';
import {Grid} from "@mui/material";
import {ServiceList} from "../../components/ServiceList";
import {usePriceScreen} from "./hooks";

const PriceScreen = () => {

    const {
        services
    } = usePriceScreen();

    return (
        <Grid
            container
            spacing={2}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            pt={5}
        >
            <Grid item xs={10}>
                <Grid item xs={12}>
                    <ServiceList
                        services={services}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export {
    PriceScreen
}