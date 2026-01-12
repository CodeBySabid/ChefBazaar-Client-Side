import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaUserCheck } from 'react-icons/fa';
import { FcStatistics } from 'react-icons/fc';
import { VscGitPullRequestNewChanges } from 'react-icons/vsc';
import { Link } from 'react-router';

const UserLayout = () => {
    return (
        <div className='pt-12 sm:pt-16'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4">Navbar Title</div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4">Page Content</div>
                </div>

                <div className="drawer-side max-lg:pt-12 max-lg:sm:pt-16 is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            <li>
                                <Link to={'/admin_dashboard/admin_profile'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                    {/* Home icon */}
                                    <CgProfile className="my-1 inline-block size-5"></CgProfile>
                                    <span className="is-drawer-close:hidden">My Profile</span>
                                </Link>
                            </li>

                            <li>
                                <Link to={'/admin_dashboard/manager_page'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Orders">
                                    {/* Home icon */}
                                    <FaUserCheck className="my-1 inline-block size-5"></FaUserCheck>
                                    <span className="is-drawer-close:hidden">My Orders</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/admin_dashboard/manager_request'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Mange request">
                                    {/* Home icon */}
                                    <VscGitPullRequestNewChanges className="my-1 inline-block size-5"></VscGitPullRequestNewChanges >
                                    <span className="is-drawer-close:hidden">Mange request</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/admin_dashboard/admin_statistics'} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Platform Statistics">
                                    {/* Home icon */}
                                    <FcStatistics className="my-1 inline-block size-5"></FcStatistics  >
                                    <span className="is-drawer-close:hidden">Platform Statistics</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLayout;