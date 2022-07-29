import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import CLIENT_FORGOT_PASSWORD from '../graphql/mutations/CLIENT_FORGOT_PASSWORD';
import useForm from '../hooks/useForm';
import { ForgotPasswordStyles } from '../styles/ForgotPasswordStyles';
import emailValidate from '../validations/emailValidate';

const ForgotPassword = () => {

    const [values, setValues] = useState({
        email: ''
    });
    const [clientForgotPasword, { loading, error, data }] = useMutation(CLIENT_FORGOT_PASSWORD);

    const submitForm = ({ email }) => {
        clientForgotPasword({
            variables: {
                email: email
            }
        });
    }

    const {handleChange, handleSubmit, errors} = useForm(values, setValues, submitForm, emailValidate);

    return (
        <ForgotPasswordStyles>
            <h1>Recupera tu contraseña</h1>
            { loading && <p>Loading...</p> }
            <div className="form-container">
                <p>Ingresa tu correo para continuar</p>
                <form onSubmit={handleSubmit}>
                    <div className="text-input">
                        <label htmlFor="email">Correo</label>
                        <input 
                            id="email" 
                            type="text" 
                            placeholder="correo@dominio.com"
                            name="email" 
                            value={values.email}
                            onChange={handleChange}
                        />
                        { errors.email && <p className="error">{errors.email}</p> }
                    </div>
                    <button type="submit">Recuperar contraseña</button>
                </form>
            </div>
        </ForgotPasswordStyles>
    );
}

export default ForgotPassword;