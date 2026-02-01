import React from 'react';
import { FaUsers, FaDollarSign, FaTruck, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../../../hook/useAxiosSecure";
import useRole from "../../../../hook/useRole";
import { useQuery } from "@tanstack/react-query";
import Loading from '../../../loading/Loading';

const StatCard = () => {
  const axiosSecure = useAxiosSecure();
  const { role, loading } = useRole();

  const { data: pending = [] } = useQuery({
    queryKey: ['pending'],
    queryFn: (async () => {
      const res = await axiosSecure.get(`/order-pending`)
      return res.data
    })
  })

  const { data: delivered = [] } = useQuery({
    queryKey: ['delivered'],
    queryFn: (async () => {
      const res = await axiosSecure.get(`/order-delivered`)
      return res.data
    })
  })

  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: (async () => {
      const res = await axiosSecure.get(`/manager/${role}`);
      return res.data
    })
  })

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payment'],
    queryFn: (async () => {
      const res = await axiosSecure.get(`/payment-chart`);
      return res.data
    })
  })

  const totalPayment = payments.reduce(
    (sum, item) => sum + item.totalAmount,
    0
  );
  

  
  if(loading || isLoading) {
    return <Loading></Loading>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="card bg-base-100 shadow-md">
        <div className="card-body flex flex-row items-center gap-4">
          <div className="p-4 rounded-lg bg-primary text-white">
            <FaDollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Payment Amount</p>
            <h2 className="text-2xl font-bold">$ {totalPayment}</h2>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body flex flex-row items-center gap-4">
          <div className="p-4 rounded-lg bg-primary text-white">
            <FaUsers size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Registered Users{ }</p>
            <h2 className="text-2xl font-bold">{users.length}</h2>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body flex flex-row items-center gap-4">
          <div className="p-4 rounded-lg bg-primary text-white">
            <FaTruck size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders Delivered{ }</p>
            <h2 className="text-2xl font-bold">{delivered.length}</h2>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-md">
        <div className="card-body flex flex-row items-center gap-4">
          <div className="p-4 rounded-lg bg-primary text-white">
            <FaClock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Orders Pending{ }</p>
            <h2 className="text-2xl font-bold">{pending.length}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;