import React from 'react';
import useAxiosSecure from '../../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../../hook/UseAuth';
import { BiSolidCommentX } from 'react-icons/bi';

const UserFavoriteMeal = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();

    const formatDate = (dateString) => {
        return new Date(dateString).toISOString().split('T')[0]
    }

    const { data: favorites = [] } = useQuery({
        queryKey: ['favorites', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorite/${user.email}`);
            return res.data;
        }
    });

    const handleReviewDelete = (id) => {
        console.log(id)
    }
    return (
        <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-semibold'>My review ({favorites.length})</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Meal Name</th>
                            <th>Chef Name</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            favorites.map((favorite, index) =>
                                <tr key={favorite._id} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{favorite.mealName}</td>
                                    <td>{favorite.chefName}</td>
                                    <td>$ {favorite.price}</td>
                                    <td>{formatDate(favorite.createdAt)}</td>
                                    <td>
                                        <button onClick={() => handleReviewDelete(favorite._id)} className='btn text-white h-8 border-none bg-red-500 flex items-center'><BiSolidCommentX /> Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserFavoriteMeal;