import React from 'react';

const ManagerUser = () => {
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
                        <tr>
                            <th>1</th>
                            <td>Name</td>
                            <td>Eamil</td>
                            <td>Role</td>
                            <td>statue</td>
                            <td><button className='btn bg-red-500'>Make Fraud</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerUser;