import styled from "styled-components";

export const UsersStyles = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;

    & > .list-container {
        flex: 6;

        & .cell-with-img {
            width: 30px;
            height: 30px;
            border-radius: 50%;

            & > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        & .avatar {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgb(200, 191, 211);
            font-size: 22px;
            color: #fff;
        }

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

export const AddForm = styled.div`
    width: 100%;
    height: calc(100vh - 40px);

    & > .form-container {
        margin: 20px;
        padding: 20px;
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .47);
        box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .47);
        border-radius: 10px;

        & > h1 {
            font-size: 16px;
            color: darkgray;
            margin-bottom: 20px;
        }

        & > form {
            padding-bottom: 50px;

            & > .flex-container {
                display: flex;
                justify-content: space-evenly;
                align-items: center;

                & > .first {
                    width: 400px;
                    
                    & > .image-input {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-bottom: 5px;
                    }
                }

                & > .second {
                    position: relative;
                    display: grid;
                    grid-template-columns: repeat(2, 50%);
                    grid-template-rows: auto;
                    grid-template-areas: "firstname lastname"
                                         "email email"
                                         "password password"
                                         "confirmPassword confirmPassword"
                                         "phone rol";
                    gap: 10px;

                    & > .text-input {
                        width: 100%;
                        justify-content: space-between;
                        margin-top: 10px;

                        &.firstname {
                            grid-area: firstname;
                        }

                        &.lastname {
                            grid-area: lastname;
                        }

                        &.email {
                            grid-area: email;

                            & > .form-input {
                                width: 365px;
                            }
                        }

                        &.password {
                            grid-area: password;

                            & > .form-input {
                                width: 365px;
                            }
                        }

                        &.confirmPassword {
                            grid-area: confirmPassword;

                            & > .form-input {
                                width: 365px;
                            }
                        }

                        &.phone {
                            grid-area: phone;
                        }

                        &.rol {
                            grid-area: rol;
                        }

                        & > label {
                            display: block;
                            margin-left: 5px;
                            color: gray;
                            font-size: 13px;
                            font-weight: 500;
                        }

                        & > .form-input {
                            display: block;
                            width: 172px;
                            padding: 3px 10px;
                            font-size: 16px;
                            border: 1px solid darkgray;
                            border-radius: 4px;
                            background: #fff;

                            &:focus {
                                border: 1px solid rgb(36, 0, 80);
                                outline: 1px solid rgb(36, 0, 80);
                            }
                        }

                        & > .error {
                            font-size: 14px;
                            color: red;
                        }
                    }

                    & > button {
                        position: absolute;
                        display: flex;
                        align-items: center;
                        bottom: -40px;
                        right: 2px;
                        padding: 4px 6px;
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
            }
        }
    }
`;