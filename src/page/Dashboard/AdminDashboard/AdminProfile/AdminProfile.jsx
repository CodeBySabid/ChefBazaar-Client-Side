import React from 'react';
import UseAuth from '../../../../hook/UseAuth';

const AdminProfile = () => {
    const {user} = UseAuth();
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center bg-linear-to-r/hsl from-indigo-500 to-teal-400 px-4">
                <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 text-center">

                    {/* Profile Image */}
                    <div className="flex justify-center -mt-20 mb-2">
                        <img
                            src={user?.photoURL}
                            alt="profile"
                            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-md"
                        />
                    </div>

                    <h1 className="text-2xl border-b border-dashed pb-2 border-b-gray-700 font-semibold text-gray-800">
                         {user.displayName}
                    </h1>

                    <div className='full text-gray-800 flex justify-between'>
                        <h1 className='font-semibold'>Email</h1>
                        <h1>{user.email}</h1>
                    </div>

                    <div className='full text-gray-800 flex justify-between'>
                        <h1 className='font-semibold'>Address</h1>
                        <h1>{user.email}</h1>
                    </div>

                    <div className='full text-gray-800 flex justify-between'>
                        <h1 className='font-semibold'>Status </h1>
                        <h1>{user.email}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;