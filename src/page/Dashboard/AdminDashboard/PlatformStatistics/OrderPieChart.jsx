import React from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const OrderPieChart = () => {
  const axiosSecure = useAxiosSecure();

  const {data: pending = [], refetch} = useQuery({
    queryKey: ['pending'],
    queryFn: (async() => {
      const res = await axiosSecure.get(`/order-pending`)
      return res.data
    })
  })

  const {data: delivered = []} = useQuery({
    queryKey: ['delivered'],
    queryFn: (async() => {
      const res = await axiosSecure.get(`/order-delivered`)
      return res.data
    })
  })

  refetch()

  const data = [
    { name: "Delivered", value: delivered.length },
    { name: "Pending", value: pending.length},
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