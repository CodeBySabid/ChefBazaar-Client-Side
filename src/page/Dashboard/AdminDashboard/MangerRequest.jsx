import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../loading/Loading';

const MangerRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { data: requests = [], isLoading, refetch } = useQuery({
        queryKey: ['request'],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/request`)
            return res.data
        })
    })


  if(isLoading) {
    return <Loading></Loading>
  }
    const handleRequest = (id, name, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure you will ${status} the ${name} request?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        })
            .then(result => {
                if (result.isConfirmed) {
                    const makeFraud = { status }
                    axiosSecure.patch(`/request/${id}`, makeFraud)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                refetch()
                                Swal.fire({
                                    title: "Success!",
                                    text: `${name} request ${status} successfully`,
                                    icon: "success"
                                });
                            }
                        })
                }
            })
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Request Type</th>
                            <th>Request Status</th>
                            <th>Request Time</th>
                            <th>Request</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            requests.map((request, index) =>
                                <tr key={request._id}>
                                    <th>{index + 1}</th>
                                    <th>{request.name}</th>
                                    <th>{request.email}</th>
                                    <th>{request.requestInfo}</th>
                                    <th>{request.requestStatus}</th>
                                    <th>{new Date(request.requestCreatedAt).toLocaleString()}</th>
                                    <th>
                                        {
                                            request.requestStatus === "Pending" ?
                                                <div className='flex gap-0.5'>
                                                    <button onClick={() => handleRequest(request._id, request.name, "Accept")} className='bg-green-500 h-8 w-20 btn'>Accept</button>
                                                    <button onClick={() => handleRequest(request._id, request.name, "Reject")} className='bg-red-500 h-8 w-20 btn'>Reject</button>
                                                </div>
                                                :
                                                request.requestStatus === 'Rejected' ?
                                                    <button className='bg-red-500/50 h-7 w-20 rounded-sm cursor-not-allowed text-black/80'>Reject</button>
                                                    :
                                                    <button className='bg-green-500/50 h-7 w-20 rounded-sm cursor-not-allowed text-black/80'>Accept</button>
                                        }
                                    </th>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MangerRequest;