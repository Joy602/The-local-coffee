import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Phone, CheckCircle2, MapPin, Coffee } from 'lucide-react';
import { CAFE_INFO } from '../data/coffeeData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Late Night (9:00 PM - 12:00 AM)');
  const [partySize, setPartySize] = useState('2 Persons (Cozy Date)');
  const [seatingPreference, setSeatingPreference] = useState('Quiet Study Desk with Power Socket');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TLC-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingRef(ref);
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setBookingRef('');
    setFullName('');
    setPhoneNumber('');
    setSpecialRequests('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg bg-[#181514] border border-[#342d2a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#342d2a] flex items-center justify-between bg-[#151312]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#d49b5b]/20 flex items-center justify-center text-[#d49b5b]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white font-medium">Reserve in Dhanmondi</h3>
              <p className="text-xs text-[#d5c4b4]">{CAFE_INFO.name} • Satmasjid Road Sanctuary</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#221f1e] hover:bg-[#2c2928] text-[#d5c4b4] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isConfirmed ? (
          /* Confirmation Display */
          <div className="p-6 space-y-5 text-center flex-1 overflow-y-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#d49b5b] font-bold">Confirmed Hold</span>
              <h3 className="text-2xl font-serif text-white font-medium">Table Reserved For You</h3>
              <p className="text-sm text-[#d5c4b4]">
                We have notified our Dhanmondi barista hosts. We look forward to welcoming you!
              </p>
            </div>

            <div className="bg-[#221f1e] p-4 rounded-xl border border-[#342d2a] text-left space-y-2.5 text-xs">
              <div className="flex justify-between items-center border-b border-[#342d2a] pb-2">
                <span className="text-[#9d8e80]">Booking Reference</span>
                <span className="font-mono font-bold text-[#f8bb78] text-sm">{bookingRef}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#342d2a] pb-2">
                <span className="text-[#9d8e80]">Guest Name</span>
                <span className="text-white font-medium">{fullName || 'Valued Guest'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#342d2a] pb-2">
                <span className="text-[#9d8e80]">Date & Time</span>
                <span className="text-white">{date} • {timeSlot}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#342d2a] pb-2">
                <span className="text-[#9d8e80]">Seating Zone</span>
                <span className="text-white">{seatingPreference}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-[#9d8e80]">Direct Helpline</span>
                <span className="text-[#f8bb78] font-semibold">{CAFE_INFO.phone}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 px-4 rounded-xl bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] font-semibold text-sm shadow-lg transition-all"
            >
              Done & Return to Cafe
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
            <div className="bg-[#221f1e] p-3.5 rounded-xl border border-[#342d2a]/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#d49b5b] font-bold block">Need Instant Booking?</span>
                <span className="text-xs text-[#d5c4b4]">Call or WhatsApp Barista Counter Directly</span>
              </div>
              <a 
                href={`tel:${CAFE_INFO.phoneTel}`}
                className="px-3 py-1.5 rounded-lg bg-[#d49b5b]/20 hover:bg-[#d49b5b]/30 text-[#f8bb78] text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{CAFE_INFO.phone}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aminul Islam"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#221f1e] border border-[#342d2a] text-white placeholder:text-[#9d8e80] focus:outline-none focus:border-[#d49b5b]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="017XX-XXXXXX"
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#221f1e] border border-[#342d2a] text-white placeholder:text-[#9d8e80] focus:outline-none focus:border-[#d49b5b]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#221f1e] border border-[#342d2a] text-white focus:outline-none focus:border-[#d49b5b]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#221f1e] border border-[#342d2a] text-white focus:outline-none focus:border-[#d49b5b]"
                >
                  <option>Morning (9:00 AM - 12:00 PM)</option>
                  <option>Afternoon (12:00 PM - 5:00 PM)</option>
                  <option>Evening Rush (5:00 PM - 9:00 PM)</option>
                  <option>Late Night (9:00 PM - 12:00 AM)</option>
                  <option>Midnight Special (12:00 AM - 2:00 AM)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Party Size</label>
                <select
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#221f1e] border border-[#342d2a] text-white focus:outline-none focus:border-[#d49b5b]"
                >
                  <option>1 Person (Solo Study)</option>
                  <option>2 Persons (Cozy Date)</option>
                  <option>3 - 4 Persons (Small Group)</option>
                  <option>5 - 8 Persons (Team Table)</option>
                  <option>9+ (Private Area)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Seating Area</label>
                <select
                  value={seatingPreference}
                  onChange={(e) => setSeatingPreference(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-[#221f1e] border border-[#342d2a] text-white focus:outline-none focus:border-[#d49b5b]"
                >
                  <option>Quiet Study Desk with Power Socket</option>
                  <option>Warm Wooden Lounge Corner</option>
                  <option>Two-Seater Cozy Window Seat</option>
                  <option>Espresso Bar Front Seating</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#d5c4b4] mb-1">Special Occasion or Notes</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Quiet study corner, birthday slice surprise, extra power socket..."
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#221f1e] border border-[#342d2a] text-white placeholder:text-[#9d8e80] focus:outline-none focus:border-[#d49b5b] resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] font-semibold text-sm shadow-[0_4px_20px_rgba(212,155,91,0.25)] flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Confirm Table Reservation Request</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-center text-[#9d8e80] mt-2">
                No reservation fee required. Walk-ins are warmly welcomed anytime.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
