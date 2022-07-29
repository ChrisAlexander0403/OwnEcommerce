import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
    query GetClients {
        getClients {
            status
            message
            
            ... on GetClientsResponse {
                clients {
                    _id
                    firstname
                    lastname
                    email
                    profilePicture
                    status
                }
            }
        }
    }
`;

export default GET_CLIENTS;