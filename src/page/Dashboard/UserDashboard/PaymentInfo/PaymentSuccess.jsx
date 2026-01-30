import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../hook/useAxiosSecure';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState({});

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    })
                })
        }
    }, [sessionId, axiosSecure])
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-green-600">
                    Payment Successful ✅
                </h1>
                <p>Your TransactionId: {paymentInfo?.transactionId}</p>
                <p>Your TrackingId: {paymentInfo?.trackingId}</p>
                <Link to={'/dashboard/payment-history'} className="btn bg-green-500 mt-2.5">Payment History</Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;