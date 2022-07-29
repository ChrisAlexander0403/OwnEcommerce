import numeral from 'numeral';
import React from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartStyles } from './ChartStyles';

const data = [
    {
      name: 'Enero',
      Total: 4000
    },
    {
      name: 'Febrero',
      Total: 3000
    },
    {
      name: 'Marzo',
      Total: 2000
    },
    {
      name: 'Abril',
      Total: 2780
    },
    {
      name: 'Mayo',
      Total: 1890
    },
    {
      name: 'Junio',
      Total: 2390
    }
];

const Chart = ({ aspect, title }) => {
  return (
    <ChartStyles>
        <div className="title"><p>{title}</p></div>
        <ResponsiveContainer width="100%" height="87%" aspect={aspect}>
            <AreaChart 
                width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="Total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgb(146, 128, 168)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="rgb(146, 128, 168)" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke='grey' />
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(228, 225, 225)" />
                <Tooltip formatter={(value) => numeral(value).format("$0,0.00")}/>
                <Area type="monotone" dataKey="Total" stroke="rgb(146, 128, 168)" fillOpacity={1} fill="url(#Total)" />
            </AreaChart>
        </ResponsiveContainer>
    </ChartStyles>
  );
}

export default Chart;