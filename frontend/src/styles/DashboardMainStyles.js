import styled from "styled-components";

export const DashboardMainStyles = styled.div`
    height: 100vh;
    overflow-y: auto;

    & > .widgets, .charts {
        display: flex;
        padding: 20px;
        gap: 20px;
    }

    & > .charts {
        padding: 5px 20px;
    }

    & > .latest-transactions-list {
        -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, .47);
        box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, .47);
        padding: 20px;
        margin: 20px;

        & > .list-title {
            font-weight: 500;
            color: gray;
            margin-bottom: 15px;
        }
    }
`;