export function registerValidate(values){
    let errors = {};
    if (!values.firstname.trim()) 
        errors.firstname = "El nombre es requerido"
    else if (values.firstname.length < 3) 
        errors.firstname = "El nombre no puede ser tan corto"
    else if (!/[a-zA-ZñÑáéíóúÁÉÍÓÚ\s'-]+/.test(values.firstname)) 
        errors.firstname = "Ingresa un nombre válido"

    if (!values.lastname.trim()) 
        errors.lastname = "El apellido es requerido"
    else if (values.lastname.length < 3) 
        errors.lastname = "El apellido no puede ser tan corto"
    else if (!/[a-zA-ZñÑáéíóúÁÉÍÓÚ\s'-]+/.test(values.lastname)) 
        errors.lastname = "Ingrese un apellido válido"
    
    if (!values.email.trim())
        errors.email = "El correo es requerido"
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.—]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "La dirección de correo no es válida"

    if (!values.password)
        errors.password = "Ingresa una contraseña"
    else if (values.password.length < 8)
        errors.password = "La contraseña debe tener al menos 8 carácteres"
    else if (values.password.length > 24)
        errors.password = "La contraseña no debe tener más de 24 carácteres"
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$¡!%*¿?&-_])[A-Za-z\d@$!¡%*¿?&-_]\S{8,24}$/i.test(values.password))
        errors.password = "La contraseña debe tener al menos un dígito, una mayúscula, una minúscula, un carácter especial y no debe contener espacios en blanco"
    
    if (!values.confirmPassword)
        errors.confirmPassword = "Vuelve a ingresar la contraseña"
    else if (values.confirmPassword !== values.password)
        errors.confirmPassword = "Las contraseñas no coinciden"
        
    if(!values.phone)
        errors.phone = "El número teléfono es requerido"
    else if(values.phone.length !== 10)
        errors.phone = "El número debe tener 10 carácteres"

    return errors;
}