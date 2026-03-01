import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../hook/UseAuth';
import { toast, ToastContainer } from 'react-toastify';
const LoginModal = ({ open, onClose, goRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { loginUser } = UseAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = (data) => {
        setLoading(true);
        loginUser(data.email, data.password)
            .then(() => {
                navigate(location?.state?.from?.pathname || '/')
                reset();
                toast.success('Login successfully!')
                onClose();
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
            .finally(() => {
                setLoading(false);
            })
    }

    const handleClose = () => {
        reset();
        onClose();
    }

    if (!open) return null;
    return (
        <dialog className="modal modal-open">
            <div className="modal-box max-w-100">
                <button
                    onClick={handleClose}
                    className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                    ✕
                </button>

                <h3 className="font-bold text-3xl text-center">Welcome Back</h3>
                <h3 className="font-bold text-sm text-center">Login with ChefBazaar</h3>
                <hr className='border-[#838080] my-4 w-[90%] mx-auto' />
                <h1 className='text-center text-4xl font-bold mb-2.5'>Login</h1>

                <form onSubmit={handleSubmit(handleLogin)}>
                    {/* Email field */}
                    <label className='label'>Email</label>
                    <input
                        {...register("email", { required: true })}
                        className="input outline-none w-full mt-2"
                        placeholder="Enter your Email" />
                    {
                        errors.email?.type === "required" && <p className='text-red-500 text-sm mt-1'>Email is required</p>
                    }

                    {/* password field */}
                    <div className='mt-2 relative'>
                        <label className='label'>Password</label>
                        <input
                            {...register("password", { required: true })}
                            type={`${showPassword ? "text" : "password"}`}
                            className="input w-full outline-none mt-1 pr-12"
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
                    <button
                        className="btn bg-black btn-neutral w-full mt-4"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm text-blue-600"></span>
                                Logging in...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
                <p className="text-sm mt-3 text-center">
                    Don’t have an account?{" "}
                    <span
                        className="text-blue-500 cursor-pointer"
                        onClick={goRegister}
                    >
                        Sign Up
                    </span>
                </p>
            </div>
        </dialog>
    );
};

export default LoginModal;