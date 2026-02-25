import React, { useState } from 'react';
import { Search, List, Star, Grid, Coffee, Edit3, UserPlus, CreditCard, Banknote, X, CheckCircle, Tag, ShoppingBag, Trash2 } from 'lucide-react';
import { Product, CartItem, Table } from '../types';

export function POSScreen({
  products,
  tables,
  setTables,
  cartItems,
  setCartItems,
  onSimulateCustomerScan
}: {
  products: Product[];
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  cartItems: { product: Product, qty: number, orderedBy?: 'staff' | 'customer', status?: 'pending' | 'cooking' | 'served' }[];
  setCartItems: React.Dispatch<React.SetStateAction<{ product: Product, qty: number, orderedBy?: 'staff' | 'customer', status?: 'pending' | 'cooking' | 'served' }[]>>;
  onSimulateCustomerScan?: (table: Table) => void;
}) {
  // === STATE FOR MOCKUP ===
  const [member, setMember] = useState<{ name: string, phone: string, points: number, tier: string } | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'none' | 'cash' | 'qr'>('none');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Table Selection State
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<{ id: string, name: string } | null>(null);

  // Table Details State
  const [isTableDetailModalOpen, setIsTableDetailModalOpen] = useState(false);
  const [viewingTable, setViewingTable] = useState<{ id: string, name: string, status: string, detail: string } | null>(null);

  const [category, setCategory] = useState<'all' | 'bestseller'>('all');

  const [isFreeTableModalOpen, setIsFreeTableModalOpen] = useState(false);
  const [freeTableTarget, setFreeTableTarget] = useState<any>(null);

  const [isMoveTableModalOpen, setIsMoveTableModalOpen] = useState(false);
  const [moveTableTarget, setMoveTableTarget] = useState<any>(null);

  // QR Modal State
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [qrTableTarget, setQrTableTarget] = useState<Table | null>(null);

  const displayProducts = category === 'bestseller' ? products.filter((_, i) => i % 2 !== 0).slice(0, 3) : products;

  const handleSetCart = (newItems: any) => {
    setCartItems(newItems);
    // Auto sync to mockup tables if a table is selected
    if (selectedTable) {
      setTables(prev => prev.map(t => {
        if (t.id === selectedTable.id) {
          const resolvedItems = typeof newItems === 'function' ? newItems(cartItems) : newItems;
          return { ...t, items: resolvedItems };
        }
        return t;
      }));
    }
  };

  // คำนวณยอดรวม
  const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

  // --- Handlers ---
  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* 
      [TODO for Production]
      ตรงนี้จะต้องยิง API ไปที่ GET /api/users/:phone เพื่อดึงข้อมูลสมาชิกจาก Database
      เช่น supabase.from('users').select('*').eq('phone', phoneNumber)
    */
    // [Mockup Action]
    setMember({
      name: 'คุณ สมชาย ใจดี',
      phone: '0812345678',
      points: 1250,
      tier: 'Gold Member'
    });
    setIsMemberModalOpen(false);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert('กรุณาเลือกสินค้า');
    setIsPaymentModalOpen(true);
    setPaymentMethod('none');
    setPaymentSuccess(false);
  };

  const handleConfirmPayment = () => {
    /* 
      [TODO for Production]
      ตรงนี้คือจุดยิง API POST /api/payment/webhook (ดัก Event ชำระเงินสำเร็จ)
      และ POST /api/orders (บันทึกออเดอร์ลง Database)
      เมื่อเสร็จแล้วจึงจะ POST /api/line/send-message ส่งแต้มไปเตือนใน LINE หาลูกค้า
    */
    // [Mockup Action]
    setPaymentSuccess(true);
    // จำลอง Console Log การส่ง LINE
    if (member) {
      console.log(`[LINE API MOCKUP] ส่ง Flex Message ไปที่เบอร์ ${member.phone}`);
      console.log(`[LINE API MOCKUP] ข้อความ: คุณได้รับคะแนนเพิ่ม ${Math.floor(totalAmount / 20)} คะแนน ขอบคุณที่ใช้บริการ!`);
    }

    // Auto reset หลัง 3 วินาที
    setTimeout(() => {
      setIsPaymentModalOpen(false);
      setPaymentSuccess(false);
      setPaymentMethod('none');
      handleSetCart([]);
      setMember(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[100dvh] bg-gray-50 font-sans text-gray-800 w-full overflow-hidden relative">
      {/* --- Left Main Area --- */}
      <div className="flex-1 flex flex-col h-[60dvh] lg:h-full overflow-hidden lg:border-r border-gray-200">
        {/* Top Bar */}
        <div className="flex items-center gap-2 p-4 bg-white border-b border-gray-200 shrink-0 overflow-x-auto no-scrollbar">
          <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shrink-0"><List size={20} /></button>
          <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shrink-0"><Search size={20} /></button>

          <div className="flex items-center bg-gray-100 rounded-lg ml-0 sm:ml-2 overflow-hidden shrink-0">
            <div className="flex items-center gap-2 px-3 sm:px-4 py-3 bg-gray-200 text-gray-700 font-medium whitespace-nowrap text-sm sm:text-base">
              <Coffee size={18} />
              <span className="hidden sm:inline">ทานที่ร้าน</span>
            </div>
            <div className="px-3 sm:px-4 py-3 text-gray-500 text-xs sm:text-sm whitespace-nowrap">
              บิล : INC2302221111A000
            </div>
          </div>

          <div className="flex-1 min-w-[1rem]"></div>

          <button
            onClick={() => setIsTableModalOpen(true)}
            className={`px-4 sm:px-6 py-3 border rounded-lg font-medium transition-colors flex items-center gap-2 shrink-0 ${selectedTable ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
          >
            {selectedTable ? <span className="whitespace-nowrap">โต๊ะ: {selectedTable.name}</span> : <span className="whitespace-nowrap">เลือกโต๊ะ</span>}
          </button>
          <button
            onClick={() => setIsMemberModalOpen(true)}
            className={`px-4 sm:px-6 py-3 border rounded-lg font-medium transition-colors flex items-center gap-2 shrink-0 ${member ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}
          >
            <UserPlus size={18} />
            <span className="hidden sm:inline whitespace-nowrap">{member ? member.name : 'เพิ่มสมาชิก'}</span>
          </button>
        </div>

        <div className="flex gap-4 p-4 bg-white border-b border-gray-200 shrink-0 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setCategory('all')}
            className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl shadow-sm transition-transform hover:scale-105 shrink-0 ${category === 'all' ? 'bg-yellow-400' : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'}`}
          >
            <Grid size={24} className="mb-1 sm:mb-2 sm:w-[28px] sm:h-[28px]" />
            <span className="font-bold text-xs sm:text-sm">ทั้งหมด</span>
          </button>
          <button
            onClick={() => setCategory('bestseller')}
            className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl shadow-sm transition-transform hover:scale-105 shrink-0 ${category === 'bestseller' ? 'bg-yellow-400' : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'}`}
          >
            <Star size={24} className={`mb-1 sm:mb-2 sm:w-[28px] sm:h-[28px] ${category === 'bestseller' ? 'text-gray-900' : 'text-gray-700'}`} />
            <span className={`font-medium text-xs sm:text-sm ${category === 'bestseller' ? 'text-gray-900' : 'text-gray-700'}`}>สินค้าขายดี</span>
          </button>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayProducts.map((product: Product) => (
              <div
                key={product.id}
                onClick={() => {
                  const existing = cartItems.find(i => i.product.id === product.id);
                  if (existing) {
                    handleSetCart(cartItems.map(i => i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i));
                  } else {
                    handleSetCart([...cartItems, { product, qty: 1, orderedBy: 'staff' }]);
                  }
                }}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-yellow-400 transition-all cursor-pointer relative group"
              >
                <div className="h-32 bg-gray-200 relative overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-gray-900">฿ {product.price.toFixed(2)}</span>
                    <span className="text-xs text-gray-400">เตรียม {product.deliveryTime || '15 นาที'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Right Sidebar - Order --- */}
      <div className="w-full lg:w-[400px] xl:w-[450px] bg-white flex flex-col h-[40dvh] lg:h-full lg:shadow-[-4px_0_15px_rgba(0,0,0,0.03)] z-10 shrink-0 border-t lg:border-t-0 border-gray-200">
        <div className="p-3 sm:p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
          <h2 className="font-bold text-lg">ออเดอร์</h2>
          <span className="text-sm font-medium text-gray-600">ทั้งหมด {cartItems.reduce((acc, i) => acc + i.qty, 0)} รายการ</span>
        </div>

        {/* Order Table Header */}
        <div className="flex px-4 py-2 bg-gray-50 text-xs text-gray-500 font-medium border-b border-gray-200 shrink-0">
          <div className="flex-1">ชื่อรายการ</div>
          <div className="w-16 text-center">จำนวน</div>
          <div className="w-24 text-right">ยอดรวม</div>
        </div>

        {/* Order Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between items-start mb-2 pb-2 border-b border-gray-50">
                <div className="flex-1 pr-2">
                  <div className="font-medium text-sm text-gray-800">{item.product.name}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-2">
                    <span>สั่งโดย: {item.orderedBy === 'customer' ? <span className="text-blue-500 font-medium">ลูกค้า</span> : <span className="text-orange-500 font-medium">พนักงาน</span>}</span>
                    {item.status === 'served' && <span className="text-emerald-500 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">✔ เสิร์ฟแล้ว</span>}
                    {item.status === 'cooking' && <span className="text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded">กำลังทำ</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 text-center text-sm font-bold bg-gray-100 rounded px-2">{item.qty}</div>
                  <div className="w-16 text-right text-sm">{(item.product.price * item.qty).toFixed(2)}</div>
                  <button
                    onClick={() => handleSetCart(cartItems.filter((_, i) => i !== idx))}
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {cartItems.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
              <ShoppingBag className="w-12 h-12 text-gray-200" />
              <p>ยังไม่มีสินค้าในออเดอร์</p>
            </div>
          )}
        </div>

        {/* Member CRM Status */}
        {member && (
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 shrink-0">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-blue-900">{member.name}</span>
              <span className="text-xs font-bold px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full">{member.tier}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-700 flex items-center gap-1"><Tag size={14} /> คะแนนสะสมที่มี:</span>
              <span className="font-bold text-blue-800">{member.points} PTS</span>
            </div>
            <div className="flex justify-between items-center text-xs mt-1 text-green-600 font-medium">
              <span>* แต้มที่จะได้รับจากบิลนี้:</span>
              <span>+ {Math.floor(totalAmount / 20)} PTS</span>
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-gray-50 shrink-0">
          <div className="flex justify-between items-center mb-1 sm:mb-2">
            <span className="text-gray-600 text-sm sm:text-base">ยอดรวมสุทธิ</span>
            <span className="font-bold text-xl sm:text-2xl text-gray-900">฿ {totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex border-t border-gray-200 shrink-0">
          <button className="flex-1 py-4 sm:py-5 bg-gray-200 text-gray-700 font-bold sm:text-lg hover:bg-gray-300 transition-colors">
            พักบิล
          </button>
          <button
            onClick={handleCheckout}
            className={`flex-1 py-4 sm:py-5 font-bold sm:text-lg transition-colors ${cartItems.length > 0 ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : 'bg-yellow-200 text-gray-500 cursor-not-allowed'}`}
          >
            ชำระเงิน
          </button>
        </div>
      </div>

      {/* =========================================
          MOCKUP MODALS (for Presentation Use)
          ตรงนี้คือ UI จำลองการทำงานของระบบต่างๆ
          ========================================= */}

      {/* Table Selection Modal */}
      {isTableModalOpen && (
        <div className="absolute inset-0 z-[150] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-6 sm:p-8 w-full max-w-4xl shadow-2xl relative max-h-[90vh] overflow-y-auto no-scrollbar">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">Choose Tables</h3>
              <button onClick={() => setIsTableModalOpen(false)} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={24} /></button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-6 items-end justify-items-center">
              {tables.map(table => {
                const isFree = table.status === 'free';
                const isReserved = table.status === 'reserved';
                const borderClass = isFree ? 'border-emerald-400' : isReserved ? 'border-amber-400' : 'border-orange-500';

                return (
                  <div
                    key={table.id}
                    className={`flex flex-col items-center gap-2 cursor-pointer ${isFree ? 'hover:-translate-y-1 transition-transform' : 'hover:-translate-y-1 transition-transform opacity-90'}`}
                    onClick={() => {
                      if (isFree) {
                        setFreeTableTarget(table);
                        setIsFreeTableModalOpen(true);
                        setIsTableModalOpen(false);
                      } else {
                        setViewingTable(table);
                        setIsTableDetailModalOpen(true);
                        setIsTableModalOpen(false);
                      }
                    }}
                  >
                    {/* Top Chairs */}
                    <div className="flex gap-3">
                      {Array(table.seats / 2).fill(0).map((_, i) => <div key={`t-${i}`} className="w-10 h-3 bg-gray-300 rounded-full"></div>)}
                    </div>
                    {/* Table Body */}
                    <div className={`border-[4px] sm:border-[6px] rounded-3xl sm:rounded-[2.5rem] px-4 py-3 sm:px-6 sm:py-5 min-w-[120px] sm:min-w-[160px] text-center bg-white ${borderClass} shadow-sm`}>
                      <div className="font-extrabold text-base sm:text-lg text-gray-900 mb-1">{table.name}</div>
                      <div className="text-xs sm:text-sm font-medium text-gray-600 line-clamp-1 break-all">{table.detail}</div>
                    </div>
                    {/* Bottom Chairs */}
                    <div className="flex gap-3">
                      {Array(table.seats / 2).fill(0).map((_, i) => <div key={`b-${i}`} className="w-10 h-3 bg-gray-300 rounded-full"></div>)}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-12 p-5 bg-gray-50 rounded-2xl">
              <span className="font-bold text-gray-900">Table</span>
              <span className="flex items-center gap-2 text-sm font-medium text-gray-600"><div className="w-4 h-4 rounded-full bg-emerald-400 shadow-sm"></div> Free : {tables.filter(t => t.status === 'free').length}</span>
              <span className="flex items-center gap-2 text-sm font-medium text-gray-600"><div className="w-4 h-4 rounded-full bg-amber-400 shadow-sm"></div> Reserved : {tables.filter(t => t.status === 'reserved').length}</span>
              <span className="flex items-center gap-2 text-sm font-medium text-gray-600"><div className="w-4 h-4 rounded-full bg-orange-500 shadow-sm"></div> Checked-in : {tables.filter(t => t.status === 'checked-in').length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Table Details Modal (For Checked-in / Reserved) */}
      {isTableDetailModalOpen && viewingTable && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-extrabold text-gray-900">Table: {viewingTable.name}</h3>
                <p className="text-gray-500 font-medium">Status: {viewingTable.status === 'checked-in' ? 'Checked-in' : 'Reserved'} • {viewingTable.detail}</p>
              </div>
              <button
                onClick={() => {
                  setIsTableDetailModalOpen(false);
                  setIsTableModalOpen(true);
                }}
                className="text-gray-400 hover:bg-gray-100 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 min-h-[250px] mb-6 border border-gray-100 max-h-[400px] overflow-y-auto">
              <h4 className="font-bold text-gray-700 mb-4 pb-2 border-b border-gray-200">Order Items</h4>
              {viewingTable.status === 'checked-in' ? (
                <div className="space-y-3">
                  {viewingTable.items && viewingTable.items.length > 0 ? viewingTable.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">{item.qty}</div>
                        <span className="font-medium text-gray-800">{item.product.name}</span>
                      </div>
                      <span className="text-emerald-500 font-semibold text-sm">Served</span>
                    </div>
                  )) : (
                    <div className="flex items-center justify-center h-20 text-gray-400 italic font-medium">ไม่มีรายการอาหาร</div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 text-gray-400 font-medium italic">
                  No active orders for reserved table.
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setMoveTableTarget(viewingTable);
                  setIsTableDetailModalOpen(false);
                  setIsMoveTableModalOpen(true);
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
              >
                ย้ายโต๊ะ
              </button>
              {viewingTable.status === 'checked-in' && (
                <button
                  onClick={() => {
                    setSelectedTable(viewingTable);
                    handleSetCart(viewingTable.items || []);
                    setIsTableDetailModalOpen(false);
                  }}
                  className="flex-1 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30"
                >
                  เปิดดูออเดอร์ (โชว์ข้อมูลใน POS)
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Free Table Action Modal */}
      {isFreeTableModalOpen && freeTableTarget && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl relative text-center">
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">โต๊ะว่าง {freeTableTarget.name}</h3>
            <p className="text-gray-500 mb-8 mt-2">ต้องการเปิดโต๊ะและพิมพ์ QR Code สำหรับให้ลูกค้าสแกนสั่งอาหารเองหรือไม่?</p>
            <div className="flex gap-3">
              <button onClick={() => setIsFreeTableModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">ยกเลิก</button>
              <button onClick={() => {
                const newTable = { ...freeTableTarget, status: 'checked-in' as const, detail: 'Checked-in', items: [] };
                const updatedTables = tables.map(t => t.id === freeTableTarget.id ? newTable : t);
                setTables(updatedTables);
                setSelectedTable(newTable);
                handleSetCart([]);
                setIsFreeTableModalOpen(false);
                setQrTableTarget(newTable);
                setIsQRModalOpen(true);
              }} className="flex-1 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600">
                เปิดโต๊ะ & พิมพ์ QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Output Modal */}
      {isQRModalOpen && qrTableTarget && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-sm shadow-2xl text-center relative">
            <button onClick={() => setIsQRModalOpen(false)} className="absolute top-4 right-4 text-gray-400 p-2"><X size={24} /></button>

            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">โต๊ะ {qrTableTarget.name}</h3>
            <p className="text-gray-500 mb-6">สร้าง QR Code สั่งอาหารเสร็จสิ้น</p>

            <div className="w-56 h-56 mx-auto bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-4 mb-8 flex items-center justify-center relative shadow-sm">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Mock QR" className="w-full h-full opacity-80" />
            </div>

            <button onClick={() => {
              setIsQRModalOpen(false);
              if (onSimulateCustomerScan) onSimulateCustomerScan(qrTableTarget);
            }} className="w-full py-4 bg-yellow-400 text-gray-900 font-bold rounded-xl hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
              จำลองให้ลูกค้าสแกนเข้าแอป
            </button>
          </div>
        </div>
      )}

      {/* Move Table Modal */}
      {isMoveTableModalOpen && moveTableTarget && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-gray-900">ย้ายโต๊ะ {moveTableTarget.name} ไปยัง...</h3>
              <button onClick={() => setIsMoveTableModalOpen(false)} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full"><X size={24} /></button>
            </div>

            <p className="mb-4 text-gray-500">เลือกโต๊ะว่างเพื่อทำการย้ายข้อมูลลูกค้าและออเดอร์</p>
            <div className="grid grid-cols-3 gap-4">
              {tables.filter(t => t.status === 'free').map(table => (
                <button
                  key={table.id}
                  onClick={() => {
                    setTables(prev => prev.map(pt => {
                      if (pt.id === moveTableTarget.id) return { ...pt, status: 'free', detail: 'Free', items: [] };
                      if (pt.id === table.id) return { ...pt, status: moveTableTarget.status, detail: moveTableTarget.detail, items: moveTableTarget.items || [] };
                      return pt;
                    }));
                    setIsMoveTableModalOpen(false);
                  }}
                  className="py-6 border-2 border-emerald-400 rounded-2xl flex flex-col items-center justify-center hover:bg-emerald-50 transition-colors"
                >
                  <span className="font-extrabold text-xl text-gray-900">{table.name}</span>
                  <span className="text-sm text-emerald-500 font-medium">ว่าง (เก้าอี้ {table.seats})</span>
                </button>
              ))}
            </div>
            {tables.filter(t => t.status === 'free').length === 0 && (
              <div className="p-8 text-center text-gray-500 bg-gray-50 rounded-xl">ไม่มีโต๊ะว่างให้ย้ายในขณะนี้</div>
            )}
          </div>
        </div>
      )}

      {/* Member Selection Modal */}
      {isMemberModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="text-blue-500" /> ค้นหาสมาชิก (CRM)
              </h3>
              <button onClick={() => setIsMemberModalOpen(false)} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full"><X size={20} /></button>
            </div>
            <p className="text-sm text-gray-500 mb-6">จำลองระบบ: พิมพ์เบอร์โทรใดๆ แล้วกดค้นหา ระบบจะนำ Mock Data มาแสดงอัตโนมัติ</p>
            <form onSubmit={handleAddMember}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">เบอร์โทรศัพท์ (ใส่เบอร์ใดก็ได้)</label>
                <input type="text" placeholder="08x-xxx-xxxx" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">ยืนยัน / ค้นหา</button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Selection Modal */}
      {isPaymentModalOpen && !paymentSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">เลือกช่องทางชำระเงิน</h3>
              <button onClick={() => setIsPaymentModalOpen(false)} className="text-gray-400 hover:bg-gray-100 p-2 rounded-full"><X size={20} /></button>
            </div>

            <div className="text-center mb-6">
              <p className="text-sm text-gray-500">ยอดที่ต้องชำระ</p>
              <p className="text-4xl font-black text-gray-900">฿ {totalAmount.toFixed(2)}</p>
            </div>

            {paymentMethod === 'none' && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className="flex flex-col items-center justify-center h-32 border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all"
                >
                  <Banknote size={40} className="text-green-500 mb-2" />
                  <span className="font-bold text-gray-700">เงินสด (Cash)</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('qr')}
                  className="flex flex-col items-center justify-center h-32 border-2 border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <CreditCard size={40} className="text-blue-500 mb-2" />
                  <span className="font-bold text-gray-700">สแกนจ่าย (PromptPay)</span>
                </button>
              </div>
            )}

            {paymentMethod === 'cash' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">รับเงินมา (บาท)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">฿</span>
                    <input
                      type="number"
                      value={cashAmount}
                      onChange={(e) => setCashAmount(e.target.value)}
                      placeholder={totalAmount.toString()}
                      className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-green-500 rounded-xl outline-none"
                    />
                  </div>
                </div>
                {Number(cashAmount) >= totalAmount && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center text-lg">
                    <span className="text-gray-600">เงินทอน:</span>
                    <span className="font-bold text-gray-900 border-b-2 border-gray-900 px-2">฿ {(Number(cashAmount) - totalAmount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex gap-3">
                  <button onClick={() => setPaymentMethod('none')} className="flex-1 py-3 text-gray-600 bg-gray-100 rounded-xl font-bold">ย้อนกลับ</button>
                  <button
                    disabled={Number(cashAmount) < totalAmount}
                    onClick={handleConfirmPayment}
                    className="flex-1 py-3 text-white bg-green-500 rounded-xl font-bold disabled:opacity-50"
                  >
                    ยืนยันรับเงินสด
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === 'qr' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col items-center text-center">
                <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-bold mb-4">PromptPay / สแกนจ่ายทุกธนาคาร</div>
                {/* [TODO for Production] นำ src ออก และใช้รูปที่ได้จาก API Omise / GB Prime Pay */}
                <div className="w-56 h-56 bg-white border-2 border-gray-200 rounded-xl p-4 mb-6 shadow-sm flex items-center justify-center relative">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" alt="Mock QR" className="opacity-80" />
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px] flex items-center justify-center rounded-xl p-6 text-xs text-gray-500 font-medium">ภาพ QR Code จำลอง<br />(เชื่อมต่อ API สร้างจริงภายหลัง)</div>
                </div>

                <p className="text-sm text-gray-500 mb-6">กำลังรอข้อมูลจาก Webhook ภายนอก...</p>

                <div className="w-full flex gap-3">
                  <button onClick={() => setPaymentMethod('none')} className="flex-1 py-3 text-gray-600 bg-gray-100 rounded-xl font-bold">ยกเลิก</button>
                  {/* ปุ่มนี้ทำไว้จำลอง Webhook Response ว่า "ชำระเงินสำเร็จ" */}
                  <button onClick={handleConfirmPayment} className="flex-1 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-bold flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> (Simulator) กดจ่ายสำเร็จ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Success Result Screen */}
      {paymentSuccess && (
        <div className="absolute inset-0 z-[60] flex items-center justify-center bg-green-50 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] p-10 w-full max-w-sm shadow-2xl text-center border border-green-100 relative overflow-hidden">
            <div className="w-full h-2 bg-green-500 absolute top-0 left-0"></div>

            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
              <CheckCircle size={48} />
            </div>

            <h2 className="text-3xl font-black text-gray-900 mb-2">สำเร็จ!</h2>
            <p className="text-gray-500 mb-6">ชำระเงินเรียบร้อยแล้วบิล INC23022...A000</p>

            <div className="bg-gray-50 rounded-2xl p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">ยอดชำระ</p>
              <p className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3 mb-3">฿ {totalAmount.toFixed(2)}</p>

              {member && (
                <div className="text-left space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">ลูกค้า</span>
                    <span className="font-medium text-gray-900">{member.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-500 flex items-center gap-1"><Tag size={12} /> ได้คะแนนเพิ่ม</span>
                    <span className="font-bold text-blue-600">+{Math.floor(totalAmount / 20)} PTS</span>
                  </div>
                </div>
              )}
            </div>

            {member && (
              <div className="animate-pulse flex flex-col items-center justify-center p-3 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl text-xs font-bold mb-4">
                <span>🔔 [Simulator Alert]</span>
                <span>ระบบได้ส่งแจ้งเตือนเพิ่มคะแนนไปยัง LINE สมาชิกแล้ว</span>
              </div>
            )}

            <p className="text-sm text-gray-400">ระบบจะปิดอัตโนมัติ...</p>
          </div>
        </div>
      )}

    </div>
  );
}
