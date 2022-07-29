import styled from 'styled-components';
import { FaCartPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const ProductContainer = styled(Link)`
    position: relative;
    min-width: 200px;
    height: 350px;
    background: #fff;
    /* margin: 25px 15px 25px 0; */
    margin: 15px 0;
    border: 1px solid lightgray;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .47);
    border-radius: 10px;
    overflow: hidden;
    transition: .3s;
    &:hover{
        transform: scale(1.05);
        z-index: 2;
    }

    & .img-container{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        width: 200px;
        height: 200px;
        padding: 25px;
        border-bottom: 1px solid lightgray;
    }
    & .img-container img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    & .img-container > .icon {
        font-size: 60px;
        color: rgb(200, 191, 211);
    }
    & .details-container{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 95px;
        padding: 10px;
    }
    & .details-container h4{
        font-size: 16px;
        font-weight: 500;
    }
    & .details-container p{
        font-weight: 300;
    }
    & .details-container .brand{
        font-size: 14px;
    }
    & .buttons-container{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        height: 60px;
        width: 100%;
        padding: 0;
    }
    & .buttons-container a{
        width: 50%;
        line-height: 50px;
        text-align: center;
        border-top: 1px solid lightgray;
    }
    & .buttons-container a:hover{
        background: rgb(228, 223, 233);
    }
    & .buttons-container .cart{
        position: relative;
        width: 50%;
        height: 50px;
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: 400;
        border-top: 1px solid lightgray;
        border-right: none;
        border-bottom: none;
        border-left: 1px solid lightgray;
        cursor: pointer;
    }
    & .buttons-container .cart .text{
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
    }
    & .buttons-container .cart button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-size: 16px;
        font-weight: 400;
        cursor: pointer;
        transition: .3s;
        transform: translateY(50px);
        border: none;
    }
    & .buttons-container .cart:hover button{
        transform: translateY(0);
    }
`;

export const CartIcon = styled(FaCartPlus)`
    font-size: 24px;
    margin-top: 10px;
`;