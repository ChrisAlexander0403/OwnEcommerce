import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

export const NavbarStyles = styled.nav`
    position: relative;
    z-index: 21;
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    /* box-shadow: ${props => props.isDark ? '2px 0 10px 5px #111' : '2px 0 10px 5px #ddd'}; */
    background: ${props => props.isDark ? '#181818' : '#fff'};
    border-bottom: 1px solid lightgray;
    transition: all .3s ease;

    & > .mobile {
        display: none;
        color: rgb(36, 0, 80);

        @media screen and (max-width: 1080px){
            display: block;
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 1.8rem;
            cursor: pointer;
        }
    }

    & > a {
        margin-left: 50px;
        width: 100px;
        height: 60px;

        & > img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        @media screen and (max-width: 786px) {
            margin-left: 0;
        }
    }

    & > ul{
        position: relative;
        display: flex;
        align-items: center;
        margin-right: 24px;
        z-index: 12;
        transition: left 0.5s ease;
        
        @media screen and (max-width: 1080px){
            flex-direction: column;
            width: 100%;
            height: calc(100vh - 60px);
            position: fixed;
            top: 60px;
            left: -100%;
            background: ${props => props.isDark ? '#181818' : '#fff'};

            &.active{
                left: 0;
            }
        }

        @media screen and (orientation: landscape) and (max-width: 1080px){
            height: 80vh;
            padding-bottom: 20px;
        }
    }

    & > ul > li{
        list-style: none;
        margin: 10px;

        @media screen and (max-width: 786px) {
            line-height: 30px;
        }

        & > .account {
            display: flex;

            & > hr {
                height: 18px;
                border: 0.5px solid #000;
                margin: 0 10px;
            }
        }
    }

    & > ul > li > a{
        padding: 5px 10px;
        border-radius: 10px;
        color: ${props => props.isDark ? '#fff' : '#242424'};
        font-weight: 500;

        &:hover {
            color: rgb(36, 0, 80);
        }

        & > .cart-container {
            position: relative;

            & > .icon {
                color: rgb(36, 0, 80);
            }

            & > .quantity-container {
                position: absolute;
                top: -8px;
                right: -8px;
                width: 18px;
                line-height: 18px;
                border-radius: 50%;
                background: rgb(173, 159, 189);
                text-align: center;
                font-weight: 500;
                font-size: 12px;
            }
        }
    }

    & ul li a.active{
        color: rgb(36, 0, 80);
    }

    & ul li .account-container {
        position: relative;
        display: flex;
        align-items: center;

        & > .user {
            font-weight: bold;
            cursor: pointer;
            color: ${props => props.isDark ? '#eee' : "#3d3d3d"};
            &:hover {
                color: rgb(36, 0, 80);
            }
        }

        & > button {
            margin-left: 5px;
            width: 10px;
            height: 10px;
            clip-path: polygon(50% 70%, 0 20%, 100% 20%);
            border: none;
            background: rgb(36, 0, 80);
            cursor: pointer;
        }

        & > .account-menu {
            position: absolute;
            right: -20px;
            top: 110%;
            width: 200px;
            height: 0;
            background: #fff;
            border: none;
            border-radius: 5px;
            transition: all .3s ease;
            overflow: hidden;

            &.show {
                border: 1px solid lightgray;
                height: 200px;
            }

            & > ul > li {
                & > a, button {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    padding: 5px 10px;
                    font-size: 14px;
                    font-weight: 500;
                    background: none;
                    border: none;
                    color: #242424;
                    cursor: pointer;

                    & > .icon {
                        font-size: 20px;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
`;

export const ThemeDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90px; 
    user-select: none;
`;

export const Switch = styled.input`
    position: relative;
    width: 40px;
    height: 20px;
    background: #c6c6c6;
    border-radius: 10px;
    outline: none;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, .2);
    transition: .5s;
    cursor: pointer;
    user-select: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    &:checked{
        background: #0082cc;
    }

    &:before{
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        top: 0;
        left: 0;
        background: #fff;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .2);
        transform: scale(1.1);
        transition: .5s;
        user-select: none;
    }

    &:checked:before{
        left: 20px;
        user-select: none;
    }
`;

export const Sun = styled(FaSun)`
    color: #ffef00;
    font-size: 25px;
    @media screen and (max-width: 480px){
        font-size: 35px;
    }
`;

export const Moon = styled(FaMoon)`
    color: #fff;
    font-size: 20px;
    @media screen and (max-width: 480px){
        font-size: 30px;
    }
`;

export const ConfirmClose =styled.div`
    & > p {
        color: #565656;
        margin: 10px 0 20px 10px;
    }

    & > .buttons {
        display: flex;
        justify-content: space-evenly;

        & > button {
            height: 30px;
            width: 150px;
            font-size: 16px;
            background: lightgray;
            border: none;
            border-radius: 4px;
            cursor: pointer;

            &.cancel {
                color: #fff;
                background: rgb(161, 36, 49);
            }
        }
    }
`;