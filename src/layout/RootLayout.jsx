import React, { useState } from 'react';
import Navbar from '../page/shared/Navbar';
import { Outlet } from 'react-router';
import LoginModal from '../page/Auth/LoginModal';
import RegisterModal from '../page/Auth/RegisterModal';
import Footer from '../page/shared/Footer';

const RootLayout = () => {
    const [authModal, setAuthModal] = useState(null);
    return (
        <div className='overflow-x-hidden'>
            <Navbar
                openLogin={() => setAuthModal("login")}
                openRegister={() => setAuthModal("register")}
            />

            {/* Login Modal */}
            <LoginModal
                open={authModal === "login"}
                onClose={() => setAuthModal(null)}
                goRegister={() => setAuthModal("register")}
            />

            {/* Register Modal */}
            <RegisterModal
                open={authModal === "register"}
                onClose={() => setAuthModal(null)}
                goLogin={() => setAuthModal("login")}
            />
            <div>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;