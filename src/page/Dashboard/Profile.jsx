import React from 'react';
import UseAuth from '../../hook/UseAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const formatDate = (date) => {
        if (!date) return 'N/A';

        const d = new Date(date);
        if (isNaN(d.getTime())) return 'Invalid date';

        return d.toISOString().split('T')[0];
    };

    const { data: users = {} } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: (async () => {
            const result = await axiosSecure.get(`/users/${user.email}`)
            return result.data
        })
    })
    console.log(users)
    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-linear-to-r/hsl from-indigo-500 to-teal-400 px-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 text-center">
                {/* Profile Image */}
                <div className="flex justify-center -mt-20 mb-2">
                    <img
                        src={users?.photoURL}
                        alt="profile"
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                    />
                </div>

                <h1 className="text-2xl border-b border-dashed pb-2 border-b-gray-700 font-semibold text-gray-800">
                    {users.name}
                </h1>

                <div className='full text-gray-800 flex justify-between'>
                    <h1 className='font-semibold'>Email</h1>
                    <h1>{users.email}</h1>
                </div>

                <div className='full text-gray-800 flex justify-between'>
                    <h1 className='font-semibold'>Address</h1>
                    <h1>{users.address}</h1>
                </div>
                <div className='full text-gray-800 flex justify-between'>
                    <h1 className='font-semibold'>Role</h1>
                    <h1>{users.role}</h1>
                </div>
                {
                    users.role === 'Chef' && <>
                        <div className='full text-gray-800 flex justify-between'>
                            <h1 className='font-semibold'>Chef Id</h1>
                            <h1>{users.chefId}</h1>
                        </div>
                    </>
                }

                <div className='full text-gray-800 flex justify-between'>
                    <h1 className='font-semibold'>Status </h1>
                    <h1>{users.status}</h1>
                </div>
                <div className='full text-gray-800 flex justify-between'>
                    <h1 className='font-semibold'>Create At</h1>
                    <h1>{formatDate(users.createdAt)}</h1>
                </div>
            </div>
        </div>
    );
};

export default Profile;