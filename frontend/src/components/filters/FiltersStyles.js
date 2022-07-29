import styled from 'styled-components';
import { BsPlusLg } from 'react-icons/bs';

export const Container = styled.div`
    width: 300px;
    margin-bottom: 10px;

    .filter-container{
        width: 100%;
        background: #fff;
        border: 1px solid lightgray;
        border-radius: 5px;
    }

    .filter-container .filter{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid lightgray;
    }

    .filter-container .filter p{
        color: #464646;
        font-weight: 500;
    }

    .filter-container .options{
        display: flex;
        flex-wrap: wrap;
        /* padding: 10px 15px; */
        overflow: hidden;
        transition: height .5s ease;
    }

    .filter-container .options .option{
        width: auto;
        line-height: 15px;
        border-radius: 15px;
        margin: 5px;
        padding: 5px 15px;
        cursor: pointer;
        user-select: none;

        &.active{
            background: rgb(173, 159, 189);
            color: #fff;
        }
    }
`;

export const Plus = styled(BsPlusLg)`
    color: #464646;
    font-size: 14px;
`;