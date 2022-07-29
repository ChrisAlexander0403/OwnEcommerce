import { gql } from "@apollo/client";

const GET_PHONES = gql`
    query GetPhones {
        getPhones {
            status
            message
            
            ... on GetPhonesResponse {
                phones {
                    _id
                    sku
                    name
                    brand
                    price
                    discount
                    inStock
                    images
                }
            }
        }
    }
`;

export default GET_PHONES;