import styled from 'styled-components';

export const CartStyles = styled.div`
    width: 100%;
    padding: 30px 50px;

    & > h1 {
        margin-bottom: 20px;
        color: gray;
    }

    & > .main-container {
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;

        & > table {
            -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .27);
            box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .27);
            border-radius: 5px;
            border-collapse: collapse;

            & > thead {
                & > tr {
                    & > th {
                        padding: 15px 20px;
                        font-size: 13PX;
                        color: gray;
                    }
                }
            }

            & > tbody {
                & > tr {
                    border-bottom: 1px solid lightgray;

                    &:last-child {
                        border-bottom: none;
                    }

                    & > td {
                        padding: 10px 20px;
                        text-align: center;

                        & > .image-container {
                            width: 80px;
                            height: 80px;
                            /* border-radius: 50%; */
                            overflow: hidden;

                            & > img {
                                width: 100%;
                                height: 100%;
                                object-fit: contain;
                            }
                        }

                        & > .quantity-container {   
                            & > button, div {
                                display: inline-flex;
                                align-items: center;
                                justify-content: center;
                                border: none;
                                border-radius: 4px;
                                width: 25px;
                                height: 25px;
                                margin: 0 3px;
                            }

                            & > button {
                                cursor: pointer;
                                transition: .3s;

                                &:hover {
                                    transform: scale(1.1);
                                }

                                & > .icon {
                                    font-size: 18px;
                                }
                            }

                            & > .remove {
                                color: #fff;
                                background: rgb(161, 36, 49);
                            }

                            & > .minus, .plus {
                                background: rgb(200, 191, 211);
                            }
                        }
                    }
                }
            }
        }
    }
`;