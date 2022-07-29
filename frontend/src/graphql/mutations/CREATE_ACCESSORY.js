import { gql } from "@apollo/client";

const CREATE_ACCESSORY = gql`
    mutation CreateAccessory(
        $sku: String!
        $model: String!
        $name: String!
        $brand: String!
        $color: String!
        $description: String!
        $price: Float!
        $discount: Float
        $inStock: Int
        $images: [Upload]!
    ) {
        createAccessory(
            sku: $sku
            model: $model
            name: $name
            brand: $brand
            color: $color
            description: $description
            price: $price
            discount: $discount
            inStock: $inStock
            images: $images
        ) {
            status
            message
        }
    }
`;

export default CREATE_ACCESSORY;