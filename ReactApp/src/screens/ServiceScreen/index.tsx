import React from 'react';
import {Grid} from "@mui/material";
import {useServiceScreen} from "./hooks";
import {ContentImage} from "../../components/ContentImage";

const ServiceScreen = () => {

    const {
        services
    } = useServiceScreen();

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
                {
                    services.map((serviceItem: any, idx: any) => (
                        <div>
                            <div
                                style={{
                                    background: "rgba(36, 106, 115, 0.24)",
                                    height: 134,
                                    width: '100%',
                                    display: 'flex',
                                    position: 'relative',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    marginBottom: 20
                                }}
                            >
                                <div>
                                    <h1>{serviceItem.name}</h1>
                                </div>
                            </div>
                            <div >
                                {
                                    serviceItem.items.map((item: any, jdx: any) => (
                                        <ContentImage
                                            title={item.title}
                                            description={item.content}
                                            image={item.image}
                                            imageDirection={item.imageDirection}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </Grid>
        </Grid>
    )
}

export {
    ServiceScreen
}