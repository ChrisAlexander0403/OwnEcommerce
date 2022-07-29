import { useMutation } from '@apollo/client';
import { Save } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImagePreviewInput from '../../components/imageInput/ImagePreviewInput';
import CREATE_ACCESSORY from '../../graphql/mutations/CREATE_ACCESSORY';
import useForm from '../../hooks/useForm';
import { CreateAccessoryStyles } from '../../styles/AccessoriesStyles';
import createAccessoryValidate from '../../validations/createAccessoryValidate';

const CreateAccessory = () => {

    const [values, setValues] = useState({
        sku: '',
        model: '',
        name: '',
        brand: '',
        color: '',
        description: '',
        price: null,
        discount: null,
        inStock: null,
        images: []
    });
    const [createAccessory, { data, loading, error }] = useMutation(CREATE_ACCESSORY);
    const navigate = useNavigate();

    const updatePictures = (pictures) => setValues({ ...values, images: pictures });

    const submitForm = (values) => {
        createAccessory({
            variables: {
                sku: values.sku,
                model: values.model,
                name: values.name,
                brand: values.brand,
                color: values.color,
                description: values.description,
                price: parseFloat(values.price),
                discount: parseFloat(values.discount),
                inStock: parseInt(values.inStock),
                images: values.images
            }
        });
    }

    const { handleChange, handleSubmit, errors } = useForm(values, setValues, submitForm, createAccessoryValidate);

    useEffect(() => {
        if(data) {
            if (data.createAccessory.status === 201) navigate(-1);
        }
    }, [data]);

  return (
    <CreateAccessoryStyles>
        <form onSubmit={handleSubmit}>
            <div className="first">
                <h1>Agregar accesorio</h1>
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
                        placeholder="Precio"
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
                        placeholder="Descuento"
                        name="discount"
                        value={values.discount}
                        onChange={handleChange}
                    />
                    { errors.discount && <p className="error">{errors.discount}</p> }
                </div>
                <div className="form-content">
                    <label htmlFor="">Disponibles</label>
                    <input 
                        className="form-input"
                        id="inStock"
                        type="text"
                        placeholder="Disponibles"
                        name="inStock"
                        value={values.inStock}
                        onChange={handleChange}
                    />
                    { errors.inStock && <p className="error">{errors.inStock}</p> }
                </div>
                <button type="submit"><Save className="icon" /> Guardar</button>
            </div>
        </form>
    </CreateAccessoryStyles>
  );
}

export default CreateAccessory;