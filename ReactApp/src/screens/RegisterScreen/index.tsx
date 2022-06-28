import {Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InputComponent from "../../components/InputComponent";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {useRegisterScreen} from "./hooks";

const RegisterScreen = () => {

    const {
        loginContent,
        invalidInputs,
        values,
        handleOnChange,
        handleSignup
    } = useRegisterScreen();

    return (
        <>
            <Box
                style={{
                    padding: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%'
                }}
            >
                <Grid
                    container
                    style={{
                        border: '1px solid #368F8BF7',
                        borderRadius: 18,
                        maxWidth: 1000,
                        flex: 1
                    }}
                >
                    <Grid item md={7} xs={12}>
                        <Box
                            style={{
                                display: 'flex',
                                height: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box style={{ paddingBottom: 20 }}>
                                <h1
                                    style={{
                                        fontWeight: 400
                                    }}
                                >
                                    Creează-ți cont!
                                </h1>
                            </Box>
                            <Box style={{ paddingBottom: 20 }}>
                                <InputComponent
                                    placeholder="Nume și prenume"
                                    icon={<AccountCircleOutlinedIcon />}
                                    style={{
                                        minWidth: 320
                                    }}
                                    value={values.fullName}
                                    name='fullName'
                                    onChange={handleOnChange}
                                    errorMessage={values.fullNameError}
                                    error={!!values.fullNameError}
                                />
                            </Box>
                            <Box style={{ paddingBottom: 20 }}>
                                <InputComponent
                                    placeholder="Email"
                                    icon={<EmailOutlinedIcon />}
                                    style={{
                                        minWidth: 320
                                    }}
                                    value={values.email}
                                    name='email'
                                    onChange={handleOnChange}
                                    type={'email'}
                                    errorMessage={values.emailError}
                                    error={!!values.emailError}
                                />
                            </Box>
                            <Box style={{ paddingBottom: 20 }}>
                                <InputComponent
                                    placeholder="Parolă"
                                    icon={<LockOutlinedIcon />}
                                    style={{
                                        minWidth: 320
                                    }}
                                    value={values.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    type={'password'}
                                    errorMessage={values.passwordError}
                                    error={!!values.passwordError}
                                />
                            </Box>
                            <Box style={{ paddingBottom: 20 , marginLeft: '-150px'}}>
                                <FormControl>
                                    {/*<FormLabel id="demo-radio-buttons-group-label">Tip Cont</FormLabel>*/}
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="accountType"
                                        value={values.accountType}
                                        onChange={handleOnChange}
                                    >
                                        <FormControlLabel value="client" control={<Radio />} label="Client" />
                                        <FormControlLabel value="terapeut" control={<Radio />} label="Terapeut" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid
                        item
                        md={5}
                        xs={12}
                        display={{
                            xs: "none", md: "block"
                        }}
                    >
                        <Box
                            style={{
                                minHeight: 500,
                                borderRadius: 17,
                                backgroundColor: '#368F8BF7',
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                fontFamily: 'Georama',
                                fontWeight: 400,
                                textAlign: 'center'
                            }}
                        >
                            <h1
                                style={{
                                    maxWidth: 270,
                                    fontSize: 40,
                                }}
                            >
                                {loginContent.title}
                            </h1>
                            <p
                                style={{
                                    fontSize: 20,
                                    maxWidth: 350
                                }}
                            >
                                {loginContent.description}
                            </p>
                            <Box mt={4}>
                                <Button
                                    variant="contained"
                                    style={{
                                        backgroundColor: '#fff',
                                        color: '#000',
                                        borderRadius: 25,
                                        paddingLeft: 80,
                                        paddingRight: 80,
                                        paddingTop: 12,
                                        paddingBottom: 12,
                                        fontSize: 20,
                                        fontWeight: 400,
                                        textTransform: 'none'
                                    }}
                                    disabled={!invalidInputs}
                                    onClick={handleSignup}
                                >
                                    Register
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export {
    RegisterScreen
}