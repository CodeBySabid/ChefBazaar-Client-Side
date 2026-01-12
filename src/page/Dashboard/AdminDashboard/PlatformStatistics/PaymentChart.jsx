import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const PaymentChart = () => {
  const data = [
    { month: "jan", value: 2000 },
    { month: "Feb", value: 3500 },
    { month: "Mar", value: 6000 },
    { month: "Apr", value: 20000 },
    { month: "May", value: 21000 },
    { month: "Jun", value: 22000 },
  ]
  return (
    <div className='card bg-base-100 shadow-md p-4'>
      <h1 className="font-semibold mb-4">Total Payment Trend</h1>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month">
          </XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3}></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentChart;