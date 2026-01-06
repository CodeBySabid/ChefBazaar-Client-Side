import React, { useState } from 'react';
import image from '../../assets/images.avif'
import '../ButtonStyle/loginbutton.css'
import { FaComment, FaStar } from 'react-icons/fa';


const MealDetails = () => {
    const [rating, setRating] = useState(null);
    const [rateColor, setColor] = useState(null);

    return (
        <div className='flex flex-col items-center w-screen pt-16 max-sm:pt-12 '>
            <div className='rounded max-w-384 bg-base-300 w-full'>

                <div className='rounded flex flex-col md:flex-row gap-6 p-2.5 w-full'>
                    <div className='w-full rounded flex-1'>
                        <img className='rounded mx-auto w-full max-w-125 h-full max-h-100' src={image} alt="" />
                    </div>
                    <div className='flex-2'>
                        <div className="max-w-xl mx-auto ">
                            <h1 className='font-bold sm:text-3xl text-2xl text-center pb-2.5'>this is the best food in the city</h1>
                            <h2 className="text-xl font-semibold text-center mb-3">About Food</h2>

                            <div className="grid grid-cols-[150px_20px_1fr] gap-y-2 font-semibold">
                                <div>Rating</div>
                                <div className="text-center">:</div>
                                <div>{ }</div>

                                <div>Ingredients</div>
                                <div className="text-center">:</div>
                                <div>{ }</div>
                            </div>

                            <h2 className="text-xl font-semibold text-center mt-8 mb-3">About Chef</h2>

                            <div className="grid grid-cols-[150px_20px_1fr] gap-y-2">
                                <div>Cooked by</div>
                                <div className="text-center">:</div>
                                <div>{ }</div>

                                <div>Chef Id</div>
                                <div className="text-center">:</div>
                                <div>{ }</div>

                                <div>Chef's Experience</div>
                                <div className="text-center">:</div>
                                <div>{ }</div>

                                <div>Price</div>
                                <div className="text-center">:</div>
                                <div>${ }</div>

                                <div>Delivery Area</div>
                                <div className="text-center">:</div>
                                <div>{ }</div>

                                <div>Delivery Time</div>
                                <div className="text-center">:</div>
                                <div>{ }</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex justify-center mt-10'>
                    <button className="btn-17">
                        <span className="text-container">
                            <span className="text">Order Now</span>
                        </span>
                    </button>
                </div>
                <section className='grid grid-cols-1 lg:grid-cols-3 mt-2.5 '>
                    <div className='mt-2 relative w-full max-w-150 mx-auto'>
                        <input
                            type="text"
                            className="input w-full bg-transparent outline-none mt-1 pr-12"
                            placeholder="Password" />
                        <span className='absolute right-4 top-4'>
                            <FaComment></FaComment>
                        </span>
                    </div>
                    <div className='flex justify-center mt-2.5'>
                        {[...Array(5)].map((star, index) => {
                            const currentRate = index + 1
                            return (
                                <div>
                                    <FaStar onClick={() => setRating(currentRate)} size={50} color={currentRate <= (rateColor || rating) ? 'yellow' : "gray"}></FaStar>
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-full flex justify-center mt-4'>
                        <button className="btn-17">
                            <span className="text-container">
                                <span className="text">Reviews</span>
                            </span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MealDetails;