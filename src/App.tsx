import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { DetailScreen } from './components/DetailScreen';
import { CartScreen } from './components/CartScreen';
import { POSScreen } from './components/POSScreen';
import { CDPScreen } from './components/CDPScreen';
import { Product, CartItem, Table } from './types';
import { products } from './data';
import { Monitor, Smartphone, PieChart } from 'lucide-react';

export default function App() {
  const [appMode, setAppMode] = useState<'customer' | 'pos' | 'cdp'>('pos');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'detail' | 'cart'>('home');
  const [globalProducts, setGlobalProducts] = useState<Product[]>(products);
  const [customerTable, setCustomerTable] = useState<Table | null>(null);
  const [tables, setTables] = useState<Table[]>([
    { id: 't1', name: 'T1', status: 'reserved', detail: 'Jhon ciena 11:30am', seats: 4, items: [] },
    { id: 't2', name: 'T2', status: 'checked-in', detail: 'Checked-in', seats: 2, items: [{ product: products[0], qty: 2, orderedBy: 'customer', status: 'served' }, { product: products[1], qty: 1, orderedBy: 'staff', status: 'cooking' }] },
    { id: 't3', name: 'T3', status: 'reserved', detail: 'Kathryn 11:30pm', seats: 4, items: [] },
    { id: 't4', name: 'T4', status: 'checked-in', detail: 'Checked-in', seats: 2, items: [{ product: products[2], qty: 3, orderedBy: 'staff' }, { product: products[4], qty: 1, orderedBy: 'customer' }] },
    { id: 't5', name: 'T5', status: 'free', detail: 'Free', seats: 4, items: [] },
    { id: 't6', name: 'T6', status: 'checked-in', detail: 'Checked-in', seats: 4, items: [{ product: products[3], qty: 1, orderedBy: 'customer' }] },
    { id: 't7', name: 'T7', status: 'reserved', detail: 'Donald 11:30am', seats: 4, items: [] },
    { id: 't8', name: 'T8', status: 'free', detail: 'Free', seats: 6, items: [] },
    { id: 't9', name: 'T9', status: 'free', detail: 'Free', seats: 2, items: [] },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerTableInfo, setCustomerTableInfo] = useState<Table | null>(null);
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'c1', product: products[0], quantity: 1, size: 'M', orderedBy: 'customer', status: 'served' },
    { id: 'c2', product: products[1], quantity: 1, size: 'M', orderedBy: 'customer', status: 'cooking' },
  ]);

  const navigateTo = (screen: 'home' | 'detail' | 'cart', product?: Product) => {
    if (product) setSelectedProduct(product);
    setCurrentScreen(screen);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { id: `cart-${Date.now()}`, product, quantity: 1, size: 'M', orderedBy: 'customer' }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleSimulateCustomerScan = (table: Table) => {
    setCustomerTableInfo(table);
    setCart([]); // Empty the cart for a fresh start
    setAppMode('customer');
    setCurrentScreen('home');
  };

  const handleCustomerCheckout = () => {
    if (!customerTableInfo || cart.length === 0) return;

    // Add items to table
    const itemsToAdd = cart.map(c => ({
      product: c.product,
      qty: c.quantity,
      orderedBy: 'customer' as const,
      status: 'pending' as const
    }));

    setTables(prev => prev.map(t => {
      if (t.id === customerTableInfo.id) {
        return { ...t, items: [...(t.items || []), ...itemsToAdd] };
      }
      return t;
    }));

    setCart([]);
    setAppMode('pos');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans relative">
      {/* Mode Switcher */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:left-auto lg:top-4 lg:right-4 lg:bottom-auto z-[100] flex bg-white rounded-xl lg:rounded-lg shadow-2xl lg:shadow-lg overflow-hidden border border-gray-200 whitespace-nowrap">
        <button
          onClick={() => setAppMode('customer')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${appMode === 'customer' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Smartphone size={16} />
          Mobile App
        </button>
        <div className="w-px bg-gray-200"></div>
        <button
          onClick={() => setAppMode('pos')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${appMode === 'pos' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <Monitor size={16} />
          POS System
        </button>
        <div className="w-px bg-gray-200"></div>
        <button
          onClick={() => setAppMode('cdp')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${appMode === 'cdp' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
        >
          <PieChart size={16} />
          CDP System
        </button>
      </div>

      {appMode === 'customer' ? (
        <div className="flex items-center justify-center min-h-screen p-0 sm:p-8">
          <div className="w-full h-[100dvh] sm:h-[850px] sm:max-h-[90vh] sm:max-w-[400px] bg-white sm:rounded-[40px] shadow-2xl overflow-hidden relative">
            {currentScreen === 'home' && <HomeScreen products={globalProducts} onNavigate={navigateTo} customerTable={customerTableInfo} />}
            {currentScreen === 'detail' && selectedProduct && <DetailScreen product={selectedProduct} onNavigate={navigateTo} onAddToCart={() => addToCart(selectedProduct)} />}
            {currentScreen === 'cart' && <CartScreen cart={cart} onNavigate={navigateTo} onUpdateQuantity={updateQuantity} onCheckout={handleCustomerCheckout} />}
          </div>
        </div>
      ) : appMode === 'pos' ? (
        <POSScreen
          products={globalProducts}
          tables={tables}
          setTables={setTables}
          cartItems={cart.map(c => ({ product: c.product, qty: c.quantity, orderedBy: c.orderedBy, status: c.status }))}
          setCartItems={(newItems) => {
            // Unwrap Dispatcher format to array if needed, standard is function or array
            const items = typeof newItems === 'function' ? newItems(cart.map(c => ({ product: c.product, qty: c.quantity, orderedBy: c.orderedBy, status: c.status }))) : newItems;

            // Map {product, qty} back to CartItem
            setCart(items.map((item, idx) => ({
              id: `mapped-${idx}`,
              product: item.product,
              quantity: item.qty,
              size: 'M', // default size for fallback
              orderedBy: item.orderedBy || 'staff',
              status: item.status || 'pending'
            })));
          }}
          onSimulateCustomerScan={handleSimulateCustomerScan}
        />
      ) : (
        <CDPScreen products={globalProducts} setProducts={setGlobalProducts} tables={tables} setTables={setTables} />
      )}
    </div>
  );
}
