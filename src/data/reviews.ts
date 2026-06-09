import type { Review } from "@/types";

export const reviews: Review[] = [
  { id: "r1", productId: "f1", author: "Anya R.", rating: 5, date: "2026-04-12", comment: "Kualitas bahannya luar biasa, jatuh kainnya sempurna." },
  { id: "r2", productId: "f1", author: "Salma D.", rating: 5, date: "2026-03-22", comment: "Dapat banyak pujian saat dipakai ke acara." },
  { id: "r3", productId: "f1", author: "Karen P.", rating: 4, date: "2026-02-10", comment: "Sangat elegan, ukuran sesuai panduan." },
  { id: "r4", productId: "s1", author: "Dinda M.", rating: 5, date: "2026-05-01", comment: "Wajah jadi lebih cerah setelah 2 minggu pemakaian." },
  { id: "r5", productId: "s1", author: "Rara A.", rating: 5, date: "2026-04-15", comment: "Tekstur ringan, cepat meresap, glowingnya natural." },
  { id: "r6", productId: "s4", author: "Tasya N.", rating: 5, date: "2026-05-20", comment: "Sunscreen terbaik yang pernah saya coba, no white cast." },
  { id: "r7", productId: "f3", author: "Mira K.", rating: 5, date: "2026-04-30", comment: "Linen yang dingin di kulit, nyaman untuk Jakarta." },
];

export function reviewsFor(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}
