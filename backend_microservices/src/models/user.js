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
    tokens: [{
        type: String
    }],
    type: {
        type: String,
        default: 'operator'
    }
},{
    timestamps: true
});

export default model('User', userSchema);