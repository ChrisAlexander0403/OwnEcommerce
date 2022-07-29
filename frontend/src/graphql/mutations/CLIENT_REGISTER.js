import { gql } from "@apollo/client";

const CLIENT_REGISTER = gql`
    mutation ClientRegister(
        $firstname: String!
        $lastname: String!
        $email: String!
        $password: String!
        $phone: String! 
        $birthdate: String!
    ){
        clientRegister(
            firstname: $firstname
            lastname: $lastname
            email: $email 
            password: $password
            phone: $phone
            birthdate: $birthdate
        ){
            status
            message
        }
    }
`;

export default CLIENT_REGISTER;