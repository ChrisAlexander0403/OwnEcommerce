import styled from "styled-components";

const LoginStyles = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    & > img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
    }

    & > .login-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 450px;
        padding: 30px 40px;
        background: rgba(255, 255, 255, 1);

        & > h1 {
            margin-bottom: 20px;
            color: rgb(36, 0, 80);
        }
        
        & > form {
            display: flex;
            flex-direction: column;

            & > .form-group {
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

            }

            & > a {
                font-size: 14px;
                color: rgb(36, 0, 80);
                align-self: flex-end;
            }

            & > .error {
                color: red;
                margin-bottom: 10px;
                align-self: flex-end;
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
            }
        }
        & > .link {
            margin-top: 5px;

            & > p, > a {
                display: inline-block;
                font-size: 14px;
            }

            & > a {
                color: rgb(36, 0, 80);
            }
        }
    }
`;

export default LoginStyles;