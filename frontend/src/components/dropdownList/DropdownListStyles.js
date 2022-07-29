import styled from "styled-components";
import { MdArrowDropDown } from 'react-icons/md';

export const DropdownListContainer = styled.div`
    width: 100%;
    position: relative;
    user-select: none;

    & > button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 3px 10px;
        width: 172px;
        background: #fff;
        color: gray;
        font-size: 16px;
        font-weight: 500;
        border-radius: 4px;
        border: 1px solid darkgray;
        cursor: pointer;
    }
`;

export const Arrow = styled(MdArrowDropDown)`
    font-size: 19px;
    color: gray;
`;

export const DropdownContent = styled.div`
    top: 110%;
    position: absolute;
    width: 95%;
    height: 100px;
    background: #fff;
    font-weight: 500;
    z-index: 2;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .87);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .87);
    overflow: auto;

    & > .item {
        position: relative;
        padding: 15px;
        cursor: pointer;
        transition: all 0.2s;
        user-select: none;
        z-index: 2;
        &:hover{
            background: rgb(228, 223, 233);
        }
    }
`;