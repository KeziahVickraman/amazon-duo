export interface ProductColorVariant {
  name: string;
  hex: string;
  image: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  date: string;
  verified: boolean;
  body: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  asin: string;
  brand: string;
  title: string;
  price: number;
  listPrice?: number;
  rating: number;
  reviewCount: number;
  boughtInPastMonth?: string;
  isPrime: boolean;
  isFreeDelivery: boolean;
  deliveryDays: number; // 1 = Tomorrow, 2 = 2 days, etc.
  shipsFrom: 'Amazon.sg' | 'Amazon US' | 'Amazon Japan';
  badge?: "Amazon's Choice" | 'Best Seller' | 'Limited time deal' | 'Sponsored' | null;
  department:
    | 'Foldable Phone Cases'
    | 'Mobile Phone Cases & Covers'
    | 'Wallet Cases'
    | 'Basic Cases'
    | 'Screen Protectors';
  compatibility: string[];
  features: string[];
  colors: ProductColorVariant[];
  highlights: string[];
  reviews: ProductReview[];
  isNewArrival?: boolean;
}

export const IMAGES = {
  clearMagsafe: '/src/assets/images/case_duo_clear_magsafe_1795058801546.jpg',
  matteBlackHinge: '/src/assets/images/case_duo_matte_black_hinge_1795058801489.jpg',
  leatherFolio: '/src/assets/images/case_duo_leather_folio_1795058801429.jpg',
  wovenMidnight: '/src/assets/images/case_duo_woven_midnight_1795058801516.jpg',
  titaniumBumper: '/src/assets/images/case_duo_titanium_bumper_1795058801042.jpg',
  sageSilicone: '/src/assets/images/case_duo_sage_silicone_1795058801177.jpg',
  carbonAramid: '/src/assets/images/case_duo_carbon_aramid_1795058802102.jpg',
  twinPack: '/src/assets/images/case_duo_twin_pack_1795058801628.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    asin: 'B0D9K8M2PQ',
    brand: 'Spigen',
    title:
      'Spigen Ultra Hybrid Pro MagFit Case Compatible with iPhone Duo (2026) - Anti-Yellowing Clear Hinge Protection with Magnetic Ring - Crystal Clear',
    price: 54.9,
    listPrice: 69.9,
    rating: 4.7,
    reviewCount: 2418,
    boughtInPastMonth: '1K+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: "Amazon's Choice",
    department: 'Foldable Phone Cases',
    compatibility: ['iPhone Duo'],
    features: ['MagSafe Compatible', 'Hinge Protection', 'Clear / Transparent', 'Shockproof'],
    colors: [
      { name: 'Crystal Clear', hex: '#e5e7eb', image: IMAGES.clearMagsafe },
      { name: 'Frost Black', hex: '#27272a', image: IMAGES.matteBlackHinge },
      { name: 'Natural Titanium', hex: '#8e8d8a', image: IMAGES.titaniumBumper },
    ],
    highlights: [
      'Engineered specifically for the dual-screen iPhone Duo with semi-auto spring hinge cover',
      'Built-in N52H MagFit magnetic ring supports 15W Qi2 and MagSafe wireless charging',
      'Air Cushion Technology in all four corners with raised 1.2mm screen and camera bezels',
      'DuraClear polycarbonate backplate infused with blue resin to resist yellowing over time',
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Wei Ming Tan',
        rating: 5,
        title: 'Fits the iPhone Duo hinge seamlessly without bulk',
        date: '12 November 2026',
        verified: true,
        body: 'Ordered via Prime SG and received the next morning in Tampines. The hinge glides open smoothly and the MagSafe ring holds firmly to my car mount.',
        helpfulCount: 42,
      },
      {
        id: 'r2',
        author: 'Priya Nair',
        rating: 4,
        title: 'Crystal clear and strong magnets',
        date: '4 November 2026',
        verified: true,
        body: 'Shows off the titanium finish nicely. Slight fingerprint smudge on the clear back, which wipes off easily.',
        helpfulCount: 15,
      },
    ],
  },
  {
    id: 'p2',
    asin: 'B0D9L4X7RT',
    brand: 'Apple',
    title:
      'Apple iPhone Duo TechWoven Case with MagSafe - Two-Piece Precision Fit with Microfiber Lining - Midnight Navy',
    price: 89.0,
    rating: 4.6,
    reviewCount: 1894,
    boughtInPastMonth: '800+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: 'Best Seller',
    department: 'Foldable Phone Cases',
    compatibility: ['iPhone Duo'],
    features: ['MagSafe Compatible', 'Shockproof'],
    colors: [
      { name: 'Midnight Navy', hex: '#1e293b', image: IMAGES.wovenMidnight },
      { name: 'Sage Mist', hex: '#8fa189', image: IMAGES.sageSilicone },
      { name: 'Saddle Brown', hex: '#7c4728', image: IMAGES.leatherFolio },
    ],
    highlights: [
      'Designed by Apple for iPhone Duo with tactile micro-twill TechWoven exterior',
      'Two-piece snap-on architecture locks securely without adhesive strips',
      'Anodized aluminum camera surround and responsive metallic side buttons',
      'Soft color-matched microfiber lining cushions both outer and inner chassis rails',
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Darren Lim',
        rating: 5,
        title: 'Best zero-adhesive fit on the market',
        date: '15 November 2026',
        verified: true,
        body: 'Most foldable cases rely on sticky tape for the front frame, but Apple engineered micro-clips that hold tight without residue.',
        helpfulCount: 68,
      },
    ],
  },
  {
    id: 'p3',
    asin: 'B0D8R3V1KN',
    brand: 'Spigen',
    title:
      'Spigen Slim Armor Pro Designed for iPhone Duo Case with Full Hinge Coverage & Military-Grade Drop Protection - Matte Black',
    price: 64.9,
    listPrice: 79.9,
    rating: 4.8,
    reviewCount: 1320,
    boughtInPastMonth: '500+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: 'Limited time deal',
    department: 'Foldable Phone Cases',
    compatibility: ['iPhone Duo'],
    features: ['Hinge Protection', 'Shockproof'],
    colors: [
      { name: 'Matte Black', hex: '#18181b', image: IMAGES.matteBlackHinge },
      { name: 'Gunmetal Titanium', hex: '#52525b', image: IMAGES.titaniumBumper },
    ],
    highlights: [
      'Full-coverage spring-loaded hinge guard shields the spine from drops and grit',
      'Dual-layer polycarbonate + impact foam interior absorbs shocks up to 2.4 metres',
      'Textured side grip rails prevent slips during one-handed cover-screen use',
      'Precision cutouts for USB-C, stereo speakers, and Action Button',
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Marcus Koh',
        rating: 5,
        title: 'Saved my Duo on concrete at Orchard MRT',
        date: '9 November 2026',
        verified: true,
        body: 'Dropped right on the hinge corner getting off the train. Not a single scratch on the phone itself.',
        helpfulCount: 51,
      },
    ],
  },
  {
    id: 'p4',
    asin: 'B0D7P9Q4LM',
    brand: 'ESR',
    title:
      'ESR iPhone 16 Pro Max Duo Pack Cases (2-Pack: Clear + Frosted Black), MagSafe HaloLock Magnetic Ring, Military-Grade Drop Protection',
    price: 31.9,
    listPrice: 42.9,
    rating: 4.7,
    reviewCount: 4105,
    boughtInPastMonth: '2K+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: 'Best Seller',
    department: 'Mobile Phone Cases & Covers',
    compatibility: ['iPhone 16 Pro Max', 'Universal 2-Pack'],
    features: ['MagSafe Compatible', 'Clear / Transparent', 'Shockproof'],
    colors: [
      { name: 'Clear + Frosted Black Duo', hex: '#3f3f46', image: IMAGES.twinPack },
      { name: 'Crystal Clear', hex: '#e5e7eb', image: IMAGES.clearMagsafe },
    ],
    highlights: [
      'Includes two full MagSafe cases in one Duo bundle: 1x Crystal Clear + 1x Translucent Frosted Black',
      '1,500g magnetic holding force for secure attachment to wallets, power banks, and mounts',
      'SGS-certified Air-Guard corners with 1.5mm raised screen lip and 0.7mm camera guard',
      'Compatible with iPhone 16 Pro Max Camera Control capacitive button',
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Siti Nurhaliza',
        rating: 5,
        title: 'Great value 2-pack for switching looks',
        date: '14 November 2026',
        verified: true,
        body: 'The frosted black stays fingerprint-free for daily work, and I swap to the clear one on weekends. Magnets are super strong.',
        helpfulCount: 29,
      },
    ],
  },
  {
    id: 'p5',
    asin: 'B0D9W2N8ZC',
    brand: 'TORRAS',
    title:
      'TORRAS Ostand Spin Titanium Case for iPhone Duo & 16 Pro Max, Built-in 360° Rotatable Ring Kickstand & MagSafe Compatible - Natural Titanium',
    price: 68.5,
    listPrice: 82.0,
    rating: 4.8,
    reviewCount: 964,
    boughtInPastMonth: '400+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 2,
    shipsFrom: 'Amazon.sg',
    badge: "Amazon's Choice",
    department: 'Mobile Phone Cases & Covers',
    compatibility: ['iPhone Duo', 'iPhone 16 Pro Max'],
    features: ['MagSafe Compatible', 'Kickstand', 'Shockproof'],
    colors: [
      { name: 'Natural Titanium', hex: '#8b8680', image: IMAGES.titaniumBumper },
      { name: 'Obsidian Black', hex: '#1c1917', image: IMAGES.matteBlackHinge },
    ],
    highlights: [
      'Aerospace-grade aluminum 360-degree Ostand ring sits flush when folded and props portrait or landscape',
      'Halbach MagSafe array boosts magnetic alignment strength by 40% over standard rings',
      'X-Shock 3.0 reinforced corner bumpers rated for 3-metre drop protection',
      'Brushed metallic back texture resists oil, sweat, and scratches',
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Jason Chen',
        rating: 5,
        title: 'Kickstand is rock solid in unfolded tablet mode',
        date: '11 November 2026',
        verified: true,
        body: 'Awesome for watching Netflix on the MRT or propping up on my desk during video calls.',
        helpfulCount: 19,
      },
    ],
  },
  {
    id: 'p6',
    asin: 'B0D6M4T5BV',
    brand: 'Mous',
    title:
      'Mous Aramid Fibre Limitless Duo Case with AiroShock Protection & MagSafe, Ultra-Thin 600D Carbon Weave - Matte Carbon',
    price: 94.9,
    listPrice: 109.0,
    rating: 4.6,
    reviewCount: 742,
    boughtInPastMonth: '200+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 2,
    shipsFrom: 'Amazon.sg',
    badge: null,
    department: 'Basic Cases',
    compatibility: ['iPhone Duo', 'iPhone 16 Pro'],
    features: ['MagSafe Compatible', 'Shockproof'],
    colors: [
      { name: '600D Aramid Carbon', hex: '#262626', image: IMAGES.carbonAramid },
      { name: 'Midnight Woven', hex: '#1e293b', image: IMAGES.wovenMidnight },
    ],
    highlights: [
      'Authentic 600D aerospace-grade aramid fibre weave offers sleek grip with near-zero bulk',
      'Signature AiroShock high-impact polymer lines internal edges for extreme drop absorption',
      'CNC-machined anodized aluminum camera bezel guards sapphire lenses',
      'Seamlessly pairs with Mous MagSafe wallets, mounts, and Qi2 chargers',
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Alvin Ng',
        rating: 5,
        title: 'Feels premium and barely adds thickness',
        date: '6 November 2026',
        verified: true,
        body: 'The aramid weave feels incredible in hand and slides effortlessly into suit pockets.',
        helpfulCount: 14,
      },
    ],
  },
  {
    id: 'p7',
    asin: 'B0D9F1K3HJ',
    brand: 'Nomad',
    title:
      'Nomad Modern Leather Folio Case for iPhone Duo with Integrated Kickstand & Magnetic Clasp - Full-Grain Saddle Brown',
    price: 112.0,
    listPrice: 129.0,
    rating: 4.5,
    reviewCount: 438,
    boughtInPastMonth: '100+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 2,
    shipsFrom: 'Amazon.sg',
    badge: null,
    department: 'Wallet Cases',
    compatibility: ['iPhone Duo'],
    features: ['Kickstand', 'Hinge Protection', 'MagSafe Compatible'],
    colors: [
      { name: 'Saddle Brown', hex: '#7c4728', image: IMAGES.leatherFolio },
      { name: 'Black Leather', hex: '#1f2937', image: IMAGES.matteBlackHinge },
    ],
    highlights: [
      'Vegetable-tanned Horween full-grain leather develops a rich patina over months of carry',
      'Fold-out leather kickstand props the inner dual-display at an ergonomic 55-degree viewing angle',
      '360-degree TPE bumper wraps both halves and shields the hinge spine when closed',
      'Integrated magnetic snap closure keeps cards and front screen protected',
    ],
    reviews: [
      {
        id: 'r8',
        author: 'Rachel Tan',
        rating: 5,
        title: 'Gorgeous leather smell and sturdy stand',
        date: '2 November 2026',
        verified: true,
        body: 'Makes the iPhone Duo feel like a compact executive notebook. Stitching is flawless.',
        helpfulCount: 11,
      },
    ],
  },
  {
    id: 'p8',
    asin: 'B0D8Y6G9PL',
    brand: 'Ringke',
    title:
      'Ringke Silicone Duo Two-Piece Slim Case for iPhone Duo with Plush Microfiber Interior & Lanyard Hole - Sage Mist',
    price: 27.9,
    listPrice: 34.9,
    rating: 4.4,
    reviewCount: 1152,
    boughtInPastMonth: '600+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: 'Limited time deal',
    department: 'Foldable Phone Cases',
    compatibility: ['iPhone Duo'],
    features: ['Shockproof'],
    colors: [
      { name: 'Sage Mist', hex: '#8fa189', image: IMAGES.sageSilicone },
      { name: 'Midnight Navy', hex: '#1e293b', image: IMAGES.wovenMidnight },
    ],
    highlights: [
      'Silky matte liquid silicone exterior with anti-dust coating resists pocket lint',
      'Soft suede-like microfiber lining prevents micro-scratches on anodized frames',
      'Two-piece precision lock system snaps tightly with built-in anti-slip micro-pads',
      'Dual QuikCatch lanyard holes on bottom rail for wrist straps or crossbody cords',
    ],
    reviews: [
      {
        id: 'r9',
        author: 'Chloe Wong',
        rating: 4,
        title: 'Love the sage colour and soft touch',
        date: '16 November 2026',
        verified: true,
        body: 'Super lightweight and the sage green matches my Apple Watch band. Great price for SG delivery.',
        helpfulCount: 8,
      },
    ],
  },
  {
    id: 'p9',
    asin: 'B0D9C5R2WX',
    brand: 'OtterBox',
    title:
      'OtterBox Defender Series XT Duo Case for iPhone Duo & 16 Pro Max, Rugged Hinge Armor & Port Covers - Black',
    price: 84.9,
    listPrice: 99.9,
    rating: 4.7,
    reviewCount: 889,
    boughtInPastMonth: '300+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 3,
    shipsFrom: 'Amazon US',
    badge: null,
    department: 'Foldable Phone Cases',
    compatibility: ['iPhone Duo', 'iPhone 16 Pro Max'],
    features: ['Hinge Protection', 'Shockproof', 'MagSafe Compatible'],
    colors: [
      { name: 'Black', hex: '#18181b', image: IMAGES.matteBlackHinge },
      { name: 'Natural Titanium', hex: '#8b8680', image: IMAGES.titaniumBumper },
    ],
    highlights: [
      'DROP+ 5X tested to survive five times as many drops as military standard MIL-STD-810G',
      'Integrated dust-blocking USB-C port cover and articulating hinge armor',
      'Built-in MagSafe magnets snap firmly onto chargers and rugged mounts',
      'Made with 50% recycled polycarbonate and synthetic rubber',
    ],
    reviews: [
      {
        id: 'r10',
        author: 'Kenneth Yeo',
        rating: 5,
        title: 'Built like a tank for site engineers',
        date: '10 November 2026',
        verified: true,
        body: 'I work on construction sites in Jurong and needed full hinge + port protection. Worth every dollar.',
        helpfulCount: 22,
      },
    ],
  },
  {
    id: 'p10',
    asin: 'B0D5N7B8KL',
    brand: 'Ringke',
    title:
      'Ringke Fusion Bold Duo Value 2-Pack Clear & Matte Smoke Cases for iPhone 16 Pro / 16 Pro Max with MagSafe',
    price: 23.9,
    listPrice: 29.9,
    rating: 4.5,
    reviewCount: 3290,
    boughtInPastMonth: '1K+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: null,
    department: 'Basic Cases',
    compatibility: ['iPhone 16 Pro', 'iPhone 16 Pro Max', 'Universal 2-Pack'],
    features: ['MagSafe Compatible', 'Clear / Transparent'],
    colors: [
      { name: 'Smoke + Clear Duo', hex: '#52525b', image: IMAGES.twinPack },
      { name: 'Clear', hex: '#e5e7eb', image: IMAGES.clearMagsafe },
    ],
    highlights: [
      'Value Duo Pack includes both Matte Smoke Black and Crystal Clear MagSafe editions',
      'Anti-fingerprint frosted matte polycarbonate back resists oil smudges',
      'Micro-dot interior pattern prevents rainbow Newton rings against glass backs',
      'Compatible with tempered glass screen protectors and wireless charging',
    ],
    reviews: [
      {
        id: 'r11',
        author: 'Hui Ling Chua',
        rating: 5,
        title: 'Unbeatable price for two solid cases',
        date: '8 November 2026',
        verified: true,
        body: 'Shared the pack with my husband—he took smoke black and I took clear. Both fit snugly.',
        helpfulCount: 17,
      },
    ],
  },
  {
    id: 'p11',
    asin: 'B0D9J3M1YT',
    brand: 'Pitaka',
    title:
      'PITAKA Ultra-Slim Aramid Fiber Case for iPhone Duo (0.95mm Thin), MagSafe Ready Tactile Weave - Black/Grey Twill',
    price: 99.0,
    rating: 4.8,
    reviewCount: 512,
    boughtInPastMonth: '200+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 4,
    shipsFrom: 'Amazon Japan',
    badge: 'Sponsored',
    department: 'Basic Cases',
    compatibility: ['iPhone Duo'],
    features: ['MagSafe Compatible'],
    colors: [
      { name: '600D Twill Black', hex: '#27272a', image: IMAGES.carbonAramid },
      { name: 'Midnight Navy', hex: '#1e293b', image: IMAGES.wovenMidnight },
    ],
    highlights: [
      'Remarkably thin 0.95mm profile and featherweight 18g preserves the iPhone Duo’s folded slimness',
      'Amber Magnet Film technology embeds ultra-thin N52 magnets cleanly inside the aramid layers',
      'Vacuum-formed 3D grip texture feels silky yet non-slip',
      'Raised precision aluminum camera lip protects triple-lens array',
    ],
    reviews: [
      {
        id: 'r12',
        author: 'Gavin Ong',
        rating: 5,
        title: 'Finally a foldable case that feels naked',
        date: '13 November 2026',
        verified: true,
        body: 'Zero added bulk when folded in my jeans pocket. Arrived from Amazon Japan in 4 days.',
        helpfulCount: 33,
      },
    ],
  },
  {
    id: 'p12',
    asin: 'B0D8Z9P6VC',
    brand: 'CASETiFY',
    title:
      'CASETiFY Impact Hinge Duo Case for iPhone Duo, EcoShock Protection with Custom Camera Ring & MagSafe - Clear / Black',
    price: 108.0,
    rating: 4.4,
    reviewCount: 625,
    boughtInPastMonth: '150+ bought in past month',
    isPrime: false,
    isFreeDelivery: true,
    deliveryDays: 5,
    shipsFrom: 'Amazon US',
    badge: null,
    department: 'Foldable Phone Cases',
    compatibility: ['iPhone Duo'],
    features: ['MagSafe Compatible', 'Hinge Protection', 'Clear / Transparent', 'Shockproof'],
    colors: [
      { name: 'Clear / Silver Ring', hex: '#d4d4d8', image: IMAGES.clearMagsafe },
      { name: 'Matte Black', hex: '#18181b', image: IMAGES.matteBlackHinge },
    ],
    highlights: [
      'EcoShock plant-based impact material tested for 2.5-metre multi-angle drops',
      '200+ micro-ribbed hinge protector absorbs side impacts along the fold spine',
      'Compatible with CASETiFY wireless chargers, phone charms, and crossbody straps',
      'Made from 65% upcycled phone cases via Re/CASETiFY program',
    ],
    reviews: [
      {
        id: 'r13',
        author: 'Amanda Lee',
        rating: 4,
        title: 'Super protective, slightly pricey',
        date: '1 November 2026',
        verified: true,
        body: 'Solid protection and cute clear aesthetic. Takes about 5 days via Amazon US.',
        helpfulCount: 9,
      },
    ],
  },
  {
    id: 'p13',
    asin: 'B0D7A2K9FG',
    brand: 'ESR',
    title:
      'ESR Armorite Duo Cover Screen & Inner Display Tempered Glass Kit (2+2 Pack) + Alignment Frame for iPhone Duo',
    price: 24.5,
    listPrice: 32.0,
    rating: 4.6,
    reviewCount: 1540,
    boughtInPastMonth: '900+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: "Amazon's Choice",
    department: 'Screen Protectors',
    compatibility: ['iPhone Duo'],
    features: ['Clear / Transparent'],
    colors: [{ name: 'Ultra Clear Kit', hex: '#e2e8f0', image: IMAGES.twinPack }],
    highlights: [
      'Complete Duo protection: 2x tempered glass cover screen protectors + 2x flexible EPU inner display films',
      'Includes UltraFit snap-on alignment tray for bubble-free 10-second installation',
      'Case-friendly edge clearance engineered to work seamlessly with Spigen, Apple, and OtterBox cases',
      'Oleophobic nano-coating resists fingerprints and smooths stylus/finger glide',
    ],
    reviews: [
      {
        id: 'r14',
        author: 'Benjamin Goh',
        rating: 5,
        title: 'Alignment frame makes installation foolproof',
        date: '17 November 2026',
        verified: true,
        body: 'Zero bubbles on both the outer glass and inner folding film. Works perfectly with my Spigen case.',
        helpfulCount: 24,
      },
    ],
  },
  {
    id: 'p14',
    asin: 'B0D8T1W4NM',
    brand: 'UAG',
    title:
      'UAG Monarch Pro Kevlar Duo Case with Integrated MagSafe Module for iPhone 16 Pro Max / iPhone Duo - Kevlar Black',
    price: 118.0,
    listPrice: 135.0,
    rating: 4.8,
    reviewCount: 412,
    boughtInPastMonth: '100+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 2,
    shipsFrom: 'Amazon.sg',
    badge: null,
    department: 'Mobile Phone Cases & Covers',
    compatibility: ['iPhone 16 Pro Max', 'iPhone Duo'],
    features: ['MagSafe Compatible', 'Shockproof', 'Hinge Protection'],
    colors: [
      { name: 'Kevlar Carbon', hex: '#18181b', image: IMAGES.carbonAramid },
      { name: 'Titanium Alloy', hex: '#71717a', image: IMAGES.titaniumBumper },
    ],
    highlights: [
      '5-layer armored construction featuring genuine DuPont Kevlar inlay and alloy hardware',
      '7.6-metre (25 ft) drop protection exceeds 2x MIL-STD 810G standards',
      'Contoured traction grip perimeter with oversized tactile side buttons',
      'Built-in MagSafe magnetic module for seamless Apple Pay & fast wireless charging',
    ],
    reviews: [
      {
        id: 'r15',
        author: 'Farhan Rahman',
        rating: 5,
        title: 'Iconic UAG ruggedness with MagSafe',
        date: '7 November 2026',
        verified: true,
        body: 'Feels indestructible and looks stealthy in Kevlar weave.',
        helpfulCount: 16,
      },
    ],
  },
  {
    id: 'p15',
    asin: 'B0D9E8H3LP',
    brand: 'Apple',
    title:
      'Apple iPhone Duo Clear Case with MagSafe & Sapphire Camera Control Button - Optical Polycarbonate',
    price: 75.0,
    rating: 4.3,
    reviewCount: 1108,
    boughtInPastMonth: '500+ bought in past month',
    isPrime: true,
    isFreeDelivery: true,
    deliveryDays: 1,
    shipsFrom: 'Amazon.sg',
    badge: null,
    department: 'Foldable Phone Cases',
    compatibility: ['iPhone Duo'],
    features: ['MagSafe Compatible', 'Clear / Transparent'],
    colors: [
      { name: 'Clear', hex: '#f4f4f5', image: IMAGES.clearMagsafe },
      { name: 'Twin Clear Bundle', hex: '#d4d4d8', image: IMAGES.twinPack },
    ],
    highlights: [
      'Thin, light, and easy to grip while showcasing the brilliant finish of iPhone Duo',
      'Scratch-resistant optical polycarbonate coating applied to both interior and exterior surfaces',
      'Integrated sapphire crystal button couples finger movements to Camera Control',
      'Perfectly aligned MagSafe magnets deliver faster wireless charging on every snap',
    ],
    reviews: [
      {
        id: 'r16',
        author: 'Stephanie Yap',
        rating: 4,
        title: 'Clean official fit, super clear',
        date: '14 November 2026',
        verified: true,
        body: 'Love how slim it keeps the phone and the Camera Control sapphire button feels native.',
        helpfulCount: 12,
      },
    ],
  },
  {
    id: 'p16',
    asin: 'B0D6R2V7QS',
    brand: 'TORRAS',
    title:
      'TORRAS Dual-Screen Silicone Duo Grip Case with Hidden Stand & Microfiber Cushion for iPhone Duo - Sage / Navy',
    price: 46.9,
    listPrice: 58.9,
    rating: 4.5,
    reviewCount: 376,
    boughtInPastMonth: '200+ bought in past month',
    isPrime: false,
    isFreeDelivery: true,
    deliveryDays: 3,
    shipsFrom: 'Amazon.sg',
    badge: null,
    department: 'Wallet Cases',
    compatibility: ['iPhone Duo'],
    features: ['Kickstand', 'Shockproof'],
    colors: [
      { name: 'Sage Mist', hex: '#8fa189', image: IMAGES.sageSilicone },
      { name: 'Midnight Navy', hex: '#1e293b', image: IMAGES.wovenMidnight },
      { name: 'Saddle Brown', hex: '#7c4728', image: IMAGES.leatherFolio },
    ],
    highlights: [
      'Soft-touch silicone shell paired with flush pop-out aluminum kickstand',
      'Full microfiber inner cradle guards against dust abrasion',
      '2.0mm raised camera ring prevents lens contact on flat desks',
      'Non-slip ergonomic chamfered rails designed for comfortable one-handed reading',
    ],
    reviews: [
      {
        id: 'r17',
        author: 'Kevin Teo',
        rating: 5,
        title: 'Great balance of softness and stand utility',
        date: '5 November 2026',
        verified: true,
        body: 'Silicone feels great and the stand comes in handy during lunch.',
        helpfulCount: 7,
      },
    ],
    isNewArrival: true,
  },
];

export const RELATED_SEARCHES = [
  'iphone duo case magsafe',
  'iphone duo screen protector',
  'spigen iphone duo',
  'iphone 16 pro max case 2 pack',
  'iphone duo leather folio',
  'magsafe charger duo',
];
