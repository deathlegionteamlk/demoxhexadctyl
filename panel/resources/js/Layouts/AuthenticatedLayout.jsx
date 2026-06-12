import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#161b22] border-r border-gray-800 flex-col hidden md:flex">
                <div className="h-16 flex items-center px-6 border-b border-gray-800">
                    <Link href="/">
                        <ApplicationLogo className="text-[#58a6ff] text-xl" />
                    </Link>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg transition hover:bg-[#21262d]"
                    >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        <span>Servers</span>
                    </NavLink>
                    <div className="text-xs font-bold text-gray-500 uppercase px-3 pt-4 pb-1">Management</div>
                    <Link className="flex items-center space-x-3 px-3 py-2 rounded-lg transition hover:bg-[#21262d] text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        <span>Users</span>
                    </Link>
                    <Link className="flex items-center space-x-3 px-3 py-2 rounded-lg transition hover:bg-[#21262d] text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        <span>Nodes</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#58a6ff] flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-[#161b22] border-b border-gray-800 flex items-center justify-between px-8">
                    <div className="flex items-center">
                        {header}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href={route('logout')} method="post" as="button" className="text-sm text-gray-400 hover:text-white">
                            Logout
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
                
                <footer className="p-4 text-center text-xs text-gray-600 border-t border-gray-800">
                    demoxhexadctyl by death legion team
                </footer>
            </div>
        </div>
    );
}
