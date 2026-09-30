import React, { useState } from 'react';
import { MenuItem } from '../types';
import { MENU_ITEMS, LOGO_URL, CAFE_INFO, ATMOSPHERE_IMAGES } from '../data/coffeeData';
import { AudioPlayer } from './AudioPlayer';
import { 
  Coffee, 
  Clock, 
  MapPin, 
  Phone, 
  Wifi, 
  Zap, 
  Music, 
  Car, 
  Calendar, 
  CheckCircle2, 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  Star,
  Quote,
  Compass,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface DesktopViewProps {
  onAddToCart: (item: MenuItem) => void;
  onOpenReserve: () => void;
  onOpenStories: (index?: number) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({
  onAddToCart,
  onOpenReserve,
  onOpenStories,
  cartCount,
  onOpenCart
}) => {
  const [activeMenuTab, setActiveMenuTab] = useState<'coffee' | 'iced' | 'melts' | 'bakes'>('coffee');
  const [reservationName, setReservationName] = useState('');
  const [reservationPhone, setReservationPhone] = useState('');
  const [reservationDate, setReservationDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [reservationTime, setReservationTime] = useState('Late Night (9:00 PM - 12:00 AM)');
  const [reservationParty, setReservationParty] = useState('2 Persons (Cozy Date)');
  const [reservationNote, setReservationNote] = useState('');
  const [isReserving, setIsReserving] = useState(false);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const heroSixReasons = MENU_ITEMS.filter((item) => item.isHeroSpecial);
  const filteredBrewBar = MENU_ITEMS.filter((item) => item.category === activeMenuTab);

  const handleInlineReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setIsReserving(true);
    setTimeout(() => {
      setIsReserving(false);
      setReservationSuccess(true);
      setTimeout(() => {
        setReservationSuccess(false);
        setReservationName('');
        setReservationPhone('');
        setReservationNote('');
      }, 5000);
    }, 1000);
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="w-full bg-[#151312] text-[#e8e1df] min-h-screen">
      {/* Top Header */}
      <header className="sticky top-0 left-0 w-full z-40 bg-[#100e0d]/90 backdrop-blur-xl border-b border-[#342d2a]/50 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.85)]">
        <div className="h-20 max-w-[1320px] mx-auto px-6 flex items-center justify-between gap-6">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="relative flex items-center justify-center p-1 rounded-full bg-[#2c2928]/80 ring-1 ring-[#d49b5b]/30">
              <img 
                src={LOGO_URL} 
                alt="The Local Coffee Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-[#f8bb78] leading-none">
                {CAFE_INFO.name}
              </span>
              <span className="font-label-caps text-[10px] text-[#d5c4b4] tracking-widest mt-1">
                {CAFE_INFO.tagline}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 whitespace-nowrap shrink-0">
            <a href="#hero-section" className="text-sm font-semibold text-[#f8bb78] hover:text-[#ffddbb] transition-colors whitespace-nowrap shrink-0">
              Home
            </a>
            <a href="#featured-specials" className="text-sm text-[#d5c4b4] hover:text-[#f8bb78] transition-colors whitespace-nowrap shrink-0">
              Six Reasons
            </a>
            <a href="#craft-brew-bar" className="text-sm text-[#d5c4b4] hover:text-[#f8bb78] transition-colors whitespace-nowrap shrink-0">
              Brew Bar
            </a>
            <a href="#atmosphere-section" className="text-sm text-[#d5c4b4] hover:text-[#f8bb78] transition-colors whitespace-nowrap shrink-0">
              Sanctuary
            </a>
            <a href="#reserve-section" className="text-sm text-[#d5c4b4] hover:text-[#f8bb78] transition-colors whitespace-nowrap shrink-0">
              Reservations
            </a>
            <a href="#location-section" className="text-sm text-[#d5c4b4] hover:text-[#f8bb78] transition-colors whitespace-nowrap shrink-0">
              Location & Hours
            </a>
          </nav>

          {/* Action Zone: Hours & Sound & Order Tray */}
          <div className="flex items-center gap-3.5 shrink-0">
            <div className="hidden xl:block">
              <AudioPlayer />
            </div>

            <div className="hidden 2xl:flex flex-col text-right pr-2">
              <div className="flex items-center justify-end gap-1 text-[#d5c4b4] text-[10px] font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3 text-[#f8bb78]" />
                <span>Midnight Roasts</span>
              </div>
              <span className="text-xs text-[#d2c4b2] whitespace-nowrap">
                Open till 2:00 AM (Thu-Sat)
              </span>
            </div>

            {/* Cart Tray Button */}
            <button
              onClick={onOpenCart}
              className="relative min-h-[40px] px-3.5 py-2 rounded-xl bg-[#221f1e] hover:bg-[#2c2928] text-white text-xs font-semibold flex items-center gap-2 border border-[#342d2a] transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-[#f8bb78]" />
              <span className="hidden sm:inline">Tray</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#d49b5b] text-[#100e0d] font-bold flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <a
              href={`tel:${CAFE_INFO.phoneTel}`}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#2c2928] text-[#e8e1df] hover:bg-[#3c3837] text-xs font-semibold transition-all"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-[#f8bb78]" />
              <span>Call / Order</span>
            </a>

            <button
              onClick={onOpenReserve}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#d49b5b] text-[#482900] text-xs font-bold shadow-[0_0_20px_rgba(212,155,91,0.25)] hover:bg-[#f8bb78] transition-all"
            >
              <span>Reserve Table</span>
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION: Atmospheric Dhanmondi Sanctuary */}
      <section id="hero-section" className="relative w-full overflow-hidden bg-[#100e0d] pt-12 pb-16">
        {/* Ambient radial crema glow background */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#f8bb78]/10 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-[#644212]/20 blur-[150px] pointer-events-none" />

        <div className="max-w-[1320px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Editorial Column */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#2c2928]/70 backdrop-blur-md border border-[#342d2a]/50">
                <span className="w-2 h-2 rounded-full bg-[#f8bb78] animate-pulse" />
                <span className="font-label-caps text-[11px] text-[#f8bb78] tracking-widest uppercase">
                  Dhanmondi • Dhaka • Specialty Roasters
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#e8e1df] tracking-tight leading-[1.08]">
                Where Coffee Meets <span className="italic font-serif text-[#f8bb78]">Community</span> in Dhanmondi.
              </h1>

              <p className="text-base sm:text-lg text-[#d5c4b4] max-w-xl leading-relaxed">
                Crafted espresso extraction, slow morning pastries, signature hot artisanal melts, and late-night ambient conversations right in the beating heart of Dhaka.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#featured-specials"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#d49b5b] text-[#482900] font-semibold text-sm hover:bg-[#f8bb78] transition-all duration-300 shadow-[0_8px_24px_rgba(212,155,91,0.25)] hover:scale-[1.02]"
                >
                  <span>Explore Our Menu</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>

                <button
                  onClick={onOpenReserve}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#2c2928]/80 text-[#e8e1df] hover:bg-[#3c3837] font-semibold text-sm backdrop-blur-md border border-[#342d2a] transition-all duration-300"
                >
                  <Calendar className="mr-2 w-4 h-4 text-[#f8bb78]" />
                  <span>Reserve a Table</span>
                </button>

                <button
                  onClick={() => onOpenStories(0)}
                  className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-[#221f1e] text-[#f8bb78] hover:bg-[#2c2928] font-semibold text-sm border border-[#342d2a] transition-all"
                >
                  <Sparkles className="mr-2 w-4 h-4" />
                  <span>Watch Barista Live</span>
                </button>
              </div>

              {/* Social Proof Micro-Widget */}
              <div className="pt-4 flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-[#373433] flex items-center justify-center text-[#f8bb78] font-bold text-xs shadow-md border-2 border-[#151312]">
                    90%
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#644212] flex items-center justify-center text-[#dfb076] font-bold text-xs shadow-md border-2 border-[#151312]">
                    ★
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#3c3837] flex items-center justify-center text-[#d2c4b2] font-bold text-xs shadow-md border-2 border-[#151312]">
                    81+
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-[#f8bb78]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f8bb78]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#d5c4b4] mt-0.5">
                    Recommended on Facebook (81 verified Dhaka reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Visual Showcase Bento Mosaic */}
            <div className="lg:col-span-5 relative">
              <div className="relative grid grid-cols-2 gap-4">
                {/* Portafilter Floating Element */}
                <div className="absolute -top-5 -left-5 z-20 bg-[#2c2928]/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-[0_16px_36px_rgba(0,0,0,0.6)] border border-[#342d2a] flex items-center gap-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-full bg-[#f8bb78]/20 flex items-center justify-center text-[#f8bb78]">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-xs text-white">Fresh Pulls</span>
                    <span className="text-[11px] text-[#f8bb78] font-medium">9 Bar Extraction</span>
                  </div>
                </div>

                {/* Card 1: Sunset Matcha & Cold Brew Highlight */}
                <div 
                  onClick={() => onAddToCart(MENU_ITEMS[0])}
                  className="col-span-2 relative rounded-2xl overflow-hidden bg-[#221f1e] shadow-2xl group cursor-pointer border border-[#342d2a]/80 hover:border-[#d49b5b]/50 transition-all duration-300"
                >
                  <div 
                    className="h-64 sm:h-72 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('${MENU_ITEMS[0].imageUrl}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-[#100e0d]/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-end gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-label-caps text-[10px] text-[#f8bb78] uppercase">
                        Trending Innovation
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl text-white group-hover:text-[#f8bb78] transition-colors whitespace-nowrap truncate">
                        Sunset Citrus Matcha & Cold Brew
                      </h3>
                      <p className="text-xs text-[#d5c4b4] mt-0.5 line-clamp-1">Tap to add to barista tray</p>
                    </div>
                    <span className="font-price-display text-base sm:text-lg text-[#f8bb78] bg-[#373433]/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap">
                      ৳380
                    </span>
                  </div>
                </div>

                {/* Card 2: Crispy Croissants & Melts */}
                <div 
                  onClick={() => onAddToCart(MENU_ITEMS[3])}
                  className="relative rounded-xl overflow-hidden bg-[#221f1e] shadow-xl group cursor-pointer border border-[#342d2a]/80 hover:border-[#d49b5b]/50 transition-all duration-300"
                >
                  <div 
                    className="h-44 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYse5jxE9LW0SbOaizClQyAKYsNzEReKlSTbXLKFjO7NdIdIiGV-p7_SAmiPDHB0lzF3luDp8lK0D-62KIr7VzzUKcdOMvAuaWQjwptQhjFTpcyFkXVz5aYbRXh5_trVqmF85OXpVh3fofZed4tP1YtveWzma-QN8mI_qmCwWbRuLi4qBhhaqJWT46iEovDjILX3UdBI7bE6o8QC5UhW6_7bYvbe-XhxnEULzE2Mf9LmjxBvdduLay')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <span className="font-semibold text-sm text-white block truncate whitespace-nowrap">Chicken Croissant</span>
                    <span className="text-[11px] text-[#d5c4b4] whitespace-nowrap">Baked Generously • ৳460</span>
                  </div>
                </div>

                {/* Card 3: Dessert & Late Nights */}
                <div 
                  onClick={() => onAddToCart(MENU_ITEMS[6])}
                  className="relative rounded-xl overflow-hidden bg-[#221f1e] shadow-xl group cursor-pointer border border-[#342d2a]/80 hover:border-[#d49b5b]/50 transition-all duration-300"
                >
                  <div 
                    className="h-44 w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA9jblsbyAgg8gezAUJhK034dxgi2mawyFLy3FH2T1K6KMoeRv0pZxIhso7q5JnLJW0oUocjAq6btFDLmLSsEYURLolGt35e_LwSFF_Y5o-drAue8h6pDcd0ysblJh4Ahd_ypbOnbtdiUcY9sfXTq6MRZODmA28FxSnyxzutcyETrGruuV9dDY_XRlgtGVKltQ0zllMyegRSFwYz4tb3cqaBCgy52SXLaaxLHTxxiTitbabaS2GpW3I')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3 w-full">
                    <span className="font-semibold text-sm text-white block truncate whitespace-nowrap">Artisanal Patisserie</span>
                    <span className="text-[11px] text-[#d5c4b4] whitespace-nowrap">Carrot & Truffle • ৳350</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Marquee Ribbon */}
        <div className="w-full bg-[#1d1b1a] py-4 border-y border-[#342d2a] mt-12 overflow-x-auto">
          <div className="max-w-[1320px] mx-auto px-6 flex items-center justify-between gap-6 text-[#d5c4b4] whitespace-nowrap min-w-max">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#f8bb78]" />
              <span className="text-sm font-medium text-white">Specialty Roasted Beans</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#504539]" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f8bb78]" />
              <span className="text-sm font-medium text-white">Open till 2:00 AM (Thu - Sat)</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#504539]" />
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#f8bb78]" />
              <span className="text-sm font-medium text-white">Artisanal Melts & Croissants</span>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-[#504539]" />
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-[#f8bb78]" />
              <span className="text-sm font-medium text-white">Creative Hangout & High-Speed WiFi</span>
            </div>
          </div>
        </div>
      </section>

      {/* SIX NEW REASONS TO VISIT THE LOCAL */}
      <section id="featured-specials" className="w-full py-16 bg-[#151312] relative">
        <div className="max-w-[1320px] mx-auto px-6">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#f8bb78]" />
                <span className="font-label-caps text-[#f8bb78] uppercase text-[11px]">
                  Direct from The Barista & Kitchen
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                Six New Reasons to Visit The Local
              </h2>
              <p className="text-sm text-[#d5c4b4] max-w-xl">
                Tried everything on your usual order? Discover our freshly introduced handcrafted savory melts, slow-poured cold brews, and seasonal refreshers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-caps text-[#9d8e80] text-[11px]">
                Satmasjid Rd • Dhanmondi
              </span>
            </div>
          </div>

          {/* 6-Grid Bento Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroSixReasons.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl bg-[#1d1b1a] border border-[#342d2a] overflow-hidden hover:border-[#d49b5b]/50 transition-all duration-300 shadow-md hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden bg-[#100e0d]">
                  <img
                    src={item.imageUrl}
                    alt={item.altText}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1b1a] via-transparent to-transparent" />
                  
                  {item.badge && (
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#644212]/90 backdrop-blur-md text-[#dfb076] font-label-caps text-[10px] uppercase">
                        {item.badge}
                      </span>
                    </div>
                  )}

                  <div className="absolute top-3.5 right-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#100e0d]/90 text-[#f8bb78] font-price-display text-sm backdrop-blur-md">
                      ৳{item.price}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-grow justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2 w-full">
                      <h3 className="font-serif text-lg sm:text-xl text-white group-hover:text-[#f8bb78] transition-colors whitespace-nowrap truncate flex-1 min-w-0">
                        {item.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[#d5c4b4] mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-[#342d2a]/60">
                    <span className="text-[11px] text-[#9d8e80] truncate whitespace-nowrap max-w-[170px]">
                      {item.notes}
                    </span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-3 py-1.5 rounded-lg bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 shadow-sm whitespace-nowrap shrink-0"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Tray</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT BREW BAR & BEAN CALIBRATION */}
      <section id="craft-brew-bar" className="w-full py-16 bg-[#100e0d] relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 flex flex-col items-center gap-1.5">
            <span className="font-label-caps text-[#f8bb78] tracking-widest text-[11px]">
              Single Origin & Artisanal Roasts
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              The Craft Brew Bar
            </h2>
            <p className="text-sm text-[#d5c4b4]">
              Every shot calibrated on precision equipment. Every cup brewed to highlight delicate floral notes, chocolate sweetness, and complex origin profiles.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <button
                type="button"
                onClick={() => setActiveMenuTab('coffee')}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeMenuTab === 'coffee'
                    ? 'bg-[#d49b5b] text-[#482900] shadow-md'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                }`}
              >
                Specialty Coffee
              </button>
              <button
                type="button"
                onClick={() => setActiveMenuTab('iced')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  activeMenuTab === 'iced'
                    ? 'bg-[#d49b5b] text-[#482900] shadow-md'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                }`}
              >
                Iced Refreshers & Spritz
              </button>
              <button
                type="button"
                onClick={() => setActiveMenuTab('melts')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  activeMenuTab === 'melts'
                    ? 'bg-[#d49b5b] text-[#482900] shadow-md'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                }`}
              >
                Artisanal Melts & Croissants
              </button>
              <button
                type="button"
                onClick={() => setActiveMenuTab('bakes')}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  activeMenuTab === 'bakes'
                    ? 'bg-[#d49b5b] text-[#482900] shadow-md'
                    : 'bg-[#221f1e] text-[#d5c4b4] hover:text-white'
                }`}
              >
                Gourmet Desserts
              </button>
            </div>
          </div>

          {/* Menu Grid Layout with Origin Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Menu Items List */}
            <div className="lg:col-span-7 flex flex-col gap-4 bg-[#1d1b1a] p-6 rounded-2xl border border-[#342d2a] shadow-lg">
              {filteredBrewBar.map((item) => (
                <div 
                  key={item.id}
                  className="flex flex-col gap-1 pb-4 border-b border-[#342d2a]/70 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-baseline justify-between gap-4 w-full">
                    <span className="font-serif text-base sm:text-lg text-white font-medium whitespace-nowrap truncate flex-1 min-w-0">
                      {item.name}
                    </span>
                    <span className="font-price-display text-base sm:text-lg text-[#f8bb78] shrink-0 whitespace-nowrap pl-2">
                      ৳{item.price}
                    </span>
                  </div>
                  <p className="text-xs text-[#d5c4b4] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#efbe82] uppercase tracking-wider font-semibold whitespace-nowrap truncate max-w-[75%]">
                      {item.notes}
                    </span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="px-2.5 py-1 rounded bg-[#2c2928] hover:bg-[#d49b5b] hover:text-[#482900] text-xs text-[#d5c4b4] transition-colors whitespace-nowrap shrink-0"
                    >
                      + Order
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Brewing Extraction Infographic & Roast Profile */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#221f1e] p-6 rounded-2xl border border-[#342d2a] relative overflow-hidden shadow-xl">
                <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-[#f8bb78]/10 blur-2xl" />
                <span className="font-label-caps text-[#f8bb78] text-[11px] uppercase">
                  The Bean & Process
                </span>
                <h3 className="font-serif text-2xl text-white mt-1 mb-3">
                  Calibrated for Dhaka Palates
                </h3>
                <p className="text-xs text-[#d5c4b4] leading-relaxed mb-4">
                  We source specialty micro-lots directly from ethical roasters. From medium-roasted Ethiopian naturals with berry acidity to full-bodied Colombian beans for milk-based cups, every batch is ground seconds before extraction.
                </p>

                {/* Extraction Parameters */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#2c2928]/80 backdrop-blur-sm border border-[#342d2a]">
                    <div className="flex items-center gap-1.5 text-[#f8bb78] mb-1">
                      <Coffee className="w-4 h-4" />
                      <span className="text-xs font-semibold">Brew Temp</span>
                    </div>
                    <span className="font-serif text-2xl text-white block">93.5°C</span>
                    <p className="text-[11px] text-[#9d8e80] mt-0.5">Optimal sweetness & balance</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#2c2928]/80 backdrop-blur-sm border border-[#342d2a]">
                    <div className="flex items-center gap-1.5 text-[#f8bb78] mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs font-semibold">Shot Timing</span>
                    </div>
                    <span className="font-serif text-2xl text-white block">28 Secs</span>
                    <p className="text-[11px] text-[#9d8e80] mt-0.5">Silky crema & lingering finish</p>
                  </div>
                </div>
              </div>

              {/* Quote Banner */}
              <div className="bg-gradient-to-r from-[#221f1e] to-[#2c2928] p-5 rounded-2xl border border-[#342d2a] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#d49b5b]/20 text-[#f8bb78] flex items-center justify-center shrink-0">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-white italic">
                    "Water has its own sound. Coffee has a whole soundtrack. Dhanmondi has found its cozy corner."
                  </p>
                  <span className="font-label-caps text-[#f8bb78] text-[10px] uppercase mt-1 block">
                    — The Local Coffee Journal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ATMOSPHERE & DHANMONDI SANCTUARY */}
      <section id="atmosphere-section" className="w-full py-16 bg-[#151312] relative">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
            <div className="lg:col-span-6 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[2px] bg-[#f8bb78]" />
                <span className="font-label-caps text-[#f8bb78] uppercase text-[11px]">
                  The Dhanmondi Space
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-white">
                Designed for Solitude, Crafted for Conversations.
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className="text-sm sm:text-base text-[#d5c4b4] leading-relaxed">
                Tucked along Satmasjid Road, The Local Coffee is envisioned as Dhanmondi's third place: warm pendant lighting, organic wooden furnishings, vibrant cafe art, and quiet study alcoves designed for deep focus, creative projects, or evening catch-ups.
              </p>
            </div>
          </div>

          {/* Atmosphere Visual Showcase Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Ambience Shot */}
            <div className="md:col-span-7 rounded-2xl overflow-hidden bg-[#221f1e] relative group h-80 sm:h-96 border border-[#342d2a]">
              <img
                src={ATMOSPHERE_IMAGES[0].imageUrl}
                alt={ATMOSPHERE_IMAGES[0].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="font-label-caps text-[#f8bb78] text-[10px] uppercase">
                  {ATMOSPHERE_IMAGES[0].category}
                </span>
                <h3 className="font-serif text-2xl text-white">
                  {ATMOSPHERE_IMAGES[0].title}
                </h3>
                <p className="text-xs text-[#d5c4b4] max-w-md mt-1">
                  {ATMOSPHERE_IMAGES[0].subtitle}
                </p>
              </div>
            </div>

            {/* Secondary Shot: Barista Craft */}
            <div className="md:col-span-5 rounded-2xl overflow-hidden bg-[#221f1e] relative group h-80 sm:h-96 border border-[#342d2a]">
              <img
                src={ATMOSPHERE_IMAGES[1].imageUrl}
                alt={ATMOSPHERE_IMAGES[1].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="font-label-caps text-[#f8bb78] text-[10px] uppercase">
                  {ATMOSPHERE_IMAGES[1].category}
                </span>
                <h3 className="font-serif text-2xl text-white">
                  {ATMOSPHERE_IMAGES[1].title}
                </h3>
                <p className="text-xs text-[#d5c4b4] mt-1">
                  {ATMOSPHERE_IMAGES[1].subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-[#221f1e] border border-[#342d2a] flex items-center gap-3">
              <Wifi className="w-6 h-6 text-[#f8bb78] shrink-0" />
              <div>
                <span className="text-sm font-semibold text-white block">High-Speed WiFi</span>
                <span className="text-xs text-[#d5c4b4]">Seamless for remote work</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#221f1e] border border-[#342d2a] flex items-center gap-3">
              <Zap className="w-6 h-6 text-[#f8bb78] shrink-0" />
              <div>
                <span className="text-sm font-semibold text-white block">Power Outlets</span>
                <span className="text-xs text-[#d5c4b4]">At every working desk</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#221f1e] border border-[#342d2a] flex items-center gap-3">
              <Music className="w-6 h-6 text-[#f8bb78] shrink-0" />
              <div>
                <span className="text-sm font-semibold text-white block">Lo-Fi & Acoustic</span>
                <span className="text-xs text-[#d5c4b4]">Curated ambient volume</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#221f1e] border border-[#342d2a] flex items-center gap-3">
              <Car className="w-6 h-6 text-[#f8bb78] shrink-0" />
              <div>
                <span className="text-sm font-semibold text-white block">Valet & Parking</span>
                <span className="text-xs text-[#d5c4b4]">Convenient street spots</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABLE RESERVATION & STUDY CORNER */}
      <section id="reserve-section" className="w-full py-16 bg-[#1d1b1a] relative">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="bg-[#100e0d] rounded-3xl overflow-hidden shadow-2xl border border-[#342d2a]">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Context & Hotline */}
              <div className="lg:col-span-5 p-8 sm:p-12 bg-[#221f1e] flex flex-col justify-between gap-8 border-b lg:border-b-0 lg:border-r border-[#342d2a]">
                <div className="flex flex-col gap-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#f8bb78]" />
                    <span className="font-label-caps text-[#f8bb78] uppercase text-[11px]">
                      Reserve in Dhanmondi
                    </span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl text-white">
                    Book Your Table or Study Corner
                  </h2>

                  <p className="text-sm text-[#d5c4b4] leading-relaxed">
                    Whether planning a cozy evening coffee date, team discussion, or late-night creative session, reserve ahead to guarantee seating.
                  </p>

                  <div className="mt-2 p-4 rounded-xl bg-[#2c2928] border border-[#342d2a]">
                    <span className="font-label-caps text-[#f8bb78] uppercase text-[10px] block mb-1">
                      Direct Hotline / WhatsApp
                    </span>
                    <a
                      href={`tel:${CAFE_INFO.phoneTel}`}
                      className="font-serif text-2xl text-white hover:text-[#f8bb78] transition-colors flex items-center gap-2"
                    >
                      <Phone className="w-5 h-5 text-[#f8bb78]" />
                      <span>{CAFE_INFO.phone}</span>
                    </a>
                    <span className="text-xs text-[#9d8e80] mt-1 block">
                      Immediate confirmation for urgent seating needs.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#d5c4b4]">
                  <CheckCircle2 className="w-5 h-5 text-[#f8bb78] shrink-0" />
                  <span>No reservation fee required. Walk-ins warmly welcomed anytime.</span>
                </div>
              </div>

              {/* Right Column: Reservation Form */}
              <div className="lg:col-span-7 p-8 sm:p-12 bg-[#1d1b1a] flex flex-col justify-center">
                {reservationSuccess ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl text-white">Reservation Request Sent!</h3>
                    <p className="text-sm text-[#d5c4b4]">
                      Thank you, {reservationName || 'Guest'}. We have saved your table request for {reservationDate}. Our Dhanmondi host will greet you upon arrival.
                    </p>
                    <span className="inline-block text-xs font-mono font-bold text-[#f8bb78]">
                      HOLD ID: TLC-{Math.floor(1000 + Math.random() * 9000)}
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleInlineReservation} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={reservationName}
                          onChange={(e) => setReservationName(e.target.value)}
                          placeholder="e.g. Aminul Islam"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#221f1e] text-white border border-[#342d2a] placeholder:text-[#9d8e80] text-sm focus:outline-none focus:border-[#d49b5b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Phone Number</label>
                        <input
                          type="tel"
                          required
                          value={reservationPhone}
                          onChange={(e) => setReservationPhone(e.target.value)}
                          placeholder="017XX-XXXXXX"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#221f1e] text-white border border-[#342d2a] placeholder:text-[#9d8e80] text-sm focus:outline-none focus:border-[#d49b5b]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Date</label>
                        <input
                          type="date"
                          required
                          value={reservationDate}
                          onChange={(e) => setReservationDate(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#221f1e] text-white border border-[#342d2a] text-sm focus:outline-none focus:border-[#d49b5b]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Time Slot</label>
                        <select
                          value={reservationTime}
                          onChange={(e) => setReservationTime(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#221f1e] text-white border border-[#342d2a] text-sm focus:outline-none focus:border-[#d49b5b]"
                        >
                          <option>Morning (9:00 AM - 12:00 PM)</option>
                          <option>Afternoon (12:00 PM - 5:00 PM)</option>
                          <option>Evening Rush (5:00 PM - 9:00 PM)</option>
                          <option>Late Night (9:00 PM - 12:00 AM)</option>
                          <option>Midnight Special (12:00 AM - 2:00 AM)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Party Size</label>
                        <select
                          value={reservationParty}
                          onChange={(e) => setReservationParty(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-[#221f1e] text-white border border-[#342d2a] text-sm focus:outline-none focus:border-[#d49b5b]"
                        >
                          <option>1 Person (Solo Study)</option>
                          <option>2 Persons (Cozy Date)</option>
                          <option>3 - 4 Persons (Small Group)</option>
                          <option>5 - 8 Persons (Team Table)</option>
                          <option>9+ (Private Area)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Special Requests / Seating</label>
                      <textarea
                        value={reservationNote}
                        onChange={(e) => setReservationNote(e.target.value)}
                        placeholder="Quiet study desk with power socket, birthday slice surprise, or window corner seating..."
                        rows={2}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#221f1e] text-white border border-[#342d2a] placeholder:text-[#9d8e80] text-sm focus:outline-none focus:border-[#d49b5b] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isReserving}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] font-semibold text-sm shadow-[0_4px_20px_rgba(212,155,91,0.25)] flex items-center justify-center gap-2 active:scale-98 transition-all"
                    >
                      {isReserving ? (
                        <span>Reserving Table...</span>
                      ) : (
                        <>
                          <span>Confirm Reservation Request</span>
                          <CheckCircle2 className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION & HOURS */}
      <section id="location-section" className="w-full py-16 bg-[#151312] relative">
        <div className="max-w-[1320px] mx-auto px-6">
          <div className="rounded-3xl bg-[#221f1e] p-8 sm:p-12 border border-[#342d2a] shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-[#f8bb78]" />
                  <span className="font-label-caps text-[#f8bb78] text-[11px] uppercase">
                    Visit Our Dhanmondi Sanctuary
                  </span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl text-white">
                  Open Late for Dhanmondi's Thinkers & Drinkers
                </h2>

                <p className="text-sm text-[#d5c4b4] leading-relaxed">
                  Located conveniently on Satmasjid Road, Dhanmondi. Whether you crave a morning cortado or a 1:00 AM post-dinner affogato and meatball melt, our doors remain warmly open.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-[#2c2928] border border-[#342d2a]">
                    <span className="font-label-caps text-[#d5c4b4] text-[10px] uppercase">
                      Sun — Wed
                    </span>
                    <span className="font-serif text-xl text-[#f8bb78] block mt-1">
                      9:00 AM – 12:00 AM
                    </span>
                    <span className="text-xs text-[#9d8e80]">Midnight Brewing</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#2c2928] border border-[#342d2a]">
                    <span className="font-label-caps text-[#efbe82] text-[10px] uppercase">
                      Thu — Sat (Weekend)
                    </span>
                    <span className="font-serif text-xl text-[#efbe82] block mt-1">
                      9:00 AM – 2:00 AM
                    </span>
                    <span className="text-xs text-[#9d8e80]">Late Night Hangout</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#d5c4b4]">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#f8bb78]" />
                    {CAFE_INFO.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#f8bb78]" />
                    {CAFE_INFO.phone}
                  </span>
                </div>
              </div>

              {/* Map Card */}
              <div className="lg:col-span-6">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl h-80 w-full group border border-[#342d2a]">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBtlaRMBTB509sZazS-A1LPk1CbfBvZeM00g1kF3Qo_5SnbO8Pzvn_YmOvvJwEtV5naaXU7opV1nI4xlTtkw84Xj6rmwDDu8upvl21C4zfeoxlaArKy2FMuAByr2IzrVs3D-fN5ty5vvwnNbWz35egOyky-zqxSyucmwmJgImDqFBYD1VQg_G33yROqLXTZXNHTxEEd4F6fmVbDbf9OcuPVgEpGSi-p2v6S-eOi7LGQ7aQSxZl8775')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-[#100e0d]/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#2c2928]/95 backdrop-blur-md border border-[#342d2a] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f8bb78]/20 flex items-center justify-center text-[#f8bb78]">
                        <Compass className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-white block">The Local Coffee</span>
                        <span className="text-xs text-[#d5c4b4]">Satmasjid Road, Dhanmondi 1209</span>
                      </div>
                    </div>
                    <a
                      href={CAFE_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-[#d49b5b] text-[#482900] text-xs font-semibold hover:bg-[#f8bb78] flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#100e0d] border-t border-[#342d2a] text-[#d5c4b4]">
        <div className="max-w-[1320px] mx-auto px-6 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
            {/* Col 1 */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src={LOGO_URL} 
                  alt="Logo" 
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-[#d49b5b]"
                />
                <div>
                  <span className="font-serif text-xl text-[#f8bb78] block leading-none">
                    {CAFE_INFO.name}
                  </span>
                  <span className="font-label-caps text-[10px] text-[#9d8e80] tracking-widest mt-1 block">
                    {CAFE_INFO.tagline}
                  </span>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-[#d5c4b4] max-w-sm">
                An intimate sanctuary in the heart of Dhanmondi, celebrating the craft of single-origin beans, artisanal viennoiserie, and ambient cultural conversations.
              </p>
            </div>

            {/* Col 2 */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <h4 className="font-serif text-sm text-white uppercase tracking-wider mb-1">
                Dhanmondi Sanctuary
              </h4>
              <div className="flex items-start gap-2 text-xs">
                <MapPin className="w-4 h-4 text-[#f8bb78] mt-0.5 shrink-0" />
                <span>{CAFE_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-[#f8bb78] shrink-0" />
                <span>{CAFE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[#f8bb78]">@</span>
                <span>{CAFE_INFO.email}</span>
              </div>
            </div>

            {/* Col 3 */}
            <div className="lg:col-span-2 flex flex-col gap-2.5">
              <h4 className="font-serif text-sm text-white uppercase tracking-wider mb-1">
                Hours
              </h4>
              <div className="text-xs space-y-1.5">
                <div>
                  <span className="text-[#f8bb78] block font-medium">Sunday – Wednesday</span>
                  <span>9:00 AM – 12:00 AM</span>
                </div>
                <div>
                  <span className="text-[#f8bb78] block font-medium">Thursday – Saturday</span>
                  <span>9:00 AM – 2:00 AM</span>
                </div>
              </div>
            </div>

            {/* Col 4 */}
            <div className="lg:col-span-3 flex flex-col gap-2.5">
              <h4 className="font-serif text-sm text-white uppercase tracking-wider mb-1">
                Secret Seasonal Brews
              </h4>
              <p className="text-xs text-[#d5c4b4]">
                Subscribe for exclusive tastings, micro-lot releases, and cultural acoustic evenings in Dhanmondi.
              </p>
              {newsletterSubscribed ? (
                <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs text-center font-medium">
                  Welcome to The Local Circle!
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col gap-2 mt-1">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-3 py-2 rounded-lg bg-[#221f1e] border border-[#342d2a] text-xs text-white placeholder:text-[#9d8e80] focus:outline-none focus:border-[#d49b5b]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-3 rounded-lg bg-[#644212] hover:bg-[#d49b5b] hover:text-[#482900] text-[#dfb076] font-semibold text-xs transition-colors"
                  >
                    Join Inner Circle
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-[#342d2a] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9d8e80]">
            <p>© 2026 The Local Coffee BD. All rights reserved. Crafted with care in Dhaka.</p>
            <div className="flex items-center gap-6">
              <a href="#hero-section" className="hover:text-[#f8bb78] transition-colors">Privacy</a>
              <a href="#hero-section" className="hover:text-[#f8bb78] transition-colors">Terms</a>
              <a href="#location-section" className="hover:text-[#f8bb78] transition-colors">Find Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
