import { gql } from "@apollo/client";

const CLIENT_RESET_PASSWORD = gql`
    mutation ClientResetPassword($newPassword: String! $token: String!){
        clientResetPassword(newPassword: $newPassword token: $token){
            status
            message
        }
    }
`;

export default CLIENT_RESET_PASSWORD;