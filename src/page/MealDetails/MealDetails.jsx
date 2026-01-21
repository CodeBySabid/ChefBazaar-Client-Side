import React, { useState } from 'react';
import image from '../../assets/images.avif'
import '../ButtonStyle/loginbutton.css'
import { FaCommentDots, FaHeart, FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import UseAuth from '../../hook/UseAuth';


const MealDetails = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const { register, handleSubmit, setValue, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth()

    const handleStarClick = (value) => {
        setRating(value);
        setValue("rating", value);
    };

    const handleReview = (data) => {
        const userInfo = {
            review: data.review,
            rating: data.rating,
            name: user.displayName,
            photoUR: user.photoURL
        }
        axiosSecure.post('/review', userInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: "",
                        icon: "success",
                        showCancelButton: false,
                        timer: 2000,
                    });
                    reset();
                    setRating(0);
                }
            }
            )
    }


    return (
        <div className='flex flex-col bg-base-300 items-center w-screen pt-16 max-sm:pt-12 '>
            <div className='rounded max-w-384 w-full'>

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
                <form onSubmit={handleSubmit(handleReview)}>
                    <div className="max-w-xl mx-auto bg-base-100 shadow-lg rounded-2xl p-6 mt-6">
                        <h2 className="text-xl font-semibold text-center mb-4">
                            Give Your Review
                        </h2>

                        <div className="relative mb-4">
                            <textarea
                                className="w-full outline-none p-4 textarea rounded-xl"
                                placeholder="Write your comment..."
                                {...register('review', { required: true })}
                            />
                            <FaCommentDots className="absolute top-4 right-4" />
                        </div>

                        <div className="flex justify-center gap-2 mb-6">
                            {[...Array(5)].map((_, index) => {
                                const value = index + 1;
                                return (
                                    <FaStar
                                        key={index}
                                        size={40}
                                        className="cursor-pointer transition-transform hover:scale-110"
                                        color={value <= (hover || rating) ? "#facc15" : "#d1d5db"}
                                        onClick={() => handleStarClick(value)}
                                        onMouseEnter={() => setHover(value)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                );
                            })}
                        </div>

                        <button
                            className="w-full btn bg-yellow-400 text-black font-semibold py-3 rounded-xl transition"
                        >
                            Submit Review
                        </button>
                    </div>
                </form>
                <section className='flex max-sm:flex-col max-sm:items-center gap-1.5 mt-3 border-b border-gray-500 pb-2.5'>
                    <div className='flex-1 flex gap-1.5'>
                        <img className='w-20 h-20 rounded-full' src={'/'} alt="" />
                        <div>
                            <h1>{ }Reviewer</h1>
                            <h2>{ }Rating</h2>
                            <p>{ }Date</p>
                        </div>
                    </div>
                    <div className='flex-3 md:flex-4 lg:flex-5'>
                        <p>{ }Comment Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates voluptatum delectus facere voluptatibus dolorum animi enim eius voluptas velit quasi possimus illo tempore, numquam incidunt? A, eum. Cupiditate, enim sunt.</p>
                    </div>
                </section>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MealDetails;