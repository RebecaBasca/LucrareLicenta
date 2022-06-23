import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";

type ButtonComponentProps = {
    label: string;
    linkTo?: string;
    variant?: 'outlined' | 'text' | 'contained';
    bgColor?: string;
}

const ButtonComponent = ({ label, linkTo, variant = 'outlined', bgColor = 'transparent' }: ButtonComponentProps) => {
    const navigate = useNavigate();

    const handleRedirect = (routeName?: string) => {
        if(routeName) {
            navigate(routeName);
        }
    }

    return (
        <Button
            variant={variant}
            style={{
                backgroundColor: `${bgColor}`,
                borderColor: '#2F2E41',
                color: '#2F2E41',
                borderRadius: 11,
                paddingLeft: 23,
                paddingRight: 23,
                paddingTop: 7,
                paddingBottom: 7,
                textTransform: 'capitalize',
                fontSize: 16
            }}
            onClick={() => handleRedirect(linkTo)}
        >
            {label}
        </Button>
    )
}

export default ButtonComponent;