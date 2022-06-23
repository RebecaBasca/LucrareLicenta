import React from 'react';

import {ServiceListProps} from "./types";
import {Box} from "@mui/material";


export const ServiceList = ({ services }: ServiceListProps) => {
    return (
        <div>
            {
                services.map((serviceItem, idx) => (
                    <Box
                        key={idx}
                        mb={6}
                    >
                        <h2>{serviceItem.title}</h2>
                        <Box
                            display={'flex'}
                            gap={6}
                            alignItems={'center'}
                            justifyContent={'flex-end'}
                            pr={6}
                            fontSize={18}
                            mb={1}
                        >
                            <Box>
                                Durata
                            </Box>
                            <Box>
                                Pret
                            </Box>
                        </Box>
                        {
                            serviceItem.items.map((item, jdx) => (
                                <Box
                                    key={`${idx}-${jdx}`}
                                    bgcolor={serviceItem.bgColor}
                                    borderRadius={'18px'}
                                    p={2}
                                    mb={2}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'space-between'}
                                    color={serviceItem.itemsFontColor ? serviceItem.itemsFontColor : '#000'}
                                >
                                    <Box
                                        flex={1}
                                    >
                                        {item.name}
                                    </Box>
                                    <Box
                                        display={'flex'}
                                        alignItems={'center'}
                                        gap={4}
                                        mr={2}
                                        fontWeight={'bold'}
                                    >
                                        <Box>
                                            {item.duration}min
                                        </Box>
                                        <Box>
                                            {item.price}RON
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }
                    </Box>
                ))
            }
        </div>
    );
}