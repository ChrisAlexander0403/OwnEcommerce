import styled from "styled-components";

export const AccessoriesStyles = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;

    & > .list-container {
        flex: 6;

        & .cellAction {
            & > button {
                display: inline-flex;
                align-items: center;
                border: none;
                border-radius: 5px;
                padding: 5px;
                color: #fff;
                font-weight: 600;
                cursor: pointer;

                &.view {
                    background: rgb(36, 0, 80);
                    margin-right: 5px;
                }
                
                &.delete {
                    background: rgb(175, 17, 36);
                }

                & > .icon {
                    font-size: 18px;
                }
            }

        }
    }
`;

export const CreateAccessoryStyles = styled.div`
    width: calc(100% - 40px);
    height: calc(100vh - 40px);
    margin: 20px;
    padding: 20px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .47);
    border-radius: 10px;
    
    & > form {
        display: flex;
        width: 100%;
        height: 100%;
        display: flex;
        
        & > .first, .second {
            height: 100%;
            
            & > .form-content {
                & > label {
                    display: block;
                    margin-left: 5px;
                    color: gray;
                    font-size: 12px;
                    font-weight: 500;
                }
            }
        }

        & > .first {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 360px;
            & > h1 {
                align-self: flex-start;
                font-size: 16px;
                color: darkgray;
                margin-bottom: 15px;
            }

            & label {
                margin-bottom: 3px;
            }
        }
        
        & > .second {
            position: relative;
            display: grid;
            grid-template-columns: repeat(3, 33%);
            grid-template-rows: repeat(3, 70px);
            /* grid-template-areas: "sku model"; */
            width: 100%;
            padding: 35px 0 5px 0;
            overflow-y: auto;

            & .form-input {
                display: block;
                width: 200px;
                padding: 3px 10px;
                font-size: 16px;
                border: 1px solid darkgray;
                border-radius: 4px;

                &:focus {
                    border: 1px solid rgb(36, 0, 80);
                    outline: 1px solid rgb(36, 0, 80);
                }
            }

            & > button {
                display: flex;
                align-items: center;
                position: absolute;
                bottom: 5px;
                right: 5px;
                padding: 5px 10px;
                background: rgb(36, 0, 80);
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;

                & > .icon {
                    font-size: 16px;
                    margin-right: 5px;
                }
            }
        }

        & > hr {
            height: 100%;
            border: 0.5px solid lightgray;
            margin: 0 20px;
        }
    }
`;