import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaUserCheck } from 'react-icons/fa';
import { FcStatistics } from 'react-icons/fc';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';
import { Link, Outlet } from 'react-router';
import useRole from '../hook/useRole';
import { FaBowlFood, FaCartFlatbed } from 'react-icons/fa6';
import { MdFoodBank, MdMenuBook, MdRateReview } from 'react-icons/md';
import { GiFoodTruck } from 'react-icons/gi';
import { GrHistory } from 'react-icons/gr';
import Profile from '../page/Dashboard/Profile';

const DashboardLayout = () => {
    const { role } = useRole();
    return (
        <div className='pt-12 sm:pt-16 bg-base-300 min-h-screen'>
            <div className="drawer lg:drawer-open relative">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-ghost bg-linear-to-r/hsl from-indigo-500 to-teal-400 border-none rounded-l-2xl rounded-r-none fixed top-20 right-0 z-50">
                        <svg  data-tip="My Profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1 inline-block size-5"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                    </label>
                    <div><Outlet></Outlet></div>
                </div>

                <div className="drawer-side max-lg:pt-12 max-lg:sm:pt-16 is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            <li>
                                <Link to={'/dashboard'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                    {/* Home icon */}
                                    <CgProfile className="my-1 inline-block size-5"></CgProfile>
                                    <span className="is-drawer-close:hidden">My Profile</span>
                                </Link>
                            </li>
                            {/* List item */}
                            {
                                role === 'Admin' && <>
                                    <li>
                                        <Link to={'/dashboard/manager_page'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage User">
                                            {/* Home icon */}
                                            <FaUserCheck className="my-1 inline-block size-5"></FaUserCheck>
                                            <span className="is-drawer-close:hidden">Manage User</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/manger-request'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Mange request">
                                            {/* Home icon */}
                                            <VscGitPullRequestNewChanges className="my-1 inline-block size-5"></VscGitPullRequestNewChanges >
                                            <span className="is-drawer-close:hidden">Mange request</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/plat-form'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Platform Statistics">
                                            {/* Home icon */}
                                            <FcStatistics className="my-1 inline-block size-5"></FcStatistics  >
                                            <span className="is-drawer-close:hidden">Platform Statistics</span>
                                        </Link>
                                    </li>
                                </>
                            }
                            {
                                role === 'User' && <>

                                    <li>
                                        <Link to={'/dashboard/my-order'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Orders">
                                            {/* Home icon */}
                                            <GiFoodTruck className="my-1 inline-block size-5"></GiFoodTruck>
                                            <span className="is-drawer-close:hidden">My Orders</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/my-review'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My review">
                                            {/* Home icon */}
                                            <MdRateReview className="my-1 inline-block size-5"></MdRateReview >
                                            <span className="is-drawer-close:hidden">My review</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/my-favorite'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Favorite Meal">
                                            {/* Home icon */}
                                            <FaBowlFood className="my-1 inline-block size-5"></FaBowlFood  >
                                            <span className="is-drawer-close:hidden">Favorite Meal</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/payment-history'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Payment History">
                                            {/* Home icon */}
                                            <GrHistory className="my-1 inline-block size-5"></GrHistory  >
                                            <span className="is-drawer-close:hidden">Payment History</span>
                                        </Link>
                                    </li>
                                </>
                            }
                            {
                                role === 'Chef' && <>
                                    <li>
                                        <Link to={'/dashboard/create-meal'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Create meal">
                                            {/* Home icon */}
                                            <MdFoodBank className="my-1 inline-block size-5"></MdFoodBank >
                                            <span className="is-drawer-close:hidden">Create meal</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/chef-meals'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Meals">
                                            {/* Home icon */}
                                            <MdMenuBook className="my-1 inline-block size-5"></MdMenuBook  >
                                            <span className="is-drawer-close:hidden">My Meals</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/dashboard/order-request'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Order Requests">
                                            {/* Home icon */}
                                            <FaCartFlatbed className="my-1 inline-block size-5"></FaCartFlatbed   >
                                            <span className="is-drawer-close:hidden">Order requests</span>
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;