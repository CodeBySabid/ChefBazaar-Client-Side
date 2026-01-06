import React, { useState } from 'react';
import image from '../../assets/images.avif'
import '../ButtonStyle/loginbutton.css'
import { FaComment, FaHeart, FaStar } from 'react-icons/fa';


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
                <div className='flex w-full justify-center mt-10 sm:gap-6 gap-1.5'>
                    <div className='flex justify-center'>
                        <button className="btn-17">
                            <span className="text-container">
                                <span className="text">Order Now</span>
                            </span>
                        </button>
                    </div>
                    <div className='flex justify-center'>
                        <button className="btn-17">
                            <span className="text-container flex ">
                                <span className="flex items-center gap-2"><FaHeart className='text-red-700'></FaHeart> Favorite</span>
                            </span>
                        </button>
                    </div>
                </div>
                <section className='grid grid-cols-1 lg:grid-cols-3 mt-2.5 '>
                    <div className='mt-2 relative w-full max-w-150 mx-auto'>
                        <input
                            type="text"
                            className="input w-full bg-transparent outline-none mt-1 pr-12"
                            placeholder="Comment" />
                        <span className='absolute right-4 top-4'>
                            <FaComment></FaComment>
                        </span>
                    </div>
                    <div className='flex justify-center mt-2.5'>
                        {[...Array(5)].map((star, index) => {
                            const currentRate = index + 1
                            return (
                                <div key={index}>
                                    <FaStar onClick={() => setRating(currentRate)} size={50} color={currentRate <= (rateColor || rating) ? 'red' : "gray"}></FaStar>
                                </div>
                            )
                        })}
                    </div>
                    <div className='w-full flex justify-center mt-4'>
                        <button className="btn-17">
                            <span className="text-container">
                                <span className="text">Review</span>
                            </span>
                        </button>
                    </div>
                </section>
                <section className='flex max-sm:flex-col max-sm:items-center gap-1.5 mt-3 border-b border-gray-500 pb-2.5'>
                    <div className='flex-1 flex gap-1.5'>
                        <img className='w-20 h-20 rounded-full' src={''} alt="" />
                        <div>
                            <h1>{}Reviewer</h1>
                            <h2>{}Rating</h2>
                            <p>{}Date</p>
                        </div>
                    </div>
                    <div className='flex-3 md:flex-4 lg:flex-5'>
                        <p>{}Comment Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates voluptatum delectus facere voluptatibus dolorum animi enim eius voluptas velit quasi possimus illo tempore, numquam incidunt? A, eum. Cupiditate, enim sunt.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MealDetails;