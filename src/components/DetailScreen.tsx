import React, { useState } from 'react';
import { ChevronLeft, Heart, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '../types';

export function DetailScreen({
  product,
  onNavigate,
  onAddToCart
}: {
  product: Product,
  onNavigate: (screen: 'home' | 'detail' | 'cart') => void,
  onAddToCart?: (qty: number) => void
}) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="h-full flex flex-col bg-[#1A1A1A] text-white overflow-y-auto no-scrollbar relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-10">
        <button onClick={() => onNavigate('home')} className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-black/40 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center hover:bg-black/40 transition-colors">
          <Heart size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="h-[45%] w-full relative shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="px-6 flex-1 flex flex-col -mt-10 relative z-10">
        {/* Pagination dots */}
        <div className="flex gap-1.5 mb-6">
          <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>

        <h1 className="text-4xl font-bold leading-tight mb-4 text-yellow-400">{product.name}</h1>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-end gap-3">
            <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-400 text-sm mb-1">Discount price</span>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 bg-gray-800 rounded-full py-2 px-4 shadow-inner">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-400 hover:text-white transition-colors"><Minus size={18} /></button>
            <span className="font-bold text-lg w-6 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="text-gray-400 hover:text-white transition-colors"><Plus size={18} /></button>
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          {product.description}
        </p>

        <div className="flex justify-between mb-8">
          <div>
            <p className="text-gray-500 text-xs mb-1">Calory</p>
            <p className="font-semibold">{product.calory}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Delivery Cost</p>
            <p className="font-semibold">{product.deliveryCost}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Delivery Time</p>
            <p className="font-semibold">{product.deliveryTime}</p>
          </div>
        </div>
      </div>

      {/* Bottom Action */}
      <div className="p-6 flex gap-4 mt-auto pb-8">
        <button
          onClick={() => onNavigate('cart')}
          className="w-16 h-16 shrink-0 bg-gray-800 rounded-2xl flex items-center justify-center text-white hover:bg-gray-700 active:bg-gray-600 transition-colors"
        >
          <ShoppingBag size={24} />
        </button>
        <button
          className="flex-1 bg-yellow-400 text-black rounded-2xl flex items-center justify-center font-bold text-lg relative overflow-hidden group hover:bg-yellow-500 active:bg-yellow-600 transition-colors"
          onClick={() => {
            if (onAddToCart) onAddToCart(quantity);
            onNavigate('home');
          }}
        >
          Add to Cart &nbsp; • &nbsp; ${(product.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
