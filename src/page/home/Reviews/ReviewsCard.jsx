import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewsCard = ({ review }) => {
    const { userName, review: testimonial, user_photoURL, } = review;
    return (
        <div>
            <div className="max-w-sm bg-white rounded-2xl shadow-md p-6">
                {/* Quote Icon */}
                <FaQuoteLeft className="text-teal-200 text-3xl mb-4" />


                {/* Content */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {testimonial}
                </p>


                {/* Divider */}
                <div className="border-t border-dashed border-gray-300 mb-4"></div>


                {/* User Info */}
                <div className="flex items-center gap-3">
                    <img className="w-10 h-10 rounded-full bg-teal-900 flex items-center justify-center text-white font-semibold" src={user_photoURL} alt="" />
                    <div>
                        <h4 className="font-semibold text-gray-800">{userName}</h4>
                        <p className="text-xs text-gray-500">Senior Product Designer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewsCard;