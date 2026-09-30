/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem } from './types';
import { BARISTA_STORIES, MENU_ITEMS } from './data/coffeeData';
import { DesktopView } from './components/DesktopView';
import { MobileView } from './components/MobileView';
import { SocialFeedView } from './components/SocialFeedView';
import { StoryModal } from './components/StoryModal';
import { CartDrawer } from './components/CartDrawer';
import { ReservationModal } from './components/ReservationModal';
import { Monitor, Smartphone, MessageCircle, ShoppingBag, Sparkles, Check } from 'lucide-react';

export default function App() {
  // Screen mode: 'desktop' | 'mobile-home' | 'mobile-menu' | 'social-feed'
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile-home' | 'mobile-menu' | 'social-feed'>('desktop');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Reservation modal
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  // Story modal
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const cartTotal = cartItems.reduce((acc, curr) => acc + curr.menuItem.price * curr.quantity, 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleAddToCart = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.menuItem.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.menuItem.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
    showToast(`Added ${item.name} to Barista Tray (৳${item.price})`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.menuItem.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.menuItem.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSpecialFromStory = (storyTitle: string) => {
    const match = MENU_ITEMS.find((m) =>
      storyTitle.toLowerCase().includes(m.name.toLowerCase().split(' ')[0])
    ) || MENU_ITEMS[0];
    handleAddToCart(match);
  };

  return (
    <div className="min-h-screen bg-[#100e0d] text-[#e8e1df] flex flex-col font-sans selection:bg-[#d49b5b] selection:text-[#100e0d]">
      {/* Top Experience Switcher Bar (Allowing seamless switching between the screens from the user images) */}
      <div className="sticky top-0 z-50 bg-[#100e0d]/95 backdrop-blur-md border-b border-[#342d2a] px-3 py-2 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#f8bb78] animate-pulse hidden sm:inline-block" />
          <span className="font-semibold text-white tracking-wide text-xs">
            The Local Coffee
          </span>
          <span className="text-[#9d8e80] hidden md:inline">| Dhanmondi Sanctuary</span>
        </div>

        {/* View Switcher Buttons */}
        <div className="flex items-center gap-1 bg-[#1d1b1a] p-1 rounded-xl border border-[#342d2a]">
          <button
            onClick={() => setViewMode('desktop')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs ${
              viewMode === 'desktop'
                ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                : 'text-[#d5c4b4] hover:text-white'
            }`}
            title="Desktop Editorial Website (Image 3)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewMode('mobile-home')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs ${
              viewMode === 'mobile-home'
                ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                : 'text-[#d5c4b4] hover:text-white'
            }`}
            title="Mobile App - Home (Image 5)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>App Home</span>
          </button>

          <button
            onClick={() => setViewMode('mobile-menu')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs ${
              viewMode === 'mobile-menu'
                ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                : 'text-[#d5c4b4] hover:text-white'
            }`}
            title="Mobile App - Menu & Order (Image 7)"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>App Menu</span>
          </button>

          <button
            onClick={() => setViewMode('social-feed')}
            className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all text-xs ${
              viewMode === 'social-feed'
                ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                : 'text-[#d5c4b4] hover:text-white'
            }`}
            title="Social & Facebook Community Feed (Image 1)"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Community</span>
          </button>
        </div>

        {/* Global Cart Count Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-2.5 py-1.5 rounded-lg bg-[#221f1e] hover:bg-[#2c2928] text-[#f8bb78] text-xs font-semibold flex items-center gap-1.5 border border-[#342d2a]"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Tray</span>
          {cartCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#d49b5b] text-[#100e0d] font-bold text-[10px] flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Screen Views */}
      <main className="flex-1 w-full">
        {viewMode === 'desktop' && (
          <DesktopView
            onAddToCart={handleAddToCart}
            onOpenReserve={() => setIsReserveModalOpen(true)}
            onOpenStories={(idx = 0) => setActiveStoryIndex(idx)}
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
          />
        )}

        {viewMode === 'mobile-home' && (
          <div className="py-4 px-2 sm:px-4 bg-[#100e0d] min-h-[calc(100vh-48px)] flex justify-center">
            <MobileView
              initialTab="home"
              onAddToCart={handleAddToCart}
              onOpenReserve={() => setIsReserveModalOpen(true)}
              onOpenStories={(idx) => setActiveStoryIndex(idx)}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        )}

        {viewMode === 'mobile-menu' && (
          <div className="py-4 px-2 sm:px-4 bg-[#100e0d] min-h-[calc(100vh-48px)] flex justify-center">
            <MobileView
              initialTab="menu"
              onAddToCart={handleAddToCart}
              onOpenReserve={() => setIsReserveModalOpen(true)}
              onOpenStories={(idx) => setActiveStoryIndex(idx)}
              cartCount={cartCount}
              cartTotal={cartTotal}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        )}

        {viewMode === 'social-feed' && (
          <div className="py-6 px-2 sm:px-4 bg-[#100e0d] min-h-[calc(100vh-48px)]">
            <SocialFeedView
              onOrderSpecialItem={(itemName) => {
                const match = MENU_ITEMS.find((m) => m.name.toLowerCase().includes(itemName.toLowerCase())) || MENU_ITEMS[0];
                handleAddToCart(match);
              }}
            />
          </div>
        )}
      </main>

      {/* Barista Stories Modal (Instagram / Facebook Stories Player) */}
      <StoryModal
        stories={BARISTA_STORIES}
        initialIndex={activeStoryIndex ?? 0}
        isOpen={activeStoryIndex !== null}
        onClose={() => setActiveStoryIndex(null)}
        onOrderSpecial={handleOrderSpecialFromStory}
      />

      {/* Cart & Barista Tray Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Table Reservation Modal */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
      />

      {/* Global Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 animate-slideDown pointer-events-none">
          <div className="px-4 py-2 rounded-full bg-[#181514] text-[#f8bb78] text-xs font-semibold shadow-2xl border border-[#d49b5b]/50 flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
