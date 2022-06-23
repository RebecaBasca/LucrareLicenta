import React from 'react';
import {TeamItemProps} from "./types";
import {Avatar, Box} from "@mui/material";

const TeamItem = ({ name, image, specialities, borderColor = '#2F2E41' }: TeamItemProps) => {
    return (
        <Box
            borderRadius={'14px'}
            border={`2px solid ${borderColor}`}
            display={'flex'}
            padding={'30px'}
            flexDirection={'column'}
            alignItems={'center'}
            maxWidth={'250px'}
            gap={3}
            bgcolor={'#fff'}
            minHeight={'370px'}
        >
            <Box>
                <Avatar
                    alt={name}
                    src={image}
                    sx={{ width: 250, height: 250 }}
                />
            </Box>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'flex-start'}
                alignSelf="flex-start"
            >
                <h3 style={{ margin: 0 }}>{name}</h3>
                {
                    specialities && (
                        <Box mt={1}>
                            <Box
                                bgcolor={'#246A73'}
                                height={10}
                                borderRadius={20}
                                width={200}
                            >
                                &nbsp;
                            </Box>
                            <Box mt={1} display={"flex"} flexDirection={"column"} textAlign="left">
                                {
                                    specialities.map((specialityItem, jdx) => {
                                        return (
                                            <span key={jdx} style={{ margin: 0 }}>{specialityItem}</span>
                                        )
                                    })
                                }
                            </Box>
                        </Box>
                    )
                }
            </Box>
        </Box>
    );
}

export default TeamItem;