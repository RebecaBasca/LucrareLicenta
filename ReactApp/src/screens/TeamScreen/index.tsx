import React from 'react';
import {Box, Grid} from "@mui/material";
import {useTeamScreen} from "./hooks";
import TeamItem from "../../components/TeamItem";

const TeamScreen = () => {

    const {
        teamContent,
        teams
    } = useTeamScreen();

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
                    <Box
                        display={"flex"}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Box
                            textAlign={'center'}
                            maxWidth={600}
                        >
                            <h1>{teamContent.title}</h1>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={5} mb={15}>
                <Grid
                    container
                    spacing={5}
                >
                    {
                        teams.map((teamItem: any, idx) => {
                            return (
                                <Grid
                                    key={idx}
                                    item
                                    sm={10}
                                    md={4}
                                    display={'flex'}
                                    alignItems={'flex-start'}
                                    justifyContent={'center'}
                                    position={'relative'}
                                >
                                    <Box
                                        mt={10}
                                        bgcolor={'#368F8B'}
                                        position={'absolute'}
                                        zIndex={98}
                                        width={'100%'}
                                        height={150}
                                    >
                                        &nbsp;
                                    </Box>
                                    <Box
                                        zIndex={99}
                                    >
                                        <TeamItem
                                            name={teamItem.name}
                                            image={teamItem.image}
                                            specialities={teamItem.specialities}
                                        />
                                    </Box>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Grid>
    )
}

export {
    TeamScreen
}
