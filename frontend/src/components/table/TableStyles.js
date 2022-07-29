import styled from "styled-components"

export const TableStyles = styled.div`
    & > table {
        width: 100%;
        /* border: 1px solid rgb(228, 225, 225); */
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .27);
        box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .27);
        border-radius: 5px;
        border-collapse: collapse;
        
        & th, td {
            color: gray;
            text-align: left;
            padding: 15px 20px;
            font-size: 14px;
        }

        & th {
            font-weight: 600;
            border-bottom: 1px solid rgb(228, 225, 225);
        }

        & td {
            font-weight: normal;

            & > span {
                padding: 5px;
                border-radius: 7px;
            }
            
            & > .approved {
                color: green;
                background: rgba(0, 128, 0, .151);
            }

            & > .pending {
                color: goldenrod;
                background: rgba(189, 189, 3, .103);
            }
        }

        & tr {
            border-bottom: 1px solid rgb(228, 225, 225);

            &:last-child {
                border-bottom: none;
            }
        }
    }
`;