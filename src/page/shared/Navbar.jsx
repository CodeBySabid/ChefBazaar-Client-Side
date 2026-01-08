import React, { useEffect, useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { IoMenuOutline, IoMoonSharp, IoSunny } from 'react-icons/io5';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/chef-logo-restaurant-food-vector-600w-1739601476.webp'
import '../ButtonStyle/loginbutton.css'
import UseAuth from '../../hook/UseAuth';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = ({ openLogin, openRegister }) => {
    const { user, logOut } = UseAuth();
    const [hideNav, setHideNav] = useState(false);
    const lastScroll = useRef(0);
    const [open, setOpen] = useState(false);
    const dropDown = useRef(null);
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScroll.current) {
                setHideNav(true);
            }
            else {
                setHideNav(false);
            }
            lastScroll.current = window.scrollY;
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutsite = (e) => {
            if (open && dropDown.current && !dropDown.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutsite);
        return () => document.removeEventListener("mousedown", handleClickOutsite);
    }, [open]);

    useEffect(() => {
        const handleScrollOutsite = () => {
            if (open) {
                setOpen(false);
            }
        }
        window.addEventListener("scroll", handleScrollOutsite);
        return () => window.removeEventListener("scroll", handleScrollOutsite);
    }, [open]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpen(false)
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
    }

    useEffect(() => {
        document.documentElement.setAttribute("dark-theme", theme);
    }, [theme])

    const links = <>
        <NavLink to={'/g'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "rounded-4xl text-blue-700 font-semibold" : "hover:text-blue-500"}>Home</NavLink>
        {/* <NavLink to={'/'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "rounded-4xl text-blue-700 font-semibold" : "hover:text-blue-500"}>Home</NavLink> */}
        <NavLink to={'/admin_dashboard'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "rounded-4xl text-blue-700 font-semibold" : "hover:text-blue-500"}>admin Dashboard</NavLink>
        <NavLink to={'/chef_dashboard'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "rounded-4xl text-blue-700 font-semibold" : "hover:text-blue-500"}>chef Dashboard</NavLink>
        <NavLink to={'/user_dashboard'} onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "rounded-4xl text-blue-700 font-semibold" : "hover:text-blue-500"}>user Dashboard</NavLink>
    </>

    const userProfile = <>
        <Link>
            <img className="rounded-full w-10 h-10 object-cover cursor-pointer" src={user?.photoURL || <FaUserCircle></FaUserCircle>} alt="" />
        </Link>
    </>

    const loginAndRegister = <>
        <button onClick={() => openLogin()} className="btn-17">
            <span className="text-container">
                <span className="text">log in</span>
            </span>
        </button>
        <button onClick={() => openRegister()} className="btn-17">
            <span className="text-container">
                <span className="text">sing up</span>
            </span>
        </button>
    </>
    console.log(user)

    const logout = <>
        <button onClick={() => logOut()} className="btn-17">
            <span className="text-container">
                <span className="text">Log out</span>
            </span>
        </button>
    </>

    return (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-50 transition-transform duration-300 ${hideNav ? "-translate-y-full" : "translate-y-0"} bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/10 shadow-lg `}>
            <div className='flex justify-between px-4 py-2 items-center'>
                <Link className='flex items-center gap-2.5'>
                    <img className='max-sm:h-9 h-12 rounded-full' src={logo} alt="" />
                    <h1 className='text-3xl max-sm:text-xl font-bold'>ChefBazaar</h1>
                </Link>
                <div className='hidden lg:flex gap-2.5'>
                    {
                        links
                    }
                </div>
                <button onClick={toggleTheme} className={`lg:text-3xl max-lg:text-xl mr-2.5 absolute ${user ? 'right-12 lg:right-48' : 'right-12 lg:right-62'} cursor-pointer`}>
                    {
                        theme === "dark" ? <IoSunny ></IoSunny> : <IoMoonSharp></IoMoonSharp>
                    }
                </button>
                {
                    user ? <div className='lg:flex gap-3 hidden'>
                        {userProfile}
                        <div className='hidden lg:flex'>{logout}</div>
                    </div> : <div className='hidden lg:flex gap-2'>{loginAndRegister}</div>
                }
                <button className='lg:hidden' onClick={() => setOpen(!open)}>
                    {
                        open ? <HiXMark size={31}></HiXMark> : <IoMenuOutline size={31}></IoMenuOutline >
                    }
                </button>
            </div>
            {
                open && (
                    <div ref={dropDown} className='w-full pb-3.5 flex flex-col items-center justify-center gap-3'>
                        {links}
                        {
                            user ? <div className='flex gap-3 items-center'> <div>{userProfile}</div> <div>{logout}</div></div> :
                                <div className='flex items-center gap-2.5'>{loginAndRegister}</div>
                        }
                    </div>
                )
            }
        </div >
    );
};

export default Navbar;