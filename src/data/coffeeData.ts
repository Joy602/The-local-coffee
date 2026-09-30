import { MenuItem, BaristaStory, SocialPost } from '../types';

export const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1V_ofRF9nYO07mrfmu8AJD3gmDVzOow8rLDEEvsKQd-1qsHYjUtP6qg2x6y9EUFti0TsQjtbju8ZrUm7ajJj2LmLDQXaMCzBZ2O45VLJk_yRNRzbXicH1pACoR0XFnGc-vaFRTJ2CEqbwJwgWMlYEODRwhU5dVhbLEyDkipfnvp6k8oz6jRSfiIMCkuuzC-P0ip88RiGhsL7bolAX_RhUxgSLmW_MIptmq-sbh_Wunc1Ztw3yV2B_B-hCDMbRFA3CMim9-OMqjE";

export const CAFE_INFO = {
  name: "The Local Coffee",
  tagline: "Coffee | Culture | Community",
  location: "Plot 34, Satmasjid Road, Dhanmondi, Dhaka 1209, Bangladesh",
  phone: "01939-899573",
  phoneTel: "+8801939899573",
  email: "thelocalcoffeebd@gmail.com",
  website: "thelocalcoffee.bd",
  followers: "4.7K followers • 1 following",
  rating: "90% recommend (81 reviews)",
  weekdayHours: "Sun – Wed: 9:00 AM – 12:00 AM",
  weekendHours: "Thu – Sat: 9:00 AM – 2:00 AM (Midnight Brewing)",
  mapsUrl: "https://maps.google.com/?q=The+Local+Coffee+Satmasjid+Road+Dhanmondi+Dhaka"
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "sunset-matcha-brew",
    name: "Sunset Citrus Matcha & Cold Brew",
    category: "iced",
    categoryLabel: "Iced Refreshers",
    price: 380,
    description: "Single-origin Ethiopia cold brew delicately stratified with stone-ground ceremonial Uji matcha and freshly squeezed calamansi essence.",
    badge: "Trending Innovation",
    badgeType: "primary",
    notes: "Cold • Ceremonial Grade • 350ml",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwFYxLHyiM4lWeRBH0oUdUO3T2PFKbBxHyhJkx_tWtmkuCwXM_dqFM9RG8qXBvNlzgayOkiAQEDRr7vKnXO7E8cLMKpgiamqv6G9XIbe8k_JsJfYvWlRvlAE9zmSBe49eEMmceN9a8YyHXrM5pWi3vcCCsS_U6G1jFWtN-PElobPxyLn1Do9NUQLjOaMZKICSlXmZkZCaTT6Wt_kIqI3WZAXrJ_M0zpZ6Sj-QhvnNez6Vdi6dNd81v",
    altText: "Layered Sunset Citrus Matcha iced drink with deep green Uji matcha foam over golden yuzu tonic in a ribbed tall glass",
    isHeroSpecial: true
  },
  {
    id: "meatball-melt",
    name: "Meatball Melt Sandwich",
    category: "melts",
    categoryLabel: "Signature Melts",
    price: 540,
    description: "\"We made this one hard to resist.\" Handcrafted juicy meatballs drenched in rich slow-simmered marinara, smothered with generous melted mozzarella on warm toasted baguette.",
    badge: "Chef's Signature",
    badgeType: "secondary",
    notes: "Toasted Baguette • Molten Mozzarella • Fresh Basil",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh6oxQ9dHxCBt2miKAT9lLjmQ2j8y3_B1dN4mQK1Tf9l35faJKIcg16HIwabqioARRp-mCoqvftDZFVp7RbLxL7Z7fajh8xlIhRif8h2D5wK0Zp6FS30HCCVz9y8PlJZR-uckPME_ZP-dADvvzl9puCyI94JqvTiK9lV-7MtB-OKaCUlS20AVRR4lWNR5uM3cGxiiU-P_pdoqqXv7cOjFtPcEsTmgelcZ7fWjXD_uKqcXU5NWQCbt_",
    altText: "Meatball melt sandwich sliced open with melted bubbling mozzarella stretching lavishly across rustic toasted baguette",
    isHeroSpecial: true
  },
  {
    id: "sunset-matcha-classic",
    name: "Sunset Matcha Special",
    category: "iced",
    categoryLabel: "Iced Refreshers",
    price: 420,
    description: "A refreshing twist on your special matcha. Vibrant ceremonial grade Japanese green tea layered with zesty fresh citrus extract for an uplifting, bright afternoon pick-me-up.",
    badge: "Trending Special",
    badgeType: "primary",
    notes: "Ceremonial Grade • Citrus Infusion • Layered",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHA82nUSpk0Jl-rkZtJKdOw7oLsot7N5P63NEwJYyfxsTkCyzURWZhNSPjK2M9lg23UG8R1H-o4X62Y9QULrx7zlMIn4TcmFgALdekfUqFvsvfLOZfM0jY9sdtwZnY4AQKKu1YpjFXUO7A6Tui4ADot2jurqYxx3MWhZbVIynHI11iP_kn9cdWExZp1oz75WfIJbIP__PyIiduu09qj3HCO_hJs6K9fXhjWMVpwkNbTV-F6y5PUTtP",
    altText: "Layered Sunset Matcha beverage in crystal tumbler with rich matcha head and sunny bottom",
    isHeroSpecial: true
  },
  {
    id: "chicken-croissant-potpie",
    name: "Chicken Croissant & Pot Pie",
    category: "melts",
    categoryLabel: "Signature Melts",
    price: 460,
    description: "\"Some days call for something a little more filling.\" Generously baked pure butter croissant filled with herb chicken and paired with Dhaka's coziest savory pot pie.",
    badge: "Freshly Baked",
    badgeType: "neutral",
    notes: "Baked Hourly • Slow Mornings • Butter Lamination",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOJdhK-AZ5u_dvWBUAUxZEFHyLkFMKHFJXgCaaulUeP2ptH3m2Sb8ymOaHvT0A-pUphmelAtD6yJ9UKJt_EjVyMbAHxB2uT_MUz7NzDZOoELEzfLlm7eOj8pyswf8o69knZAPHNTn2xSqqgxfMNEI_ugT2YqSWhP97WY8_F58fvkqYZ60vgZKUvNzx-uhZs5_-tA5vJjHKgRH_1TDzOHsGqvCrDzZgdI38JpWo6-Gz3lbXjkKh3S5b",
    altText: "Crispy butter croissant stuffed with herb roasted chicken served alongside a miniature savory pot pie",
    isHeroSpecial: true
  },
  {
    id: "coldbrew-espresso-spritz",
    name: "Cold Brew & Espresso Spritz",
    category: "iced",
    categoryLabel: "Iced Refreshers",
    price: 390,
    description: "\"The sound of water, the sound of coffee.\" 16-hour slow steeped specialty Arabica poured over dense ice blocks, alongside our signature Espresso Lemonade fizz.",
    badge: "Sound of Coffee",
    badgeType: "primary",
    notes: "16-Hour Steep • Single Origin Arabica • Citrus Fizz",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxoF5XOEyc77I_sfwAtny4S1p0_av0wjDyKF-3Dt2tqkEgN2mq89ptjCnXuJfAinEPsCxsffYGFhR2FWjMwf5xrVP-83CvPMttiT0Io-FQ2PZCm5S_xtNBU1J5hUYJqMMKf7x0-B3X0VfTSEQOOTOVfVogp77GVT3xYQEBbRxsGuF3r1FJJmNC3uQ71OXU4r40zsmJQL-ES3MXExNqj_meNwIE-QMHgZh7QUsIPu-Mkaj45bwx1QYT",
    altText: "Tumblers with slow steeped cold brew and sparkling espresso spritz with lemon garnish",
    isHeroSpecial: true
  },
  {
    id: "pulled-beef-croissant",
    name: "Pulled Beef Croissant Melt",
    category: "melts",
    categoryLabel: "Signature Melts",
    price: 580,
    description: "Slow-braised tender spiced beef brisket pulled and tucked into warm buttery layers, crowned with caramelized onion confit and bubbling Swiss cheese.",
    badge: "Hearty Gourmet",
    badgeType: "secondary",
    notes: "8-Hour Braised Brisket • Caramelized Onion • Swiss Melt",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSYbyf5RgEupIqctpE59v8BADS4UEmx1zA0QoRkVn_R88bG3DkuCYGoVt6RWBwaGPXDMRfVOhtlm4N52y_6dQv5tG2piwSRlWQwFIaRrXzT-SnE76PsTvf2fxPBBOKx411xttpw9mI7GSG5_E9a6TKiaSm-gRbZOfjYy4EHg03uWfqYcW3fNT7ESA6S0EhnkZoXIc33o7hHPqk2VOeXUSfSa4cyIvXWetIkKVWxzjA-iEWwJTfQOT_",
    altText: "Melted cheese dripping from a generous pulled beef croissant melt on dark earthenware plate",
    isHeroSpecial: true
  },
  {
    id: "classic-carrot-truffle-cake",
    name: "Classic Carrot & Truffle Cake",
    category: "bakes",
    categoryLabel: "Gourmet Bakes",
    price: 350,
    description: "\"A little something sweet with your coffee and a reason to stay a little longer.\" Spiced walnut sponge layered with velvety cream cheese, or dense 70% dark cocoa indulgence.",
    badge: "Sweet Companion",
    badgeType: "neutral",
    notes: "Spiced Walnuts • Velvety Cream Cheese • 70% Cocoa",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_wmw47TlU0mPYZ4IJkiOTCkUJYy3vw69of36X0Dn-1tUhN0DDoOFZAgi8bOZNoiOEmKg1nYCtgeXuKPb5OUN-6A2gPpWUizB7wTI5tX3cnBTfJXjkzA4RsDAcKSGceyh5P9JhvUKweHc18TXoGUp2xUk29SibXLeWc1rAOkr4aCASf6mLUyf168oHYP1O2FAhOZ1-NQFw2qqk5e0yLcyHTwyRRnbOihNwUISQ-U0ALlCJ2HLaVcwj",
    altText: "Layered gourmet carrot cake with cream cheese frosting next to a rich chocolate truffle slice and iced latte",
    isHeroSpecial: true
  },
  {
    id: "double-espresso-macchiato",
    name: "Double Espresso Macchiato",
    category: "coffee",
    categoryLabel: "Specialty Coffee",
    price: 240,
    description: "Intense double shot of house blend topped with a dollop of velvety textured microfoam.",
    badge: "Single Origin",
    badgeType: "primary",
    notes: "Notes: Roasted Almond • Dark Cacao",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjwOpHrqleKO0Wq2QcY8oCeJpg6D881lFTdu0ZUsxI2bxcD0vL4G6XrfVvzcrURmJpSlKYp062Dy1drLeQSqUX28uF2K4uclkDFg5YwCVhdxL1tBVpCu2uq_cFcJ6jtdavLFV_vtMG-J7kX7l3wBg2cxuqh3a-KIW4LPHKLRbIXs4HXWbyiUfYsUFCiJXt91KNg_w-cMXqms9rhsNKu8bZbvluKiZeEzMswcNeUclOW-FHXdGWEY52",
    altText: "Artisanal double espresso macchiato with microfoam crema in ceramic cup"
  },
  {
    id: "spanish-cortado-latte",
    name: "Spanish Cortado Latte",
    category: "coffee",
    categoryLabel: "Specialty Coffee",
    price: 340,
    description: "Equal parts rich espresso and condensed warm silk milk with a dust of Saigon cinnamon.",
    badge: "Bestseller",
    badgeType: "secondary",
    notes: "Notes: Sweet Crema • Caramelized Sugar • 180ml",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWorW5jIhEZxziM92er2NSV7Wlsh9SBX7ADmk_veDS5LokdkvOoKW_wiXM0UHE3A45-oqmjNFldZmrdmZoNtP5wir0i8wB13VuaDp2fYpUxxRJ_sEW9kQYOkGdJlWunGROaOUg1TdnwyroG8VG_at8OH82GfDL-UkZDJlXNbnphEYXsGvW-tFNe1BQR2TJQEnfwrS_kkttPx8-pMNaWZW1nUUuK26G0HG7-Sf-jZYpk5pSm6Su93hn",
    altText: "Spanish cortado latte in faceted glass with layered condensed milk and espresso"
  },
  {
    id: "pourover-v60-ethiopia",
    name: "Pourover V60 (Ethiopia Yirgacheffe)",
    category: "coffee",
    categoryLabel: "Specialty Coffee",
    price: 380,
    description: "Hand-poured slow extraction highlighting jasmine florals, bergamot, and sweet stone fruit.",
    badge: "Light Roast",
    badgeType: "primary",
    notes: "Light Roast • Washed Process • Altitude 1,950m",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJIPSwew2A1Y9AqXdR2L9nqFrcNLbJscqzROHwItJR7hlRn0USYZk5t6oW6M41wyo6QU3iYmhRTNY6TSJkumoYv1gQsui4VRPE44cWMdEz8Sh6L7pc8rWu35SJLM9pPvpiYVGWE95h73cpSfSFxakpX7nGR-ZMumLDTr0vNoRTepULnTZousnuopFidYLI8e4sEowkABkAJAGDQgohucb5SrhuvD2iCV7sUnuQxp18JWwcoOiQsZCy",
    altText: "Barista hand pour-over V60 kettle brewing single origin Ethiopian coffee"
  },
  {
    id: "signature-espresso-tonic",
    name: "Signature Espresso Tonic & Rosemary",
    category: "iced",
    categoryLabel: "Iced Refreshers",
    price: 360,
    description: "Crisp artisan tonic water, double pulled espresso float, expressed citrus peel, and torched rosemary.",
    badge: "Sparkling",
    badgeType: "accent",
    notes: "Sparkling • Refreshing • Botanical",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7XSJC0A8le45jvKnzkuMiA7GGNv0JuxqA9rjpUVnqsJjlJtJykh7Wa7d3pVAVRaptY6XdlcFAH0WEWu0lmbg8CAFvmAbtX4jjP8vOMYOSYbGpSXtm_q3GwgMp3xK7lGs0RDeb5SYZ-6fCgwMAYHE4h1rqrwf4eR0AJbnezBmesIvz9HqXP68qzIhpgubIzutb84M_foJA5FOylFlRcg4iuz1E7aR_yZNzDId7MzsuuRSp7XAuruTS",
    altText: "Tall glass with fizzy artisan tonic and floating double espresso with rosemary sprig"
  }
];

export const BARISTA_STORIES: BaristaStory[] = [
  {
    id: "story-matcha",
    title: "Sunset Matcha",
    subtitle: "Ceremonial Uji Grade",
    badge: "Matcha",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1vzYB1ih9B-d8qard-841glh4z-te3Pep6GJE0dTMk5ofHEf4J_YeuJKQWyb9BYVhXskEwUnbe_ft9Q4enyRtDCMKvzdv-k0CqUgHVDvDB4CbXnJPl09kd9Aj4zBujNNW-iuhSr7YI04vS0lExA8DIXh9BVI8k4uHR3rjytChOeWv4Metd9VnfJau1l1zQ9D0sDYml-T9QbIvoXnClX9cpYDP25X45xDYdsqlNSmuIi6rJTKnTr5l",
    duration: 5,
    caption: "A little citrus, a little matcha, and a whole lot of refreshment ☀️🍵 Whisked fresh to order in Dhanmondi."
  },
  {
    id: "story-melts",
    title: "Artisanal Melts",
    subtitle: "Fresh From Oven",
    badge: "Melts",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfWIU_fZ8WwkNvVBo0OrFX7dXoY92yOPvx7TnJixQD_tYxx20spHCF6eosx33T78YmsyyG4hHowjQttzawF3ZFA69RJUfEw8W4A8nIWeO1nHT2rcehrIh2Sf5kMQ9KvC9LvldT6YLS-jc5xWg66V75IfHjyJ7KRmufiOVOpytfmW10dMraehN7w2NWKNpjAMNZMqnmZUCFoFCY6foAiedRPGhtOSRLbWtMMvQ3nA2xD7QvuynE-RYb",
    duration: 5,
    caption: "Slow-simmered Angus meatballs drenched in marinara and bubbling with molten mozzarella."
  },
  {
    id: "story-coldbrew",
    title: "Cold Brew Lab",
    subtitle: "16-Hour Steep",
    badge: "Cold Brew",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlOu5pnEZq38YuOobX66qqorXYJHB8hA2hJSeFyA0XaFIFwnLXzKaQGUwJP5hzdP5z4fx3D6-8-e2bXTPgkSqK4ddP-CcBH3WkQFk69WFi7gwyTC_3SOifjpSw7z9Lb88XJCTyT9-y_reDnKM_v5W0JvIITL8gzhGefEkej0LvV_8i4mwWAMkrD971iM_y-hXk8hZhVmk6r06S7NC_eO5uaJ-oqeq1MbhwsTkzVMEEnKxcvKWWLogl",
    duration: 5,
    caption: "\"Water has its own sound. Coffee has a whole soundtrack.\" Single origin cold extraction."
  },
  {
    id: "story-bakery",
    title: "Daily Patisserie",
    subtitle: "Carrot & Truffle",
    badge: "Bakery",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEjgyA7ug7w7xGbZg7fr7cNVanFBMAwaeXZPbA-h44kfeWXj8sYF370f45xH-mNHxMBnu_Fk8SCMSLqlrr8f6Cox5KGZMqqlvgi-NTTolbLsUlufpqV8VllzpBFK6tWZNQ_MpZ1afdh00wRrbs-2oLNLV-OREDiCqjLHD0nGR499zyWOsVZN_XnzgwNUTYr8gIQDcCpi-OM6HOKNou5LyfBJGiD9Xg0lTZW9LzKsNe7Ia3Z9LnrYkh",
    duration: 5,
    caption: "A little something sweet with your coffee and a reason to stay a little longer in our lounge."
  },
  {
    id: "story-midnight",
    title: "Midnight Brewing",
    subtitle: "Open till 2:00 AM",
    badge: "Late Hours",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxUrMUuLhaiB_p-FFaA5L8dinuO88U2SRF1M0TteG9Q5mMNcIsWdGMVnX5XEgDsElIFMLp-LJIWUvb78WvVjk1J3P19cy3IcpoQCARy2JY99OnXSljVWkxTRrXSs5O-jOX5kRNZHJlQNxqJCXT-TOLzDNj4-sgPgvELAR0hWqpvjK1dALuCVcseUwQgDJnfe4dB-RM3DPJBqBkl4G4NAnLb4r7fOiXXAxRBYFcssHVNjNlhIRx4LVF",
    duration: 5,
    caption: "For Dhanmondi's thinkers, designers, and late-night creators. Open until 2:00 AM on weekends."
  }
];

export const SOCIAL_POSTS: SocialPost[] = [
  {
    id: "fb-post-1",
    author: "The Local Coffee",
    authorAvatar: LOGO_URL,
    timeAgo: "16 hours ago",
    content: "One hand: Chili Charge. Other hand: Calamansi Iced Tea... Balancing priorities right here at our Dhanmondi espresso bar.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwFYxLHyiM4lWeRBH0oUdUO3T2PFKbBxHyhJkx_tWtmkuCwXM_dqFM9RG8qXBvNlzgayOkiAQEDRr7vKnXO7E8cLMKpgiamqv6G9XIbe8k_JsJfYvWlRvlAE9zmSBe49eEMmceN9a8YyHXrM5pWi3vcCCsS_U6G1jFWtN-PElobPxyLn1Do9NUQLjOaMZKICSlXmZkZCaTT6Wt_kIqI3WZAXrJ_M0zpZ6Sj-QhvnNez6Vdi6dNd81v",
    likes: 19,
    commentsCount: 3,
    comments: [
      { author: "Aminul Islam Joy", text: "Best calm place to study with coffee in Dhanmondi.", timeAgo: "12h ago" }
    ]
  },
  {
    id: "fb-post-2",
    author: "The Local Coffee",
    authorAvatar: LOGO_URL,
    timeAgo: "September 17",
    content: "SIX NEW REASONS TO VISIT THE LOCAL. Tried everything on your usual order? Now there's freshly crafted savory melts, cold-steeped spritz, and comforting slow morning bakes.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh6oxQ9dHxCBt2miKAT9lLjmQ2j8y3_B1dN4mQK1Tf9l35faJKIcg16HIwabqioARRp-mCoqvftDZFVp7RbLxL7Z7fajh8xlIhRif8h2D5wK0Zp6FS30HCCVz9y8PlJZR-uckPME_ZP-dADvvzl9puCyI94JqvTiK9lV-7MtB-OKaCUlS20AVRR4lWNR5uM3cGxiiU-P_pdoqqXv7cOjFtPcEsTmgelcZ7fWjXD_uKqcXU5NWQCbt_",
    likes: 42,
    commentsCount: 10,
    comments: [
      { author: "Md Naimus Sakib", text: "Look so tempting! Especially that meatball melt.", timeAgo: "1w ago" },
      { author: "Shaulat Ali", text: "New items? InshaAllah, We will try these items after going to BD.", timeAgo: "1w ago" }
    ]
  },
  {
    id: "fb-post-3",
    author: "The Local Coffee",
    authorAvatar: LOGO_URL,
    timeAgo: "September 14",
    content: "Water has its own sound. Coffee has a whole soundtrack. Dhanmondi has found its cozy corner on Satmasjid Road.",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxoF5XOEyc77I_sfwAtny4S1p0_av0wjDyKF-3Dt2tqkEgN2mq89ptjCnXuJfAinEPsCxsffYGFhR2FWjMwf5xrVP-83CvPMttiT0Io-FQ2PZCm5S_xtNBU1J5hUYJqMMKf7x0-B3X0VfTSEQOOTOVfVogp77GVT3xYQEBbRxsGuF3r1FJJmNC3uQ71OXU4r40zsmJQL-ES3MXExNqj_meNwIE-QMHgZh7QUsIPu-Mkaj45bwx1QYT",
    likes: 28,
    commentsCount: 4
  }
];

export const ATMOSPHERE_IMAGES = [
  {
    title: "Warm Wooden Accents & Ambient Glow",
    subtitle: "Spacious community tables and intimate two-seater corners equipped with power outlets.",
    category: "Cozy Seating",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC39hU3m_-hyVwnwSBC_0Ipg49Kcc4xBEn7apBCCDISjmGH4fHd_X14E4GRUKKbiupzw-g6c4lgjePA4CA3rQT3mjIzCu3w4llk4z4eMCJahrazXBJlpP5XTdyLbvSq8gfY7pB28tEmFUPyPDh1P6UOmuYUtquBE5b2X95hQL8Q5j7FcKjVcFOSnA2PTiflSSDjnCw1wXm2IcKXGQ2MdKE6AnCLgLbKNRWcwhSjQY0xLAaWMNsO5H0q"
  },
  {
    title: "The Friendly Heart of The Local",
    subtitle: "Ask our crew for personalized tasting notes or secret off-menu brews.",
    category: "Barista Craft",
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaIUqVto9r9-n5wtTFWzK0PotxspLJ1QkFQvc3RQ-ui3NvwaNpnv_Rny9UnmYDZ-9be5G3kqG00ZJlYuXNZpZ2eQVlN_feQZleRtNqNFgB01amgET29OBoJzsu4YOY5ZTtZjCTw_6NWjlzIF5ONxtOGVavnS5pNL33vutQFEU_GnIKzSs9OaL91vDbgYD1hW6M7w4pDjEvNY6Pg4vsBIepxLgm0B4WxNB179UPOjQsFCc6DrI3uDEW"
  }
];
