export interface MenuItem {
  id: string;
  name: string;
  category: 'melts' | 'coffee' | 'iced' | 'bakes';
  categoryLabel: string;
  price: number;
  description: string;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'neutral' | 'accent';
  notes?: string;
  imageUrl: string;
  altText: string;
  isHeroSpecial?: boolean;
}

export interface BaristaStory {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  imageUrl: string;
  duration: number; // seconds
  caption: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationData {
  fullName: string;
  phoneNumber: string;
  date: string;
  timeSlot: string;
  partySize: string;
  seatingPreference: string;
  specialRequests?: string;
}

export interface SocialPost {
  id: string;
  author: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  imageUrl?: string;
  likes: number;
  commentsCount: number;
  comments?: {
    author: string;
    text: string;
    timeAgo: string;
  }[];
}
