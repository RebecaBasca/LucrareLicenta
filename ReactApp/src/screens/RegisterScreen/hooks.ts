import {useCallback, useEffect, useState} from "react";
import {signup} from "../../api/accounts";

const useRegisterScreen = () => {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        password: '',
        fullNameError: '',
        emailError: '',
        passwordError: '',
        accountType: ''
    });

    const [invalidInputs, setInvalidInputs] = useState(true);

    const loginContent = {
        title: 'Bine ai venit la cabinet!',
        description: ' Creaza-ti un cont pentru a-ti vedea programarile',
        btnText: 'Sign up'
    };

    useEffect(() => {
        setInvalidInputs(
            (values.fullName !== '' && values.fullNameError === '') && (values.email !== '' && values.emailError === '') && (values.password !== '' && values.passwordError === '')
        );
    }, [values.fullName, values.fullNameError, values.email, values.emailError, values.password, values.passwordError, invalidInputs]);

    const validateCurrentInput = useCallback((name: string, value: string) => {
        switch (name) {
            case 'fullName': {

                setValues(prevState => ({
                    ...prevState,
                    fullNameError: !value ? 'Please enter your name' : ''
                }));

                break;
            }

            case 'email': {

                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                setValues(prevState => ({
                    ...prevState,
                    emailError: !value ? 'Please enter your email' : !emailRegex.test(value) ? 'The email is invalid' : ''
                }));

                break;
            }

            case 'password': {

                setValues(prevState => ({
                    ...prevState,
                    passwordError: !value ? 'Please enter your password' : value.length < 5 ? 'Please enter at least 5 characters' : ''
                }));

                break;
            }
        }
    }, [values.fullNameError, values.emailError, values.passwordError])

    const handleOnChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;

        setValues(prevState => ({
            ...prevState,
            [name]: value
        }));

        validateCurrentInput(name, value);
    }

    const handleSignup = () => {
        signup(values.fullName, values.email, values.password, values.accountType)
            .then((response) => {
                const { data } = response;

                if(data?.success) {
                    alert('Account created successfully');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return {
        loginContent,
        invalidInputs,
        values,
        handleOnChange,
        handleSignup
    }
}

export {
    useRegisterScreen
}