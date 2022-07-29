import { gql } from "@apollo/client";

const GET_USERS = gql`
    query GetUsers {
        getUsers {
            status
            message
            
            ... on GetUsersResponse {
                users {
                    _id
                    firstname
                    lastname
                    email
                    phone
                    profilePicture
                    status
                    rol
                }
            }
        }
    }
`;

export default GET_USERS;