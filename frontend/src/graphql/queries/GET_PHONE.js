import { gql } from "@apollo/client";

const GET_PHONE = gql`
    query GetPhone ($_id: ID!) {
        getPhone (_id: $_id) {
            status
            message

            ... on GetPhoneResponse {
                phone {
                    _id
                    sku
                    model
                    name
                    brand
                    color
                    display
                    memory
                    storage
                    connectivity
                    battery
                    SO
                    dimensions
                    cameras
                    fingerprint
                    description
                    price
                    discount
                    inStock
                    images
                }
            }
        }
    }
`;

export default GET_PHONE;