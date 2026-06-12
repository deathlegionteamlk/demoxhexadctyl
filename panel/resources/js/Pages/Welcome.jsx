import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen bg-[#0d1117] text-gray-300 font-sans selection:bg-[#58a6ff] selection:text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <nav className="flex justify-between items-center mb-16">
                        <ApplicationLogo className="text-white text-3xl tracking-tighter" />
                        <div className="space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="text-sm font-bold text-gray-400 hover:text-white transition"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-bold text-gray-400 hover:text-white transition"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-[#238636] hover:bg-[#2ea043] text-white px-5 py-2 rounded-lg text-sm font-bold transition shadow-sm"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>

                    <main className="text-center py-20">
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                            Manage your <span className="text-[#58a6ff]">servers</span> <br />
                            with ease.
                        </h1>
                        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-12">
                            The next generation control panel for game servers. High performance, 
                            secure, and built for scale by Death Legion Team.
                        </p>
                        
                        <div className="flex justify-center space-x-6">
                            <Link 
                                href={route('register')}
                                className="bg-[#238636] hover:bg-[#2ea043] text-white px-10 py-4 rounded-xl text-lg font-bold transition shadow-lg"
                            >
                                Start Hosting
                            </Link>
                            <button className="bg-[#21262d] hover:bg-[#30363d] border border-gray-700 text-white px-10 py-4 rounded-xl text-lg font-bold transition">
                                Documentation
                            </button>
                        </div>

                        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {[
                                { title: 'Docker Isolated', desc: 'Every server runs in its own dedicated Docker container for maximum security.', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                                { title: 'High Performance', desc: 'Built with PHP Laravel and Go for the ultimate speed and reliability.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                                { title: 'Modern Interface', desc: 'A clean, intuitive React dashboard designed for the best user experience.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }
                            ].map((feature, i) => (
                                <div key={i} className="bg-[#161b22] border border-gray-800 p-8 rounded-2xl">
                                    <div className="w-12 h-12 bg-[#0d1117] rounded-xl flex items-center justify-center text-[#58a6ff] mb-6">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon} /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </main>

                    <footer className="mt-32 pt-12 border-t border-gray-800 text-center text-sm text-gray-600">
                        &copy; {new Date().getFullYear()} demoxhexadctyl by death legion team. All rights reserved.
                    </footer>
                </div>
            </div>
        </>
    );
}
