import React from 'react';
import UseAuth from '../../hook/UseAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../hook/useRole';
import Swal from 'sweetalert2';
import Loading from '../loading/Loading';

const Profile = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const { role } = useRole();
    const formatDate = (date) => {
        if (!date) return 'N/A';

        const d = new Date(date);
        if (isNaN(d.getTime())) return 'Invalid date';

        return d.toISOString().split('T')[0];
    };

    const { data: users = {}, refetch, isLoading } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: (async () => {
            const result = await axiosSecure.get(`/users/${user.email}`)
            return result.data
        })
    })

    const handleRequest = (requestRole) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Would you like to send a request to become a ${requestRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        })
            .then(result => {
                if (result.isConfirmed) {
                    const requestInfo = { requestRole }
                    axiosSecure.patch(`/users/${users._id}`, requestInfo)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                refetch()
                                Swal.fire({
                                    title: "Success!",
                                    text: `Request for ${requestRole} sent successfully.`,
                                    icon: "success"
                                });
                            }
                        })
                }
            })
    }

  if(isLoading) {
    return <Loading></Loading>
  }

    return (
        <div className="min-h-screen px-4 w-screen flex items-center justify-center bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700">
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
                {
                    role === 'Admin' ? '' : <div className='w-full flex gap-2 mt-2 justify-center items-center'>
                        {
                            role === 'Chef' ? "" : <>
                                {
                                    users.requestInfo === "Chef" ? <button
                                        className="relative w-full max-px-6 cursor-not-allowed rounded-2xl py-1.5 overflow-hidden group bg-linear-to-r from-gray-700 to-black text-white"
                                    >
                                        <span className="relative text-xl  min-w-10 w-full font-semibold">Be a Chef</span>
                                    </button> : <button onClick={() => handleRequest('Chef')}
                                        className="relative w-full cursor-pointer max-px-6 rounded-2xl py-1.5 overflow-hidden group bg-linear-to-r from-gray-700 to-black hover:bg-linear-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300"
                                    >
                                        <span
                                            className="absolute right-0 min-w-10 w-full h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
                                        ></span>
                                        <span className="relative text-xl font-semibold">Be a Chef</span>
                                    </button>
                                }
                            </>
                        }
                        {
                            users.requestInfo === 'Admin' ? <button
                                className="relative w-full cursor-not-allowed max-px-6 rounded-2xl py-1.5 overflow-hidden group bg-linear-to-r from-gray-700 to-black text-white"
                            >
                                <span className="relative text-xl  min-w-10 w-full font-semibold">Be a Admin</span>
                            </button> : 
                            <button onClick={() => handleRequest('Admin')}
                                className="relative w-full cursor-pointer max-px-6 rounded-2xl py-1.5 overflow-hidden group bg-linear-to-r from-gray-700 to-black hover:bg-linear-to-r hover:from-gray-600 hover:to-black text-white transition-all ease-out duration-300"
                            >
                                <span
                                    className="absolute right-0 min-w-10 w-full h-full top-0 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 -skew-x-12 group-hover:-translate-x-36 ease"
                                ></span>
                                <span className="relative text-xl font-semibold">Be a Admin</span>
                            </button>
                        }
                    </div>
                }
            </div>
        </div>
    );
};

export default Profile;