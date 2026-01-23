import React, { useState } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import UseAuth from '../../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { BiSolidCommentEdit, BiSolidCommentX } from 'react-icons/bi';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FaCommentDots, FaStar } from 'react-icons/fa';

const MyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const [rating, setRating] = useState();
    const [hover, setHover] = useState();
    const { register, handleSubmit, setValue, reset } = useForm();
    const [selectedReview, setSelectedReview] = useState();

    const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0];
    }

    const handleStarClick = (value) => {
        setRating(value);
        setValue("rating", value)
    }
    const handleReview = (data) => {
        document.activeElement.blur();
        axiosSecure
            .patch(`/review/${selectedReview._id}`, {
                review: data.review,
                rating: data.rating
            })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire("Updated!", "Review updated successfully", "success");
                    refetch();
                    reset();
                    setSelectedReview(null);
                    document.getElementById('my_modal_3').close();
                }
            });
    };

    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/review/${user?.email}`)
            return res.data
        })
    })

    const handleReviewDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/review/${id}`)
                        .then(res => {
                            refetch();
                            if (res.data.deletedCount) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        });
                }
            })
    }

    return (
        <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold '>My review ({reviews.length})</h1>
            {
                reviews.map((review, index) => (
                    <div
                        key={index}
                        className="mt-4 rounded-xl bg-base-100 p-4 shadow-sm hover:shadow-md transition"
                    >
                        <div className="w-full flex max-sm:flex-col sm:justify-between gap-4">
                            <div className='flex items-center gap-4'>
                                <img
                                    src={review?.photoUR || "/user.png"}
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
                            <div className='flex gap-2 items-center'>
                                <button onClick={() => {
                                    setSelectedReview(review);
                                    setRating(review.rating);
                                    setValue("review", review.review);
                                    setValue('rating', review.rating);
                                    document.activeElement.blur();
                                    document.getElementById('my_modal_3').showModal()
                                }} className='flex text-white h-8 items-center gap-2 btn bg-[#075af5]'><BiSolidCommentEdit /> Update</button>
                                <button onClick={() => handleReviewDelete(review._id)} className='btn text-white h-8 border-none bg-red-500 flex items-center'><BiSolidCommentX /> Delete</button>
                            </div>
                        </div>
                        <p className="mt-3 leading-relaxed">
                            {review.review}
                        </p>
                    </div>
                ))
            }

            <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
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
                </div>
            </dialog>
        </div>
    );
};

export default MyReview;