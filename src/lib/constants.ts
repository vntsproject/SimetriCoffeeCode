import { Coffee, MapPin, Users, Wifi, Sparkles, Armchair } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const business = {
  name: "SIMETRI COFFEE ROASTERS",
  shortName: "SIMETRI COFFEE",
  address: "Jl. Bulevar Bekasi CBD, RT.006/RW.002, Marga Mulya, Kec. Bekasi Utara, Kota Bks, Jawa Barat 17142",
  phone: "0812-9055-3590",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281290553590",
  mapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL || "https://www.google.com/maps/search/?api=1&query=Simetri%20Coffee%20Roasters%20Bekasi",
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/",
  rating: "4.6",
  reviews: "2.522 reviews",
  priceRange: "Rp 50.000-100.000 per person",
  hours: "Open 24 Hours"
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/order", label: "Order" },
  { href: "/reservation", label: "Reservation" },
  { href: "/faq", label: "Faq" }
];

export const menuCategories = [
  { name: "Coffee", slug: "coffee" },
  { name: "Non Coffee", slug: "non-coffee" },
  { name: "Food", slug: "food" },
  { name: "Snack", slug: "snack" },
  { name: "Dessert", slug: "dessert" }
] as const;

export const fallbackMenu = [
  { id: "ice-creamy-latte", name: "Ice Creamy Latte", description: "Espresso lembut, susu dingin, dan tekstur creamy.", price: 38000, category: "coffee", is_available: true },
  { id: "cappuccino", name: "Cappuccino", description: "Espresso klasik dengan foam yang rapi.", price: 35000, category: "coffee", is_available: true },
  { id: "cafe-latte", name: "Cafe Latte", description: "Kopi susu hangat dengan rasa seimbang.", price: 36000, category: "coffee", is_available: true },
  { id: "americano", name: "Americano", description: "Espresso dan air, clean dan panjang.", price: 30000, category: "coffee", is_available: true },
  { id: "manual-brew", name: "Manual Brew", description: "Seduhan manual dengan beans pilihan.", price: 45000, category: "coffee", is_available: true },
  { id: "red-velvet-latte", name: "Red Velvet Latte", description: "Manis lembut dengan finish creamy.", price: 40000, category: "non-coffee", is_available: true },
  { id: "chocolate", name: "Chocolate", description: "Cokelat nyaman untuk menemani waktu santai.", price: 37000, category: "non-coffee", is_available: true },
  { id: "matcha-latte", name: "Matcha Latte", description: "Matcha earthy dengan susu yang halus.", price: 42000, category: "non-coffee", is_available: true },
  { id: "spaghetti", name: "Spaghetti", description: "Pasta hangat untuk makan siang atau malam.", price: 65000, category: "food", is_available: true },
  { id: "chicken-bites", name: "Chicken Bites", description: "Potongan ayam renyah, ringan untuk berbagi.", price: 52000, category: "food", is_available: true },
  { id: "curry-rice", name: "Curry Rice", description: "Nasi kari hangat dengan rasa comforting.", price: 68000, category: "food", is_available: true },
  { id: "platter", name: "Platter", description: "Pilihan sharing untuk meja ramai.", price: 75000, category: "food", is_available: true },
  { id: "tater-tots", name: "Tater Tots", description: "Kentang mungil renyah untuk teman kopi.", price: 32000, category: "snack", is_available: true },
  { id: "french-fries", name: "French Fries", description: "Kentang goreng klasik, gurih dan ringan.", price: 30000, category: "snack", is_available: true },
  { id: "waffle", name: "Waffle", description: "Waffle hangat dengan topping sederhana.", price: 45000, category: "snack", is_available: true },
  { id: "ice-cream", name: "Ice Cream", description: "Dessert dingin yang clean dan ringan.", price: 28000, category: "dessert", is_available: true }
];

export const fallbackTables = Array.from({ length: 12 }, (_, index) => {
  const tableNumber = index + 1;
  const capacity = tableNumber <= 4 ? 2 : tableNumber <= 8 ? 4 : tableNumber <= 10 ? 6 : 8;
  return { id: String(tableNumber), table_number: tableNumber, capacity, is_active: true };
});

export const valueCards: Array<{ title: string; description: string; icon: LucideIcon }> = [
  { title: "Quality Coffee", description: "Kopi yang disiapkan dengan ritme rapi, dari espresso sampai manual brew.", icon: Coffee },
  { title: "Cozy Space", description: "Ruang yang nyaman untuk ngobrol, bekerja, atau menikmati waktu pelan.", icon: Armchair },
  { title: "Work Friendly", description: "Wi-Fi, ambience tenang, dan meja yang mendukung sesi kerja panjang.", icon: Wifi },
  { title: "Outdoor Experience", description: "Outdoor seating dekat suasana danau yang terasa lebih lega.", icon: MapPin },
  { title: "Thoughtful Service", description: "Pelayanan yang hangat, sigap, dan tidak berlebihan.", icon: Sparkles },
  { title: "Community Table", description: "Tempat untuk keluarga, meeting, komunitas, dan percakapan kecil.", icon: Users }
];
