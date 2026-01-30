import React, { useEffect } from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';

const UpDateMeal = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, reset, handleSubmit, formState: { errors }, } = useForm();

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ['meals', id],
        enabled: !!id,
        queryFn: (async () => {
            const res = await axiosSecure.get(`/meal/${id}`)
            return res.data
        })
    })

    useEffect(() => {
        if (!meals?._id) return;
        reset({
            foodName: meals.foodName || '',
            chef: meals.chefName || '',
            foodPrice: meals.price || '',
            ingredients: Array.isArray(meals.ingredients)
                ? meals.ingredients.join(', ')
                : typeof meals.ingredients === 'string'
                    ? meals.ingredients.split(',').map(i => i.trim()).join(', ')
                    : '',
            chefId: meals.chefId || '',
            deliveryTime: meals.estimatedDeliveryTime || '',
            chefExperience: meals.chefExperience || '',
            chefEmail: meals.userEmail || '',
            rating: meals.rating || 0,
        });

    }, [meals?._id, reset]);

    const handleUpDate = async (data) => {
        let photoURL = meals.foodImage;

        if (data.foodImage && data.foodImage.length > 0) {
            const formData = new FormData();
            formData.append('image', data.foodImage[0]);

            const imgRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
                formData
            );

            photoURL = imgRes.data.data.url;
        }
        const mealInfo = {
            foodName: data.foodName,
            chef: data.chef,
            rating: data.rating,
            foodImage: photoURL,
            foodPrice: data.foodPrice,
            ingredients: data.ingredients.split(',').map(i => i.trim()),
            deliveryTime: data.deliveryTime,
            chefExperience: data.chefExperience,
        };
        await axiosSecure.patch(`/meal/${id}`, mealInfo)
        .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    icon: "success",
                    title: "Meal updated successfully",
                    timer: 1500,
                    showConfirmButton: false
                });
            }
            reset();
            navigate('/dashboard/chef-meals')
            refetch()
        })
    };

    if (isLoading) {
        return <p className="text-center mt-10">Loading meals...</p>;
    }

    return (
        <div className='w-full pt-10 pb-2 bg-cover bg-center min-h-screen flex justify-center items-center px-1.5'>
            <div className='max-w-100 p-4 bg-[#6062699d] rounded-3xl'>
                <h1 className='text-4xl text-center font-semibold border-b pb-2'>Update</h1>
                <form onSubmit={handleSubmit(handleUpDate)}>
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
                        type='file'
                        className="file-input bg-transparent outline-none w-full mt-1"
                        placeholder="Food Image" 
                        {...register("foodImage")} />

                    {meals?.foodImage && (
                        <img src={meals.foodImage} alt="food" className="w-32 mt-2" />
                    )}

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
                        {...register("rating", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Rating"
                        readOnly
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



                    <button  className="btn btn-neutral w-full mt-4">Register</button>
                </form>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default UpDateMeal;