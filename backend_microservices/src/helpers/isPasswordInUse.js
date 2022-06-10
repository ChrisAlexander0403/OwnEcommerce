import bcrypt from 'bcrypt';

const isPasswordInUse = async (model, newPassword) => {
    let usedPasswords = [];
    let usedBefore = false;
    usedPasswords = [...model.usedPasswords];
    
    if (usedPasswords.length > 0) {
        for(let i = 0; i < usedPasswords.length; i++){
            if (await bcrypt.compare(newPassword, usedPasswords[i])) {
                usedBefore = true;
            }
        }
    }

    if (usedBefore || await bcrypt.compare(newPassword, model.password)) {
        return true;
    }

    return false;
}

export default isPasswordInUse;