import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, CheckCircle2, Clock, MapPin, Coffee, Utensils, ShoppingBag } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [orderType, setOrderType] = useState<'dine-in' | 'pickup' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 4 (Bar Corner)');
  const [deliveryAddress, setDeliveryAddress] = useState('Road 9/A, Dhanmondi');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderSlip, setOrderSlip] = useState<{ id: string; time: string } | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const vat = Math.round(subtotal * 0.05); // 5% VAT
  const total = subtotal + vat;

  const handleCheckout = () => {
    const orderId = `LC-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setOrderSlip({ id: orderId, time: now });
    setIsSubmitted(true);
  };

  const handleFinish = () => {
    setIsSubmitted(false);
    setOrderSlip(null);
    onClearCart();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div 
        className="w-full max-w-lg bg-[#181514] border border-[#342d2a] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#342d2a] flex items-center justify-between bg-[#151312]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#d49b5b]/20 flex items-center justify-center text-[#d49b5b]">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white font-medium">Your Barista Tray</h3>
              <p className="text-xs text-[#d5c4b4]">{CAFE_INFO.name} • Satmasjid Road</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#221f1e] hover:bg-[#2c2928] text-[#d5c4b4] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted && orderSlip ? (
          /* Confirmation Screen */
          <div className="p-6 space-y-5 text-center flex-1 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#d49b5b] font-bold">Order Received</span>
              <h3 className="text-2xl font-serif text-white font-medium">Fired to Barista Station</h3>
              <p className="text-sm text-[#d5c4b4]">
                Your handcrafted items are being freshly prepped with precision timing.
              </p>
            </div>

            <div className="bg-[#221f1e] p-4 rounded-xl border border-[#342d2a] text-left space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-[#342d2a] pb-2">
                <span className="text-[#9d8e80]">Order Reference</span>
                <span className="font-mono font-bold text-[#f8bb78]">{orderSlip.id}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-[#342d2a] pb-2">
                <span className="text-[#9d8e80]">Placement Time</span>
                <span className="text-white font-medium">{orderSlip.time}</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-[#342d2a] pb-2">
                <span className="text-[#9d8e80]">Order Type</span>
                <span className="text-white capitalize">{orderType === 'dine-in' ? tableNumber : orderType}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-1">
                <span className="text-[#9d8e80]">Estimated Preparation</span>
                <span className="text-[#f8bb78] font-semibold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 12 – 15 mins
                </span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 px-4 rounded-xl bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] font-semibold text-sm shadow-lg transition-all"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="p-8 text-center flex-1 flex flex-col items-center justify-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#221f1e] text-[#9d8e80] flex items-center justify-center">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-lg text-white">Your tray is empty</h4>
            <p className="text-sm text-[#d5c4b4] max-w-xs">
              Explore our freshly pulled single-origins, Sunset Matcha, or hot artisanal melts to begin.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2.5 rounded-lg bg-[#d49b5b] text-[#482900] font-semibold text-sm hover:bg-[#f8bb78] transition-colors"
            >
              Browse Curated Menu
            </button>
          </div>
        ) : (
          /* Active Cart List */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Order Fulfillment Options */}
            <div className="px-4 py-3 bg-[#1d1b1a] border-b border-[#342d2a]">
              <div className="grid grid-cols-3 gap-2 text-xs font-medium">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    orderType === 'dine-in'
                      ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                      : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                  }`}
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Dine-In</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    orderType === 'pickup'
                      ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                      : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                  }`}
                >
                  <Coffee className="w-3.5 h-3.5" />
                  <span>Pickup</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                    orderType === 'delivery'
                      ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                      : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Dhanmondi</span>
                </button>
              </div>

              {orderType === 'dine-in' && (
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-xs text-[#9d8e80] shrink-0">Table / Alcove:</span>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="e.g. Table 4 / Study Corner"
                    className="flex-1 px-2.5 py-1 text-xs rounded bg-[#221f1e] border border-[#342d2a] text-white focus:outline-none focus:border-[#d49b5b]"
                  />
                </div>
              )}

              {orderType === 'delivery' && (
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-xs text-[#9d8e80] shrink-0">Address:</span>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House, Road, Dhanmondi"
                    className="flex-1 px-2.5 py-1 text-xs rounded bg-[#221f1e] border border-[#342d2a] text-white focus:outline-none focus:border-[#d49b5b]"
                  />
                </div>
              )}
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((cartItem) => (
                <div 
                  key={cartItem.menuItem.id}
                  className="p-3 rounded-xl bg-[#221f1e] border border-[#342d2a]/80 flex gap-3 items-center"
                >
                  <img 
                    src={cartItem.menuItem.imageUrl} 
                    alt={cartItem.menuItem.name} 
                    className="w-16 h-16 rounded-lg object-cover shrink-0 bg-[#100e0d]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate whitespace-nowrap">{cartItem.menuItem.name}</h4>
                    <span className="text-xs text-[#d49b5b] font-semibold whitespace-nowrap">৳{cartItem.menuItem.price}</span>
                    <p className="text-[11px] text-[#9d8e80] truncate whitespace-nowrap">{cartItem.menuItem.notes}</p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex items-center bg-[#181514] border border-[#342d2a] rounded-lg">
                      <button 
                        onClick={() => onUpdateQuantity(cartItem.menuItem.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-[#d5c4b4] hover:text-white transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold text-white">
                        {cartItem.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(cartItem.menuItem.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#d5c4b4] hover:text-white transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button 
                      onClick={() => onRemoveItem(cartItem.menuItem.id)}
                      className="w-7 h-7 flex items-center justify-center text-[#9d8e80] hover:text-red-400 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Special Instructions */}
              <div className="pt-1">
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special instructions for Barista (e.g. oat milk, less ice)..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#221f1e] border border-[#342d2a] text-white placeholder:text-[#9d8e80] focus:outline-none focus:border-[#d49b5b]"
                />
              </div>
            </div>

            {/* Price Breakdown & Action */}
            <div className="p-4 sm:p-5 bg-[#151312] border-t border-[#342d2a] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#d5c4b4]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-white">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#9d8e80]">
                  <span>Govt. VAT (5%)</span>
                  <span>৳{vat}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-[#342d2a]">
                  <span>Total Payable</span>
                  <span className="text-[#f8bb78] text-base">৳{total}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#9d8e80] justify-center">
                <Clock className="w-3.5 h-3.5 text-[#d49b5b]" />
                <span>Estimated prep time: 12–15 mins • Cash / bKash at counter</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] font-semibold text-sm shadow-[0_4px_20px_rgba(212,155,91,0.25)] flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Confirm & Place Order</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
