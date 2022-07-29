import styled from "styled-components";

export const SidebarStyles = styled.div`
    flex: 1;
    height: 100vh;
    border-right: 0.5px solid rgb(225, 225, 225);
    background: white;

    & > .top {
        height: 85px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 10px;

        & > .img-container {
            width: 60%;
            height: 60%;

            & > img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        & > span {
            font-weight: bold;
            font-size: 18px;
            color: rgb(36, 0, 80);
        }
    }

    & > hr {
        height: 0;
        border: 0.5px solid rgb(225, 225, 225);
    }

    & > .center {
        & > ul {
            & > .title {
                font-size: 10px;
                font-weight: bold;
                color: #999;
                margin-top: 15px;
                margin-bottom: 5px;
                padding-left: 15px;
            }
            
            & > li {
                list-style: none;
                padding: 5px 0 5px 15px;
                
                cursor: pointer;

                &:hover {
                    background: rgb(228, 223, 233);
                }

                & .icon {
                    font-size: 18px;
                }

                & span {
                    font-size: 13px;
                    margin-left: 10px;
                }

                & > a, button {
                    display: flex;
                    align-items: center;
                    color: rgb(36, 0, 80);
                }

                & > button {
                    border: none;
                    background: none;
                    cursor: pointer;
                }
            }
        }
    }
`;