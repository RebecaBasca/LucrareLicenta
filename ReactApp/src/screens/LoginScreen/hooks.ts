import {useCallback, useEffect, useState} from "react";
import {login} from "../../api/accounts";
import {APP_USER} from "../../api/client";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../routes";

const useLoginScreen = () => {
    const [values, setValues] = useState({
        fullName: '',
        email: '',
        password: '',
        fullNameError: '',
        emailError: '',
        passwordError: ''
    });

    const [invalidInputs, setInvalidInputs] = useState(true);
    const navigate = useNavigate();

    const loginContent = {
        title: 'Bine ai revenit in contul tău!',
        description: 'Vezi parcursul tău din cadrul cabinetului',
        btnText: 'Log in'
    };

    useEffect(() => {
        setInvalidInputs(
            ((values.email !== '' && values.emailError === '') && (values.password !== '' && values.passwordError === '')));
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

    const handleLogin = () => {
        login(values.email, values.password)
            .then(response => {
                const { data } = response;
                if(data?.success) {
                    const { content } = data;
                    localStorage.setItem(APP_USER, content.token);

                    const userObject = {
                        email: content.userEmail,
                        id: content.userId,
                        name: content.userName,
                        accountType: content.userAccType
                    }

                    localStorage.setItem('currentUser', JSON.stringify(userObject));

                    if(content.userAccType === 'admin') {
                        navigate(ROUTES.admin)
                    } else {
                        navigate(ROUTES.profile);
                    }
                }
            })
            .catch(error => {
                console.log(error)
            });
    }

    return {
        loginContent,
        invalidInputs,
        values,
        handleOnChange,
        handleLogin
    }
}

export {
    useLoginScreen
}