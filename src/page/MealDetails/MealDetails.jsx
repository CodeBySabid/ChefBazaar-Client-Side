import React from 'react';
import image from '../../assets/images.avif'


const MealDetails = () => {

    return (
        <div className='flex justify-center w-screen pt-16 max-sm:pt-12 '>
            <div className='rounded max-w-384 bg-base-300 flex flex-col md:flex-row gap-6 p-2.5 w-full'>
                <div className='w-full rounded flex-1'>
                    <img className='rounded mx-auto w-full max-w-125 h-full max-h-100' src={image} alt="" />
                </div>
                <div className='flex-2'>
                    <div class="max-w-xl mx-auto ">
                        <h1 className='font-bold sm:text-3xl text-2xl text-center pb-2.5'>this is the best food in the city</h1>
                        <h2 class="text-xl font-semibold text-center mb-3">About Food</h2>

                        <div class="grid grid-cols-[150px_20px_1fr] gap-y-2 font-semibold">
                            <div>Rating</div>
                            <div class="text-center">:</div>
                            <div>{ }</div>

                            <div>Ingredients</div>
                            <div class="text-center">:</div>
                            <div>{ }</div>
                        </div>

                        <h2 class="text-xl font-semibold text-center mt-8 mb-3">About Chef</h2>

                        <div class="grid grid-cols-[150px_20px_1fr] gap-y-2">
                            <div>Cooked by</div>
                            <div class="text-center">:</div>
                            <div>{}</div>

                            <div>Chef Id</div>
                            <div class="text-center">:</div>
                            <div>{}</div>

                            <div>Chef's Experience</div>
                            <div class="text-center">:</div>
                            <div>{}</div>

                            <div>Price</div>
                            <div class="text-center">:</div>
                            <div>${}</div>

                            <div>Delivery Area</div>
                            <div class="text-center">:</div>
                            <div>{}</div>

                            <div>Delivery Time</div>
                            <div class="text-center">:</div>
                            <div>{}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button></button>
                <button></button>
            </div>
            <div>

            </div>
        </div>
    );
};

export default MealDetails;