import React from 'react';
import { ChevronLeft, Heart, ShoppingBag, ChevronRight } from 'lucide-react';
import { Product } from '../types';

export function DetailScreen({
  product,
  onNavigate,
  onAddToCart
}: {
  product: Product,
  onNavigate: (screen: 'home' | 'detail' | 'cart') => void,
  onAddToCart?: () => void
}) {
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

        <h1 className="text-4xl font-bold leading-tight mb-4">{product.name}</h1>

        <div className="flex items-end gap-3 mb-6">
          <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm mb-1">Discount price</span>
          )}
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
          onClick={() => {
            if (onAddToCart) onAddToCart();
            // Optional visual feedback could go here
          }}
          className="w-16 h-16 shrink-0 bg-white rounded-2xl flex items-center justify-center text-black hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <ShoppingBag size={24} />
        </button>
        <button
          className="flex-1 bg-yellow-400 text-black rounded-2xl flex items-center justify-center font-bold text-lg relative overflow-hidden group hover:bg-yellow-500 active:bg-yellow-600 transition-colors"
          onClick={() => {
            if (onAddToCart) onAddToCart();
            onNavigate('cart');
          }}
        >
          <span className="absolute left-6 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ChevronRight size={20} />
          </span>
          Checkout
        </button>
      </div>
    </div>
  );
}
