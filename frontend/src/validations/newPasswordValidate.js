export default function newPasswordValidate(values) {
    let errors = {};

    if (!values.newPassword)
        errors.newPassword = "Ingresa una contraseña"
    else if (values.newPassword.length < 8)
        errors.newPassword = "La contraseña debe tener al menos 8 carácteres"
    else if (values.newPassword.length > 24)
        errors.newPassword = "La contraseña no debe tener más de 24 carácteres"
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$¡!%*¿?&-_])[A-Za-z\d@$!¡%*¿?&-_]\S{8,24}$/i.test(values.newPassword))
        errors.newPassword = "La contraseña debe tener al menos un dígito, una mayúscula, una minúscula, un carácter especial y no debe contener espacios en blanco"
    
    if (!values.confirmNewPassword)
        errors.confirmNewPassword = "Vuelve a ingresar la contraseña"
    else if (values.confirmNewPassword !== values.newPassword)
        errors.confirmNewPassword = "Las contraseñas no coinciden"

    return errors;
}