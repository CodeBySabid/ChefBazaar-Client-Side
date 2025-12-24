import React from 'react';
import Navbar from '../page/shared/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='pt-16 max-sm:pt-13.25'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default RootLayout;