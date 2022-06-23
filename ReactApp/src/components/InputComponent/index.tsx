import {Box, InputAdornment, TextField} from "@mui/material";

type InputComponentProps = {
    placeholder: string;
    icon?: any;
    style?: any;
    error?: boolean;
    errorMessage?: string;
    value: any;
    onChange: any;
    name?: string;
    type?: 'text' | 'password' | 'email' | 'file';
}

const InputComponent = ({ placeholder, icon, style, error, errorMessage, value, onChange, name, type = 'text' }: InputComponentProps) => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <TextField
                placeholder={placeholder}
                style={{
                    backgroundColor: '#F3DFC1A1',
                    borderRadius: 20,
                    ...style,
                }}
                error={error}
                InputProps={{
                    startAdornment: icon && (
                        <InputAdornment position="start" style={{ color: '#000' }}>
                            {icon}
                        </InputAdornment>
                    ),
                    style: {
                        backgroundColor: '#F3DFC1A1',
                        borderRadius: 20,
                        borderColor: '#F3DFC1A1'
                    },
                }}
                variant="outlined"
                helperText={errorMessage}
                value={value}
                onChange={onChange}
                name={name}
                type={type}
            />
        </Box>
    )
}

export default InputComponent;