import React, { useEffect, useRef, useState } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { IoMenuOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/chef-logo-restaurant-food-vector-600w-1739601476.webp'

const Navbar = () => {
    const [hideNav, setHideNav] = useState(false);
    const lastScroll = useRef(0);
    const [open, setOpen] = useState(false);
    const dropDown = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > lastScroll.current){
                setHideNav(true);
            }
            else{
                setHideNav(false);
            }
            lastScroll.current = window.scrollY;
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutsite = (e) => {
            if(open && dropDown.current && dropDown.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutsite);
        return () => document.removeEventListener("mousedown", handleClickOutsite);
    }, [open]);

    useEffect(() => {
        const handleScrollOutsite = () => {
            if(open) {
                setOpen(false);
            }
        }
        window.addEventListener("scroll", handleScrollOutsite);
        return () => window.removeEventListener("scroll", handleScrollOutsite);
    }, [open]);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 1024){
                setOpen(false)
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const links = <>
    <NavLink>Home</NavLink>
    <NavLink>Home</NavLink>
    </>

    return (
        <div className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-50 transition-transform duration-300 ${hideNav ? "-translate-y-full" : "translate-y-0"} bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-b border-white/10 shadow-lg `}>
            <div className='flex justify-between px-4 py-2 items-center'>
                <Link className='flex items-center gap-2.5'>
                    <img className='max-sm:h-9 h-12 rounded-full' src={logo} alt="" />
                    <h1 className='text-3xl max-sm:text-xl'>ChefBazaar</h1>
                </Link>
                <div className='hidden lg:flex gap-2.5'>
                    {
                        links
                    }
                </div>
                <div className='hidden lg:flex'>
                    <button>Log out</button>
                </div>
                <button className='lg:hidden' onClick={() => setOpen(!open)}>
                    {
                        open ? <HiXMark size={31}></HiXMark> : <IoMenuOutline size={31}></IoMenuOutline >
                    }
                </button>
            </div>
            {
                open && (
                    <div ref={dropDown} className='w-full flex flex-col gap-3'>
                        <div>
                            <button>Log in</button>
                            <button>sign in</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Navbar;