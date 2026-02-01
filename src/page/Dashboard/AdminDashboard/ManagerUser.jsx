import React from 'react';
import useAxiosSecure from '../../../hook/useAxiosSecure';
import useRole from '../../../hook/useRole';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../loading/Loading';

const ManagerUser = () => {
    const axiosSecure = useAxiosSecure();
    const { role, loading } = useRole();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: (async () => {
            const res = await axiosSecure.get(`/manager/${role}`);
            return res.data
        })
    })


  if(loading || isLoading) {
    return <Loading></Loading>
  }

    const handleFraud = (data, status) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to ${data.name} fraud?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        })
            .then(result => {
                if (result.isConfirmed) {
                    const makeFraud = { status }
                    axiosSecure.patch(`/makefraud/${data._id}`, makeFraud)
                        .then(res => {
                            if (res.data.modifiedCount) {
                                Swal.fire({
                                    title: "Success!",
                                    text: `${data.name} has been fraud successfully.`,
                                    icon: "success"
                                });
                                refetch();
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
                            <th>User Role</th>
                            <th>User Status</th>
                            <th>Fraud</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        {
                                            user.role === "Admin" ?
                                                ''
                                                :
                                                user.status === 'Fraud' ?
                                                    <button className='w-27.25 font-bold rounded-sm text-sm h-7 cursor-not-allowed bg-red-500/50 text-black/80 border-none'>Make Fraud</button>
                                                    :
                                                    <button onClick={() => handleFraud(user, 'Fraud')} className='btn h-7 bg-red-500'>Make Fraud</button>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerUser;