import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import bgimage from '../../assets/images.avif'
import UseAuth from '../../hook/UseAuth';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const { loginUser, user } = UseAuth()
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const naviget = useNavigate();
    const location = useLocation();
    const handleLogin = (data) => {
        loginUser(data.email, data.password)
            .then(() => {
                naviget(location?.state?.from?.pathname || '/')
            })
            .catch(error => {
                if (error.code === "auth/user-not-found") {
                    toast.error('Email is incorrect!');
                }
                else if (error.code === "auth/wrong-password") {
                    toast.error("Password is incorrect!");
                }
                else if (error.code === "auth/invalid-email") {
                    toast.error("Email format is invalid!");
                }
                else if (error.code === "auth/invalid-credential") {
                    toast.error("Please check your password and email!");
                }
                else {
                    toast.error(error.message);
                }
            })
    }
    useEffect(() => {
        if (user) {
            naviget(location?.state?.from?.pathname || '/');
        }
    }, [user, naviget, location.state]);
    return (
        <div style={{ backgroundImage: `url(${bgimage})` }} className="w-full min-h-[70vh] relative flex justify-center items-center">
            <img className='w-full h-screen absolute -z-10' src={bgimage} alt="" />
            <div className="bg-[#373b41c9] text-white max-w-100 p-2.5 sm:p-6 rounded-3xl ">
                <h3 className="font-bold text-3xl text-center">Welcome Back</h3>
                <h3 className="font-bold text-sm text-center">Login with ChefBazaar</h3>
                <hr className='border-[#838080] my-4 w-[90%] mx-auto' />
                <h1 className='text-center text-4xl font-bold mb-2.5'>Login</h1>

                <form onSubmit={handleSubmit(handleLogin)}>
                    {/* Email field */}
                    <label className='label text-white'>Email</label>
                    <input
                        {...register("email", { required: true })}
                        className="input bg-transparent outline-none w-full mt-2"
                        placeholder="Enter your Email" />
                    {
                        errors.email?.type === "required" && <p className='text-red-500 text-sm mt-1'>Email is required</p>
                    }

                    {/* password field */}
                    <div className='mt-2 relative'>
                        <label className='label text-white'>Password</label>
                        <input
                            {...register("password", { required: true })}
                            type={`${showPassword ? "text" : "password"}`}
                            className="input w-full bg-transparent outline-none mt-1 pr-12"
                            placeholder="Password" />
                        {
                            errors.password?.type === "required" && <p className='text-red-500 text-sm mt-1'>Password is required</p>
                        }
                        <span onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-9.5'>
                            {
                                showPassword ? <FaEyeSlash size={20}></FaEyeSlash> : <FaEye size={20}></FaEye>
                            }
                        </span>
                    </div>

                    <Link className='text-sm relative top-1'>Forgot Password?</Link>

                    <button className="btn btn-neutral w-full mt-4">Login</button>
                </form>
                <p>
                    Don’t have an account? <Link to={'/register'} className='text-red-400 hover:font-semibold hover:text-blue-400'>Sign Up</Link>
                </p>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;