import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../hook/UseAuth';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import '../../ButtonStyle/loginbutton.css'
import image from '../../../assets/images.avif'
import Swal from 'sweetalert2';

const ChefRequests = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const handleChef = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Would you like to send a request to become a chef?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    const chefInfo = {
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        requestStatus: 'pending',
                        createdAt: new Date(),
                    }
                    axiosSecure.post('/chef', chefInfo)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                                reset()
                            }
                        })
                }
            })
    }
    return (
        <div style={{ backgroundImage: `url(${image})` }} className="w-full min-h-[70vh] relative flex justify-center items-center">
            <img className='w-full h-screen absolute -z-10' src={image} alt="" />
            <div className="bg-[#373b41c9] text-white max-w-100 p-2.5 sm:p-6 rounded-3xl ">
                <h1 className='text-center text-4xl font-bold mb-2.5'>Be a Chef</h1>

                <form onSubmit={handleSubmit(handleChef)}>
                    {/* Email field */}
                    <label className='label text-white'>Name</label>
                    <input
                        {...register("name", { required: true })}
                        className="input bg-transparent outline-none w-full mt-2"
                        placeholder="Enter your Name" defaultValue={user.displayName} />
                    {
                        errors.name?.type === "required" && <p className='text-red-500 text-sm mt-1'>Name is required</p>
                    }
                    <label className='label text-white'>Email</label>
                    <input
                        {...register("email", { required: true })}
                        className="input bg-transparent outline-none w-full mt-2"
                        placeholder="Enter your Email" defaultValue={user.email} />
                    {
                        errors.email?.type === "required" && <p className='text-red-500 text-sm mt-1'>Email is required</p>
                    }

                    <label>Request Type</label>
                    <input
                        {...register("role", { required: true })}
                        className="input bg-transparent outline-none w-full mt-2"
                        placeholder="Chef"/>
                    {
                        errors.role?.type === "required" && <p className='text-red-500 text-sm mt-1'>Chef is required</p>
                    }
                    {
                        errors.requestType?.type === 'required' && <p className='text-red-500 text-sm mt-1'>Request Type is required</p>
                    }

                    <button className="btn btn-neutral w-full mt-4">Be b Chef</button>
                </form>
            </div>
        </div>
    );
};

export default ChefRequests;