import React, { useState } from 'react';
import { LOGO_URL, CAFE_INFO, MENU_ITEMS } from '../data/coffeeData';
import { 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Instagram, 
  CheckCircle2, 
  MoreHorizontal, 
  Search, 
  Star, 
  Send,
  Coffee,
  Bookmark
} from 'lucide-react';

interface SocialFeedViewProps {
  onOrderSpecialItem?: (itemName: string) => void;
}

export const SocialFeedView: React.FC<SocialFeedViewProps> = ({ onOrderSpecialItem }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'about' | 'reels' | 'photos'>('all');
  const [likesState, setLikesState] = useState<Record<string, number>>({
    post1: 19,
    post2: 42,
    post3: 31,
    post4: 28
  });
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({});
  const [commentsState, setCommentsState] = useState<Record<string, string[]>>({
    post1: [
      "Aminul Islam Joy: Best calm place to study with coffee in Dhanmondi."
    ],
    post2: [
      "Md Naimus Sakib: Looks so tempting! Especially that meatball melt.",
      "Shaulat Ali: New items? InshaAllah, We will try these items after going to BD."
    ],
    post3: [
      "Fariha Rahman: The sourdough crust crunch is real 🔥"
    ],
    post4: [
      "Tahsin Ahmed: That espresso lemonade spritz hits different in afternoon heat."
    ]
  });
  const [newCommentInput, setNewCommentInput] = useState<Record<string, string>>({});

  const toggleLike = (postId: string) => {
    setUserLiked((prev) => {
      const isAlready = !!prev[postId];
      setLikesState((l) => ({
        ...l,
        [postId]: isAlready ? l[postId] - 1 : l[postId] + 1
      }));
      return { ...prev, [postId]: !isAlready };
    });
  };

  const handleAddComment = (postId: string) => {
    const text = newCommentInput[postId]?.trim();
    if (!text) return;
    setCommentsState((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), `You: ${text}`]
    }));
    setNewCommentInput((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="w-full max-w-[1100px] mx-auto bg-[#181514] text-[#e8e1df] min-h-screen border-x border-[#342d2a]/50">
      {/* Facebook Style Cover Banner */}
      <div className="relative w-full h-56 sm:h-72 bg-[#100e0d] overflow-hidden">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwFYxLHyiM4lWeRBH0oUdUO3T2PFKbBxHyhJkx_tWtmkuCwXM_dqFM9RG8qXBvNlzgayOkiAQEDRr7vKnXO7E8cLMKpgiamqv6G9XIbe8k_JsJfYvWlRvlAE9zmSBe49eEMmceN9a8YyHXrM5pWi3vcCCsS_U6G1jFWtN-PElobPxyLn1Do9NUQLjOaMZKICSlXmZkZCaTT6Wt_kIqI3WZAXrJ_M0zpZ6Sj-QhvnNez6Vdi6dNd81v"
          alt="The Local Coffee Banner"
          className="w-full h-full object-cover filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#181514] via-transparent to-black/30" />
      </div>

      {/* Header Profile Section */}
      <div className="px-6 pb-4 border-b border-[#342d2a] -mt-16 sm:-mt-20 relative z-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full p-1 bg-[#181514] ring-4 ring-[#d49b5b] shadow-2xl overflow-hidden shrink-0">
            <img src={LOGO_URL} alt="The Local Coffee" className="w-full h-full rounded-full object-cover" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-white font-medium">{CAFE_INFO.name}</h1>
              <CheckCircle2 className="w-5 h-5 text-blue-400 fill-blue-400/20" />
            </div>
            <p className="text-xs text-[#9d8e80] font-medium">{CAFE_INFO.followers}</p>
            <p className="text-xs text-[#f8bb78] font-medium">{CAFE_INFO.tagline}</p>
            <p className="text-[11px] text-[#d5c4b4] max-w-md pt-0.5">
              Sunday to Wednesday: 9AM - 12AM • Thursday to Saturday: 9AM - 2AM (Midnight Brewing)
            </p>
          </div>
        </div>

        {/* Facebook Style Action Buttons */}
        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${CAFE_INFO.phoneTel}`}
            className="px-4 py-2 rounded-lg bg-[#0866ff] hover:bg-blue-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call / Order</span>
          </a>
          <button 
            onClick={() => alert("Following The Local Coffee updates on Satmasjid Road, Dhanmondi!")}
            className="px-4 py-2 rounded-lg bg-[#2c2928] hover:bg-[#3c3837] text-white font-semibold text-xs transition-colors"
          >
            Following
          </button>
          <button className="w-9 h-9 rounded-lg bg-[#2c2928] hover:bg-[#3c3837] text-white flex items-center justify-center">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="px-6 border-b border-[#342d2a] flex items-center gap-6 overflow-x-auto text-xs font-semibold text-[#9d8e80]">
        <button
          onClick={() => setActiveTab('all')}
          className={`py-3.5 border-b-2 transition-colors ${
            activeTab === 'all' ? 'text-[#0866ff] border-[#0866ff]' : 'border-transparent hover:text-white'
          }`}
        >
          All Posts
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`py-3.5 border-b-2 transition-colors ${
            activeTab === 'about' ? 'text-[#0866ff] border-[#0866ff]' : 'border-transparent hover:text-white'
          }`}
        >
          About & Reviews
        </button>
        <button
          onClick={() => setActiveTab('reels')}
          className={`py-3.5 border-b-2 transition-colors ${
            activeTab === 'reels' ? 'text-[#0866ff] border-[#0866ff]' : 'border-transparent hover:text-white'
          }`}
        >
          Reels & Brews
        </button>
        <button
          onClick={() => setActiveTab('photos')}
          className={`py-3.5 border-b-2 transition-colors ${
            activeTab === 'photos' ? 'text-[#0866ff] border-[#0866ff]' : 'border-transparent hover:text-white'
          }`}
        >
          Photos (9)
        </button>
      </div>

      {/* Main Two-Column Facebook Layout */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Details & Photos Grid */}
        <div className="lg:col-span-5 space-y-5">
          {/* Details Card */}
          <div className="p-4 rounded-xl bg-[#221f1e] border border-[#342d2a] space-y-3.5 text-xs">
            <h3 className="font-semibold text-sm text-white">Details</h3>
            
            <div className="flex items-center gap-2 text-[#d5c4b4]">
              <Star className="w-4 h-4 text-[#f8bb78] fill-[#f8bb78]" />
              <span className="font-medium text-white">{CAFE_INFO.rating}</span>
            </div>

            <div className="flex items-start gap-2 text-[#d5c4b4]">
              <MapPin className="w-4 h-4 text-[#9d8e80] shrink-0 mt-0.5" />
              <span>{CAFE_INFO.location}</span>
            </div>

            <div className="border-t border-[#342d2a] pt-3 space-y-2">
              <div className="flex items-center gap-2 text-[#d5c4b4]">
                <Instagram className="w-4 h-4 text-[#9d8e80]" />
                <span className="text-[#f8bb78]">@thelocalcoffee.bd</span>
              </div>
              <div className="flex items-center gap-2 text-[#d5c4b4]">
                <Phone className="w-4 h-4 text-[#9d8e80]" />
                <span>{CAFE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[#d5c4b4]">
                <Mail className="w-4 h-4 text-[#9d8e80]" />
                <span>{CAFE_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[#d5c4b4]">
                <Globe className="w-4 h-4 text-[#9d8e80]" />
                <span className="text-[#f8bb78]">{CAFE_INFO.website}</span>
              </div>
            </div>
          </div>

          {/* Photos Grid Widget (Matching Image 1) */}
          <div className="p-4 rounded-xl bg-[#221f1e] border border-[#342d2a] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-white">Photos</h3>
              <span className="text-xs text-[#0866ff] hover:underline cursor-pointer">See all photos</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 rounded-lg overflow-hidden">
              {MENU_ITEMS.slice(0, 9).map((item) => (
                <div key={item.id} className="relative aspect-square overflow-hidden bg-[#100e0d] group">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Feed Posts */}
        <div className="lg:col-span-7 space-y-5">
          {/* Post 1: Balancing Priorities */}
          <article className="rounded-xl bg-[#221f1e] border border-[#342d2a] overflow-hidden shadow-md">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-sm text-white">{CAFE_INFO.name}</h4>
                  <span className="text-[11px] text-[#9d8e80]">16 hours ago • Dhanmondi</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-[#9d8e80]" />
            </div>

            <p className="px-4 pb-3 text-xs sm:text-sm text-[#e8e1df] leading-relaxed">
              One hand: Chili Charge. Other hand: Calamansi Iced Tea... Me balancing my priorities like: ☕✨
            </p>

            <div className="w-full bg-[#100e0d]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwFYxLHyiM4lWeRBH0oUdUO3T2PFKbBxHyhJkx_tWtmkuCwXM_dqFM9RG8qXBvNlzgayOkiAQEDRr7vKnXO7E8cLMKpgiamqv6G9XIbe8k_JsJfYvWlRvlAE9zmSBe49eEMmceN9a8YyHXrM5pWi3vcCCsS_U6G1jFWtN-PElobPxyLn1Do9NUQLjOaMZKICSlXmZkZCaTT6Wt_kIqI3WZAXrJ_M0zpZ6Sj-QhvnNez6Vdi6dNd81v"
                alt="Balancing priorities drinks"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Like Counter */}
            <div className="px-4 py-2 border-b border-[#342d2a] flex items-center justify-between text-xs text-[#9d8e80]">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#0866ff] flex items-center justify-center text-white text-[10px]">
                  👍
                </span>
                <span>{likesState.post1} likes</span>
              </div>
              <span>{commentsState.post1.length} comments</span>
            </div>

            {/* Actions Bar */}
            <div className="px-2 py-1 flex justify-around border-b border-[#342d2a] text-xs font-semibold text-[#d5c4b4]">
              <button 
                onClick={() => toggleLike('post1')}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded hover:bg-[#2c2928] ${
                  userLiked.post1 ? 'text-[#0866ff]' : ''
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-1.5 py-1.5 px-3 rounded hover:bg-[#2c2928]">
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-1.5 py-1.5 px-3 rounded hover:bg-[#2c2928]">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Comments List */}
            <div className="p-4 space-y-2 bg-[#1d1b1a]">
              {commentsState.post1.map((c, i) => (
                <div key={i} className="text-xs text-[#d5c4b4] bg-[#221f1e] p-2.5 rounded-lg border border-[#342d2a]">
                  {c}
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newCommentInput.post1 || ''}
                  onChange={(e) => setNewCommentInput({ ...newCommentInput, post1: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment('post1')}
                  className="flex-1 px-3 py-1.5 rounded-full bg-[#221f1e] border border-[#342d2a] text-xs text-white placeholder:text-[#9d8e80] focus:outline-none focus:border-[#d49b5b]"
                />
                <button
                  onClick={() => handleAddComment('post1')}
                  className="px-3 py-1.5 rounded-full bg-[#d49b5b] text-[#482900] text-xs font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>

          {/* Post 2: Meatball Melt & New Reasons */}
          <article className="rounded-xl bg-[#221f1e] border border-[#342d2a] overflow-hidden shadow-md">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-full" />
                <div>
                  <h4 className="font-semibold text-sm text-white">{CAFE_INFO.name}</h4>
                  <span className="text-[11px] text-[#9d8e80]">September 17 • Satmasjid Road</span>
                </div>
              </div>
              <MoreHorizontal className="w-4 h-4 text-[#9d8e80]" />
            </div>

            <p className="px-4 pb-3 text-xs sm:text-sm text-[#e8e1df] leading-relaxed">
              SIX NEW REASONS TO VISIT THE LOCAL. Tried everything on your usual order? Meatball melt with bubbling mozzarella, pulled beef croissant, and cold brew spritz now ready.
            </p>

            <div className="w-full bg-[#100e0d]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh6oxQ9dHxCBt2miKAT9lLjmQ2j8y3_B1dN4mQK1Tf9l35faJKIcg16HIwabqioARRp-mCoqvftDZFVp7RbLxL7Z7fajh8xlIhRif8h2D5wK0Zp6FS30HCCVz9y8PlJZR-uckPME_ZP-dADvvzl9puCyI94JqvTiK9lV-7MtB-OKaCUlS20AVRR4lWNR5uM3cGxiiU-P_pdoqqXv7cOjFtPcEsTmgelcZ7fWjXD_uKqcXU5NWQCbt_"
                alt="Meatball melt post"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Like Counter */}
            <div className="px-4 py-2 border-b border-[#342d2a] flex items-center justify-between text-xs text-[#9d8e80]">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#0866ff] flex items-center justify-center text-white text-[10px]">
                  👍
                </span>
                <span>{likesState.post2} likes</span>
              </div>
              <span>{commentsState.post2.length} comments</span>
            </div>

            {/* Actions Bar */}
            <div className="px-2 py-1 flex justify-around border-b border-[#342d2a] text-xs font-semibold text-[#d5c4b4]">
              <button 
                onClick={() => toggleLike('post2')}
                className={`flex items-center gap-1.5 py-1.5 px-3 rounded hover:bg-[#2c2928] ${
                  userLiked.post2 ? 'text-[#0866ff]' : ''
                }`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-1.5 py-1.5 px-3 rounded hover:bg-[#2c2928]">
                <MessageSquare className="w-4 h-4" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-1.5 py-1.5 px-3 rounded hover:bg-[#2c2928]">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Comments List */}
            <div className="p-4 space-y-2 bg-[#1d1b1a]">
              {commentsState.post2.map((c, i) => (
                <div key={i} className="text-xs text-[#d5c4b4] bg-[#221f1e] p-2.5 rounded-lg border border-[#342d2a]">
                  {c}
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newCommentInput.post2 || ''}
                  onChange={(e) => setNewCommentInput({ ...newCommentInput, post2: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment('post2')}
                  className="flex-1 px-3 py-1.5 rounded-full bg-[#221f1e] border border-[#342d2a] text-xs text-white placeholder:text-[#9d8e80] focus:outline-none focus:border-[#d49b5b]"
                />
                <button
                  onClick={() => handleAddComment('post2')}
                  className="px-3 py-1.5 rounded-full bg-[#d49b5b] text-[#482900] text-xs font-bold"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
