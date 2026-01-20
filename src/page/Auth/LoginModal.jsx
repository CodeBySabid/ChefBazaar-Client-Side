import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../hook/UseAuth';
const LoginModal = ({ open, onClose, goRegister }) => {
    const [showPassword, setShowPassword] = useState(false);
    const { loginUser } = UseAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const location = useLocation()

    const handleLogin = (data) => {
        loginUser(data.email, data.password)
            .then(() => {
                navigate(location.state || '/')
                reset();
                onClose();
            })
            .catch(error => {
                console.log(error)
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

                    <button className="btn btn-neutral w-full mt-4">Login</button>

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