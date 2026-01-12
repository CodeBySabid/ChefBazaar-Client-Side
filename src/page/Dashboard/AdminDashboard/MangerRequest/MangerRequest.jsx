import React from 'react';

const MangerRequest = () => {
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
                        <tr>
                            <th>1</th>
                            <th>Name</th>
                            <th>Eamil</th>
                            <th>chef/admin</th>
                            <th>pending / approved / rejected</th>
                            <th>time</th>
                            <th>
                                <button className='bg-green-500 h-8 w-20 btn'>Accept</button>
                                <button className='bg-red-500 h-8 w-20 btn'>Button</button>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MangerRequest;