import React, { useState } from 'react';
import Navbar from '../page/shared/Navbar';
import { Outlet } from 'react-router';
import LoginModal from '../page/Auth/LoginModal';
import RegisterModal from '../page/Auth/RegisterModal';

const RootLayout = () => {
    const [authModal, setAuthModal] = useState(null);
    return (
        <div>
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
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;