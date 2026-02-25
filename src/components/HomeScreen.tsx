import React, { useState } from 'react';
import { Home, Search, ShoppingBag, Settings, Utensils, Coffee, Pizza, IceCream, Clock, CakeSlice, Gamepad2 } from 'lucide-react';
import { Product, Table } from '../types';

export function HomeScreen({ products, onNavigate, customerTable, cartItemCount }: { products: Product[], onNavigate: (screen: 'home' | 'detail' | 'cart', product?: Product) => void, customerTable?: Table | null, cartItemCount?: number }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden relative">
      <div className="flex-1 overflow-y-auto pb-28 no-scrollbar">
        {/* Header */}
        <div className="px-6 pt-12 pb-6 flex justify-between items-center">
          <div></div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900 leading-tight">โต๊ะ {customerTable?.name || 'T2'}</p>
              <p className="text-xs text-gray-500">สถานะ: ทานที่ร้าน</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center cursor-pointer shadow-inner border-2 border-white outline outline-2 outline-blue-200">
              <strong className="text-xl">{customerTable?.name || 'T2'}</strong>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="px-6 mb-8">
          <h1 className="text-4xl font-extrabold leading-tight">
            <span className="text-yellow-500">Best meal</span><br />
            <span className="text-gray-900">in the world</span>
          </h1>
        </div>

        {/* Categories */}
        <div className="px-6 mb-8 flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {[Utensils, Coffee, Pizza, IceCream, Clock, CakeSlice].map((Icon, i) => (
            <div key={i} className="w-14 h-14 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-yellow-400 hover:text-white transition-colors cursor-pointer">
              <Icon size={24} />
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="px-6 mb-6">
          <div className="bg-gray-50 rounded-2xl flex items-center px-4 py-3 border border-gray-100 focus-within:ring-2 focus-within:ring-yellow-400 transition-shadow">
            <Search className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="ค้นหาเมนูอาหาร..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none w-full text-gray-800 font-medium placeholder:font-normal"
            />
          </div>
        </div>

        {/* Menu Grid */}
        <div className="px-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-6 bg-yellow-400 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-900">Salads menu</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                className={`rounded-3xl overflow-hidden cursor-pointer ${i % 2 !== 0 ? 'mt-8' : ''}`}
                onClick={() => onNavigate('detail', product)}
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-3xl" />
                <div className="pt-3 pb-1">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{product.name}</h3>
                  <p className="font-bold text-gray-900">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-[352px] bg-[#1A1A1A] rounded-3xl py-4 px-8 flex justify-between items-center shadow-2xl z-50">
        <button className="text-yellow-400 relative">
          <Home size={24} />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></span>
        </button>
        <button className="text-gray-400 hover:text-white transition-colors" onClick={() => document.querySelector('input')?.focus()}><Search size={24} /></button>
        <button className="text-gray-400 hover:text-white transition-colors relative" onClick={() => onNavigate('cart')}>
          <ShoppingBag size={24} />
          {cartItemCount && cartItemCount > 0 ? (
            <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#1A1A1A]">
              {cartItemCount}
            </span>
          ) : null}
        </button>
        <button className="text-gray-400 hover:text-white transition-colors"><Gamepad2 size={24} /></button>
      </div>
    </div>
  );
}
