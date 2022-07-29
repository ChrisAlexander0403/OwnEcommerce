import { gql } from "@apollo/client";

const USER_REGISTER = gql`
    mutation UserRegister(
        $firstname: String!
        $lastname: String!
        $email: String!
        $password: String!
        $phone: String! 
        $rol: String!
        $profilePicture: String
    ){
        userRegister(
            firstname: $firstname
            lastname: $lastname
            email: $email 
            password: $password
            phone: $phone
            rol: $rol
            profilePicture: $profilePicture
        ){
            status
            message
        }
    }
`;

export default USER_REGISTER;