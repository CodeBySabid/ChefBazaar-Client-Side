import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaStar } from 'react-icons/fa';

const AllMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState('asc');

  const { data: foods = [] } = useQuery({
    queryKey: ['foods', sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get(`/food?sort=${sortOrder}`);
      return res.data;
    },
  });

  console.log(foods)

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-base-200 px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        🍽️ All Delicious Meals
      </h1>

      <div className="flex justify-end mb-4">
        <button onClick={handleSortChange} className="bg-[#5D3327] hover:bg-[#4a281f] text-white py-2 px-4 rounded-xl font-semibold transition">
          Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {foods.map((food) => (
          <motion.div
            key={food._id}
            whileHover={{ y: -8 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-base-100 rounded-3xl shadow-lg overflow-hidden border"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={food.foodImage}
                alt={food.foodName}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <span className="absolute top-4 right-4 bg-[#5D3327] text-white px-4 py-1 rounded-full text-sm font-bold">
                ${food.price}
              </span>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-bold">{food.foodName}</h2>

              <p className="text-sm opacity-70">
                👨‍🍳 {food.chefName} (ID: {food.chefId})
              </p>

              <p className="text-sm">
                📍 Delivery: {food.deliveryArea}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < food.rating ? '' : 'opacity-30'}
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  ({food.rating})
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Link to={`/order/${food._id}`} className="btn flex-1 bg-[#5D3327] hover:bg-[#4a281f] text-white py-3 rounded-xl font-semibold transition">
                  Buy Now
                </Link>

                <Link
                  to={`/meal-details/${food._id}`}
                  className="btn flex-1 border border-[#5D3327] text-center py-3 rounded-xl font-semibold hover:bg-[#5D3327] hover:text-white transition"
                >
                  See Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllMeal;