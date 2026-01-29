import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import useRole from '../../../../hook/useRole';
import { useQuery } from '@tanstack/react-query';

const UserGrowthChart = () => {
  // const axiosSecure = useAxiosSecure();
  // const { role, loading } = useRole();

  // const { data: data = [], isLoading } = useQuery({
  //   queryKey: ['users'],
  //   queryFn: (async () => {
  //     const res = await axiosSecure.get(`/manager/${role}`);
  //     return res.data
  //   })
  // })

  // if (isLoading || loading) {
  //   return <span className="loading loading-spinner text-primary"></span>
  // }
  const data = [
    { month: "Jan", users: 0 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 220 },
    { month: "Apr", users: 300 },
    { month: "May", users: 380 },
    { month: "Jun", users: 450 },
  ]
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <h2 className="font-semibold mb-4">User Growth Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip></Tooltip>
          <Line type='monotone' dataKey="users" stroke='#8b5cf6' strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
