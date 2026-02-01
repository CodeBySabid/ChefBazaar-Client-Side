import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import UseAuth from '../../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const CreateMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const { data: chefInfo = [], refetch } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: (async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        })
    })

    const { data: users = {} } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: (async () => {
            const result = await axiosSecure.get(`/users/${user.email}`)
            return result.data
        })
    })

    useEffect(() => {
        if (chefInfo) {
            reset({
                chefId: chefInfo?.chefId,
                chefEmail: chefInfo.email,
                rating: 0,
            })
        }
    }, [chefInfo, reset])

    const handleMeal = (data) => {
        const foodImage = data.foodImage[0];
        const formData = new FormData();
        formData.append('image', foodImage);
        const image_Api_Url_Key = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
        axios.post(image_Api_Url_Key, formData)
            .then(res => {
                const photoURL = res.data.data.url;
                const userInfo = {
                    foodName: data.foodName,
                    chefName: chefInfo.name,
                    foodImage: photoURL,
                    price: parseFloat(data.foodPrice),
                    rating: parseFloat(data.rating),
                    ingredients: data.ingredients.split(',').map(i => i.trim()),
                    estimatedDeliveryTime: data.deliveryTime,
                    chefExperience: data.chefExperience,
                    chefId: data.chefId,
                    userEmail: data.chefEmail,
                }
                axiosSecure.post(`/meals/${chefInfo?.email}`, userInfo)
                    .then((res) => {
                        if (res.data.insertedId) {
                            reset();
                            Swal.fire({
                                icon: "success",
                                title: "Your meal create successfully",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            navigate('/dashboard/chef-meals'),
                                refetch()
                        }
                    })
            })
    }

    return (
        <div className='w-full pt-10 pb-2 bg-cover bg-center min-h-screen flex justify-center items-center px-1.5'>
            <div className='max-w-100 p-4 bg-[#6062699d] rounded-3xl'>
                {
                    users.status === "Fraud" ? <p className='text-center text-2xl py-1.5 text-red-500 mx-auto border-b pb-1'>You can't create any meal</p> : <h1 className='text-4xl text-center font-semibold border-b pb-1'>Create A Meal</h1>
                }
                <form onSubmit={handleSubmit(handleMeal)}>
                    {/* Food Name field */}
                    <label className='label mt-2'>Food Name</label>
                    <input
                        {...register("foodName", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your food name" />
                    {
                        errors.foodName?.type === "required" && <p className='text-red-500 text-sm mt-1'>Food name is required</p>
                    }

                    {/* Chef Name field */}
                    <label className='label mt-2'>Chef Name</label>
                    <input
                        {...register("chef", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Chef Name" />
                    {
                        errors.chef?.type === "required" && <p className='text-red-500 text-sm mt-1'>Chef name is required</p>
                    }

                    {/* Food Image field */}
                    <label className='label mt-2'>Food Image</label>
                    <input
                        {...register("foodImage", { required: true })}
                        type='file'
                        className="file-input bg-transparent outline-none w-full mt-1"
                        placeholder="Food Image" />
                    {
                        errors.foodImage?.type === "required" && <p className='text-red-500 text-sm mt-1'>Food Image is required</p>
                    }

                    {/* Food Price field */}
                    <label className='label mt-2'>Food Price</label>
                    <input
                        {...register("foodPrice", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your food price" />
                    {
                        errors.foodPrice?.type === "required" && <p className='text-red-500 text-sm mt-1'>Food Price is required</p>
                    }

                    {/* Rating field */}
                    <label className='label mt-2'>Rating</label>
                    <input
                        type="number"
                        min={0}
                        max={5}
                        step="0.1"
                        className="input bg-transparent outline-none w-full mt-1"
                        {...register("rating", {
                            required: true,
                            onChange: (e) => {
                                let value = Number(e.target.value);
                                if (value === 0) e.target.value = 0;
                                if (value < 0) e.target.value = 0;
                                if (value > 5) e.target.value = 5;
                            },
                        })}
                    />
                    {
                        errors.rating?.type === "required" && <p className='text-red-500 text-sm mt-1'>Rating is required</p>
                    }

                    {/* Ingredients field */}
                    <label className='label mt-2'>Ingredients</label>
                    <input
                        {...register("ingredients", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Ingredients" />
                    {
                        errors.ingredients?.type === "required" && <p className='text-red-500 text-sm mt-1'>Ingredients is required</p>
                    }

                    {/* Estimated Delivery Time field */}
                    <label className='label mt-2'>Estimated Delivery Time</label>
                    <input
                        {...register("deliveryTime", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Estimated Delivery Time" />
                    {
                        errors.deliveryTime?.type === "required" && <p className='text-red-500 text-sm mt-1'>Estimated Delivery Time is required</p>
                    }

                    {/* chefExperience field */}
                    <label className='label mt-2'>Chef Experience</label>
                    <input
                        {...register("chefExperience", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Chef Experience" />
                    {
                        errors.chefExperience?.type === "required" && <p className='text-red-500 text-sm mt-1'>Chef Experience is required</p>
                    }

                    {/* chef Id field */}
                    <label className='label mt-2'>Chef Id</label>
                    <input
                        {...register("chefId", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Chef Experience"
                        readOnly
                    />
                    {
                        errors.chefId?.type === "required" && <p className='text-red-500 text-sm mt-1'>Chef Id is required</p>
                    }

                    {/* chef Email field */}
                    <label className='label mt-2'>Chef Email</label>
                    <input
                        {...register("chefEmail", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Chef Experience"
                        readOnly
                    />
                    {
                        errors.chefEmail?.type === "required" && <p className='text-red-500 text-sm mt-1'>Chef Email is required</p>
                    }


                    {
                        users.status === "Fraud" ? <p className='mt-4 text-center py-1.5 text-red-500 mx-auto rounded bg-base-300'>You can't create any meal</p> : <button className="btn btn-neutral w-full mt-4">Create Meals </button>
                    }
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default CreateMeals;