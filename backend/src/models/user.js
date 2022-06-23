import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usedPasswords: [String],
    profilePicture: String,
    tokens: [String],
    rol: {
        type: String,
        default: 'OPERATIVE',
        required: true
    }
},{
    timestamps: true
});

export default model('User', userSchema);