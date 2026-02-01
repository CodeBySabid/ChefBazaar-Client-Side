import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../loading/Loading';

const PaymentChart = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payment = [], isLoading } = useQuery({
    queryKey: ['paymentChart'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payment-chart');
      return res.data;
    }
  });

  const chartData = payment.map(item => ({
    date: item._id,
    amount: item.totalAmount
  }));

  if (isLoading) return <Loading></Loading>;

  return (
    <div className='card bg-base-100 shadow-md p-4'>
      <h1 className="font-semibold mb-4">Total Payment Trend</h1>
      <div className=' text-black'>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentChart;
