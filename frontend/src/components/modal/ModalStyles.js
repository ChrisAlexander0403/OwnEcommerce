import styled from 'styled-components';

export const ModalStyles = styled.section`
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;

    & > .modal-container {
        position: relative;
        padding: 20px 16px;
        min-width: ${props => props.minWidth ? props.minWidth : '320px'};
        max-width: ${props => props.maxWidth ? props.maxWidth : '480px'};
        min-height: ${props => props.minHeight ? props.minHeight : '420px'};
        max-height: ${props => props.maxHeight ? props.maxHeight : '580px'};
        overflow-y: auto;
        background: ${props => props.background ? props.background : '#fff'};
        border-radius: 10px;

        & > .modal-close {
            position: absolute;
            z-index: 10;
            top: 16px;
            right: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            font-size: 20px;
            color: ${props => props.isDark ? '#999' : '#666'};
            background: none;
            border: none;
            border-radius: 7px;
            cursor: pointer;

            &:hover {
                background: #A93226;
            }
        }

        & > .modal-close-text {
            position: absolute;
            z-index: 10;
            top: 20px;
            right: 25px;
            font-size: 14px;
            color: ${props => props.color ? props.color : '#000'};
            cursor: pointer;

            &:hover {
                color: #A93226;
            }
        }
    }
`;