import { motion } from 'motion/react';
import React from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaStar, FaTrash } from 'react-icons/fa';

const UserOrder = () => {
    const axiosSecure = useAxiosSecure();

    const { data: orders = [] } = useQuery({
        queryKey: ['order'],
        queryFn: (async () => {
            const res = await axiosSecure.get('/order')
            return res.data
        })
    })

    const handlePayment = async (order) => {
        const paymentInfo = {
            price: order.totalPrice,
            foodId: order._id,
            userEmail: order.userEmail,
            foodName: order.foodName,
        }
        const res = await axiosSecure.post('/payment-checkout', paymentInfo);
        window.location.assign(res.data.url);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                My Order {orders.length}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {orders.map((order) => (
                    <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
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
                                👨‍🍳 {order.chefName}
                            </p>

                            <p className="text-sm font-semibold">
                                Chef ID: {order.chefId}
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
                            <div className="flex justify-between flex-wrap  items-center mt-2">
                                <p className="font-bold sm:text-lg text-[16px]">
                                    Total Price $ {order.totalPrice}
                                </p>
                                <p className="font-bold  sm:text-lg text-[16px]">
                                    Quantity: {order.quantity}
                                </p>
                            </div>

                            <p className="text-sm">
                                ⏱ {new Date(order.orderTime).toLocaleString().split('T')[0]}
                            </p>
                            {
                                order.orderStatus === 'Accept' &&
                                <p className="text-lg font-bold">
                                    Payment Status : {order.paymentStatus === 'Paid' ? <span className='text-green-500'>Paid</span> : <span className='text-yellow-500'>Pending</span>}
                                </p>
                            }

                            {/* Buttons */}
                            {
                                order.orderStatus === 'Accept' && order.paymentStatus === 'Pending' &&
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => handlePayment(order)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Payment Now
                                    </button>
                                </div>
                            }
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default UserOrder;