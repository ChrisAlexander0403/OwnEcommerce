export default function emailValidate(values) {
    let errors = {};

    if (!values.email.trim())
        errors.email = "El correo es requerido"
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.—]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "La dirección de correo no es válida"

    return errors;
}