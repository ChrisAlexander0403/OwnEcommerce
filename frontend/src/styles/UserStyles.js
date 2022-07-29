import styled from "styled-components";

export const UserStyles = styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
    overflow-y: auto;

    & > .user-container {
        width: 100%;

        & > .top > .left > .title, > .bottom > .title {
            font-size: 16px;
            color: lightgray;
            margin-bottom: 20px;
        }

        & > .top {
            padding: 20px;
            display: flex;
            gap: 20px;

            & > .left {
                position: relative;
                flex: 1;
                padding: 20px;
                -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .47);
                box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .47);

                & > .edit {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 5px 10px;
                    font-size: 12px;
                    border: none;
                    border-radius: 0 0 0 5px;
                    color: rgb(63, 32, 102);
                    background: rgb(228, 223, 233);
                    cursor: pointer;

                    &:hover {
                        background: rgb(36, 0, 80);
                        color: #fff;
                    }
                }

                & > .user {
                    display: flex;
                    gap: 20px;

                    & > .img-container, .avatar {
                        min-width: 100px;
                        width: 100px;
                        min-height: 100px;
                        height: 100px;
                        border-radius: 50%;
                    }

                    & > .img-container {
                        & > img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }

                    & > .avatar {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 80px;
                        background: rgb(228, 223, 233);
                    }

                    & > .details {
                        & > .name {
                            margin-bottom: 10px;
                            color: #555;
                        }

                        & > .item {
                            max-width: 235px;
                            margin-bottom: 10px;
                            font-size: 14px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                            & > .itemKey {
                                font-weight: bold;
                                color: gray;
                                margin-right: 5px;
                            }

                            & > .itemValue {
                                font-weight: 300;
                            }
                        }
                    }
                }
            }

            & > .right {
                flex: 2;
            }
        }

        & > .bottom {
            padding: 20px;
            margin: 10px 20px;
            -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .47);
            box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .47);
        }
    }
`;