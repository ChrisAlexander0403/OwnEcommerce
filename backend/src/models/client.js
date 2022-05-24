import { Schema, model } from 'mongoose';

const clientSchema = Schema({
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
    phone: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    birthdate: {
        type: String,
        required: true
    },
    encryption: {
        public: {
            type: String,
            required: true
        },
        iv: {
            type: String,
            required: true
        }
    },
    tokens: [String],
    type: {
        type: String,
        default: 'operator'
    },
    verificationCode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "UNVERIFIED"
    }
},{
    timestamps: true
});

export default model('Client', clientSchema);