import { useMutation } from '@apollo/client';
import { Save } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import ImagePreviewInput from '../../components/imageInput/ImagePreviewInput';
import CREATE_PHONE from '../../graphql/mutations/CREATE_PHONE';
import useForm from '../../hooks/useForm';
import { CreatePhoneStyles } from '../../styles/PhonesStyles';
import createPhoneValidate from '../../validations/createPhoneValidate';

const CreatePhone = () => {

    const [values, setValues] = useState({
        sku: '',
        model: '',
        name: '',
        brand: '',
        color: '',
        display: '',
        storage: '',
        memory: '',
        battery: '',
        SO: '',
        cameras: '',
        connectivity: '',
        dimensions: '',
        description: '',
        price: null,
        discount: null,
        inStock: null,
        images: []
    });
    const [createPhone, { data, loading, error }] = useMutation(CREATE_PHONE);
    const navigate = useNavigate();

    const updatePictures = (pictures) => setValues({ ...values, images: pictures });

    const submitForm = (values) => {
        createPhone({
            variables: {
                sku: values.sku,
                model: values.model,
                name: values.name,
                brand: values.brand,
                color: values.color,
                display: values.display,
                storage: values.storage,
                memory: values.memory,
                battery: values.battery,
                SO: values.SO,
                cameras: values.cameras,
                connectivity: values.connectivity,
                dimensions: values.dimensions,
                description: values.description,
                price: parseFloat(values.price),
                discount: parseFloat(values.discount),
                inStock: parseInt(values.inStock),
                images: values.images
            }
        });
    }

    const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, createPhoneValidate);

    useEffect(() => {
      if(data) {
       if (data.createPhone.status === 201) navigate(-1);
      }
      //eslint-disable-next-line
    }, [data]);
    

  return (
    <>
    <Helmet>
      <title>Intecel Admin - Celulares</title>
    </Helmet>
    <CreatePhoneStyles>
        <form onSubmit={handleSubmit}>
            <div className="first">
                <h1>Agregar celular</h1>
                <div className="form-content">
                    <label htmlFor="pictures">Agregar imágenes</label>
                    <ImagePreviewInput
                        multiple
                        updateFilesCb={updatePictures}
                        accept=".png,.jpeg,.jpg"
                        maxFiles={4}
                    />
                    { errors.images && <p className="error">{errors.images}</p> }
                </div>
            </div>
            <hr />
            <div className="second">
                <div className="form-content">
                    <label htmlFor="">SKU</label>
                    <input 
                        className="form-input"
                        id="sku"
                        type="text"
                        placeholder="0000000000"
                        name="sku"
                        value={values.sku}
                        onChange={handleChange}
                    />
                    { errors.sku && <p className="error">{errors.sku}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Modelo</label>
                    <input 
                        className="form-input"
                        id="model"
                        type="text"
                        placeholder="Modelo"
                        name="model"
                        value={values.model}
                        onChange={handleChange}
                    />
                    { errors.model && <p className="error">{errors.model}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Nombre</label>
                    <input 
                        className="form-input"
                        id="name"
                        type="text"
                        placeholder="Nombre"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                    />
                    { errors.name && <p className="error">{errors.name}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Marca</label>
                    <input 
                        className="form-input"
                        id="brand"
                        type="text"
                        placeholder="Marca"
                        name="brand"
                        value={values.brand}
                        onChange={handleChange}
                    />
                    { errors.brand && <p className="error">{errors.brand}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Color</label>
                    <input 
                        className="form-input"
                        id="color"
                        type="text"
                        placeholder="Color"
                        name="color"
                        value={values.color}
                        onChange={handleChange}
                    />
                    { errors.color && <p className="error">{errors.color}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Pantalla</label>
                    <input 
                        className="form-input"
                        id="display"
                        type="text"
                        placeholder="Pantalla"
                        name="display"
                        value={values.display}
                        onChange={handleChange}
                    />
                    { errors.display && <p className="error">{errors.display}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Almacenamiento</label>
                    <input 
                        className="form-input"
                        id="storage"
                        type="text"
                        placeholder="Almacenamiento"
                        name="storage"
                        value={values.storage}
                        onChange={handleChange}
                    />
                    { errors.storage && <p className="error">{errors.storage}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Memoria</label>
                    <input 
                        className="form-input"
                        id="memory"
                        type="text"
                        placeholder="Memoria"
                        name="memory"
                        value={values.memory}
                        onChange={handleChange}
                    />
                    { errors.memory && <p className="error">{errors.memory}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Batería</label>
                    <input 
                        className="form-input"
                        id="battery"
                        type="text"
                        placeholder="Batería"
                        name="battery"
                        value={values.battery}
                        onChange={handleChange}
                    />
                    { errors.battery && <p className="error">{errors.battery}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Sistema operativo</label>
                    <input 
                        className="form-input"
                        id="SO"
                        type="text"
                        placeholder="Sistema operativo"
                        name="SO"
                        value={values.SO}
                        onChange={handleChange}
                    />
                    { errors.SO && <p className="error">{errors.SO}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Cámaras</label>
                    <input 
                        className="form-input"
                        id="cameras"
                        type="text"
                        placeholder="Cámaras"
                        name="cameras"
                        value={values.cameras}
                        onChange={handleChange}
                    />
                    { errors.cameras && <p className="error">{errors.cameras}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Conectividad</label>
                    <input 
                        className="form-input"
                        id="connectivity"
                        type="text"
                        placeholder="Conectividad"
                        name="connectivity"
                        value={values.connectivity}
                        onChange={handleChange}
                    />
                    { errors.connectivity && <p className="error">{errors.connectivity}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Dimensiones</label>
                    <input 
                        className="form-input"
                        id="dimensions"
                        type="text"
                        placeholder="Dimensiones"
                        name="dimensions"
                        value={values.dimensions}
                        onChange={handleChange}
                    />
                    { errors.dimensions && <p className="error">{errors.dimensions}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Descripción</label>
                    <input 
                        className="form-input"
                        id="description"
                        type="text"
                        placeholder="Descripción"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                    />
                    { errors.description && <p className="error">{errors.description}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Precio</label>
                    <input 
                        className="form-input"
                        id="price"
                        type="text"
                        placeholder="$0.00"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                    />
                    { errors.price && <p className="error">{errors.price}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Descuento</label>
                    <input 
                        className="form-input"
                        id="discount"
                        type="text"
                        placeholder="0%"
                        name="discount"
                        value={values.discount}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-content">
                    <label htmlFor="">Disponibles</label>
                    <input 
                        className="form-input"
                        id="inStock"
                        type="text"
                        placeholder="0"
                        name="inStock"
                        value={values.inStock}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit"><Save className="icon" /> Guardar</button>
            </div>
        </form>
    </CreatePhoneStyles>
    </>
  );
}

export default CreatePhone;