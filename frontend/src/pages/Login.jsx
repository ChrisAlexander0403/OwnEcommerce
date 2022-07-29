import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import useForm from '../hooks/useForm';
import LoginStyles from '../styles/LoginStyles';
import loginValidate from '../validations/loginValidate';
import LOGIN from '../graphql/mutations/LOGIN';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/slices/userSlice';
import { login as setLogin } from '../features/slices/sessionSlice';

const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [login, { data, loading, error }] = useMutation(LOGIN);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitForm = ({ email, password }) => {
        login({
            variables: { email, password }
        });
    }

    const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, loginValidate);

    useEffect(() => {
        if (data) {
            if (data.login.status === 200) {
                dispatch(setLogin({
                    accessToken: data.login.authenticatedClient.tokens.accessToken,
                    refreshToken: data.login.authenticatedClient.tokens.refreshToken
                }));

                if (data.login.authenticatedClient) {
                    dispatch(setUser({
                        _id: data.login.authenticatedClient.client._id,
                        firstname: data.login.authenticatedClient.client.firstname,
                        lastname: data.login.authenticatedClient.client.lastname,
                        profilePicture: data.login.authenticatedClient.client.profilePicture
                    }));
                } else if (data.login.authenticatedUser) {
                    dispatch(setUser({
                        _id: data.login.authenticatedUser.user._id,
                        firstname: data.login.authenticatedUser.user.firstname,
                        lastname: data.login.authenticatedUser.user.lastname,
                        profilePicture: data.login.authenticatedUser.user.profilePicture,
                        rol: data.login.authenticatedUser.user.rol,
                    }));
                }
                navigate('/');
            };
        }
    }, [data]);
    

    return (
        <LoginStyles isVisible={isVisible}>
            <img src="assets/img/people-2594319.jpg" alt="Login"/>
            <div className="login-form">
                <h1>Inicia sesión</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Correo</label>
                        <input 
                            id="email"
                            type="text" 
                            placeholder="correo@intecel.com"
                            name="email"
                            value={values.email.replace(/\s+/g, '')}
                            onChange={handleChange}
                        />
                    </div>
                    { errors.email && <p className="error">{errors.email}</p> }
                    <div className="form-group">
                        <label htmlFor="email">Contraseña</label>
                        <div className="password">
                            <input 
                                id="password"
                                type={isVisible ? "text" : "password"} 
                                placeholder="**********"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                            <button type="button" className="show" onClick={() => setIsVisible(!isVisible)}>
                                { isVisible ? <AiFillEye /> : < AiFillEyeInvisible /> }
                            </button>
                        </div>
                    </div>
                    { errors.password && <p className="error">{errors.password}</p> }
                    <Link to="/recovery/forgot-password">¿Olvidaste tu contraseña?</Link>
                    <button type="submit">Iniciar sesión</button>
                </form>
                <div className="link"><p>¿Aún no estás registrado?</p>&nbsp;<Link to="/register">Registrate aquí</Link></div>
            </div>
        </LoginStyles>
    );
}

export default Login;