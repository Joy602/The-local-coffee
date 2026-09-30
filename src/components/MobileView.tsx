import React, { useState, useMemo } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS, BARISTA_STORIES, CAFE_INFO, LOGO_URL } from '../data/coffeeData';
import { 
  Menu as MenuIcon, 
  Phone, 
  Search, 
  X, 
  Plus, 
  Check, 
  ChevronRight, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Wifi, 
  Zap, 
  Moon, 
  Compass, 
  Utensils, 
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Coffee
} from 'lucide-react';

interface MobileViewProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenReserve: () => void;
  onOpenStories: (index: number) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  initialTab?: 'home' | 'menu' | 'reserve' | 'location';
}

export const MobileView: React.FC<MobileViewProps> = ({
  onAddToCart,
  onOpenReserve,
  onOpenStories,
  cartCount,
  cartTotal,
  onOpenCart,
  initialTab = 'home'
}) => {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'reserve' | 'location'>(initialTab);
  
  // Home Screen Brew Bar Filter
  const [homeBrewCategory, setHomeBrewCategory] = useState<'espresso' | 'refreshers' | 'melts'>('espresso');

  // Menu Screen Search & Filter
  const [menuSearch, setMenuSearch] = useState('');
  const [menuFilter, setMenuFilter] = useState<'all' | 'melts' | 'coffee' | 'iced' | 'bakes'>('all');

  // Drawer / Side Menu
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  // Quick reservation form state (for Reserve Tab)
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resDate, setResDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [resSlot, setResSlot] = useState('Late Night (9:00 PM - 12:00 AM)');
  const [resParty, setResParty] = useState('2 Persons (Cozy Date)');
  const [resConfirmed, setResConfirmed] = useState(false);

  // Filtered menu items for Menu tab
  const filteredMenuItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = menuFilter === 'all' || item.category === menuFilter;
      const matchesSearch = 
        item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(menuSearch.toLowerCase()) ||
        (item.notes && item.notes.toLowerCase().includes(menuSearch.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [menuFilter, menuSearch]);

  // Home screen Brew Bar items
  const homeBrewItems = useMemo(() => {
    if (homeBrewCategory === 'espresso') {
      return MENU_ITEMS.filter((i) => i.category === 'coffee');
    } else if (homeBrewCategory === 'refreshers') {
      return MENU_ITEMS.filter((i) => i.category === 'iced');
    } else {
      return MENU_ITEMS.filter((i) => i.category === 'melts');
    }
  }, [homeBrewCategory]);

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResConfirmed(true);
    setTimeout(() => {
      setResConfirmed(false);
      setResName('');
      setResPhone('');
    }, 5000);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[#151312] text-[#e8e1df] min-h-screen relative flex flex-col pb-24 shadow-2xl border-x border-[#342d2a]/60">
      {/* Fixed Mobile Top Bar */}
      <header className="sticky top-0 w-full z-40 bg-[#151312]/90 backdrop-blur-xl border-b border-[#342d2a]/60 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#e8e1df] hover:text-[#f8bb78] active:scale-95 transition-all"
            aria-label="Open Menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <span className="font-serif text-base text-[#f8bb78] tracking-tight leading-none font-semibold">
              The Local Coffee
            </span>
            <span className="font-label-caps text-[9px] text-[#d5c4b4] tracking-wider mt-0.5">
              Dhanmondi
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('reserve')}
            className="min-h-[36px] px-3.5 py-1.5 rounded-full bg-[#d49b5b] text-[#482900] text-xs font-bold flex items-center gap-1.5 shadow-[0_0_16px_rgba(212,155,91,0.25)] hover:bg-[#f8bb78] transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Reserve</span>
          </button>

          <div 
            onClick={() => onOpenStories(0)}
            className="w-9 h-9 rounded-full ring-2 ring-[#d49b5b]/50 p-0.5 cursor-pointer hover:scale-105 transition-transform"
          >
            <img 
              src={LOGO_URL} 
              alt="Avatar" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Side Slide-Out Navigation */}
      {isSideMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex">
          <div className="w-72 bg-[#181514] border-r border-[#342d2a] h-full p-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#342d2a]">
                <div className="flex items-center gap-2.5">
                  <img src={LOGO_URL} alt="Logo" className="w-9 h-9 rounded-full" />
                  <div>
                    <h4 className="font-serif text-sm text-white font-medium">{CAFE_INFO.name}</h4>
                    <span className="text-[10px] text-[#f8bb78] uppercase">{CAFE_INFO.tagline}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsSideMenuOpen(false)}
                  className="w-7 h-7 rounded-full bg-[#221f1e] text-[#d5c4b4] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5 text-sm font-medium">
                <button
                  onClick={() => { setActiveTab('home'); setIsSideMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'home' ? 'bg-[#d49b5b] text-[#482900] font-bold' : 'text-[#d5c4b4] hover:bg-[#221f1e]'
                  }`}
                >
                  <Coffee className="w-4 h-4" />
                  <span>Sanctuary Home</span>
                </button>
                <button
                  onClick={() => { setActiveTab('menu'); setIsSideMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'menu' ? 'bg-[#d49b5b] text-[#482900] font-bold' : 'text-[#d5c4b4] hover:bg-[#221f1e]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Curated Menu & Specials</span>
                </button>
                <button
                  onClick={() => { setActiveTab('reserve'); setIsSideMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'reserve' ? 'bg-[#d49b5b] text-[#482900] font-bold' : 'text-[#d5c4b4] hover:bg-[#221f1e]'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>Table & Study Alcoves</span>
                </button>
                <button
                  onClick={() => { setActiveTab('location'); setIsSideMenuOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 ${
                    activeTab === 'location' ? 'bg-[#d49b5b] text-[#482900] font-bold' : 'text-[#d5c4b4] hover:bg-[#221f1e]'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Dhanmondi Location & Hours</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#342d2a] space-y-2">
              <a
                href={`tel:${CAFE_INFO.phoneTel}`}
                className="w-full py-2.5 px-3 rounded-lg bg-[#2c2928] text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#f8bb78]" />
                <span>Call {CAFE_INFO.phone}</span>
              </a>
              <p className="text-[10px] text-center text-[#9d8e80]">
                Satmasjid Road • Open till 2:00 AM weekends
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 1: MOBILE HOME (Matching Image 5) */}
      {/* ======================================================== */}
      {activeTab === 'home' && (
        <div className="flex flex-col w-full animate-fadeIn">
          {/* Hero Section */}
          <section className="px-4 pt-3 pb-4">
            <div className="relative w-full rounded-2xl overflow-hidden bg-[#221f1e] shadow-2xl p-5 flex flex-col justify-end min-h-[340px] border border-[#342d2a]">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvWq2uSf19fFVMhsDHToft3S0GQKYgEG4DPmEn1k7ajLUZA-OJ4wdkkd8UR8bmkeZcul9N_jaOxYeYGzrkt7RhBi92bnjwzOB4AKfaL98O519oj8anhd6qHOSo4Uwp7pru1ME8Z_H9Y9WFsvR_fuZvoXCvwZ48Ylimr80WRQ-Mp_k50_8f_YJLE8t1B9KM-KmupPB0Yidm36NnOHmeh_bu0dWaciYn9hmCRtO6aGtDARR3AYMxIjDb')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-[#151312]/80 to-[#151312]/40" />

              <div className="relative z-10 flex flex-col gap-2.5">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#373433]/90 backdrop-blur-md text-[#f8bb78] font-label-caps text-[10px] tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f8bb78] animate-pulse" />
                    Specialty Roasters
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#373433]/90 backdrop-blur-md text-[#d5c4b4] font-label-caps text-[10px] uppercase">
                    <Clock className="w-3 h-3 text-[#f8bb78]" />
                    Open till 2:00 AM
                  </span>
                </div>

                <h1 className="font-serif text-2xl text-white tracking-tight leading-snug">
                  Where Craft Coffee Meets Community
                </h1>

                <p className="text-xs text-[#d5c4b4] leading-relaxed max-w-[280px]">
                  Artisanal pour-overs, gooey toasted melts, and midnight conversations nestled in the heart of Dhanmondi.
                </p>

                {/* CTA Row */}
                <div className="flex items-center gap-2.5 pt-2">
                  <button 
                    onClick={() => setActiveTab('menu')}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#d49b5b] text-[#482900] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#d49b5b]/20 active:scale-95 transition-all"
                  >
                    <Coffee className="w-4 h-4" />
                    <span>Explore Menu</span>
                  </button>

                  <a 
                    href={`tel:${CAFE_INFO.phoneTel}`}
                    className="w-10 h-10 rounded-xl bg-[#2c2928] text-[#f8bb78] flex items-center justify-center active:scale-95 transition-all border border-[#342d2a]"
                    aria-label="Call Direct"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Barista Stories Horizontal Bubbles */}
          <section className="w-full px-4 py-2">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-label-caps text-[10px] text-[#9d8e80] uppercase tracking-widest">
                Barista Stories
              </span>
              <button 
                onClick={() => onOpenStories(0)}
                className="text-xs font-semibold text-[#f8bb78] flex items-center gap-0.5 hover:underline"
              >
                <span>Live Brews</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-1">
              {BARISTA_STORIES.map((story, idx) => (
                <button
                  key={story.id}
                  onClick={() => onOpenStories(idx)}
                  className="flex flex-col items-center gap-1.5 flex-none group focus:outline-none"
                >
                  <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#f8bb78] via-[#efbe82] to-[#d49b5b] group-hover:scale-105 transition-transform shadow-md">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full rounded-full object-cover bg-black"
                    />
                  </div>
                  <span className="text-[11px] font-medium text-[#e8e1df] group-hover:text-[#f8bb78] transition-colors">
                    {story.badge}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Six New Reasons to Visit Carousel */}
          <section className="w-full px-4 pt-4 pb-2">
            <div className="flex items-end justify-between mb-3">
              <div>
                <span className="font-label-caps text-[10px] text-[#f8bb78] tracking-widest uppercase block mb-0.5">
                  Seasonal Menu Drop
                </span>
                <h2 className="font-serif text-lg text-white font-medium">
                  Six New Reasons to Visit
                </h2>
              </div>
              <span className="text-[10px] font-bold text-[#d5c4b4] bg-[#221f1e] px-2 py-0.5 rounded-full border border-[#342d2a]">
                New Arrivals
              </span>
            </div>

            <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory">
              {MENU_ITEMS.filter((i) => i.isHeroSpecial).map((item) => (
                <div
                  key={item.id}
                  className="w-[240px] flex-none snap-start flex flex-col rounded-2xl bg-[#221f1e] overflow-hidden border border-[#342d2a] shadow-lg"
                >
                  <div className="relative h-40 w-full bg-[#100e0d]">
                    <img
                      src={item.imageUrl}
                      alt={item.altText}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#221f1e] via-transparent to-transparent" />
                    {item.badge && (
                      <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-[#100e0d]/80 backdrop-blur-md text-[#f8bb78] font-label-caps text-[9px] uppercase">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 w-full">
                        <h3 className="font-serif text-sm font-medium text-white truncate whitespace-nowrap flex-1 min-w-0">
                          {item.name}
                        </h3>
                        <span className="font-price-display text-sm text-[#f8bb78] shrink-0 whitespace-nowrap pl-1">
                          ৳{item.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#d5c4b4] mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onAddToCart(item)}
                      className="w-full py-1.5 px-3 rounded-lg bg-[#2c2928] hover:bg-[#d49b5b] hover:text-[#482900] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors active:scale-95 whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5 shrink-0" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interactive Craft Brew Bar */}
          <section className="w-full px-4 pt-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="font-label-caps text-[10px] text-[#9d8e80] uppercase tracking-wider block">
                  Artisanal Selection
                </span>
                <h2 className="font-serif text-lg text-white font-medium">Craft Brew Bar</h2>
              </div>
              <button 
                onClick={() => setActiveTab('menu')}
                className="text-xs text-[#f8bb78] font-semibold flex items-center gap-0.5 hover:underline"
              >
                <span>Full List</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <button
                type="button"
                onClick={() => setHomeBrewCategory('espresso')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  homeBrewCategory === 'espresso'
                    ? 'bg-[#d49b5b] text-[#482900] shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                }`}
              >
                Espresso & Warm
              </button>
              <button
                type="button"
                onClick={() => setHomeBrewCategory('refreshers')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  homeBrewCategory === 'refreshers'
                    ? 'bg-[#d49b5b] text-[#482900] shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                }`}
              >
                Iced & Refreshers
              </button>
              <button
                type="button"
                onClick={() => setHomeBrewCategory('melts')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  homeBrewCategory === 'melts'
                    ? 'bg-[#d49b5b] text-[#482900] shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                }`}
              >
                Gourmet Melts
              </button>
            </div>

            {/* Brew Bar List */}
            <div className="flex flex-col gap-2 mt-3">
              {homeBrewItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onAddToCart(item)}
                  className="p-3 rounded-xl bg-[#221f1e] border border-[#342d2a] flex items-center justify-between gap-3 shadow-sm hover:border-[#d49b5b]/50 transition-colors cursor-pointer active:scale-98"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-11 h-11 rounded-lg object-cover bg-[#100e0d] shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 w-full">
                        <h4 className="font-medium text-xs text-white truncate whitespace-nowrap flex-1 min-w-0">{item.name}</h4>
                        {item.badge && (
                          <span className="font-label-caps text-[9px] text-[#f8bb78] px-1 py-0.5 rounded bg-[#2c2928] uppercase shrink-0 whitespace-nowrap">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#9d8e80] truncate whitespace-nowrap mt-0.5">{item.notes}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 pl-1">
                    <span className="font-price-display text-xs font-bold text-[#f8bb78] whitespace-nowrap">৳{item.price}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(item); }}
                      className="w-7 h-7 rounded-full bg-[#2c2928] text-[#f8bb78] flex items-center justify-center hover:bg-[#d49b5b] hover:text-[#482900] transition-colors shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dhanmondi Sanctuary Bento Features */}
          <section className="w-full px-4 pt-6">
            <div className="mb-3">
              <span className="font-label-caps text-[10px] text-[#f8bb78] tracking-widest uppercase block mb-0.5">
                Your Space To Be
              </span>
              <h2 className="font-serif text-lg text-white font-medium">The Dhanmondi Sanctuary</h2>
              <p className="text-xs text-[#d5c4b4] mt-0.5">
                Thoughtfully designed spaces for deep focus, creative catch-ups, and peaceful solitary hours.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Midnight Brewing Feature */}
              <div className="col-span-2 p-3.5 rounded-xl bg-[#221f1e] border border-[#342d2a] shadow-md flex items-center justify-between gap-3">
                <div className="max-w-[190px]">
                  <div className="w-7 h-7 rounded-full bg-[#f8bb78]/10 text-[#f8bb78] flex items-center justify-center mb-1.5">
                    <Moon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-xs text-white">Midnight Brewing</h4>
                  <p className="text-[11px] text-[#d5c4b4] mt-0.5">Thursday - Saturday open until 2:00 AM for evening solace.</p>
                </div>
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-[#342d2a]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFYY720ApGB50EQpEuY6ljneYGD8k9iZQkQ4kqPyPuz2ZUSIEkxaMpsxP0oubLbNB2ZI4UsOWb9oehoTt5vpLsqoVpijKSBS8_3CDQslTIycQjfqxTCEvKXLtzIWUMtUkV_4cPgdPVVNXyRRrDKQO2k30LWpCpmPx_nsQYvJJyfFuV0m2xhq7b9iKkivXTnnJhXhfHkGo6i-L5vfCadgqYMyaf87kBef0gxTe4NYKnIef1NRfVU83X"
                    alt="Night cafe in Dhanmondi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Fiber WiFi */}
              <div className="p-3.5 rounded-xl bg-[#221f1e] border border-[#342d2a] shadow-md flex flex-col justify-between">
                <div className="w-7 h-7 rounded-full bg-[#f8bb78]/10 text-[#f8bb78] flex items-center justify-center mb-2">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white">Fiber WiFi</h4>
                  <p className="text-[11px] text-[#9d8e80] mt-0.5">High-speed 100Mbps dedicated connection</p>
                </div>
              </div>

              {/* Power Outlets */}
              <div className="p-3.5 rounded-xl bg-[#221f1e] border border-[#342d2a] shadow-md flex flex-col justify-between">
                <div className="w-7 h-7 rounded-full bg-[#f8bb78]/10 text-[#f8bb78] flex items-center justify-center mb-2">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white">Power at Desk</h4>
                  <p className="text-[11px] text-[#9d8e80] mt-0.5">Dual outlets on every lounge table</p>
                </div>
              </div>
            </div>
          </section>

          {/* Map & Location Preview */}
          <section className="w-full px-4 pt-5">
            <div className="p-3.5 rounded-xl bg-[#221f1e] border border-[#342d2a] shadow-md flex flex-col gap-2.5">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#d49b5b]/20 text-[#f8bb78] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-white">Visit Us in Dhanmondi</h4>
                  <p className="text-[11px] text-[#d5c4b4]">{CAFE_INFO.location}</p>
                </div>
              </div>

              <div 
                className="w-full h-32 rounded-lg bg-cover bg-center relative overflow-hidden border border-[#342d2a]"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJ73zlp_ermmL4Rs_R1sS3OXvFBOUocpj2AlSn61gwo0tdtmhQJ6x1RTe8STp6Km4S1kRDBUVkWYmlgfgEqSt6iboXF-7CX7L6cTqIERnf0Z4jdz3Y8O68t9XT_zYJIfOyUlUL9pKSQTBzT8WNTnqx3KTErRN1gbkJcz9z38yO2LvyyeEnLDy-fwWWrw0LgyNLfizZ1u8LBoYrqfflAabyIqdX1Fq1InaJnL8SO68vHopyWAadjh6E')` }}
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                  <a
                    href={CAFE_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[#151312]/90 border border-[#342d2a] text-[#f8bb78] text-xs font-semibold flex items-center gap-1.5 shadow-xl active:scale-95 transition-transform"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Table Reservations & Pickups Banner */}
          <section className="w-full px-4 pt-5 pb-6">
            <div className="relative overflow-hidden rounded-2xl bg-[#1d1b1a] p-4 border border-[#342d2a] shadow-xl">
              <div className="relative z-10 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[9px] text-[#f8bb78] uppercase tracking-widest">
                    Table Reservations & Pickups
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#f8bb78] animate-pulse" />
                </div>

                <h3 className="font-serif text-lg text-white font-medium">
                  Planning a meeting or late-night hangout?
                </h3>

                <p className="text-xs text-[#d5c4b4] leading-relaxed">
                  Call directly for table holds, customized bean roasts, or group event bookings in our private studio corner.
                </p>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={`tel:${CAFE_INFO.phoneTel}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#d49b5b] text-[#482900] text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md shadow-[#d49b5b]/20"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>01939-899573</span>
                  </a>

                  <button
                    onClick={() => setActiveTab('reserve')}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2c2928] text-white text-xs font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all border border-[#342d2a]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#f8bb78]" />
                    <span>Reserve Table Online</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 2: MOBILE CURATED MENU (Matching Image 7) */}
      {/* ======================================================== */}
      {activeTab === 'menu' && (
        <div className="flex flex-col w-full animate-fadeIn pb-6">
          {/* Search Bar */}
          <section className="px-4 pt-3 pb-2 flex flex-col gap-2.5">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9d8e80]" />
              <input
                type="search"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Search cold brew, melt, pastry..."
                className="w-full h-11 pl-10 pr-9 rounded-full bg-[#221f1e] text-white border border-[#342d2a] placeholder:text-[#9d8e80] text-xs focus:outline-none focus:border-[#d49b5b] transition-colors"
              />
              {menuSearch && (
                <button
                  onClick={() => setMenuSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9d8e80] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Pills Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              <button
                type="button"
                onClick={() => setMenuFilter('all')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-caps text-[10px] transition-all ${
                  menuFilter === 'all'
                    ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white border border-[#342d2a]'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setMenuFilter('melts')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-caps text-[10px] transition-all ${
                  menuFilter === 'melts'
                    ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white border border-[#342d2a]'
                }`}
              >
                Signature Melts
              </button>
              <button
                type="button"
                onClick={() => setMenuFilter('coffee')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-caps text-[10px] transition-all ${
                  menuFilter === 'coffee'
                    ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white border border-[#342d2a]'
                }`}
              >
                Specialty Coffee
              </button>
              <button
                type="button"
                onClick={() => setMenuFilter('iced')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-caps text-[10px] transition-all ${
                  menuFilter === 'iced'
                    ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white border border-[#342d2a]'
                }`}
              >
                Iced Refreshers
              </button>
              <button
                type="button"
                onClick={() => setMenuFilter('bakes')}
                className={`shrink-0 px-3.5 py-1.5 rounded-full font-label-caps text-[10px] transition-all ${
                  menuFilter === 'bakes'
                    ? 'bg-[#d49b5b] text-[#482900] font-bold shadow-sm'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white border border-[#342d2a]'
                }`}
              >
                Gourmet Bakes
              </button>
            </div>
          </section>

          {/* Featured Spotlight Card */}
          {menuFilter === 'all' && !menuSearch && (
            <section className="px-4 py-1.5">
              <div className="relative w-full rounded-2xl overflow-hidden bg-[#221f1e] border border-[#342d2a] shadow-xl">
                <div 
                  className="w-full h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${MENU_ITEMS[0].imageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#221f1e] via-[#221f1e]/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#100e0d]/80 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f8bb78] animate-pulse" />
                    <span className="font-label-caps text-[9px] text-[#f8bb78] tracking-wider uppercase">
                      Barista Spotlight
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-1.5 -mt-3 relative z-10">
                  <div className="flex items-baseline justify-between gap-2 w-full">
                    <h2 className="font-serif text-base sm:text-lg text-[#f8bb78] font-medium whitespace-nowrap truncate flex-1 min-w-0">
                      Sunset Citrus Matcha & Cold Brew
                    </h2>
                    <span className="font-price-display text-base text-[#f8bb78] shrink-0 whitespace-nowrap pl-2">
                      ৳380
                    </span>
                  </div>

                  <p className="text-xs text-[#d5c4b4] leading-relaxed">
                    Single-origin Ethiopia cold brew delicately stratified with stone-ground ceremonial matcha and freshly squeezed calamansi essence.
                  </p>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-[#644212] text-[#dfb076] font-label-caps text-[9px] uppercase">
                        Limited Run
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#2c2928] text-[#d2c4b2] font-label-caps text-[9px] uppercase">
                        Cold • 350ml
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(MENU_ITEMS[0])}
                      className="px-3.5 py-1.5 rounded-full bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] text-xs font-bold flex items-center gap-1 shadow-md active:scale-95 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Filter Status Feedback Bar */}
          <section className="px-4 pt-3 pb-1 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#f8bb78]" />
              <h3 className="font-serif text-sm text-white font-medium">
                {menuFilter === 'all' ? 'Curated Menu' : menuFilter.toUpperCase()}
              </h3>
            </div>
            <span className="font-label-caps text-[10px] text-[#9d8e80] uppercase tracking-wider">
              {filteredMenuItems.length} {filteredMenuItems.length === 1 ? 'Selection' : 'Selections'}
            </span>
          </section>

          {/* Menu Items Cards Stack */}
          <section className="px-4 py-1.5 flex flex-col gap-3">
            {filteredMenuItems.length === 0 ? (
              <div className="p-8 text-center bg-[#221f1e]/40 rounded-xl border border-[#342d2a] my-4">
                <Coffee className="w-10 h-10 text-[#9d8e80] mx-auto mb-2 opacity-50" />
                <h4 className="font-serif text-sm text-white">No items found</h4>
                <p className="text-xs text-[#9d8e80] mt-1">
                  Try searching for "matcha", "melt", or switch category filter.
                </p>
              </div>
            ) : (
              filteredMenuItems.map((item) => (
                <article
                  key={item.id}
                  className="flex flex-col rounded-2xl overflow-hidden bg-[#221f1e] border border-[#342d2a] shadow-md transition-all hover:border-[#d49b5b]/40"
                >
                  <div className="w-full h-36 bg-cover bg-center relative bg-[#100e0d]">
                    <img 
                      src={item.imageUrl} 
                      alt={item.altText} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#221f1e] via-transparent to-black/20" />
                    {item.badge && (
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-[#100e0d]/80 backdrop-blur-md text-[#f8bb78] font-label-caps text-[9px] uppercase tracking-wider">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between gap-2 w-full">
                      <h4 className="font-serif text-sm sm:text-base text-white font-medium whitespace-nowrap truncate flex-1 min-w-0">
                        {item.name}
                      </h4>
                      <span className="font-price-display text-sm text-[#f8bb78] shrink-0 font-bold whitespace-nowrap pl-2">
                        ৳{item.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#d5c4b4] mt-0.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between pt-1.5 border-t border-[#342d2a]/60">
                      <span className="text-[10px] text-[#9d8e80] uppercase tracking-wider truncate max-w-[190px]">
                        {item.notes}
                      </span>
                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-3 py-1 rounded-full bg-[#2c2928] hover:bg-[#d49b5b] hover:text-[#482900] text-[#f8bb78] text-xs font-semibold flex items-center gap-1 transition-all active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </section>
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 3: MOBILE RESERVATIONS (Table booking) */}
      {/* ======================================================== */}
      {activeTab === 'reserve' && (
        <div className="px-4 py-4 flex flex-col gap-4 animate-fadeIn">
          <div className="space-y-1">
            <span className="font-label-caps text-[10px] text-[#f8bb78] uppercase tracking-widest">
              Dhanmondi Sanctuary
            </span>
            <h2 className="font-serif text-xl text-white">Book Your Table / Alcove</h2>
            <p className="text-xs text-[#d5c4b4]">
              Reserve ahead for cozy dates, laptop study hours with power plugs, or evening meetings.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#221f1e] border border-[#342d2a] flex items-center justify-between">
            <div>
              <span className="text-[11px] text-[#f8bb78] font-bold block uppercase">Immediate Seating?</span>
              <span className="text-xs text-[#d5c4b4]">Hotline: {CAFE_INFO.phone}</span>
            </div>
            <a
              href={`tel:${CAFE_INFO.phoneTel}`}
              className="px-3 py-1.5 rounded-lg bg-[#d49b5b] text-[#482900] font-bold text-xs flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>

          {resConfirmed ? (
            <div className="p-6 rounded-2xl bg-[#221f1e] border border-[#342d2a] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg text-white">Table Hold Confirmed!</h3>
              <p className="text-xs text-[#d5c4b4]">
                We look forward to hosting you on {resDate}. Our Dhanmondi barista crew has been notified.
              </p>
              <button
                onClick={() => setResConfirmed(false)}
                className="px-4 py-2 rounded-lg bg-[#d49b5b] text-[#482900] text-xs font-bold"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form onSubmit={handleReserveSubmit} className="space-y-3.5 bg-[#181514] p-4 rounded-2xl border border-[#342d2a]">
              <div>
                <label className="block text-xs text-[#d5c4b4] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={resName}
                  onChange={(e) => setResName(e.target.value)}
                  placeholder="e.g. Aminul Islam"
                  className="w-full px-3 py-2 rounded-lg bg-[#221f1e] text-xs text-white border border-[#342d2a] focus:outline-none focus:border-[#d49b5b]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#d5c4b4] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={resPhone}
                  onChange={(e) => setResPhone(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full px-3 py-2 rounded-lg bg-[#221f1e] text-xs text-white border border-[#342d2a] focus:outline-none focus:border-[#d49b5b]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs text-[#d5c4b4] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-[#221f1e] text-xs text-white border border-[#342d2a] focus:outline-none focus:border-[#d49b5b]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#d5c4b4] mb-1">Party</label>
                  <select
                    value={resParty}
                    onChange={(e) => setResParty(e.target.value)}
                    className="w-full px-2.5 py-2 rounded-lg bg-[#221f1e] text-xs text-white border border-[#342d2a] focus:outline-none focus:border-[#d49b5b]"
                  >
                    <option>1 (Study Solo)</option>
                    <option>2 (Cozy Date)</option>
                    <option>3 - 4 (Group)</option>
                    <option>5+ (Team)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#d5c4b4] mb-1">Time Slot</label>
                <select
                  value={resSlot}
                  onChange={(e) => setResSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#221f1e] text-xs text-white border border-[#342d2a] focus:outline-none focus:border-[#d49b5b]"
                >
                  <option>Morning (9:00 AM - 12:00 PM)</option>
                  <option>Afternoon (12:00 PM - 5:00 PM)</option>
                  <option>Evening Rush (5:00 PM - 9:00 PM)</option>
                  <option>Late Night (9:00 PM - 12:00 AM)</option>
                  <option>Midnight Special (12:00 AM - 2:00 AM)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] text-xs font-bold shadow-md transition-all active:scale-95"
              >
                Confirm Table Reservation Request
              </button>
            </form>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* SCREEN 4: LOCATION & OPERATING HOURS */}
      {/* ======================================================== */}
      {activeTab === 'location' && (
        <div className="px-4 py-4 flex flex-col gap-4 animate-fadeIn">
          <div className="space-y-1">
            <span className="font-label-caps text-[10px] text-[#f8bb78] uppercase tracking-widest">
              Satmasjid Road, Dhanmondi
            </span>
            <h2 className="font-serif text-xl text-white">Find The Local Coffee</h2>
            <p className="text-xs text-[#d5c4b4]">
              Nestled right in Dhanmondi Dhaka. High-speed fiber WiFi, quiet study alcoves, and midnight espresso pulls.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#221f1e] border border-[#342d2a] space-y-3">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#f8bb78] mt-0.5 shrink-0" />
              <div>
                <h4 className="text-xs font-semibold text-white">Address</h4>
                <p className="text-xs text-[#d5c4b4] mt-0.5">{CAFE_INFO.location}</p>
              </div>
            </div>

            <div className="border-t border-[#342d2a] pt-3 flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#f8bb78] mt-0.5 shrink-0" />
              <div className="text-xs space-y-1">
                <div>
                  <span className="text-[#f8bb78] font-medium block">Sun – Wed</span>
                  <span className="text-[#d5c4b4]">9:00 AM – 12:00 AM</span>
                </div>
                <div>
                  <span className="text-[#efbe82] font-medium block">Thu – Sat (Weekend Midnight)</span>
                  <span className="text-[#d5c4b4]">9:00 AM – 2:00 AM</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#342d2a] pt-3 flex items-center justify-between">
              <span className="text-xs text-[#9d8e80]">Contact Barista</span>
              <a href={`tel:${CAFE_INFO.phoneTel}`} className="text-xs font-bold text-[#f8bb78] flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>{CAFE_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative rounded-2xl overflow-hidden h-44 border border-[#342d2a] shadow-lg">
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJ73zlp_ermmL4Rs_R1sS3OXvFBOUocpj2AlSn61gwo0tdtmhQJ6x1RTe8STp6Km4S1kRDBUVkWYmlgfgEqSt6iboXF-7CX7L6cTqIERnf0Z4jdz3Y8O68t9XT_zYJIfOyUlUL9pKSQTBzT8WNTnqx3KTErRN1gbkJcz9z38yO2LvyyeEnLDy-fwWWrw0LgyNLfizZ1u8LBoYrqfflAabyIqdX1Fq1InaJnL8SO68vHopyWAadjh6E')` }}
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
              <a
                href={CAFE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#d49b5b] text-[#482900] text-xs font-bold flex items-center gap-2 shadow-xl hover:bg-[#f8bb78] transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Get Driving / Walking Directions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Sticky Quick Order Bar on Mobile */}
      {cartCount > 0 && (
        <aside className="fixed bottom-20 left-0 right-0 px-4 z-40 max-w-md mx-auto pointer-events-none animate-slideUp">
          <div className="w-full pointer-events-auto bg-[#181514]/95 backdrop-blur-xl rounded-2xl p-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.8)] border border-[#342d2a] flex items-center justify-between">
            <div className="flex items-center gap-2.5 pl-2">
              <div className="w-8 h-8 rounded-full bg-[#d49b5b] text-[#100e0d] flex items-center justify-center font-bold text-xs">
                {cartCount}
              </div>
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] text-[#f8bb78] uppercase tracking-widest leading-none">
                  Your Tray
                </span>
                <span className="font-price-display text-sm font-bold text-white leading-snug">
                  ৳{cartTotal}
                </span>
              </div>
            </div>

            <button
              onClick={onOpenCart}
              className="h-9 px-3.5 rounded-xl bg-[#d49b5b] text-[#482900] font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#f8bb78] active:scale-95 transition-all"
            >
              <span>Review Tray</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Mobile Bottom Fixed Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full z-40 bg-[#100e0d]/95 backdrop-blur-xl border-t border-[#342d2a]/80 shadow-[0_-8px_24px_rgba(0,0,0,0.6)]">
        <div className="flex justify-around items-center h-16 px-1">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
              activeTab === 'home' ? 'text-[#f8bb78]' : 'text-[#9d8e80] hover:text-white'
            }`}
          >
            <Coffee className="w-5 h-5" />
            <span className="font-label-caps text-[9px] tracking-wider uppercase mt-1">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
              activeTab === 'menu' ? 'text-[#f8bb78]' : 'text-[#9d8e80] hover:text-white'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-label-caps text-[9px] tracking-wider uppercase mt-1">Menu</span>
          </button>

          <button
            onClick={() => setActiveTab('reserve')}
            className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
              activeTab === 'reserve' ? 'text-[#f8bb78]' : 'text-[#9d8e80] hover:text-white'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="font-label-caps text-[9px] tracking-wider uppercase mt-1">Reserve</span>
          </button>

          <button
            onClick={() => setActiveTab('location')}
            className={`flex flex-col items-center justify-center w-14 h-11 transition-colors ${
              activeTab === 'location' ? 'text-[#f8bb78]' : 'text-[#9d8e80] hover:text-white'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="font-label-caps text-[9px] tracking-wider uppercase mt-1">Location</span>
          </button>

          <a
            href={`tel:${CAFE_INFO.phoneTel}`}
            className="flex flex-col items-center justify-center w-14 h-11 text-[#9d8e80] hover:text-[#f8bb78] transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="font-label-caps text-[9px] tracking-wider uppercase mt-1">Call</span>
          </a>
        </div>
      </nav>
    </div>
  );
};
