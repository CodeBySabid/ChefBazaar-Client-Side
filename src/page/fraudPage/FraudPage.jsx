import React from 'react';

const FraudPage = () => {
    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-5xl text-red-600'>Your are not allowed</h1>
            <Link to={'/'} className='text-2xl btn bg-green-600 mt-5'>Home</Link>
        </div>
    );
};

export default FraudPage;