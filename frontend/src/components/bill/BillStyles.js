import styled from "styled-components";

export const BillStyles = styled.div`
    padding: 20px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .27);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .27);
    border-radius: 5px;

    & > h2 {
        margin-bottom: 20px;
        color: rgb(36, 0, 80);
    }

    & > span {
        color: gray;
    }

    & > hr {
        margin: 10px 0;
        height: 0;
        border: 0.5px solid rgb(225, 225, 225);
    }

    & > .pricing {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    & > button {
        margin-top: 20px;
        width: 100%;
        padding: 5px 15px;
        font-size: 16px;
        border: none;
        border-radius: 4px;
        background: rgb(36, 0, 80);
        color: #fff;
        cursor: pointer;
    }

    & > p, > a {
        margin-top: 20px;
        font-size: 14px;
    }

    & > a {
        color: rgb(36, 0, 80);
    }
`;