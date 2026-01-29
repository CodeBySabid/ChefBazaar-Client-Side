import React from 'react';
import { motion } from "motion/react";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaStar } from "react-icons/fa";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import UseAuth from '../../../hook/UseAuth';

const OrderRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: users = {}} = useQuery({
    queryKey: ['users', user?.email],
    enabled: !!user?.email,
    queryFn: (async () => {
      const result = await axiosSecure.get(`/users/${user.email}`)
      return result.data
    })
  })

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['order'],
    enabled: !!users?.chefId,
    queryFn: (async () => {
      const res = await axiosSecure.get(`/order/${users?.chefId}`)
      return res.data
    })
  })

  const handeStatus = (id, name, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${name} order ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    })
      .then(result => {
        if (result.isConfirmed) {
          const orderStatus = { status }
          axiosSecure.patch(`/order/${id}`, orderStatus)
            .then(res => {
              if (res.data.modifiedCount) {
                Swal.fire({
                  title: "Success!",
                  text: `${name} order ${status} successfully`,
                  icon: "success"
                });
                refetch()
              }
            })
        }
      })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
        Meal Request {orders.length}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {orders.map((order) => (
          <motion.div
            key={order._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition cursor-pointer={{ duration: 0.4 }}
            className="bg-base-300 rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Image */}
            <img
              src={order.foodImage}
              alt={order.foodName}
              className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-5 space-y-2">
              <h2 className="text-xl font-semibold">
                {order.foodName}
              </h2>

              <p className='font-semibold'>
                User Email : {order.userEmail}
              </p>

              <div className="flex flex-wrap gap-2 justify-between items-center mt-2">
                <p className='font-bold sm:text-lg text-[16px]'>Unit Price
                  <span className="text-green-600 ml-1">
                    ${order.price}
                  </span>
                </p>
                <p className="font-bold sm:text-lg text-[16px] text-lg">
                  Order Status : {order.orderStatus === 'Pending' && <span className='text-yellow-500'>Pending</span>}
                  {order.orderStatus === 'Accept' && <span className='text-blue-500'>Accepted</span>}
                  {order.orderStatus === 'Deliver' && <span className='text-green-500'>Delivered</span>}
                  {order.orderStatus === 'Cancel' && <span className='text-red-500'>Cancelled</span>}
                </p>
              </div>
              <div className="flex justify-between flex-wrap gap-2 items-center mt-2">
                <p className="font-bold sm:text-lg text-[16px]">
                  Total Price $ {order.totalPrice}
                </p>
                <p className="font-bold  sm:text-lg text-[16px]">
                  Quantity: {order.quantity}
                </p>
              </div>
              <div className="flex justify-between flex-wrap gap-2 items-center mt-2">
                <p className="text-sm">
                  ⏱ {new Date(order.orderTime).toLocaleString().split('T')[0]}
                </p>
                <p>{order.userAddress}</p>
              </div>
              {/* Buttons */}
              {
                order.orderStatus === 'Pending' ?
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button
                      onClick={() => handeStatus(order._id, order.foodName, 'Accept')}
                      className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => handeStatus(order._id, order.foodName, 'Deliver')}
                      className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                    >
                      Deliver
                    </button>
                    <button
                      onClick={() => handeStatus(order._id, order.foodName, 'Cancel')}
                      className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div> :
                  <div>
                    {
                      order.orderStatus === 'Accept' ?
                        <div className="flex flex-wrap gap-3 mt-4">
                          <button
                            className="flex-1 min-w-26 cursor-not-allowed flex items-center justify-center gap-2 bg-blue-500/50 text-white py-2 rounded-lg"
                          >
                            Accepted
                          </button>
                          <button
                            onClick={() => handeStatus(order._id, order.foodName, 'Deliver')}
                            className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                          >
                            Deliver
                          </button>
                          <button
                            className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-red-500/50 text-white py-2 rounded-lg cursor-not-allowed"
                          >
                            Cancel
                          </button>
                        </div>
                        :
                        <div>
                          {
                            order.orderStatus === 'Deliver' || order.orderStatus === 'Cancel' ?
                              <div className="flex flex-wrap gap-3 mt-4">
                                <button
                                  className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-blue-500/50 cursor-not-allowed text-white py-2 rounded-lg"
                                >
                                  Accepted
                                </button>
                                <button
                                  className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-green-500/50 cursor-not-allowed text-white py-2 rounded-lg"
                                >
                                  Deliver
                                </button>
                                <button
                                  className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-red-500/50 cursor-not-allowed text-white py-2 rounded-lg"
                                >
                                  Cancel
                                </button>
                              </div>
                              :
                              <div className="flex flex-wrap gap-3 mt-4">
                                <button
                                  className="flex-1 min-w-26 cursor-not-allowed flex items-center justify-center gap-2 bg-blue-500/50 text-white py-2 rounded-lg"
                                >
                                  Accepted
                                </button>
                                <button
                                  onClick={() => handeStatus(order._id, order.foodName, 'Deliver')}
                                  className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition cursor-pointer"
                                >
                                  Deliver
                                </button>
                                <button
                                  className="flex-1 min-w-26 flex items-center justify-center gap-2 bg-red-500/50 text-white py-2 rounded-lg cursor-not-allowed"
                                >
                                  Cancel
                                </button>
                              </div>
                          }
                        </div>
                    }
                  </div>
              }
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OrderRequests;