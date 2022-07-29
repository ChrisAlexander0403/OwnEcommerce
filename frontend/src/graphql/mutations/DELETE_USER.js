import { gql } from "@apollo/client";

const DELETE_USER = gql`
    mutation DeleteUser($_id: ID!){
        deleteUser(_id: $_id) {
            status
            message
        }
    }
`;

export default DELETE_USER;