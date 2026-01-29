import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <div>
                <div className="flex justify-center items-center min-h-screen">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-red-400">
                            Payment is cancelled. Please try again
                        </h1>
                        <Link to={'/dashboard/my-order'} className="btn bg-green-500 mt-2.5">Try Again</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancelled;