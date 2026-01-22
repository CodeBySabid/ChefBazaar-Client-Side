import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import bgimage from '../../assets/images.avif'
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../../hook/UseAuth';
import useAxiosSecure from '../../hook/useAxiosSecure';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
    const { registerUser, updateUserProfile, socialLogin } = UseAuth()
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation()
    const { register, handleSubmit, formState: { errors }, watch } = useForm()
    const axiosSecure = useAxiosSecure()

    const password = watch("password")

    const handleRegistration = (data) => {
        const profileImg = data.profileimage[0];
        registerUser(data.email, data.password)
            .then(() => {
                const formData = new FormData();
                formData.append('image', profileImg);
                const image_Api_Url_Key = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
                axios.post(image_Api_Url_Key, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: photoURL,
                            address: data.address,
                            role: 'User',
                            status: 'Active',
                            createdAt: Date()
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('after the uploade image')
                                }
                            })
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL,
                        }
                        updateUserProfile(userProfile)
                            .then()
                            .catch(error => {
                                console.log(error);
                            })
                    })
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handelSoialLogin = async () => {
        try {
            const result = await socialLogin();
            const user = result.user;
            const userInfo = {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: 'User',
                status: 'Inactive',
            };
            await axios.post('http://localhost:3000/users', userInfo);
            navigate(location.state || '/');
        }
        catch (error) {
            toast.error(error.message);
        };
    };
    return (
        <div style={{ backgroundImage: `url(${bgimage})` }} className='w-full pt-10 pb-2 bg-cover bg-center min-h-screen flex justify-center items-center px-1.5'>
            <div className='max-w-100 p-4 mt-10 bg-[#6062699d] rounded-3xl'>
                <h3 className="font-bold text-3xl text-center">Welcome Back</h3>
                <h3 className="font-bold text-sm text-center">Login with ChefBazaar</h3>
                <hr className='border-[#838080] my-4 w-[90%] mx-auto' />
                <h1 className='text-center text-4xl font-bold mb-2.5'>Registration</h1>

                <form onSubmit={handleSubmit(handleRegistration)}>
                    {/* Name field */}
                    <label className='label mt-2'>Name</label>
                    <input
                        {...register("name", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your Name" />
                    {
                        errors.name?.type === "required" && <p className='text-red-500 text-sm mt-1'>Email is required</p>
                    }

                    {/* Email field */}
                    <label className='label mt-2'>Email</label>
                    <input
                        {...register("email", { required: true })}
                        type='email'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your Email" />
                    {
                        errors.email?.type === "required" && <p className='text-red-500 text-sm mt-1'>Email is required</p>
                    }

                    {/* Profile Image field */}
                    <label className='label mt-2'>Profile Image</label>
                    <input
                        {...register("profileimage", { required: true })}
                        type='file'
                        className="file-input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your Profile Image" />
                    {
                        errors.profileimage?.type === "required" && <p className='text-red-500 text-sm mt-1'>Profile Image is required</p>
                    }

                    {/* Address field */}
                    <label className='label mt-2'>Address</label>
                    <input
                        {...register("address", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your Address" />
                    {
                        errors.address?.type === "required" && <p className='text-red-500 text-sm mt-1'>Address is required</p>
                    }

                    {/* password field */}
                    <div className='mt-2 relative'>
                        <label className='label'>Password</label>
                        <input
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
                            })}
                            type={`${showPassword ? "text" : "password"}`}
                            className="input w-full bg-transparent outline-none mt-1 pr-12"
                            placeholder="Password" />
                        {
                            errors.password?.type === "required" && <p className='text-red-500 text-sm mt-1'>Password is required</p>
                        }
                        {
                            errors.password?.type === "minLength" && <p className='text-red-500 text-sm mt-1'>Password must be 6 characters or longer</p>
                        }
                        {
                            errors.password?.type === "pattern" && <p className='text-red-500 text-sm mt-1'>Password must have at least one uppercase, at least one lowercase, at least one number and at least one special characters</p>
                        }
                        <span onClick={() => setShowPassword(!showPassword)} className='absolute right-4 top-9.5'>
                            {
                                showPassword ? <FaEyeSlash size={20}></FaEyeSlash> : <FaEye size={20}></FaEye>
                            }
                        </span>
                    </div>

                    {/* Confirm Password field */}
                    <div className='mt-2 relative'>
                        <label className='label'>Confirm Password</label>
                        <input
                            {...register("confirmpassword", {
                                required: "Confirm Password is required",
                                validate: (value) => value === password || "Password and Confirm Password do not match"
                            })}
                            type={`${showConfirmPassword ? "text" : "password"}`}
                            className="input w-full bg-transparent outline-none mt-1 pr-12"
                            placeholder="Confirm Password" />
                        {
                            errors.confirmpassword && <p className='text-red-500 text-sm mt-1'>{errors.confirmpassword.message}</p>
                        }
                        <span onClick={() => setConfirmPassword(!showConfirmPassword)} className='absolute right-4 top-9.5'>
                            {
                                showConfirmPassword ? <FaEyeSlash size={20}></FaEyeSlash> : <FaEye size={20}></FaEye>
                            }
                        </span>
                    </div>

                    <button className="btn btn-neutral w-full mt-4">Register</button>
                </form>
                <p>
                    Already have an account? <Link className='text-red-600 hover:text-blue-600 hover:font-semibold' to={'/login'}>Login</Link>
                </p>
                <button onClick={() => handelSoialLogin()} className="btn bg-white text-black w-full mt-3 border-[#e5e5e5]">
                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                    Login with Google
                </button>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;