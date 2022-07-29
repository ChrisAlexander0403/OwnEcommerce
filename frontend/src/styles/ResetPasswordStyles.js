import styled from "styled-components";

export const ResetPasswordStyles = styled.div`
    width: 100%;
    padding: 40px 60px;

    & > h1 {
        color: rgb(36, 0, 80);
    }

    & > .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 40px 0;

        & > p {
            font-size: 18px;
            color: #666;
            margin-bottom: 20px;
        }

        & > form {
            display: flex;
            flex-direction: column;

            & > .text-input {
                width: 100%;
                margin-bottom: 10px;

                & > label {
                    display: block;
                }

                & input {
                    display: block;
                    width: 300px;
                    padding: 3px 10px;
                    background: #fff;
                    border-radius: 5px;
                    border: 1px solid #aaa;
                    font-size: 16px;
                    outline: none;
                }

                & > .password {
                    width: 300px;
                    display: flex;
                    align-items: center;

                    & > input {
                        width: 270px;
                        border-radius: 5px 0 0 5px;
                    }

                    & > .show {
                        width: 30px;
                        height: 27px;
                        color: ${props => props.isVisible ? '#eee' : 'rgba(36, 0, 80)'};
                        background: ${props => props.isVisible ? 'rgba(36, 0, 80)' : '#eee'};
                        border-radius: 0 5px 5px 0;
                        border: 1px solid #aaa;
                        font-size: 16px;
                        padding-top: 4px;
                        cursor: pointer;
                    }
                }

                & > .error {
                    color: red;
                    margin: 5px 0 10px;
                    text-align: end;
                }
            }

            & > button {
                align-self: center;
                width: 170px;
                padding: 5px 10px;
                background: rgb(36, 0, 80);
                color: #fff;
                border-radius: 4px;
                border: none;
                cursor: pointer;
            }
        }
    }
`;