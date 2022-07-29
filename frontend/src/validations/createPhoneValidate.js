const createPhoneValidate = (values) => {
    let errors = {};
    
    if (!values.sku.trim()) errors.sku = "Este campo es requerido"

    if (!values.model) errors.model = "Este campo es requerido"

    if (!values.name) errors.name = "Este campo es requerido"

    if (!values.brand) errors.brand = "Este campo es requerido"

    if (!values.color) errors.color = "Este campo es requerido"

    if (!values.display) errors.display = "Este campo es requerido"

    if (!values.storage) errors.storage = "Este campo es requerido"

    if (!values.memory) errors.memory = "Este campo es requerido"

    if (!values.battery) errors.battery = "Este campo es requerido"

    if (!values.SO) errors.SO = "Este campo es requerido"

    if (!values.cameras) errors.cameras = "Este campo es requerido"

    if (!values.connectivity) errors.connectivity = "Este campo es requerido"
    
    if (!values.dimensions) errors.dimensions = "Este campo es requerido"

    if (!values.description) errors.description = "Este campo es requerido"

    if (!values.price) errors.price = "Este campo es requerido"

    if (values.images.length < 1) errors.images = "Las imágenes son requeridas"

    return errors;
}

export default createPhoneValidate;