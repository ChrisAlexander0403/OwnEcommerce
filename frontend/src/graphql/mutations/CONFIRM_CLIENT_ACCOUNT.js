import { gql } from "@apollo/client";

const CONFIRM_CLIENT_ACCOUNT = gql`
    mutation ConfirmClientAccount($token: String!){
        confirmClientAccount(token: $token){
            status
            message
        }
    }
`;

export default CONFIRM_CLIENT_ACCOUNT;