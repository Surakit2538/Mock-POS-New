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
                    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-300">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <BarChart className="text-blue-600" /> Analytics Dashboard
                            </h1>
                            <select className="px-4 py-2 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>วันนี้</option>
                                <option>สัปดาห์นี้</option>
                                <option>เดือนนี้</option>
                                <option>ปีนี้</option>
                            </select>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {[
                                { title: 'รายได้รวม (Revenue)', value: '฿ 45,200', trend: '+12%', color: 'text-green-500' },
                                { title: 'จำนวนออเดอร์', value: '142', trend: '+5%', color: 'text-green-500' },
                                { title: 'ยอดชำระเฉลี่ย/บิล', value: '฿ 318', trend: '-2%', color: 'text-red-500' },
                                { title: 'ลูกค้าใหม่ที่สมัครสมาชิค', value: '24', trend: '+18%', color: 'text-green-500' },
                            ].map((kpi, idx) => (
                                <div key={idx} className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
                                    <span className="text-gray-500 text-xs sm:text-sm font-medium mb-1 sm:mb-2 line-clamp-1">{kpi.title}</span>
                                    <span className="text-2xl sm:text-3xl font-black text-gray-900 mb-1 sm:mb-2">{kpi.value}</span>
                                    <span className={`text-xs sm:text-sm font-bold ${kpi.color}`}>{kpi.trend} <span className="hidden xl:inline">จากช่วงก่อนหน้า</span></span>
                                </div>
                            ))}
                        </div>

                        {/* Charts Area */}
                        <div className="flex flex-col lg:flex-row gap-6 mt-6">
                            {/* Main Line Chart Mockup */}
                            <div className="flex-1 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border border-gray-100 min-h-[300px] sm:min-h-[400px] flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-lg text-gray-800">แนวโน้มยอดขาย (Sales Trend)</h3>
                                </div>
                                <div className="flex-1 relative w-full flex items-end justify-between px-4 pb-8 pt-4">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <div key={i} className="border-b border-gray-100 w-full flex-[1_1_0]"></div>
                                        ))}
                                    </div>
                                    {/* SVG Graph Mock (Smooth curve) */}
                                    <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="revGradient" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M0,70 Q10,80 20,60 T40,50 T60,65 T80,40 T100,50 L100,100 L0,100 Z" fill="url(#revGradient)" />
                                        <path d="M0,70 Q10,80 20,60 T40,50 T60,65 T80,40 T100,50" fill="none" stroke="#3b82f6" strokeWidth="3" />
                                        {/* Points */}
                                        <circle cx="20" cy="60" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                                        <circle cx="40" cy="50" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                                        <circle cx="60" cy="65" r="4" fill="#fff" stroke="#3b82f6" strokeWidth="2" />
                                        <circle cx="80" cy="40" r="5" fill="#3b82f6" />
                                    </svg>
                                    {/* X-Axis Labels */}
                                    <div className="absolute bottom-0 inset-x-4 flex justify-between text-xs text-gray-400 font-medium z-10">
                                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Donut Chart Mockup */}
                            <div className="w-full lg:w-80 xl:w-96 bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border border-gray-100 flex flex-col">
                                <h3 className="font-bold text-lg text-gray-800 mb-6">สัดส่วนยอดขายตามหมวดหมู่</h3>
                                <div className="flex-1 flex flex-col items-center justify-center">
                                    <div className="w-48 h-48 rounded-full border-[16px] border-gray-100 relative mb-6">
                                        {/* CSS Hack for donut segments mockup */}
                                        <div className="absolute inset-0 rounded-full border-[16px] border-blue-500" style={{ clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 50%)' }}></div>
                                        <div className="absolute inset-0 rounded-full border-[16px] border-orange-400" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}></div>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-gray-400 text-xs font-bold">ยอดรวม</span>
                                            <span className="text-xl font-black text-gray-900">100%</span>
                                        </div>
                                    </div>
                                    <div className="w-full space-y-3">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="flex items-center gap-2 font-medium text-gray-700"><div className="w-3 h-3 rounded-full bg-blue-500"></div> อาหารจานหลัก</span>
                                            <span className="font-bold text-gray-900">75%</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="flex items-center gap-2 font-medium text-gray-700"><div className="w-3 h-3 rounded-full bg-orange-400"></div> เครื่องดื่ม</span>
                                            <span className="font-bold text-gray-900">25%</span>
                                        </div>
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
