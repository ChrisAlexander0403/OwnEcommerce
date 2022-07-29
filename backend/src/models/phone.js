import { Schema, model } from 'mongoose';

const phoneSchema = new Schema({
    sku: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    display: { type: String, required: true },
    memory: { type: String, required: true },
    storage: { type: String, required: true },
    connectivity: { type: String, required: true },
    battery: { type: String, required: true },
    SO: { type: String, required: true },
    dimensions: { type: String, required: true },
    cameras: { type: String, required: true },
    fingerprint: { type: Boolean, default: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, max:100, required: true, default: 0},
    inStock: { type: Number, default: 0 },
    status: { type: String, default: "ACTIVE", required: true },
    images: [String]
}, {
    timestamps: true
});

export default model('Phone', phoneSchema);