import React, { useState } from 'react';
import { User, Calendar, Phone, Mail, MessageCircle, BarChart, Activity, PieChart, Users, GitMerge, Send, Search, Settings, Coffee, Utensils, TrendingUp, Edit3, Trash2, Plus } from 'lucide-react';
import { Product, Table } from '../types';

export function CDPScreen({
    products, setProducts,
    tables, setTables
}: {
    products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    tables: Table[]; setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}) {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'insight' | 'analysis' | 'setting'>('dashboard');

    const topProduct = products[8] || products[0];
    const secondProduct = products[0] || products[0];
    const thirdProduct = products[6] || products[0];
    const fourthProduct = products[4] || products[0];
    const fifthProduct = products[1] || products[0];

    const handleAddProduct = () => {
        const newName = prompt('ชื่อเมนูใหม่:', 'เมนูใหม่');
        if (!newName) return;
        const newPrice = prompt('ราคา:', '100');
        if (!newPrice) return;

        const newProduct: Product = {
            id: Date.now().toString(),
            name: newName,
            price: Number(newPrice),
            image: 'https://images.unsplash.com/photo-1546069901-ba9590a1a70b?auto=format&fit=crop&q=80&w=400',
            description: 'เมนูใหม่',
            calory: '300 kcal',
            deliveryCost: 'Free',
            deliveryTime: '15 นาที'
        };
        setProducts([...products, newProduct]);
    };

    const handleEditProduct = (id: string) => {
        const product = products.find(p => p.id === id);
        if (!product) return;
        const newName = prompt('แก้ไขชื่อเมนู:', product.name);
        if (!newName) return;
        const newPrice = prompt('แก้ไขราคา:', product.price.toString());
        if (!newPrice) return;

        setProducts(products.map(p => p.id === id ? { ...p, name: newName, price: Number(newPrice) } : p));
    };

    const handleDeleteProduct = (id: string) => {
        if (confirm('คุณแน่ใจว่าต้องการลบเมนูนี้?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleAddTable = () => {
        const name = prompt('ชื่อโต๊ะใหม่ (เช่น T10):', `T${tables.length + 1}`);
        if (!name) return;
        const seats = prompt('จำนวนที่นั่ง:', '4');
        if (!seats) return;

        const newTable: Table = {
            id: `t${Date.now()}`,
            name: name,
            status: 'free',
            detail: 'Free',
            seats: Number(seats),
            items: []
        };
        setTables([...tables, newTable]);
    };

    const handleEditTable = (id: string) => {
        const table = tables.find(t => t.id === id);
        if (!table) return;
        const name = prompt('แก้ไขชื่อโต๊ะ:', table.name);
        if (!name) return;
        const seats = prompt('แก้ไขจำนวนที่นั่ง:', table.seats.toString());
        if (!seats) return;

        setTables(tables.map(t => t.id === id ? { ...t, name, seats: Number(seats) } : t));
    };

    return (
        <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-gray-50 overflow-hidden font-sans">

            {/* Sidebar Navigation */}
            <div className="w-full md:w-20 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-row md:flex-col items-center py-3 md:py-6 gap-4 md:gap-8 z-10 shrink-0 overflow-x-auto px-4 md:px-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-blue-500/30 shrink-0">
                    C
                </div>
                <div className="flex flex-row md:flex-col gap-2 md:gap-4 shrink-0">
                    <button
                        title="Analytics Dashboard"
                        onClick={() => setActiveTab('dashboard')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <BarChart size={24} />
                    </button>
                    <button
                        title="Customer Insight"
                        onClick={() => setActiveTab('insight')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'insight' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={24} />
                    </button>
                    <button
                        title="Product Analysis"
                        onClick={() => setActiveTab('analysis')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'analysis' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <TrendingUp size={24} />
                    </button>
                    <button
                        title="Settings"
                        onClick={() => setActiveTab('setting')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'setting' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Settings size={24} />
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto w-full">

                {/* --- DASHBOARD TAB --- */}
                {activeTab === 'dashboard' && (
                    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-300 bg-gray-50/50 font-sans">

                        {/* Top Global Header (matching mockup top bar) */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-3 rounded-2xl md:rounded-full shadow-sm border border-gray-100 pl-4 pr-3">
                            <div className="relative w-full md:w-96 flex-shrink-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input type="text" placeholder="Search task..." className="w-full pl-10 pr-12 py-2.5 bg-gray-50/50 border-none rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm font-medium" />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-white px-2 py-0.5 rounded text-[10px] text-gray-500 font-bold border border-gray-200">⌘ F</div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition drop-shadow-sm"><Mail size={16} /></button>
                                <button className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition drop-shadow-sm relative">
                                    <MessageCircle size={16} />
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                                </button>
                                <div className="flex items-center gap-3 pl-2 sm:pl-4 border-none">
                                    <div className="hidden sm:block text-right">
                                        <p className="text-sm font-bold text-gray-900 leading-tight">Admin Manager</p>
                                        <p className="text-xs text-gray-500 font-medium tracking-tight">admin@mockpos.com</p>
                                    </div>
                                    <div className="w-10 h-10 bg-yellow-100 rounded-full overflow-hidden shadow-sm shrink-0 border border-gray-200 p-0.5">
                                        <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className="w-full h-full object-cover rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Header */}
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-6">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 tracking-tight">Dashboard</h1>
                                <p className="text-gray-400 font-medium text-sm sm:text-base">Plan, prioritize, and accomplish your tasks with ease.</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-5 py-2.5 bg-yellow-400 text-black font-bold text-sm rounded-full flex items-center gap-2 hover:bg-yellow-500 transition shadow-sm">
                                    <Plus size={16} /> Add Project
                                </button>
                                <button className="px-5 py-2.5 border border-yellow-400 text-yellow-900 font-bold text-sm bg-white rounded-full hover:bg-yellow-50 transition shadow-sm">
                                    Import Data
                                </button>
                            </div>
                        </div>

                        {/* Bento Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">

                            {/* KPI 1 - Active (Yellow instead of Green in Mockup) */}
                            <div className="col-span-1 bg-yellow-500 p-6 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:shadow-md transition duration-300">
                                <div className="absolute top-6 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition duration-300 shadow-sm"><TrendingUp size={16} className="text-yellow-600" /></div>
                                <div>
                                    <p className="text-yellow-900 text-sm font-bold mb-2">Total Revenue</p>
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-white mb-6 tracking-tight drop-shadow-sm">฿ 45k</p>
                                </div>
                                <div className="inline-flex max-w-max items-center gap-2 bg-yellow-600/30 px-2 py-1.5 rounded-xl border border-yellow-400/20 backdrop-blur-sm">
                                    <div className="bg-yellow-100 text-yellow-700 text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-0.5">5<TrendingUp size={10} /></div>
                                    <p className="text-xs text-yellow-50 font-medium">Increased from last month</p>
                                </div>
                            </div>

                            {/* KPI 2 */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative group cursor-pointer hover:shadow-md transition duration-300">
                                <div className="absolute top-6 right-6 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition shadow-sm"><TrendingUp size={16} className="text-gray-600" /></div>
                                <div>
                                    <p className="text-gray-800 text-base font-bold mb-2 tracking-tight">Ended Projects</p>
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-gray-900 mb-6 tracking-tight">10</p>
                                </div>
                                <div className="inline-flex max-w-max items-center gap-2 text-gray-400">
                                    <div className="bg-white text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-200 shadow-sm flex items-center gap-0.5">6<TrendingUp size={10} /></div>
                                    <p className="text-xs font-medium">Increased from last week</p>
                                </div>
                            </div>

                            {/* KPI 3 */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative group cursor-pointer hover:shadow-md transition duration-300">
                                <div className="absolute top-6 right-6 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition shadow-sm"><TrendingUp size={16} className="text-gray-600" /></div>
                                <div>
                                    <p className="text-gray-800 text-base font-bold mb-2 tracking-tight">Running Projects</p>
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-gray-900 mb-6 tracking-tight">12</p>
                                </div>
                                <div className="inline-flex max-w-max items-center gap-2 text-gray-400">
                                    <div className="bg-white text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-200 shadow-sm flex items-center gap-0.5">2<TrendingUp size={10} /></div>
                                    <p className="text-xs font-medium">Increased from last month</p>
                                </div>
                            </div>

                            {/* KPI 4 */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative group cursor-pointer hover:shadow-md transition duration-300">
                                <div className="absolute top-6 right-6 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition shadow-sm"><TrendingUp size={16} className="text-gray-600" /></div>
                                <div>
                                    <p className="text-gray-800 text-base font-bold mb-2 tracking-tight">Pending Project</p>
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-gray-900 mb-6 tracking-tight">2</p>
                                </div>
                                <div className="inline-flex max-w-max items-center gap-2 text-emerald-500">
                                    <p className="text-sm font-bold">On Discuss</p>
                                </div>
                            </div>

                            {/* Analytics Chart (Span 2) */}
                            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 min-h-[300px] flex flex-col mt-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-8">Project Analytics</h3>
                                <div className="flex-1 flex items-end justify-between gap-1 sm:gap-4 px-2 sm:px-4 pb-6 relative">
                                    {/* Abstract rounded bars mocking the mockup exactly */}
                                    <div className="w-full h-full absolute inset-0 flex items-end justify-between px-2 sm:px-6 pb-8 gap-2 xs:gap-4">
                                        <div className="flex-1 h-[45%] bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_6px)] rounded-full"></div>
                                        <div className="flex-1 h-[60%] bg-black rounded-full"></div>
                                        <div className="flex-1 h-[75%] bg-yellow-400 rounded-full relative group shadow-sm flex items-start justify-center pt-2">
                                            <div className="bg-white/80 backdrop-blur-sm border border-white text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold shadow-sm inline-block">74%</div>
                                            {/* little line */}
                                            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[1px] h-4 bg-white/50"></div>
                                        </div>
                                        <div className="flex-1 h-[90%] bg-gray-800 rounded-full"></div>
                                        <div className="flex-1 h-[70%] bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_6px)] rounded-full"></div>
                                        <div className="flex-1 h-[55%] bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_6px)] rounded-full"></div>
                                        <div className="flex-1 h-[40%] bg-[repeating-linear-gradient(-45deg,transparent,transparent_4px,#e5e7eb_4px,#e5e7eb_6px)] rounded-full hidden sm:block"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between px-6 text-[11px] font-bold text-gray-400 tracking-widest mt-auto">
                                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span className="hidden sm:inline">S</span>
                                </div>
                            </div>

                            {/* Reminders / Next Action */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col mt-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-6">Reminders</h3>
                                <div className="flex-1 flex flex-col justify-center">
                                    <h4 className="text-[1.35rem] font-bold text-gray-900 leading-tight mb-3">Meeting with Arc<br />Company</h4>
                                    <p className="text-sm font-medium text-gray-400 mb-6 flex items-center gap-1 group">Time : 02.00 pm - 04.00 pm</p>
                                    <button className="w-full py-4 bg-yellow-400 text-black font-bold rounded-2xl flex justify-center items-center gap-2 hover:bg-yellow-500 transition mt-auto shadow-md shadow-yellow-400/20">
                                        <Activity size={18} /> Start Meeting
                                    </button>
                                </div>
                            </div>

                            {/* Project / Top Items */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col mt-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Project</h3>
                                    <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 flex items-center gap-1 hover:bg-gray-50 drop-shadow-sm"><Plus size={12} /> New</button>
                                </div>
                                <div className="space-y-5 flex-1 mt-2">
                                    {[
                                        { name: 'Develop API Endpoints', date: 'Due date: Nov 26, 2024', icon: '✦', color: 'text-blue-600 bg-blue-50' },
                                        { name: 'Onboarding Flow', date: 'Due date: Nov 28, 2024', icon: '❂', color: 'text-teal-600 bg-teal-50' },
                                        { name: 'Build Dashboard', date: 'Due date: Nov 30, 2024', icon: '✽', color: 'text-emerald-500 bg-emerald-50' },
                                        { name: 'Optimize Page Load', date: 'Due date: Dec 5, 2024', icon: '◔', color: 'text-yellow-600 bg-yellow-50' },
                                        { name: 'Cross-Browser Testing', date: 'Due date: Dec 6, 2024', icon: '✿', color: 'text-purple-600 bg-purple-50' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 group cursor-pointer">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0 ${item.color} group-hover:scale-110 transition`}>{item.icon}</div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition">{item.name}</p>
                                                <p className="text-[10px] font-medium text-gray-400 mt-0.5">{item.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Team Collaboration / Customer Feed */}
                            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Team Collaboration</h3>
                                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[11px] font-bold flex items-center gap-1 hover:bg-gray-50 drop-shadow-sm"><Plus size={12} /> Add Member</button>
                                </div>
                                <div className="space-y-4 flex-1">
                                    {[
                                        { name: 'Alexandra Deff', action: 'Github Project Repository', status: 'Completed', statusBg: 'bg-emerald-50', statusText: 'text-emerald-600', img: '1' },
                                        { name: 'Edwin Adenike', action: 'Integrate User Authentication System', status: 'In Progress', statusBg: 'bg-yellow-50', statusText: 'text-yellow-600', img: '11' },
                                        { name: 'Isaac Oluwatemilorun', action: 'Develop Search and Filter Functionality', status: 'Pending', statusBg: 'bg-red-50', statusText: 'text-red-500', img: '33' },
                                        { name: 'David Oshodi', action: 'Responsive Layout for Homepage', status: 'In Progress', statusBg: 'bg-yellow-50', statusText: 'text-yellow-600', img: '12' },
                                    ].map((c, i) => (
                                        <div key={i} className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-2 pb-2 group">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 p-0.5 shrink-0 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/150?img=${c.img}`} className="w-full h-full rounded-full object-cover" alt="avatar" />
                                            </div>
                                            <div className="flex-1 min-w-[150px]">
                                                <p className="text-sm font-bold text-gray-800 leading-tight">{c.name}</p>
                                                <p className="text-[11px] font-medium text-gray-400 line-clamp-1 mt-0.5">Working on <span className="font-bold text-gray-600">{c.action}</span></p>
                                            </div>
                                            <div className={`px-2 py-1 rounded-md text-[9px] font-bold border border-white shrink-0 shadow-sm ${c.statusBg} ${c.statusText}`}>{c.status}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Project Progress / Goal Donut */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-between relative">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 self-start">Project Progress</h3>

                                <div className="relative w-48 h-48 mt-2 mb-4">
                                    {/* Mocking the thick donut outline from image */}
                                    <svg className="w-full h-full transform -rotate-180" viewBox="0 0 100 100">
                                        {/* Background Track (Hashed) */}
                                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="url(#stripes)" strokeWidth="18" />
                                        {/* Pattern for stripes */}
                                        <defs>
                                            <pattern id="stripes" width="3" height="3" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                                                <rect width="1" height="3" fill="#9ca3af" />
                                            </pattern>
                                        </defs>
                                        {/* Foreground Progress */}
                                        <circle cx="50" cy="50" r="38" fill="transparent" stroke="#facc15" strokeWidth="18" strokeDasharray="238.7" strokeDashoffset="140" strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-[2.5rem] font-bold text-gray-900 tracking-tighter leading-none mt-2">41%</span>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">Project Ended</span>
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 flex gap-4 sm:gap-6 text-[11px] font-bold text-gray-500 w-full justify-center pb-2">
                                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div> Completed</div>
                                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-gray-900 rounded-full"></div> In Progress</div>
                                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#9ca3af_2px,#9ca3af_3px)] rounded-full"></div> Pending</div>
                                </div>
                            </div>

                            {/* Time Tracker / POS Status */}
                            <div className="col-span-1 bg-gray-900 p-6 rounded-3xl shadow-md flex flex-col justify-between text-white relative overflow-hidden group">
                                {/* Wave Background Mockup */}
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                                    <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_top_right,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-yellow-400/10 blur-3xl rounded-full"></div>

                                <h3 className="text-base font-bold text-gray-100 mb-4 z-10">Time Tracker</h3>
                                <div className="flex-1 flex flex-col justify-center items-center z-10 py-6">
                                    <p className="text-5xl font-medium tracking-tight mb-8 drop-shadow-lg font-mono">01<span className="opacity-80">:</span>24<span className="opacity-80">:</span>08</p>
                                    <div className="flex gap-4">
                                        <button className="w-12 h-12 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-100 transition shadow-lg"><Activity size={20} /></button>
                                        <button className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition shadow-lg"><div className="w-4 h-4 rounded-sm bg-white"></div></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- INSIGHT TAB --- */}
                {activeTab === 'insight' && (
                    <div className="p-4 sm:p-8 max-w-7xl mx-auto animate-in fade-in duration-300">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Users className="text-blue-600" /> Customer Insight
                            </h1>
                            {/* Search Box per requirements */}
                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="ค้นหาเบอร์โทร / ชื่อลูกค้า..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:border-blue-500 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                            {/* Profile Card */}
                            <div className="w-full lg:w-80 flex-shrink-0">
                                <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-pink-200 to-indigo-200 mb-4 p-1">
                                        <img src="https://i.pravatar.cc/150?img=5" alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Chayamon Naticharat</h2>
                                    <p className="text-gray-500 font-medium mt-1 mb-4">086-360-5383</p>
                                    <div className="px-4 py-1.5 bg-blue-50 text-blue-600 font-bold rounded-full text-sm mb-6">
                                        SILVER TIER
                                    </div>
                                    <div className="flex gap-3 mb-8">
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"><MessageCircle size={18} /></button>
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"><Phone size={18} /></button>
                                        <button className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors"><Mail size={18} /></button>
                                    </div>

                                    <div className="w-full text-left space-y-4">
                                        <h3 className="font-bold text-gray-900 flex items-center gap-2 border-b border-gray-50 pb-2"><User size={16} /> Profile</h3>
                                        <div className="grid grid-cols-[80px_1fr] gap-2 text-sm">
                                            <span className="text-gray-400 font-medium">Birthday</span>
                                            <span className="text-gray-900 font-medium">21 March 2000</span>

                                            <span className="text-gray-400 font-medium">Age</span>
                                            <span className="text-gray-900 font-medium">23 years</span>

                                            <span className="text-gray-400 font-medium">Gender</span>
                                            <span className="text-gray-900 font-medium">Female</span>

                                            <span className="text-gray-400 font-medium">LINE</span>
                                            <span className="text-gray-900 font-medium text-emerald-500">@Uy77SD9</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Data specific to Customer */}
                            <div className="flex-1 space-y-6">
                                <div className="flex gap-4 border-b border-gray-200">
                                    <button className="px-6 py-3 font-bold text-blue-600 border-b-2 border-blue-600 flex items-center gap-2"><Activity size={18} /> ข้อมูลการใช้จ่าย</button>
                                </div>

                                {/* Spending Overview */}
                                <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 md:mb-6">Spending Overview</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:divide-x divide-gray-100">
                                        <div className="text-center">
                                            <p className="text-gray-500 font-medium mb-1">Total Spending</p>
                                            <p className="text-4xl font-extrabold text-gray-900">23,042</p>
                                            <p className="text-sm text-gray-400 mt-1">Baht</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-500 font-medium mb-1">Visit Total</p>
                                            <p className="text-4xl font-extrabold text-blue-600">5</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-500 font-medium mb-1">Average spending</p>
                                            <p className="text-4xl font-extrabold text-gray-900">4,608</p>
                                            <p className="text-sm text-gray-400 mt-1">Baht</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Recent Purchases Mockup */}
                                <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-sm border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">ประวัติการสั่งซื้อล่าสุด</h3>
                                    <div className="space-y-4">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                                                <div>
                                                    <p className="font-bold text-gray-800">บิลเลขที่: INC2402{i}0012</p>
                                                    <p className="text-sm text-gray-500">{new Date().toLocaleDateString()} 12:{i}0 PM</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-xl text-gray-900">฿ {450 + (i * 120)}.00</p>
                                                    <p className="text-sm text-green-500 font-medium">+ {Math.floor((450 + (i * 120)) / 20)} PTS</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- ANALYSIS (BEST SELLERS) TAB --- */}
                {activeTab === 'analysis' && (
                    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <TrendingUp className="text-blue-600" /> วิเคราะห์สินค้าขายดี (Product Analysis)
                            </h1>
                            <div className="bg-white px-4 py-2 border border-gray-200 rounded-xl font-medium text-gray-600 text-sm shadow-sm">
                                วิเคราะห์จากข้อมูลการสั่งของลูกค้า 30 วันย้อนหลัง
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Top 3 สินค้าขายดี (ตามจำนวนจาน)</h3>
                                <div className="space-y-4">
                                    {/* Mock Data */}
                                    {topProduct && (
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex justify-center items-center font-black text-xl">1</div>
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                <img src={topProduct.image} alt={topProduct.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-lg">{topProduct.name}</h4>
                                                <span className="text-sm text-green-500 font-bold px-2 py-0.5 bg-green-50 rounded">เติบโต +15%</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-gray-900">342</p>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Qty Sold</p>
                                            </div>
                                        </div>
                                    )}
                                    {secondProduct && (
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-xl flex justify-center items-center font-black text-xl">2</div>
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                <img src={secondProduct.image} alt={secondProduct.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-lg">{secondProduct.name}</h4>
                                                <span className="text-sm text-gray-500 font-medium px-2 py-0.5 bg-gray-100 rounded">คงที่ -</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-gray-900">289</p>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Qty Sold</p>
                                            </div>
                                        </div>
                                    )}
                                    {thirdProduct && (
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex justify-center items-center font-black text-xl">3</div>
                                            <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                <img src={thirdProduct.image} alt={thirdProduct.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-lg">{thirdProduct.name}</h4>
                                                <span className="text-sm text-green-500 font-bold px-2 py-0.5 bg-green-50 rounded">เติบโต +8%</span>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-black text-gray-900">210</p>
                                                <p className="text-xs text-gray-500 uppercase font-bold">Qty Sold</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-6">รายการอาหารจัดอันดับทั้งหมด</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-200 text-sm text-gray-500">
                                                <th className="py-3 font-medium">ชื่อรายการ</th>
                                                <th className="py-3 font-medium text-right">จำนวน (จาน)</th>
                                                <th className="py-3 font-medium text-right">ยอดขาย (บาท)</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {topProduct && (
                                                <tr className="border-b border-gray-50">
                                                    <td className="py-3 font-bold text-gray-800">{topProduct.name}</td>
                                                    <td className="py-3 text-right">342</td>
                                                    <td className="py-3 text-right text-gray-500">฿{(342 * topProduct.price).toLocaleString()}</td>
                                                </tr>
                                            )}
                                            {secondProduct && (
                                                <tr className="border-b border-gray-50">
                                                    <td className="py-3 font-bold text-gray-800">{secondProduct.name}</td>
                                                    <td className="py-3 text-right">289</td>
                                                    <td className="py-3 text-right text-gray-500">฿{(289 * secondProduct.price).toLocaleString()}</td>
                                                </tr>
                                            )}
                                            {thirdProduct && (
                                                <tr className="border-b border-gray-50">
                                                    <td className="py-3 font-bold text-gray-800">{thirdProduct.name}</td>
                                                    <td className="py-3 text-right">210</td>
                                                    <td className="py-3 text-right text-gray-500">฿{(210 * thirdProduct.price).toLocaleString()}</td>
                                                </tr>
                                            )}
                                            {fourthProduct && (
                                                <tr className="border-b border-gray-50">
                                                    <td className="py-3 font-medium text-gray-600">{fourthProduct.name}</td>
                                                    <td className="py-3 text-right">156</td>
                                                    <td className="py-3 text-right text-gray-500">฿{(156 * fourthProduct.price).toLocaleString()}</td>
                                                </tr>
                                            )}
                                            {fifthProduct && (
                                                <tr>
                                                    <td className="py-3 font-medium text-gray-600">{fifthProduct.name}</td>
                                                    <td className="py-3 text-right">145</td>
                                                    <td className="py-3 text-right text-gray-500">฿{(145 * fifthProduct.price).toLocaleString()}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SETTING TAB --- */}
                {activeTab === 'setting' && (
                    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3 mb-6 sm:mb-8">
                            <Settings className="text-blue-600" /> ระบบจัดตั้งค่าร้านค้า (Settings)
                        </h1>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                            {/* Menu Management */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Utensils size={20} /> จัดการเมนูอาหาร</h3>
                                    <button onClick={handleAddProduct} className="flex items-center gap-1 text-sm bg-blue-50 text-blue-600 font-bold px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                                        <Plus size={16} /> เพิ่มเมนูใหม่
                                    </button>
                                </div>
                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                    {products.map(product => (
                                        <div key={product.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 line-clamp-1">{product.name}</p>
                                                    <p className="text-sm text-gray-500">฿ {product.price.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <button onClick={() => handleEditProduct(product.id)} className="p-2 text-gray-400 hover:text-blue-500 bg-gray-50 rounded-lg"><Edit3 size={16} /></button>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg"><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Table Management */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-4 sm:mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Coffee size={20} /> จัดการโต๊ะนั่ง</h3>
                                    <button onClick={handleAddTable} className="flex items-center gap-1 text-sm bg-green-50 text-green-600 font-bold px-3 py-1.5 rounded-lg hover:bg-green-100 transition-colors">
                                        <Plus size={16} /> เพิ่มโต๊ะ
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
                                    {tables.map(table => (
                                        <div key={table.id} className={`border ${table.status === 'free' ? 'border-emerald-200' : table.status === 'reserved' ? 'border-amber-200' : 'border-orange-200'} rounded-xl p-4 flex flex-col items-center justify-center relative group hover:shadow-md transition-all`}>
                                            <span className="font-black text-xl text-gray-800">{table.name}</span>
                                            <span className="text-xs text-gray-500 font-medium">{table.seats} Seats</span>
                                            <span className="text-[10px] font-bold mt-1 uppercase text-gray-400">{table.status}</span>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <button onClick={() => handleEditTable(table.id)} className="text-gray-400 hover:text-blue-500"><Edit3 size={14} /></button>
                                                <button onClick={() => {
                                                    if (confirm(`ต้องการลบโต๊ะ ${table.name}?`)) {
                                                        setTables(tables.filter(t => t.id !== table.id));
                                                    }
                                                }} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
