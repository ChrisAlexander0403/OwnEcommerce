import styled from "styled-components";

export const PhonesStyles = styled.div`
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

export const CreatePhoneStyles = styled.div`
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
                    font-size: 13px;
                    font-weight: 500;
                }

                & > .error {
                    font-size: 14px;
                    color: red;
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
            grid-template-rows: repeat(6, 70px);
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

export const PhonesStoreStyles = styled.div`
    display: flex;
    padding: 20px;

    & > .filters {
        flex: 2;
        padding: 0 50px;

        & > .title {
            margin-bottom: 5px;
            font-size: 14px;
            font-weight: bold;
            color: gray;
        }
    }

    & > .phones-container {
        flex: 4;
    }
`;

export const PhonePreviewStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;

    & > .main-container {
        padding: 20px 30px;
        
        & > section {
            
            & > .preview {
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
                width: 1000px;

                & > .info-container {
                    padding: 20px;

                    & > .sku {
                        font-size: 12px;
                        color: gray;
                    }
                    
                    & > h1 {
                        color: gray;
                    }

                    & > .brand {
                        font-size: 14px;
                        color: gray;
                        font-weight: 500;
                    }
                    
                    & > .price {
                        margin: 20px 0 30px;
                        font-size: 32px;
                        font-weight: 300;
                        color: gray;
                    }

                    & > .color {
                        color: gray;
                        margin-bottom: 30px;
                    }

                    & > .specs {
                        margin-bottom: 30px;
                        
                        & > div {
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            margin-right: 10px;
                            padding: 5px 10px;
                            background: rgb(146, 128, 168);
                            color: #fff;
                            border-radius: 4px;
                            font-size: 14px;

                            & > .icon {
                                margin-right: 5px;
                                font-size: 18px;
                            }
                        }
                    }

                    & > .options {
                        width: 100%;

                        & > button {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 100%;
                            margin-top: 5px;
                            border-radius: 4px;
                            border: none;
                            font-size: 16px;
                            color: #fff;
                            cursor: pointer;
                            transition: .3s;

                            &:hover{
                                transform: scale(1.03);
                            }

                            &.buy {
                                height: 40px;
                                background: rgb(36, 0, 80);
                            }

                            &.add-to-cart {
                                height: 35px;
                                background: rgb(91, 64, 124);
                            }

                            &.remove-from-cart {
                                height: 35px;
                                background: rgb(161, 36, 49);
                            }

                            &.add-wish-list {
                                height: 30px;
                                background: rgb(146, 128, 168);
                            }

                            & > .icon {
                                font-size: 20px;
                                margin-right: 5px;
                            }
                        }
                    }
                }
            }
            
            & > .details {
                width: 1000px;
                margin-top: 40px;
                padding: 20px 30px;
                -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .47);
                box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .47);
                border-radius: 10px;
                border-radius: 5px;

                & > h2 {
                    color: rgb(36, 0, 80);
                    margin-bottom: 10px;
                }

                & > .description {
                    margin: 0 0 25px 25px;
                }

                & > .specs {
                    display: grid;
                    grid-template-columns: repeat(3, 33%);
                    grid-template-rows: repeat(2, 80px);
                    width: 100%;

                    & > div {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin-right: 10px;
                        padding: 5px 10px;
                        color: rgb(36, 0, 80);
                        font-size: 16px;

                        & > .icon {
                            font-size: 28px;
                            margin: 0 5px 5px 0;
                        }
                    }
                }
            }
        }
    }
`;