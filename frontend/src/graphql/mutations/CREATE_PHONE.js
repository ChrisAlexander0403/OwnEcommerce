import { gql } from "@apollo/client";

const CREATE_PHONE = gql`
    mutation CreatePhone(
        $sku: String!
        $model: String!
        $name: String!
        $brand: String!
        $color: String!
        $display: String!
        $storage: String!
        $memory: String!
        $battery: String!
        $SO: String!
        $cameras: String!
        $connectivity: String!
        $dimensions: String!
        $description: String!
        $price: Float!
        $discount: Float
        $inStock: Int
        $images: [Upload]!
    ) {
        createPhone(
            sku: $sku
            model: $model
            name: $name
            brand: $brand
            color: $color
            display: $display
            memory: $memory
            storage: $storage
            battery: $battery
            SO: $SO
            cameras: $cameras
            connectivity: $connectivity
            dimensions: $dimensions
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

export default CREATE_PHONE;