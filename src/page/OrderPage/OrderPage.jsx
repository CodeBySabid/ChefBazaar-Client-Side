import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import UseAuth from '../../hook/UseAuth';
const OrderPage = () => {
    const { registerUser } = UseAuth()
    const navigate = useNavigate();
    const location = useLocation()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const handleRegistration = (data) => {
        registerUser(data.email, data.password)
            .then(() => {
                navigate(location.state || '/');
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='w-full pt-10 pb-2 bg-cover bg-center min-h-screen flex justify-center items-center px-1.5'>
            <div className='max-w-100  w-125 p-4 mt-10 bg-[#6062699d] rounded-3xl'>
                <h1 className='text-center text-4xl font-bold mb-2.5  w-full'>Order</h1>
                <form onSubmit={handleSubmit(handleRegistration)}>
                    <label className='label mt-2'>MealName</label>
                    <input
                        {...register("MealName", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Meal Name" />
                    {
                        errors.MealName?.type === "required" && <p className='text-red-500 text-sm mt-1'>MealName is required</p>
                    }

                    <label className='label mt-2'>Price</label>
                    <input
                        {...register("price", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Food email price" />
                    {
                        errors.price?.type === "required" && <p className='text-red-500 text-sm mt-1'>price is required</p>
                    }

                    <label className='label mt-2'>Quantity</label>
                    <input
                        {...register("Quantity", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your Quantity" />
                    {
                        errors.Quantity?.type === "required" && <p className='text-red-500 text-sm mt-1'>Quantity is required</p>
                    }

                    <label className='label mt-2'>ChefId</label>
                    <input
                        {...register("ChefId", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your ChefId" />
                    {
                        errors.ChefId?.type === "required" && <p className='text-red-500 text-sm mt-1'>Quantity is required</p>
                    }

                    <label className='label mt-2'>UserEmail</label>
                    <input
                        {...register("UserEmail", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your UserEmail" />
                    {
                        errors.UserEmail?.type === "required" && <p className='text-red-500 text-sm mt-1'>UserEmail is required</p>
                    }

                    <label className='label mt-2'>UserAddress</label>
                    <input
                        {...register("UserAddress", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your UserAddress" />
                    {
                        errors.UserAddress?.type === "required" && <p className='text-red-500 text-sm mt-1'>UserAddress is required</p>
                    }

                    <label className='label mt-2'>OrderStatus</label>
                    <input
                        {...register("OrderStatus", { required: true })}
                        type='text'
                        className="input bg-transparent outline-none w-full mt-1"
                        placeholder="Enter your OrderStatus" />
                    {
                        errors.OrderStatus?.type === "required" && <p className='text-red-500 text-sm mt-1'>OrderStatus is required</p>
                    }

                    <label className='label mt-2'>OrderTime</label>
                    <input
                        {...register("OrderTime", { required: true })}
                        type='text'
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