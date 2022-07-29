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
    phone: {
        type: String,
        required: true
    },
    usedPasswords: [String],
    profilePicture: String,
    rol: {
        type: String,
        default: 'OPERATIVE',
        required: true
    },
    status: { type: String, required: true },
    tokens: [String],
},{
    timestamps: true
});

export default model('User', userSchema);