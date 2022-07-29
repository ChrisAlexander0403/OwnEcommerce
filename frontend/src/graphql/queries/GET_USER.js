import { gql } from "@apollo/client";

const GET_USER = gql`
    query GetUser($_id: ID!) {
        getUser(_id: $_id) {
            status
            message
            
            ... on GetUserResponse {
                user {
                    _id
                    firstname
                    lastname
                    email
                    phone
                    profilePicture
                    status
                    rol
                    createdAt
                    updatedAt
                }
            }
        }
    }
`;

export default GET_USER;