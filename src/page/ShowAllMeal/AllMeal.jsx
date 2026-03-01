import React, { useState } from 'react';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FaArrowRight, FaStar } from 'react-icons/fa';
import Loading from '../loading/Loading';

const AllMeal = () => {
  const axiosSecure = useAxiosSecure();
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods', sortOrder, searchText, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/food?sort=${sortOrder}&search=${searchText}&page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-base-200 px-6 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        🍽️ All Delicious Meals
      </h1>

      <div className='flex justify-between flex-wrap gap-2.5 items-start mb-3'>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input onChange={(e) => setSearchText(e.target.value)} type="search" required placeholder="Search Meals" />
        </label>
        <div className="flex justify-end mb-4">
          <button onClick={handleSortChange} className="bg-[#5D3327] hover:bg-[#4a281f] text-white py-2 px-4 rounded-xl font-semibold transition">
            Sort by Price ({sortOrder === 'asc' ? 'Low to High' : 'High to Low'})
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loading></Loading>
      ) : foods.length === 0 && searchText ? (
        <p className="text-center text-2xl sm:text-3xl lg:text-4xl text-red-500 mt-2">Food is not found at this moment</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative pb-15">
          {foods.map((food) => (
            <motion.div
              key={food._id}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-base-100 rounded-xl shadow-lg overflow-hidden border"
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
          <button
            onClick={() => setPage(page + 1)}
            className='btn mt-5 absolute bottom-0 w-48 right-0 bg-blue-600 text-white'
          >
            <FaArrowRight /> Next
          </button>

        </div>
      )}

    </div>
  );
};

export default AllMeal;