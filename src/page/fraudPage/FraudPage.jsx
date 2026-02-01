import React from 'react';
import { Link } from 'react-router';

const FraudPage = () => {
    return (
        <div className='w-full min-h-screen flex flex-col justify-center items-center'>
            <h1 className='text-xl text-center sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-red-600'>You cannot place any orders from this app.</h1>
            <Link to={'/'} className='text-2xl btn bg-green-600 mt-5'>Home</Link>
        </div>
    );
};

export default FraudPage;