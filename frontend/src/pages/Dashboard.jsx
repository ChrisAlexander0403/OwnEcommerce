import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { DashboardStyles } from '../styles/DashboardStyles';

const Dashboard = () => {
  return (
    <DashboardStyles>
      <Sidebar />
      <div className="dashboard-container">
        <Outlet />
      </div>
    </DashboardStyles>
  );
}

export default Dashboard;