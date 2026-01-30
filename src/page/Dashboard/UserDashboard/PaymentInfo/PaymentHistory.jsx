import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hook/useAxiosSecure';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`);
            return res.data;
        }
    })
    // const handleDelete = id => {
    //     console.log(id)
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, delete it!"
    //     })
    //         .then((result) => {
    //             if (result.isConfirmed) {
    //                 console.log(id);
    //                 axiosSecure.delete(`/payments/${id}`)
    //                     .then(res => {
    //                         if (res.data.deletedCount) {
    //                             refetch();
    //                             Swal.fire({
    //                                 title: "Deleted!",
    //                                 text: "Your parcel request has been deleted.",
    //                                 icon: "success"
    //                             });
    //                         }
    //                     })
    //             }
    //         })

    // }
    return (
        <div>
            <h1 className='text-2xl md:text-4xl text-center mb-10 mt-3.5'>Payment History: {payments.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Recipient No</th>
                            <th>User Name</th>
                            <th>Food Name</th>
                            <th>Tracking Id</th>
                            <th>Total Amount</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) =>
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.foodName}</td>
                                    <td>{payment.customElement}</td>
                                    <td>{payment?.transactionId}</td>
                                    <td>$ {payment.amount} ({payment.paymentStatus})</td>
                                    <td>
                                        <p>{new Date(payment.paidAt).toLocaleString().split('T')[0]}</p>
                                        {/* <button className='btn bg-[#94C6CB]'>View</button> */}
                                        {/* <button onClick={() => handleDelete(payment._id)} className='btn bg-[#E83330]'>Delete</button> */}
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;