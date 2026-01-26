import React from 'react';
import useRole from '../hook/useRole';
import UseAuth from '../hook/UseAuth';
import Loading from '../page/loading/Loading';
import { Link } from 'react-router';

const AdminRouter = ({children}) => {
    const { role, isLoading } = useRole();
    const { loading } = UseAuth();
    if (loading || isLoading) {
        return <Loading></Loading>
    }

    if (role !== 'Admin') {
        return <div className='w-full min-h-screen flex justify-center items-center'>
            <h1 className='text-5xl text-red-600'>Not allowed</h1>
            <Link to={'/'} className='text-2xl text-red-600'>Home</Link>

        </div>
    }

    return children;
};

export default AdminRouter;