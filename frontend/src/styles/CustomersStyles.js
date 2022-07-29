import styled from "styled-components";

export const CustomersStyles = styled.div`
    display: flex;
    width: 100%;

    & > .list-container {
        flex: 6;

        & .cell-with-img {
            width: 30px;
            height: 30px;
            border-radius: 50%;

            & > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        & .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgb(200, 191, 211);
            font-size: 22px;
            color: #fff;
        }

        & .cellAction {
            & > .view, > .delete {
                border: none;
                border-radius: 5px;
                padding: 5px 10px;
                color: #fff;
                font-weight: 600;
                cursor: pointer;
            }

            & > .view {
                background: rgb(36, 0, 80);
                margin-right: 5px;
            }

            & > .delete {
                background: rgb(175, 17, 36);
            }
        }
    }
`;