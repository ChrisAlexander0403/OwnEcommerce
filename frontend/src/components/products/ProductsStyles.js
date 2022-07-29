import styled from 'styled-components';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

export const ProductsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: auto;

    .options{
        display: flex;
        width: 100%;
        height: 50px;
        justify-content: center;
    }

    .content{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        justify-content: space-evenly;
    }
`;

export const Index = styled.div`
    width: 50px;
    line-height: 50px;
    margin: 1px;
    text-align: center;
    color: gray;
    background: #fff;
    border: 1px solid lightgray;
    border-radius: 4px;
    cursor: pointer;

    &:hover{
        outline: 1px solid lightgray;
    }
`;

export const Back = styled(IoIosArrowBack)`

`;

export const Forward = styled(IoIosArrowForward)`
    
`;