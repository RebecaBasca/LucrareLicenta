import {Box} from "@mui/material";
import React from "react";

export const ContentImage = ({ title, description, image, imageDirection = 'right'}: any) => {
    if(imageDirection === 'right') {
        return renderRightImage({title, description, image});
    } else {
        return renderLeftImage({title, description, image});
    }
}

const renderLeftImage = ({ title, description, image}: any) => {
    return (
        <Box
            style={{
                position: 'relative',
                paddingBottom: 50, // on each section,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center',
            }}
            flexDirection={{ xs: 'column', md: 'row' }}
        >
            <Box
                style={{
                    marginRight: -100,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={image}
                    width={540}
                    height={340}
                    alt=""
                />
            </Box>
            <Box
                style={{
                    backgroundColor: '#368F8B',
                    paddingLeft: 50,
                    paddingTop: 40,
                    paddingRight: 50,
                    paddingBottom: 40,
                    color: '#fff',
                    width: 460,
                    height: 360,
                    borderRadius: 7,
                    zIndex: -1,
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'center'
                }}
            >
                <h1 style={{ fontWeight: 400 }}>{title}</h1>
                <p style={{ maxWidth: 270, textAlign: 'right' }}>
                    {description}
                </p>
            </Box>
        </Box>
    )
}

const renderRightImage = ({ title, description, image}: any) => {
    return (
        <Box
            style={{
                position: 'relative',
                paddingBottom: 50, // on each section,
                display: "flex",
                alignItems: 'center',
                justifyContent: 'center'
            }}
            flexDirection={{ xs: 'column', lg: 'row' }}
        >
            <Box
                style={{
                    backgroundColor: '#DDBEA8',
                    paddingLeft: 50,
                    paddingTop: 40,
                    paddingRight: 50,
                    paddingBottom: 40,
                    color: '#fff',
                    width: 460,
                    height: 360,
                    borderRadius: 7
                }}
            >
                <h1 style={{ fontWeight: 400 }}>{title}</h1>
                <p style={{ maxWidth: 270 }}>
                    {description}
                </p>
            </Box>
            <Box
                style={{
                    marginLeft: -100
                }}
            >
                <img
                    src={image}
                    width={540}
                    height={340}
                    alt=""
                />
            </Box>
        </Box>
    )
}