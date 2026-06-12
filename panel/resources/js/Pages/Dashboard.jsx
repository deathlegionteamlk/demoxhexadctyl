import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const servers = [
        { id: 1, name: 'Minecraft Survival', ip: '127.0.0.1:25565', status: 'Running', cpu: '12%', ram: '2.4GB', disk: '10GB' },
        { id: 2, name: 'Rust Official', ip: '127.0.0.1:28015', status: 'Stopped', cpu: '0%', ram: '0GB', disk: '25GB' },
    ];

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-white">
                    Servers
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { label: 'Servers', value: '12', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
                        { label: 'Nodes', value: '3', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
                        { label: 'Total RAM', value: '64 GB', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                        { label: 'Total Disk', value: '2 TB', icon: 'M20 13V6a2 2 0 00-2-2H4a2 2 0 00-2 2v7m18 0v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5m18 0h-2M4 13h2m14 0h2M4 13H2m4 7h12a2 2 0 002-2v-5a2 2 0 00-2-2H4a2 2 0 00-2 2v5a2 2 0 002 2z' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#161b22] border border-gray-800 rounded-lg p-6 flex items-center space-x-4 shadow-sm">
                            <div className="p-3 bg-[#0d1117] rounded-lg text-[#58a6ff]">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} /></svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-white tracking-tight">Active Servers</h3>
                    <button className="bg-[#238636] hover:bg-[#2ea043] text-white px-6 py-2 rounded-lg text-sm font-bold transition flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                        <span>Create Server</span>
                    </button>
                </div>

                <div className="overflow-hidden border border-gray-800 rounded-xl bg-[#161b22]">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0d1117] border-b border-gray-800">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Server Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest hidden md:table-cell">Node / IP</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest hidden lg:table-cell text-right">CPU</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest hidden lg:table-cell text-right">Memory</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {servers.map(server => (
                                <tr key={server.id} className="hover:bg-[#21262d] transition group">
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${server.status === 'Running' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            <span className={`w-2 h-2 rounded-full mr-1.5 ${server.status === 'Running' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                            {server.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white group-hover:text-[#58a6ff] transition cursor-pointer">{server.name}</div>
                                        <div className="text-xs text-gray-500">ID: {server.id}a4b{server.id}c1</div>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell text-sm">
                                        <div className="text-gray-300">Local Node</div>
                                        <div className="text-xs text-gray-500 font-mono">{server.ip}</div>
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell text-right font-mono text-sm text-gray-400">
                                        {server.cpu}
                                    </td>
                                    <td className="px-6 py-4 hidden lg:table-cell text-right font-mono text-sm text-gray-400">
                                        {server.ram}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="bg-[#21262d] hover:bg-[#30363d] border border-gray-700 text-white px-4 py-1.5 rounded-md text-xs font-bold transition shadow-sm">
                                            Manage
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
