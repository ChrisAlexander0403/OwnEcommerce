import { Schema, model } from 'mongoose';

const phoneSchema = new Schema({
    sku: { type: String, required: true },
    model: { type: String, required: true },
    name: { type: String, required: true },
    branch: { type: String, required: true },
    color: { type: String, required: true },
    display: { type: String, required: true },
    memory: { type: String, required: true },
    storage: { type: String, required: true },
    connectivity: { type: String, required: true },
    battery: { type: String, required: true },
    SO: { type: String, required: true },
    dimenssions: { type: String, required: true },
    cameras: { type: String, required: true },
    fingerprint: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    InStock: { type: Number, required: true },
    images: [String]
}, {
    timestamps: true
});

export default phoneSchema;