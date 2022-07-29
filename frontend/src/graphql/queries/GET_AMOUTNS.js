import { gql } from "@apollo/client";

const GET_AMOUNTS = gql`
    query GetAmounts {
        getAmounts {
            status
            message
            
            ... on GetAccessoriesResponse {
                clients {
                    amount
                }
            }
        }
    }
`;

export default GET_AMOUNTS;