import React from 'react';
import UseAuth from './UseAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user} = UseAuth();
    const axiosSecure = useAxiosSecure();
    const {isLoading, data: role = []} = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: (async() => {
            const res = await axiosSecure.get(`/users/${user.email}/role`);
            return res.data?.role || 'user'
        })
    })
    return {isLoading, role};
};

export default useRole;