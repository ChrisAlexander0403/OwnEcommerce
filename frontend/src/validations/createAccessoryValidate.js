const createAccessoryValidate = (values) => {
    let errors = {};
    
    if (!values.sku.trim()) errors.sku = "Este campo es requerido"

    if (!values.model) errors.model = "Este campo es requerido"

    if (!values.name) errors.name = "Este campo es requerido"

    if (!values.brand) errors.brand = "Este campo es requerido"

    if (!values.color) errors.color = "Este campo es requerido"

    if (!values.description) errors.description = "Este campo es requerido"

    if (!values.price) errors.price = "Este campo es requerido"

    if (values.images.length < 1) errors.images = "Las imágenes son requeridas"

    return errors;
}

export default createAccessoryValidate;