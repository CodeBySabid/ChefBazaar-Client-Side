import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaStar } from "react-icons/fa";
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useRole from '../../../hook/useRole';
import { Link } from 'react-router';

const ChefMeals = () => {
    const axiosSecure = useAxiosSecure();
    const {role} = useRole();
    const { data: meals = [], refetch, isLoading } = useQuery({
        queryKey: ["meals"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/${role}`);
            return res.data;
        },
    });
    
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This meal will be deleted permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/meals/${id}`);
                refetch();
                Swal.fire("Deleted!", "Meal has been deleted.", "success");
            }
        });
    };
    
    if (isLoading) {
        return <p className="text-center mt-10">Loading meals...</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center mb-10">
                🍽️ My Meals {meals.length}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {meals.map((meal) => (
                    <motion.div
                        key={meal._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        className="bg-base-300 rounded-2xl shadow-lg overflow-hidden"
                    >
                        {/* Image */}
                        <img
                            src={meal.foodImage}
                            alt={meal.foodName}
                            className="w-full h-48 object-cover"
                        />

                        {/* Content */}
                        <div className="p-5 space-y-2">
                            <h2 className="text-xl font-semibold">
                                {meal.foodName}
                            </h2>

                            <p>
                                👨‍🍳 {meal.chefName}
                            </p>

                            <p className="text-sm">
                                Chef ID: {meal.chefId}
                            </p>

                            <div className="flex justify-between items-center mt-2">
                                <p className="font-bold text-lg text-green-600">
                                    $ {meal.price}
                                </p>

                                <p className="flex items-center gap-1 text-yellow-500">
                                    <FaStar /> {meal.rating}
                                </p>
                            </div>

                            <p className="text-sm">
                                ⏱ {meal.estimatedDeliveryTime}
                            </p>

                            <div>
                                <p className="font-medium">Ingredients:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {meal.ingredients.map((item, index) => (
                                        <span
                                            key={index}
                                            className="text-xs bg-base-100 px-2 py-1 rounded-full"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={() => handleDelete(meal._id)}
                                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                >
                                    <FaTrash /> Delete
                                </button>

                                <Link
                                    to={`/dashboard/update-meals/${meal._id}`}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                >
                                    <FaEdit /> Update
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ChefMeals;