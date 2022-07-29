import { gql } from "@apollo/client";

const CLIENT_FORGOT_PASSWORD = gql`
    mutation ClientForgotPassword($email: String!){
        clientForgotPassword(email: $email){
            status
            message
        }
    }
`;

export default CLIENT_FORGOT_PASSWORD;