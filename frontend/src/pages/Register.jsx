import React, { useEffect, useState } from 'react';
import { RegisterStyles } from '../styles/RegisterStyles';
import useForm from '../hooks/useForm';
import { registerValidate } from '../validations/registerValidate';
import { useMutation } from '@apollo/client';
import CLIENT_REGISTER from '../graphql/mutations/CLIENT_REGISTER';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    birthdate: ''
  });
  const [clientRegister, { data, loading, error }] = useMutation(CLIENT_REGISTER);
  const navigate = useNavigate();

  const submitForm = (values) => {
    clientRegister({
      variables: {
          firstname: values.firstname, 
          lastname: values.lastname,
          email: values.email,
          password: values.password, 
          phone: values.phone,
          birthdate: values.birthdate
      }
    });
  }

  const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, registerValidate);

  useEffect(() => {
    if (data) {
      if (data.clientRegister.status === 201) {
        navigate('/login');
      }
    }
    //eslint-disable-next-line
  }, [data, error]);
  

  return (
    <RegisterStyles>
      <div className="main-container">
        <h1>Crear cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <label htmlFor="firstname">Nombre</label>
            <input 
              id="firstname"
              type="text" 
              placeholder="John"
              name="firstname"
              value={values.firstname}
              onChange={handleChange}
            />
            <p className='error'>{errors.firstname}</p>
          </div>
          <div className="form-container">
            <label htmlFor="lastname">Apellido</label>
            <input 
              id="lastname"
              type="text" 
              placeholder="Wayne"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
            />
            <p className='error'>{errors.lastname}</p>
          </div>
          <div className="form-container">
            <label htmlFor="email">Correo</label>
            <input 
              id="email"
              type="text" 
              placeholder="johnwayne@intecel.com"
              name="email"
              value={values.email.replace(/\s+/g, '')}
              onChange={handleChange}
            />
            <p className='error'>{errors.email}</p>
          </div>
          <div className="form-container">
            <label htmlFor="password">Contraseña</label>
            <input 
              id="password"
              type="password" 
              placeholder="*******"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <p className='error'>{errors.password}</p>
          </div>
          <div className="form-container">
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <input 
              id="confirmPassword"
              type="password" 
              placeholder="*******"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
            />
            <p className='error'>{errors.confirmPassword}</p>
          </div>
          <div className="form-container">
            <label htmlFor="phone">Celular</label>
            <input 
              id="phone"
              type="text" 
              placeholder="999 123 4567"
              name="phone"
              value={values.phone}
              onChange={handleChange}
            />
            <p className='error'>{errors.phone}</p>
          </div>
          <div className="form-container">
            <label htmlFor="birthdate">Fecha de nacimiento</label>
            <input 
              id="birthdate"
              type="text" 
              placeholder="Wayne"
              name="birthdate"
              value={values.birthdate}
              onChange={handleChange}
            />
            <p className='error'>{errors.birthdate}</p>
          </div>
          <button type="submit" disabled={loading ? true : false}>Registrarse</button>
        </form>
      </div>
    </RegisterStyles>
  );
}

export default Register;