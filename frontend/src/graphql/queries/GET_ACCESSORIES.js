import { gql } from "@apollo/client";

const GET_ACCESSORIES = gql`
    query GetPhones {
        getAccessories {
            status
            message
            
            ... on GetAccessoriesResponse {
                accessories {
                    _id
                    sku
                    name
                    brand
                    price
                    discount
                    inStock
                }
            }
        }
    }
`;

export default GET_ACCESSORIES;