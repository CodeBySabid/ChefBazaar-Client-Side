import React from 'react';
import { motion } from "framer-motion";
import { FaUtensils, FaMapMarkerAlt } from "react-icons/fa";

const BannerSection = () => {
    return (
        <div>
            <section className="bg-base-200 py-20 max-sm:py-10 flex items-center">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    {/* {motion} */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="text-4xl md:text-5xl font-bold leading-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Fresh <span className="text-primary">Home‑Cooked Meals</span>
                            <br /> Near You
                        </motion.h1>


                        <motion.p
                            className="mt-5 text-gray-500"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            ChefBazaar connects you with local home chefs.
                            Order hygienic, authentic meals cooked with love —
                            just like home.
                        </motion.p>


                        <motion.div
                            className="mt-7 flex flex-wrap gap-4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button className="btn btn-primary px-8">
                                <FaUtensils className="mr-2" /> Explore Meals
                            </button>
                            <button className="btn btn-outline">
                                <FaMapMarkerAlt className="mr-2" /> Find Chefs Nearby
                            </button>
                        </motion.div>
                    </motion.div>


                    {/* Right Visual */}
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ repeat: Infinity, duration: 3 }}
                            className="bg-primary/10 p-12 rounded-3xl shadow-xl"
                        >
                            <FaUtensils className="text-7xl text-primary" />
                            <p className="mt-4 font-semibold text-center">Local Home Chefs</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default BannerSection;