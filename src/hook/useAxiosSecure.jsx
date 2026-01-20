import React, { useEffect } from 'react';
import axios from 'axios';
import UseAuth from './UseAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create(({
    baseURL: import.meta.env.VITE_API_BASE_URL
}))

const useAxiosSecure = () => {
    const { user, logOut } = UseAuth();
    const navigate = useNavigate();
    useEffect(() => {
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            if(user?.accessToken) {
                config.headers.Authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        })
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response;
        },
            (error) => {
                const statusCode = error.response?.status;
                if (statusCode === 401 || statusCode === 403) {
                    logOut()
                        .then(() => {
                            navigate('/login')
                        })
                }
                return Promise.reject(error)
            })
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }
    }, [user, logOut, navigate])
    return axiosSecure;
};

export default useAxiosSecure;