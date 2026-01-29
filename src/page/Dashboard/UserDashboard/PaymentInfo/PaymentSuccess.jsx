import React from 'react';
import { Link } from 'react-router';

const PaymentSuccess = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-green-600">
                    Payment Successful ✅
                </h1>
                <p>Your TransactionId: </p>
                <p>Your TrackingId: </p>
                <Link to={'/dashboard/payment-history'} className="btn bg-green-500 mt-2.5">Payment History</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;