import React from 'react';
import { ChevronRight, Truck, ChevronLeft, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

export function CartScreen({ cart, onNavigate, onUpdateQuantity, onCheckout }: { cart: CartItem[], onNavigate: (screen: 'home' | 'detail' | 'cart') => void, onUpdateQuantity?: (id: string, delta: number) => void, onCheckout?: () => void }) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-6">
        {/* Header */}
        <div className="pt-12 pb-8 text-center relative px-6">
          <button onClick={() => onNavigate('home')} className="absolute left-6 top-12 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <ChevronLeft size={24} className="text-gray-900" />
          </button>
          <h1 className="text-3xl font-extrabold text-gray-900">Your Bag</h1>
          <p className="text-gray-500 text-sm mt-1">{cart.length} items</p>
        </div>

        {/* Items */}
        <div className="px-6 flex-1 flex flex-col gap-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 leading-tight mb-1 pr-4">{item.product.name}</h3>
                <p className="font-bold text-gray-900">${item.product.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-bold hover:bg-gray-200"
                ><Minus size={16} /></button>
                <span className="font-bold w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold hover:bg-yellow-500"
                ><Plus size={16} /></button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div className="p-6 bg-white shrink-0 border-t border-gray-100 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 font-medium">Items: {cart.length}</span>
            <span className="text-xs text-gray-400">Tax included</span>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">Total:</p>
            <p className="text-3xl font-extrabold text-gray-900">${total.toFixed(2)}</p>
          </div>
        </div>

        <button className="w-full bg-yellow-400 text-black rounded-2xl py-5 flex items-center justify-center font-bold text-lg relative group hover:bg-yellow-500 transition-colors" onClick={() => { if (onCheckout) onCheckout(); else onNavigate('home'); }}>
          <span className="absolute left-6 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ChevronRight size={20} />
          </span>
          Checkout
        </button>
      </div>
    </div>
  );
}
