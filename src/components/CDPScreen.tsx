import React, { useState } from 'react';
import { User, Calendar, Phone, Mail, MessageCircle, BarChart, Activity, PieChart, Users, GitMerge, Send, Search, Settings, Coffee, Utensils, TrendingUp, Edit3, Trash2, Plus, ShieldCheck, Target, Shield, CheckCircle, AlertTriangle, FileText, List, ExternalLink } from 'lucide-react';
import { Product, Table } from '../types';
import { useCDP } from '../contexts/CDPDataContext';

export function CDPScreen({
    products, setProducts,
    tables, setTables
}: {
    products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    tables: Table[]; setTables: React.Dispatch<React.SetStateAction<Table[]>>;
}) {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'insight' | 'segmentation' | 'privacy' | 'setting'>('dashboard');
    const { customers, transactions, registerLineAccount } = useCDP();

    // Customer 360 State
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(customers.length > 0 ? customers[0].id : null);
    const [isDataMasked, setIsDataMasked] = useState(true);

    const activeCustomer = customers.find(c => c.id === selectedCustomerId);
    const customerTransactions = transactions.filter(tx => tx.customerId === selectedCustomerId);

    // Calculate Dashboard Stats
    const totalRevenue = transactions.reduce((sum, tx) => sum + tx.totalAmount, 0);
    const completedOrders = transactions.length;
    const activeTablesCount = tables.filter(t => t.status === 'checked-in').length;
    const reservationsCount = tables.filter(t => t.status === 'reserved').length;

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
                        className={`p-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <BarChart size={24} />
                    </button>
                    <button
                        title="Customer 360"
                        onClick={() => setActiveTab('insight')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'insight' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Users size={24} />
                    </button>
                    <button
                        title="Segmentation & LINE Promo"
                        onClick={() => setActiveTab('segmentation')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'segmentation' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Target size={24} />
                    </button>
                    <button
                        title="Privacy Center (PDPA)"
                        onClick={() => setActiveTab('privacy')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'privacy' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
                    >
                        <ShieldCheck size={24} />
                    </button>
                    <button
                        title="Store Settings"
                        onClick={() => setActiveTab('setting')}
                        className={`p-3 rounded-xl transition-all ${activeTab === 'setting' ? 'bg-yellow-100 text-yellow-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
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
                                <p className="text-gray-400 font-medium text-sm sm:text-base">Monitor your restaurant performance and daily operations.</p>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <button className="px-5 py-2.5 bg-yellow-400 text-black font-bold text-sm rounded-full flex items-center gap-2 hover:bg-yellow-500 transition shadow-sm">
                                    <Plus size={16} /> New Order
                                </button>
                                <button className="px-5 py-2.5 border border-yellow-400 text-yellow-900 font-bold text-sm bg-white rounded-full hover:bg-yellow-50 transition shadow-sm">
                                    Export Report
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
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-white mb-6 tracking-tight drop-shadow-sm">฿ {totalRevenue.toLocaleString()}</p>
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
                                    <p className="text-gray-800 text-base font-bold mb-2 tracking-tight">Completed Orders</p>
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-gray-900 mb-6 tracking-tight">{completedOrders}</p>
                                </div>
                                <div className="inline-flex max-w-max items-center gap-2 text-gray-400">
                                    <div className="bg-white text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-gray-200 shadow-sm flex items-center gap-0.5">12<TrendingUp size={10} /></div>
                                    <p className="text-xs font-medium">Increased from last week</p>
                                </div>
                            </div>

                            {/* KPI 3 */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative group cursor-pointer hover:shadow-md transition duration-300">
                                <div className="absolute top-6 right-6 w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition shadow-sm"><TrendingUp size={16} className="text-gray-600" /></div>
                                <div>
                                    <p className="text-gray-800 text-base font-bold mb-2 tracking-tight">Active Tables</p>
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-gray-900 mb-6 tracking-tight">{activeTablesCount}</p>
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
                                    <p className="text-gray-800 text-base font-bold mb-2 tracking-tight">Reservations</p>
                                    <p className="text-4xl lg:text-[2.5rem] font-black text-gray-900 mb-6 tracking-tight">{reservationsCount}</p>
                                </div>
                                <div className="inline-flex max-w-max items-center gap-2 text-emerald-500">
                                    <p className="text-sm font-bold">Waiting List</p>
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
                                    <h4 className="text-[1.35rem] font-bold text-gray-900 leading-tight mb-3">Fresh Ingredients<br />Delivery</h4>
                                    <p className="text-sm font-medium text-gray-400 mb-6 flex items-center gap-1 group">Time : 02.00 pm - 04.00 pm</p>
                                    <button className="w-full py-4 bg-yellow-400 text-black font-bold rounded-2xl flex justify-center items-center gap-2 hover:bg-yellow-500 transition mt-auto shadow-md shadow-yellow-400/20">
                                        <Activity size={18} /> Confirm Stock
                                    </button>
                                </div>
                            </div>

                            {/* Real-time POS Data Stream */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col mt-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Live POS Stream</h3>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[11px] font-bold text-emerald-600">Syncing</span></div>
                                </div>
                                <div className="space-y-5 flex-1 mt-2 overflow-y-auto max-h-[300px] no-scrollbar">
                                    {transactions.slice(0, 5).map((tx, i) => (
                                        <div key={tx.id} className="flex items-center gap-4 group cursor-pointer">
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0 text-blue-600 bg-blue-50 group-hover:scale-110 transition"><Activity size={14} /></div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition truncate max-w-[150px]">Table {tx.tableNumber} Checkout</p>
                                                <p className="text-[10px] font-medium text-gray-400 mt-0.5">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                                            </div>
                                            <div className="font-bold text-sm text-gray-900">฿{tx.totalAmount}</div>
                                        </div>
                                    ))}
                                    {transactions.length === 0 && (
                                        <div className="text-sm text-gray-400 text-center mt-4">No active stream</div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Transactions (Resolved Customers) */}
                            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col mt-2">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-900">Recent Transactions & Identity Resolution</h3>
                                    <button className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-[11px] font-bold flex items-center gap-1 hover:bg-gray-50 drop-shadow-sm"><Plus size={12} /> View All</button>
                                </div>
                                <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] no-scrollbar">
                                    {transactions.map((tx, i) => {
                                        const customer = tx.customerId ? customers.find(c => c.id === tx.customerId) : null;
                                        const name = customer ? customer.name : 'Unknown Guest';
                                        const phone = customer ? customer.phone : (tx.phoneProvided || 'No Phone');
                                        const isIdentified = !!customer;
                                        const statusBg = isIdentified ? 'bg-emerald-50' : 'bg-gray-100';
                                        const statusText = isIdentified ? 'text-emerald-600' : 'text-gray-500';
                                        const statusTextVal = isIdentified ? 'Identified' : 'Anonymous';

                                        return (
                                            <div key={tx.id} className="flex flex-wrap sm:flex-nowrap items-center gap-4 mb-2 pb-2 group border-b border-gray-50 last:border-0">
                                                <div className="w-10 h-10 rounded-full bg-yellow-100 p-0.5 shrink-0 overflow-hidden flex items-center justify-center text-yellow-600 font-bold">
                                                    {isIdentified ? name.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div className="flex-1 min-w-[150px]">
                                                    <p className="text-sm font-bold text-gray-800 leading-tight flex items-center gap-2">
                                                        {name} {isIdentified && <User size={12} className="text-blue-500" />}
                                                    </p>
                                                    <p className="text-[11px] font-medium text-gray-400 line-clamp-1 mt-0.5">
                                                        {phone} • Table {tx.tableNumber} • ฿{tx.totalAmount}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className={`px-2 py-1 rounded-md text-[9px] font-bold border border-white shrink-0 shadow-sm ${statusBg} ${statusText}`}>{statusTextVal}</div>
                                                    <span className="text-[10px] text-gray-400">{new Date(tx.timestamp).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {transactions.length === 0 && (
                                        <div className="text-sm text-gray-400 text-center mt-4">No transactions recorded yet</div>
                                    )}
                                </div>
                            </div>

                            {/* Project Progress / Goal Donut */}
                            <div className="col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-between relative">
                                <h3 className="text-lg font-bold text-gray-900 mb-6 self-start">Daily Sales Goal</h3>

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
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">Goal Reached</span>
                                    </div>
                                </div>
                                <div className="mt-auto pt-4 flex gap-4 sm:gap-6 text-[11px] font-bold text-gray-500 w-full justify-center pb-2">
                                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div> Reached</div>
                                    <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#9ca3af_2px,#9ca3af_3px)] rounded-full"></div> Remaining</div>
                                </div>
                            </div>

                            {/* Time Tracker / POS Status */}
                            <div className="col-span-1 bg-gray-900 p-6 rounded-3xl shadow-md flex flex-col justify-between text-white relative overflow-hidden group">
                                {/* Wave Background Mockup */}
                                <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                                    <div className="absolute inset-0 bg-[repeating-radial-gradient(circle_at_top_right,transparent,transparent_10px,#000_10px,#000_20px)]"></div>
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-yellow-400/10 blur-3xl rounded-full"></div>

                                <h3 className="text-base font-bold text-gray-100 mb-4 z-10">POS Uptime</h3>
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

                {/* --- CUSTOMER 360 TAB --- */}
                {activeTab === 'insight' && (
                    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-300 bg-gray-50/50 font-sans">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4 md:gap-0">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                                    <Users className="text-yellow-500" /> Customer 360
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">Unified customer profiles and journey tracking.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only" checked={isDataMasked} onChange={(e) => setIsDataMasked(e.target.checked)} />
                                        <div className={`block w-10 h-6 rounded-full transition-colors ${isDataMasked ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isDataMasked ? 'transform translate-x-4' : ''}`}></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 select-none">Data Masking (PDPA)</span>
                                </label>
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search phone / name..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 min-h-[600px]">
                            {/* Customer List Sidebar */}
                            <div className="w-full lg:w-80 flex-shrink-0 bg-white rounded-2xl md:rounded-[2rem] p-4 shadow-sm border border-gray-100 flex flex-col h-[600px]">
                                <h3 className="font-bold text-gray-900 mb-4 px-2">Customer Database</h3>
                                <div className="flex-1 overflow-y-auto space-y-2 pr-2 no-scrollbar">
                                    {customers.map((c, idx) => (
                                        <div
                                            key={c.id}
                                            onClick={() => setSelectedCustomerId(c.id)}
                                            className={`p-3 rounded-xl cursor-pointer transition-all border ${selectedCustomerId === c.id ? 'bg-yellow-50 border-yellow-400 shadow-sm ring-1 ring-yellow-400' : 'bg-white border-transparent hover:bg-gray-50'}`}
                                        >
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-bold text-gray-800 text-sm">{isDataMasked ? c.name.replace(/^(...).*/, '$1***') : c.name}</span>
                                                <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{c.tier}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {isDataMasked ? c.phone.replace(/(\d{3})-\d{3}-(\d{4})/, '$1-***-$2') : c.phone}
                                                {c.lineUid && <span className="text-emerald-500 ml-1 font-bold">LINE✔</span>}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Active Profile Details */}
                            <div className="flex-1">
                                {activeCustomer ? (
                                    <div className="bg-white rounded-2xl md:rounded-[2rem] p-6 shadow-sm border border-gray-100 h-full">
                                        {/* Profile Header Block */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-gray-100">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-200 to-orange-200 p-1 shrink-0">
                                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center font-black text-3xl text-yellow-600">
                                                    {activeCustomer.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                                                    {isDataMasked ? activeCustomer.name.replace(/^(...).*/, '$1***') : activeCustomer.name}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-500 mb-3">
                                                    <span className="flex items-center gap-1"><Phone size={14} /> {isDataMasked ? activeCustomer.phone.replace(/(\d{3})-\d{3}-(\d{4})/, '$1-***-$2') : activeCustomer.phone}</span>
                                                    {activeCustomer.lineUid && (
                                                        <span className="flex items-center gap-1 text-emerald-600"><MessageCircle size={14} /> Line: {isDataMasked ? 'UID-***-***' : activeCustomer.lineUid}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 font-bold rounded-full text-xs shadow-sm">
                                                        {activeCustomer.tier} TIER
                                                    </span>
                                                    {activeCustomer.segments.map((seg, i) => (
                                                        <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 font-bold rounded-full text-xs">
                                                            {seg}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex sm:flex-col gap-2 shrink-0">
                                                <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition shadow-sm"><MessageCircle size={16} /></button>
                                                <button className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition shadow-sm"><Edit3 size={16} /></button>
                                            </div>
                                        </div>

                                        {/* Behavior Insights */}
                                        <div className="py-6 border-b border-gray-100">
                                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Activity size={18} /> Behavior & Analytics</h3>
                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                                                    <p className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">Total Spent</p>
                                                    <p className="text-2xl font-black text-gray-900">฿{activeCustomer.totalSpent.toLocaleString()}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                                                    <p className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">Visits</p>
                                                    <p className="text-2xl font-black text-gray-900">{activeCustomer.visitCount}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                                                    <p className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">Avg. Ticket</p>
                                                    <p className="text-2xl font-black text-gray-900">฿{activeCustomer.averageSpending.toLocaleString()}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                                                    <p className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">Fav Table</p>
                                                    <p className="text-2xl font-black text-gray-900">{activeCustomer.favoriteTable || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Transaction History */}
                                        <div className="pt-6">
                                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Utensils size={18} /> Recent Orders</h3>
                                            <div className="space-y-3">
                                                {customerTransactions.length > 0 ? customerTransactions.slice(0, 5).map(tx => (
                                                    <div key={tx.id} className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-100 hover:border-yellow-300 transition-colors shadow-sm">
                                                        <div>
                                                            <p className="font-bold text-gray-800 text-sm">Table {tx.tableNumber}</p>
                                                            <p className="text-[11px] text-gray-500 mt-0.5">{new Date(tx.timestamp).toLocaleString()}</p>
                                                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{tx.items.join(', ')}</p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="font-black text-gray-900">฿ {tx.totalAmount.toLocaleString()}</p>
                                                            <p className="text-[10px] text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-1">Completed</p>
                                                        </div>
                                                    </div>
                                                )) : (
                                                    <div className="p-6 text-center text-gray-400 bg-gray-50 rounded-xl text-sm font-medium border border-gray-100 border-dashed">No recent transaction history found.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-gray-100 border-dashed">
                                        <div className="text-center text-gray-400">
                                            <Users size={48} className="mx-auto mb-4 opacity-50" />
                                            <p className="font-medium">Select a customer to view 360 profile</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SEGMENTATION & LINE PROMO TAB --- */}
                {activeTab === 'segmentation' && (
                    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-300 bg-gray-50/50 font-sans">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <Target className="text-yellow-500" /> Dynamic Segmentation & LINE
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">Group customers and broadcast targeted LINE campaigns.</p>
                            </div>
                            <div className="bg-white px-4 py-2 border border-gray-200 rounded-full font-bold text-emerald-600 text-sm shadow-sm flex items-center gap-2">
                                <MessageCircle size={16} /> LINE OA Connected
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Segments Overview */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2"><PieChart size={20} /> Customer Segments</h3>
                                <div className="space-y-4 flex-1">
                                    {[
                                        { name: 'VIP / Diamond', desc: 'ยอดใช้จ่ายรวม > 20,000 บาท', count: customers.filter(c => c.tier === 'DIAMOND').length, color: 'text-purple-600 bg-purple-50 border-purple-200' },
                                        { name: 'Gold Members', desc: 'ยอดใช้จ่ายรวม > 5,000 บาท', count: customers.filter(c => c.tier === 'GOLD').length, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
                                        { name: 'Churn Risk', desc: 'ไม่ได้มาเกิน 30 วัน', count: customers.filter(c => c.segments.includes('Churn Risk')).length, color: 'text-red-600 bg-red-50 border-red-200' },
                                        { name: 'New Customers', desc: 'เพิ่งมาใช้บริการครั้งแรก', count: customers.filter(c => c.visitCount === 1).length, color: 'text-blue-600 bg-blue-50 border-blue-200' },
                                    ].map((seg, i) => (
                                        <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${seg.color} transition-all cursor-pointer hover:shadow-md`}>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-lg">{seg.name}</h4>
                                                <p className="text-sm font-medium mt-0.5 opacity-80">{seg.desc}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-3xl font-black text-gray-900 leading-none">{seg.count}</p>
                                                <p className="text-[10px] uppercase font-bold mt-1 opacity-70">Customers</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* LINE Promo Broadcast Mockup */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 blur-3xl rounded-full"></div>
                                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 relative z-10"><Send size={20} className="text-emerald-500" /> Broadcast Campaign</h3>

                                <div className="space-y-4 flex-1 relative z-10">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Target Segment</label>
                                        <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none font-medium">
                                            <option>Churn Risk ({customers.filter(c => c.segments.includes('Churn Risk')).length} users)</option>
                                            <option>VIP / Diamond ({customers.filter(c => c.tier === 'DIAMOND').length} users)</option>
                                            <option>All Customers ({customers.length} users)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Message Template (Flex Message)</label>
                                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl border-dashed">
                                            <div className="max-w-[200px] border border-gray-200 rounded-t-xl rounded-b-sm bg-white overflow-hidden shadow-sm">
                                                <div className="h-24 bg-gray-200 relative">
                                                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="promo" />
                                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">20% OFF</div>
                                                </div>
                                                <div className="p-3">
                                                    <p className="font-bold text-xs text-gray-800 leading-tight">คิดถึงคุณ! กลับมาทานอาหารฟินๆ 🥢</p>
                                                    <p className="text-[10px] text-gray-500 mt-1">รับส่วนลดพิเศษ 20% สำหรับเมนูแซลมอน เฉพาะคุณเท่านั้น</p>
                                                    <button className="w-full mt-2 py-1.5 bg-blue-900 text-white text-[10px] font-bold rounded">จองโต๊ะเลย</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => alert('Mockup: Broadcast sent to LINE Messaging API!')}
                                    className="w-full py-4 mt-6 bg-emerald-500 text-white font-bold rounded-2xl hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30 flex justify-center items-center gap-2 relative z-10"
                                >
                                    <Send size={18} /> Send Broadcast Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- PRIVACY & CONSENT TAB --- */}
                {activeTab === 'privacy' && (
                    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-300 bg-gray-50/50 font-sans min-h-[800px]">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                    <Shield className="text-blue-500" /> Privacy & Consent (PDPA)
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">Manage data privacy settings and customer consent logs.</p>
                            </div>
                            <div className="bg-emerald-50 px-4 py-2 border border-emerald-200 rounded-full font-bold text-emerald-700 text-sm shadow-sm flex items-center gap-2">
                                <CheckCircle size={16} /> Fully Compliant
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Summary Cards */}
                            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0"><Shield size={24} /></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500">Total Opt-in</p>
                                        <p className="text-2xl font-black text-gray-900">{customers.filter(c => c.marketingConsent).length} Users</p>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center shrink-0"><AlertTriangle size={24} /></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500">Pending Consent</p>
                                        <p className="text-2xl font-black text-gray-900">{customers.filter(c => !c.marketingConsent).length} Users</p>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center shrink-0"><FileText size={24} /></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-500">Policy Version</p>
                                        <p className="text-2xl font-black text-gray-900">v2.1.0</p>
                                    </div>
                                </div>
                            </div>

                            {/* Consent Log */}
                            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><List size={18} /> Recent Consent Logs</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="border-b border-gray-100 text-sm font-bold text-gray-500">
                                                <th className="py-3 px-2">Customer</th>
                                                <th className="py-3 px-2">Channel</th>
                                                <th className="py-3 px-2">Status</th>
                                                <th className="py-3 px-2 text-right">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {customers.slice(0, 5).map((c, i) => (
                                                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                    <td className="py-3 px-2 font-bold text-gray-800 flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] shrink-0 font-medium">
                                                            {c.name.charAt(0)}
                                                        </div>
                                                        {c.name.slice(0, c.name.length - 3) + '***'}
                                                    </td>
                                                    <td className="py-3 px-2 text-gray-600 font-medium">
                                                        {c.lineUid ? 'LINE Login' : 'POS Register'}
                                                    </td>
                                                    <td className="py-3 px-2">
                                                        {c.marketingConsent ?
                                                            <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">Accepted</span> :
                                                            <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded border border-red-100">Declined</span>
                                                        }
                                                    </td>
                                                    <td className="py-3 px-2 text-right text-gray-500">
                                                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Policy Management Link */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:border-blue-200 transition-colors">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 blur-3xl rounded-full"></div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2"><Settings size={18} /> Policy Settings</h3>
                                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">Update your terms of service and privacy policies to sync across POS and online channels.</p>
                                </div>
                                <button className="w-full py-3 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition flex items-center justify-center gap-2 shadow-sm relative z-10 group-hover:shadow hover:bg-blue-50">
                                    <ExternalLink size={16} /> Edit Data Policy
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- SETTING TAB --- */}
                {activeTab === 'setting' && (
                    <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-6 animate-in fade-in duration-300 bg-gray-50/50 font-sans">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3 mb-6 sm:mb-8">
                            <Settings className="text-yellow-500" /> ระบบจัดตั้งค่าร้านค้า (Settings)
                        </h1>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                            {/* Menu Management */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2"><Utensils size={20} /> จัดการเมนูอาหาร</h3>
                                    <button onClick={handleAddProduct} className="flex items-center gap-1 text-sm bg-yellow-400 text-black font-bold px-3 py-1.5 rounded-lg hover:bg-yellow-500 transition shadow-sm">
                                        <Plus size={16} /> เพิ่มเมนูใหม่
                                    </button>
                                </div>
                                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                                    {products.map(product => (
                                        <div key={product.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl hover:border-yellow-400 hover:shadow-sm transition bg-white">
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
                                                <button onClick={() => handleEditProduct(product.id)} className="p-2 text-gray-400 hover:text-yellow-600 bg-gray-50 rounded-lg transition"><Edit3 size={16} /></button>
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
                                    <button onClick={handleAddTable} className="flex items-center gap-1 text-sm bg-yellow-400 text-black font-bold px-3 py-1.5 rounded-lg hover:bg-yellow-500 transition shadow-sm">
                                        <Plus size={16} /> เพิ่มโต๊ะ
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-2">
                                    {tables.map(table => (
                                        <div key={table.id} className={`border ${table.status === 'free' ? 'border-emerald-200 bg-white' : table.status === 'reserved' ? 'border-amber-200 bg-white' : 'border-orange-200 bg-white'} rounded-xl p-4 flex flex-col items-center justify-center relative group hover:shadow-md transition-all`}>
                                            <span className="font-black text-xl text-gray-800">{table.name}</span>
                                            <span className="text-xs text-gray-500 font-medium">{table.seats} Seats</span>
                                            <span className="text-[10px] font-bold mt-1 uppercase text-gray-400">{table.status}</span>
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                                <button onClick={() => handleEditTable(table.id)} className="text-gray-400 hover:text-yellow-600 transition"><Edit3 size={14} /></button>
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
