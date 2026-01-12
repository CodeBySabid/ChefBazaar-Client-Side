import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

const OrderPieChart = () => {
  const data = [
    { name: "Delivered", value: 1230 },
    { name: "Pending", value: 45 },
  ]
  const colors = ["#22c55e", "#f97316"];
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <h2 className="font-semibold mb-4">Order Status Breakdown</h2>
      <PieChart width={300} height={250}>
        <Pie data={data} cx="50%" cy="50%" outerRadius={80} dataKey='value'>
          {
            data.map(( _, index) => <Cell key={index} fill={colors[index]}/>)
          }
        </Pie>
        <Tooltip></Tooltip>
      </PieChart>
    </div>
  );
};

export default OrderPieChart;