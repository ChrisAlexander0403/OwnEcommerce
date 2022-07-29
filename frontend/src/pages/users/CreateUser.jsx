import { PersonAddAlt1 } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import DropdownList from '../../components/dropdownList/DropdownList';
import ImageProfileInput from '../../components/imageInput/ImageProfileInput';
import useForm from '../../hooks/useForm';
import userValidate from '../../validations/userValidate';
import { AddForm } from '../../styles/UsersStyles';
import USER_REGISTER from '../../graphql/mutations/USER_REGISTER';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

const roles = ['Administrador', 'Vendedor', 'Repartidor']

const CreateUser = () => {
  const [values, setValues] = useState({
    profilePicture: null,
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    rol: ''
  });
  const navigate = useNavigate();
  const [userRegister, { data, loading, error }] = useMutation(USER_REGISTER);

  console.log(error)

  const updateProfilePicture = (picture) => {
    setValues({ ...values, profilePicture: picture });
  }

  const updateRol = (rol) => {
    setValues({ ...values, rol: rol });
  }

  const submitForm = () => {
    userRegister({
      variables: {
          firstname: values.firstname, 
          lastname: values.lastname,
          email: values.email,
          password: values.password, 
          phone: values.phone,
          rol: values.rol
      }
    });
  }

  const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, userValidate);

  useEffect(() => {
    if (data) {
      if (data.userRegister.status === 201) {
        navigate(-1);
      }
    }
    //eslint-disable-next-line
  }, [data]);

  return (
    <AddForm>
      <div className="form-container">
      <h1>Agregar nuevo usuario</h1>
        <form onSubmit={handleSubmit}>
            <div className="flex-container">
              <div className="first">
                <div className="image-input">
                    <ImageProfileInput 
                        updatePictureCb={updateProfilePicture}
                        accept=".png,.jpeg,.jpg"
                        size={'250px'}
                    />
                </div>
              </div>
              <div className="second">
                <div className="text-input firstname">
                    <label htmlFor="firstname">Nombre</label>
                    <input 
                        className="form-input"
                        type="text" 
                        id="firstname" 
                        placeholder="Nombre"
                        name="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                    />
                    { errors.firstname && <p className="error">{errors.firstname}</p> }
                </div>
                <div className="text-input lastname">
                    <label htmlFor="lastname">Apellido</label>
                    <input 
                        className="form-input"
                        type="text" 
                        id="lastname" 
                        placeholder="Apellido"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                    />
                    { errors.lastname && <p className="error">{errors.lastname}</p> }
                </div>
                <div className="text-input email">
                    <label htmlFor="email">Correo</label>
                    <input 
                        className="form-input"
                        type="text" 
                        id="email" 
                        placeholder="correo@intecel.com"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    { errors.email && <p className="error">{errors.email}</p> }
                </div>
                <div className="text-input password">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                        className="form-input"
                        type="password" 
                        id="password" 
                        placeholder="**********"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    { errors.password && <p className="error">{errors.password}</p> }
                </div>
                <div className="text-input confirmPassword">
                    <label htmlFor="password">Confirmar Contraseña</label>
                    <input 
                        className="form-input"
                        type="password" 
                        id="confirmPassword" 
                        placeholder="**********"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                    { errors.confirmPassword && <p className="error">{errors.confirmPassword}</p> }
                </div>
                <div className="text-input phone">
                    <label htmlFor="phone">Celular</label>
                    <input 
                        className="form-input"
                        type="text" 
                        id="phone" 
                        placeholder="999 123 4567"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                    />
                    { errors.phone && <p className="error">{errors.phone}</p> }
                </div>
                <div className="text-input rol">
                    <label htmlFor="rol">Rol</label>
                    <DropdownList options={roles} updateRolCb={updateRol} />
                    { errors.rol && <p className="error">{errors.rol}</p> }
                </div>
                <button type="submit"><PersonAddAlt1 className="icon" /> Agregar</button>
              </div>
            </div>
        </form>
      </div>
  </AddForm>
  );
}

export default CreateUser;