import { Schema, model } from 'mongoose';

const shippingAddressSchema = new Schema({
    fullName: { type: String, required: true },
    name: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zipCode: { type: String, required: true },
    location: String,
    lat: Number,
    lng: Number,
    status: { type: String, default: "1" },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: true }
}, {
    timestamps: true
});

export default model('ShippingAddress', shippingAddressSchema);