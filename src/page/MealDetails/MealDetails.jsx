import React, { useState } from 'react';
import '../ButtonStyle/loginbutton.css'
import { FaCommentDots, FaHeart, FaStar } from 'react-icons/fa';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import UseAuth from '../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';


const MealDetails = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const { register, handleSubmit, setValue, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const { id } = useParams();


    const { data: foods = [] } = useQuery({
        queryKey: ["food"],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/food/${id}`);
            return res.data
        })
    })

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const d = new Date(date);
        if (isNaN(d.getTime())) return "Invalid date";
        return d.toISOString().split('T')[0]
    }

    const handleStarClick = (value) => {
        setRating(value);
        setValue("rating", value);
    };

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['review', id],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/review/user/${id}`)
            return res.data;
        })
    })

    const handleReview = (data) => {
        const userInfo = {
            foodId: id,
            review: data.review,
            rating: data.rating,
            name: user.displayName,
            photoUR: user.photoURL,
            email: user.email,
            foodName: foods.foodName,
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
                    refetch()
                    reset();
                    setRating(0);
                }
            })
            .catch(error => {
                if(error.status === 400) {
                    toast.error('Please update your review!')
                }
            })
    }


    return (
        <div className='flex flex-col bg-base-200 items-center w-screen pt-16 max-sm:pt-12'>
            <div className='rounded max-w-384 w-full'>
                <div className='rounded flex flex-col md:flex-row gap-6 p-2.5 w-full'>
                    <div className='w-full rounded flex-1'>
                        <img className='rounded mx-auto w-full max-w-125 h-full max-h-100' src={foods.foodImage} alt="" />
                    </div>
                    <div className='flex-2'>
                        <div className="max-w-xl mx-auto ">
                            <h1 className='font-bold sm:text-3xl text-2xl text-center pb-2.5'>{foods.foodName}</h1>
                            <h2 className="text-xl font-semibold text-center mb-3">About Food</h2>
                            <div className="grid grid-cols-[150px_20px_1fr] gap-y-2 font-semibold">
                                <div>Rating</div>
                                <div className="text-center">:</div>
                                <div className="flex items-center text-lg">
                                    <span className="text-yellow-500">
                                        {"★".repeat(foods.rating)}
                                        {"☆".repeat(5 - foods.rating)}
                                    </span>
                                </div>
                                <div>Ingredients</div>
                                <div className="text-center">:</div>
                                <ul>
                                    <div>{foods.ingredients?.map((ingredient, index) => <li key={index}>{index + 1}. {ingredient} </li>)}</div>
                                </ul>
                            </div>

                            <h2 className="text-xl font-semibold text-center mt-8 mb-3">About Chef</h2>

                            <div className="grid grid-cols-[150px_20px_1fr] gap-y-2">
                                <div>Cooked by</div>
                                <div className="text-center">:</div>
                                <div>{foods.chefName}</div>

                                <div>Chef Id</div>
                                <div className="text-center">:</div>
                                <div>{foods.chefId}</div>

                                <div>Chef's Experience</div>
                                <div className="text-center">:</div>
                                <div>{foods.chefExperience}</div>

                                <div>Price</div>
                                <div className="text-center">:</div>
                                <div>${foods.price}</div>

                                <div>Delivery Area</div>
                                <div className="text-center">:</div>
                                <div>{foods.deliveryArea}</div>

                                <div>Delivery Time</div>
                                <div className="text-center">:</div>
                                <div>{foods.estimatedDeliveryTime}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full justify-center mt-10 sm:gap-6 gap-1.5'>
                    <div className='flex justify-center'>
                        <Link to={`/order/${foods._id}`} className="btn-17">
                            <span className="text-container">
                                <span className="text">Order Now</span>
                            </span>
                        </Link>
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
                            {[...Array(5)]?.map((_, index) => {
                                const value = index + 1;
                                return (
                                    <FaStar
                                        {...register('rating', { required: true })}
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
                {
                    reviews?.map((review, index) => (
                        <div
                            key={index}
                            className="mt-4 rounded-xl bg-base-100 p-4 shadow-sm hover:shadow-md transition"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={review.photoUR || "/user.png"}
                                    alt={review.name}
                                    className="w-14 h-14 rounded-full object-cover border"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold">
                                        {review.name}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-yellow-500">
                                            {"★".repeat(review.rating)}
                                            {"☆".repeat(5 - review.rating)}
                                        </span>
                                        <span>•</span>
                                        <span>{formatDate(review.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 leading-relaxed">
                                {review.review}
                            </p>
                        </div>
                    ))
                }
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MealDetails;