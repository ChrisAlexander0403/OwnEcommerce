import styled from "styled-components";

export const ProductPreviewStyles = styled.div`
    display: grid;
    grid-template-columns: 100px 400px;
    grid-template-rows: repeat(4, 100px);
    grid-template-areas: "image1 preview"
                         "image2 preview"
                         "image3 preview"
                         "image4 preview";
    gap: 5px;

    & > .image {
        width: 100%;
        height: 100%;
        border-radius: 4px;

        &.image1 {
            grid-area: image1;
        }

        &.image2 {
            grid-area: image2;
        }

        &.image3 {
            grid-area: image3;
        }

        &.image4 {
            grid-area: image4;
        }

        & > .image-container {
            width: 100%;
            height: 100%;
            border: 1px solid lightgray;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                outline: 1px solid lightgray;
            }

            & > img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        
        & > .icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: rgb(228, 223, 233);
            border-radius: 4px;

            & > .icon {
                font-size: 48px;
                color: rgb(173, 159, 189);
            }
        }
    }

    & > .preview {
        grid-area: preview;
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: hidden;

        & > .image-container {
            width: 100%;
            height: 100%;

            & > img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        & > .icon-container {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background: rgb(228, 223, 233);

            & > .icon {
                color: rgb(173, 159, 189);
                font-size: 96px;
            }
        }
    }
`;