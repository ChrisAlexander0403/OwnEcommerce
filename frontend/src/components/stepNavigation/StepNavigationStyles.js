import styled from 'styled-components';

export const StepWrapper = styled.div`
    display: flex;
    margin-bottom: 10px;

    .step-block:not(:last-child) .circle-wrapper::after {
        content: '';
        width: 100%;
        height: 2px;
        position: absolute;
        top: 0;
        bottom: 0;
        z-index: -1;
        margin: auto;
        background: rgb(36, 0, 80);
    }

    .step-block:not(:last-child) > .circle-wrapper::after {
        height: 3px;
    }

    .step-block:not(:last-child).selected > .circle-wrapper::after, .step-block:not(:last-child).selected ~ .step-block:not(:last-child) > .circle-wrapper::after {
        height: 2px;
    }
`;

export const StepBlock = styled.div`
    text-align: center;

    & > .circle-wrapper {
        position: relative;
        padding: 8px 40px;

        & > .circle {
            width: 35px;
            height: 35px;
            line-height: 29px;
            text-align: center;
            background: ${props => props.selected ? '#fff' : 'rgb(36, 0, 80)' };;
            color: ${props => props.selected ? 'black' : 'white' };
            border-radius: 50%;
            border-width: 2px;
            border-style: solid;
            border-color: ${props => props.selected ? 'rgb(36, 0, 80)' : 'transparent' };
            transition: all .3s ease;
            cursor: pointer;
        }
    }
`;