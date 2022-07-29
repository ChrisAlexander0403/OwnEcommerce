import styled from "styled-components";

export const DatatableStyles = styled.div`
    height: 450px;
    padding: 20px;
`;

export const NewButton = styled.button`
    display: flex;
    align-items: center;
    margin: 0 7px;
    padding: 5px;
    background: none;
    color: rgb(36, 0, 80);
    font-family: 'Roboto', 'Helvetica', "Arial", sans-serif;
    font-size: .8125rem;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    &:hover {
        background: rgb(228, 223, 233);
    }

    & > .icon {
        font-size: 20px;
        margin-right: 5px;
    }
`;