import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import UseAuth from '../../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import { BiSolidCommentEdit, BiSolidCommentX } from 'react-icons/bi';

const MyReview = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0];
    }
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/review/${user?.email}`)
            return res.data
        })
    })
    console.log(reviews)

    return (
        <div>
            <h1>review</h1>
            {
                reviews.map((review, index) => (
                    <div
                        key={index}
                        className="mt-4 rounded-xl bg-base-100 p-4 shadow-sm hover:shadow-md transition"
                    >
                        <div className="w-full flex max-sm:flex-col sm:justify-between gap-4">
                            <div className='flex items-center gap-4'>
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
                            <div className='flex gap-2 items-center'>
                                <button className='flex text-white h-8 items-center gap-2 btn bg-[#075af5]'><BiSolidCommentEdit /> Update</button>
                                <button className='btn text-white h-8 border-none bg-red-500 flex items-center'><BiSolidCommentX /> Delete</button>
                            </div>
                        </div>
                        <p className="mt-3 leading-relaxed">
                            {review.review}
                        </p>
                    </div>
                ))
            }
        </div>
    );
};

export default MyReview;