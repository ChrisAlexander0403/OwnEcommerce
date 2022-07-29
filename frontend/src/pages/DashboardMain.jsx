import React from 'react';
import Helmet from 'react-helmet';
import Chart from '../components/chart/Chart';
import Featured from '../components/featured/Featured';
import Table from '../components/table/Table';
import Widget from '../components/widget/Widget';
import { DashboardMainStyles } from '../styles/DashboardMainStyles';

const DashboardMain = () => {
  return (
    <>
      <Helmet>
        <title>Intecel Admin - Dashboard</title>
      </Helmet>
      <DashboardMainStyles>
        <div className="widgets">
          <Widget type="client" link="customers" />
          <Widget type="order" link="orders" />
          <Widget type="earning" link="stats" />
          <Widget type="balance" link="stats" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Ganancias de los últimos 6 meses" />
        </div>
        <div className="latest-transactions-list">
          <div className="list-title">Transacciones más recientes</div>
          <Table />
        </div>
      </DashboardMainStyles>
    </> 
  );
}

export default DashboardMain;