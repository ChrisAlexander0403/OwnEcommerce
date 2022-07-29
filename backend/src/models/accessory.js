import { Schema, model } from 'mongoose';

const accessorySchema = new Schema({
    sku: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    name: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, max: 100 },
    inStock: { type: Number, default: 0 },
    status: { type: String, default: "ACTIVE", required: true },
    images: [String]
}, {
    timestamps: true
});

export default model('Accessory', accessorySchema);