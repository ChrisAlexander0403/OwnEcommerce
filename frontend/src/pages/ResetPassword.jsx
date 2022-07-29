import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import CLIENT_RESET_PASSWORD from '../graphql/mutations/CLIENT_RESET_PASSWORD';
import useForm from '../hooks/useForm';
import { ResetPasswordStyles } from '../styles/ResetPasswordStyles';
import newPasswordValidate from '../validations/newPasswordValidate';

const ResetPassword = () => {

    const [values, setValues] = useState({
        newPassword: '',
        confirmNewPassword: ''
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible1, setIsVisible1] = useState(false);

    let { token } = useParams();

    const [clientResetPassword, { loading, error, data }] = useMutation(CLIENT_RESET_PASSWORD);

    const submitForm = ({ newPassword }) => {
        clientResetPassword({
            variables: { newPassword, token }
        });
    }

    const { handleSubmit, handleChange, errors } = useForm(values, setValues, submitForm, newPasswordValidate);

    useEffect(() => {
        if (data) {
            console.log(data.clientResetPassword);
        }
    }, [data]);
    

    return (
        <ResetPasswordStyles>
            <h1>Restablece tu contraseña</h1>
            <div className="form-container">
                {
                    loading ?
                    <p>Loading...</p> :
                    <>
                    <p>Ingresa tu nueva contraseña</p>
                    <form onSubmit={handleSubmit}>
                        <div className="text-input">
                            <label htmlFor="newPassword">Nueva contraseña</label>
                            <div className="password">
                                <input 
                                    id="newPassword"
                                    type={isVisible ? "text" : "password"} 
                                    placeholder="**********"
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                />
                                <button type="button" className="show" onClick={() => setIsVisible(!isVisible)}>
                                    { isVisible ? <AiFillEye /> : < AiFillEyeInvisible /> }
                                </button>
                            </div>
                            { errors.newPassword && <p className="error">{errors.newPassword}</p> }
                        </div>
                        <div className="text-input">
                            <label htmlFor="confirmNewPassword">Confirmar contraseña</label>
                            <div className="password">
                                <input 
                                    id="confirmNewPassword"
                                    type={isVisible1 ? "text" : "password"} 
                                    placeholder="**********"
                                    name="confirmNewPassword"
                                    value={values.confirmNewPassword}
                                    onChange={handleChange}
                                />
                                <button type="button" className="show" onClick={() => setIsVisible1(!isVisible1)}>
                                    { isVisible1 ? <AiFillEye /> : < AiFillEyeInvisible /> }
                                </button>
                            </div>
                            { errors.confirmNewPassword && <p className="error">{errors.confirmNewPassword}</p> }
                        </div>
                        { data && data.clientResetPassword.status !== 200 && <p className="error">{data.clientResetPassword.message}</p> }
                        <button type="submit">Cambiar contraseña</button>
                    </form>
                    </>
                }
            </div>
        </ResetPasswordStyles>
    );
}

export default ResetPassword;