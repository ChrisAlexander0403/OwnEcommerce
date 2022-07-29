import { gql } from "@apollo/client";

const LOGIN = gql`
    mutation Login(
        $email: String!
        $password: String!
    ){
        login(
            email: $email 
            password: $password
        ){
            status
            message

            ... on ClientLogInResponse {
                authenticatedClient {
                    client {
                        _id
                        firstname
                        lastname
                        profilePicture
                    }
                    
                    tokens {
                        accessToken
                        refreshToken   
                    }
                }
            }

            ... on UserLogInResponse {
                authenticatedUser {
                    user {
                        _id
                        firstname
                        lastname
                        rol
                        profilePicture
                    }

                    tokens {
                        accessToken
                        refreshToken   
                    }
                }
            }
        }
    }
`;

export default LOGIN;