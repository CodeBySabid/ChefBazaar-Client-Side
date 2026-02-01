import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import UseAuth from '../../hook/UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hook/useAxiosSecure';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
const OrderPage = () => {
    const navigate = useNavigate();
    const { register, watch, setValue, reset, handleSubmit, formState: { errors } } = useForm()
    const axiosSecure = useAxiosSecure();
    const { user } = UseAuth();
    const { id } = useParams();

    const { data: users = {}, refetch } = useQuery({
        queryKey: ['users', user?.email],
        enabled: !!user?.email,
        queryFn: (async () => {
            const result = await axiosSecure.get(`/users/${user.email}`)
            return result.data
        })
    })

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleTimeString().split('T')[0];
    }

    const { data: foods = [] } = useQuery({
        queryKey: ['food'],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/food/${id}`);
            return res.data
        })
    })

    const quantity = watch("Quantity", 1);
    const basePrice = Number(foods?.price || 0);

    useEffect(() => {
        if (quantity && basePrice) {
            setValue("price", quantity * basePrice);
        }
    }, [quantity, basePrice, setValue]);

    useEffect(() => {
        if (foods && user) {
            reset({
                MealName: foods.foodName,
                quantity: 1,
                price: foods.price,
                ChefId: foods.chefId,
                UserEmail: user.email,
                OrderStatus: "Pending",
                OrderTime: formatDate(new Date()),
            })
        }
    }, [foods, user, reset])

    const handleOder = (data) => {
        Swal.fire({
            title: "Do you want to confirm the order?",
            text: `Your total price is ${foods.price * data.Quantity}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Do it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const orderData = {
                        foodId: id,
                        foodName: data.MealName,
                        chefName: foods.chefName,
                        price: foods.price,
                        quantity: data.Quantity,
                        totalPrice: foods.price * data.Quantity,
                        chefId: foods.chefId,
                        foodImage: foods.foodImage,
                        paymentStatus: "Pending",
                        userEmail: data.UserEmail,
                        chefEmail: foods.userEmail,
                        userAddress: data.UserAddress,
                        orderStatus: "Pending",
                        orderTime: new Date(),
                    }
                    axiosSecure.post('/order', orderData)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "successfully!",
                                    text: "Order placed successfully!",
                                    icon: "success"
                                });
                                refetch();
                                reset();
                                navigate('/dashboard/my-order')
                            }
                        })
                }
            });
    }

    if (users.status === 'Fraud') {
        return navigate('/fraud')
    }

    return (
        <div className='w-full pt-10 pb-2 bg-base-1 bg-center min-h-screen flex justify-center items-center px-1.5'>
            <div className='max-w-100  w-125 p-4 mt-10 bg-base-300 rounded-3xl'>
                <h1 className='text-center text-4xl font-bold mb-2.5  w-full'>Order</h1>
                <form onSubmit={handleSubmit(handleOder)}>
                    <label className='label mt-2'>MealName</label>
                    <input
                        {...register("MealName", { required: true })}
                        type='text'
                        readOnly
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Meal Name"
                    />
                    {
                        errors.MealName?.type === "required" && <p className='text-red-500 text-sm mt-1'>MealName is required</p>
                    }

                    <label className='label mt-2'>Price</label>
                    <input
                        {...register("price", { required: true })}
                        type='text'
                        readOnly
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Food email price"
                    />
                    {
                        errors.price?.type === "required" && <p className='text-red-500 text-sm mt-1'>price is required</p>
                    }

                    <label className='label mt-2'>Quantity</label>
                    <input
                        {...register("Quantity", { required: true, valueAsNumber: true })}
                        type='number'
                        min={1}
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your Quantity" />
                    {
                        errors.Quantity?.type === "required" && <p className='text-red-500 text-sm mt-1'>Quantity is required</p>
                    }

                    <label className='label mt-2'>ChefId</label>
                    <input
                        {...register("ChefId", { required: true })}
                        type='text'
                        readOnly
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your ChefId"
                    />
                    {
                        errors.ChefId?.type === "required" && <p className='text-red-500 text-sm mt-1'>Quantity is required</p>
                    }

                    <label className='label mt-2'>UserEmail</label>
                    <input
                        {...register("UserEmail", { required: true })}
                        type='text'
                        readOnly
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your UserEmail"
                    />
                    {
                        errors.UserEmail?.type === "required" && <p className='text-red-500 text-sm mt-1'>UserEmail is required</p>
                    }

                    <label className='label mt-2'>UserAddress</label>
                    <input
                        {...register("UserAddress", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your UserAddress"
                    />
                    {
                        errors.UserAddress?.type === "required" && <p className='text-red-500 text-sm mt-1'>UserAddress is required</p>
                    }

                    <label className='label mt-2'>OrderStatus</label>
                    <input
                        {...register("OrderStatus", { required: true })}
                        type='text'
                        readOnly
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your OrderStatus"
                    />
                    {
                        errors.OrderStatus?.type === "required" && <p className='text-red-500 text-sm mt-1'>OrderStatus is required</p>
                    }

                    <label className='label mt-2'>OrderTime</label>
                    <input
                        {...register("OrderTime", { required: true })}
                        type='text'
                        readOnly
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your OrderTime" />
                    {
                        errors.OrderTime?.type === "required" && <p className='text-red-500 text-sm mt-1'>OrderTime is required</p>
                    }

                    <button className="btn btn-neutral w-full mt-4">Confirm Order </button>
                </form>
            </div>
        </div>
    );
};

export default OrderPage;