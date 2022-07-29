import styled from "styled-components";

export const RegisterStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 60px);

    & > .main-container {
        padding: 15px;
        
        & > h1 {
            color: rgb(36, 0, 80);
            text-align: center;
            margin-bottom: 20px;
        }

        & > form {
            display: flex;
            flex-direction: column;

            & > .form-container{
                margin-bottom: 5px;

                & > label {
                    display: block;
                    font-size: 13px;
                    color: gray;
                }

                & > input {
                    width: 300px;
                    font-size: 16px;
                    padding: 3px 10px;
                    border: 1px solid lightgray;
                    border-radius: 4px;
                    background: #fff;

                    &:focus {
                        border: 1px solid rgb(36, 0, 80);
                        outline: 1px solid rgb(36, 0, 80);
                    }
                }

                & > .error {
                    color: red;
                    font-size: 14px;
                }
            }

            & > button {
                align-self: center;
                width: 130px;
                margin-top: 15px;
                padding: 5px 10px;
                background: rgb(36, 0, 80);
                color: #fff;
                border-radius: 4px;
                border: none;
                cursor: pointer;

                &:disabled {
                    background: rgba(36, 0, 80, .5);
                    cursor: default;
                }
            }
        }
    }
`;