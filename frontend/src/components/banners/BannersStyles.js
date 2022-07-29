import styled from 'styled-components';

export const Announcements = styled.div`
    display: grid;
    width: 100%;
    height: 350px;
    grid-template-columns: 7fr 3fr;
    grid-template-rows: 175px 175px;
    grid-template-areas: "slider announcement1" 
                         "slider announcement2";
    gap: 15px;

    & div img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const Slider = styled.div`
    grid-area: slider;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: #545454;
`;

export const Announcement = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background: #545454;

    &.announcement1{
        grid-area: announcement1;
    }

    &.announcement2{
        grid-area: announcement2;
    }
`;