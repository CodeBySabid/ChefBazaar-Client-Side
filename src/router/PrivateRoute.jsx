import React from 'react';
import UseAuth from '../hook/UseAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../page/loading/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const location = useLocation();
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return (
            <Navigate to={'/login'} replace state={{ from: location }}></Navigate>)
    }
    return children;
};

export default PrivateRoute;