import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Truck, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import fashionImg from "@/assets/category-fashion.jpg";
import skincareImg from "@/assets/category-skincare.jpg";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { CountdownTimer } from "@/components/common/countdown-timer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VELISCA — Wear Your Glow" },
      { name: "description", content: "Koleksi fashion & skincare premium VELISCA. Dirancang artisanal, dibuat untuk memancarkan cahayamu." },
      { property: "og:title", content: "VELISCA — Wear Your Glow" },
      { property: "og:description", content: "Koleksi fashion & skincare premium VELISCA." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const promoEnd = new Date(Date.now() + 1000 * 60 * 60 * 48);

function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-luxe grid items-center gap-12 py-12 md:grid-cols-2 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <Sparkles className="h-3 w-3 text-gold" /> Koleksi Musim Baru
            </span>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl">
              Wear<br /><em className="text-gold">Your Glow.</em>
            </h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground md:text-lg">
              Fashion dan skincare premium yang dirancang artisanal — untuk perempuan
              yang tahu nilai dirinya, dan tidak perlu meneriakkannya.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/produk"
                className="btn-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium"
              >
                Belanja Sekarang <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/lookbook"
                className="inline-flex items-center gap-2 rounded-md border border-foreground/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
              >
                Lihat Lookbook
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Truck className="h-4 w-4 text-gold" /> Gratis Ongkir &gt; Rp 500.000</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> Garansi Otentisitas</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-md bg-secondary shadow-luxe">
                <img
                  src={heroImg}
                  alt="VELISCA — koleksi fashion premium"
                  width={1080}
                  height={1440}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-md border border-border bg-background/95 px-5 py-4 backdrop-blur md:block">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Penilaian</p>
                <p className="font-display text-2xl text-gold">★ 4.9 / 5.0</p>
                <p className="text-xs text-muted-foreground">2.480+ ulasan terverifikasi</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KATEGORI */}
      <section className="container-luxe py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Kategori</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Dua Dunia, Satu Estetika</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { to: "/produk", search: { category: "fashion" as const }, img: fashionImg, title: "Fashion", desc: "Siluet timeless untuk hari Anda" },
            { to: "/produk", search: { category: "skincare" as const }, img: skincareImg, title: "Skincare", desc: "Formula premium untuk kulit bercahaya" },
          ].map((c) => (
            <Link
              key={c.title}
              to={c.to}
              search={c.search}
              className="group relative aspect-[4/5] overflow-hidden rounded-md md:aspect-[5/4]"
            >
              <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <p className="text-[10px] uppercase tracking-[0.25em] opacity-80">Koleksi</p>
                <h3 className="mt-2 font-display text-4xl">{c.title}</h3>
                <p className="mt-2 max-w-xs text-sm opacity-90">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm">
                  Jelajahi <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BANNER PROMO + COUNTDOWN */}
      <section className="container-luxe py-12">
        <div className="grid items-center gap-8 rounded-md border border-gold/40 bg-gradient-to-br from-gold-soft/30 via-cream to-background p-8 md:grid-cols-2 md:p-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold">Penawaran Terbatas</p>
            <h3 className="mt-2 font-display text-3xl md:text-4xl">Diskon hingga 30%<br />untuk koleksi pilihan.</h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              Berakhir dalam hitungan jam. Jangan lewatkan kesempatan memiliki potongan favorit dengan harga terbaik.
            </p>
            <Link to="/produk" className="btn-gold mt-6 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium">
              Belanja Promo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="md:justify-self-end">
            <CountdownTimer targetDate={promoEnd} />
          </div>
        </div>
      </section>

      {/* TERLARIS */}
      <section className="container-luxe py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Pilihan Editor</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Yang Sedang Dicintai</h2>
          </div>
          <Link to="/produk" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline-flex">
            Lihat semua →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-luxe py-12">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Baru Tiba</p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl">Edisi Terkini</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* TESTIMONI */}
      <section className="container-luxe py-20">
        <div className="rounded-md bg-secondary/50 p-10 md:p-16">
          <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Suara Pelanggan</p>
          <h2 className="mt-3 text-center font-display text-3xl md:text-4xl">Mereka tentang VELISCA</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              { name: "Sasha A.", text: "Belanja di sini selalu terasa seperti hadiah untuk diri sendiri. Kualitasnya melampaui harga." },
              { name: "Rania P.", text: "Skincare-nya nyata bekerja. Wajah lebih sehat dalam 3 minggu. Packaging juga sangat estetik." },
              { name: "Maya L.", text: "Customer service responsif. Pengiriman rapi. Brand favorit baru saya tahun ini." },
            ].map((t) => (
              <figure key={t.name} className="rounded-md bg-background p-6 shadow-soft">
                <p className="text-gold">★★★★★</p>
                <blockquote className="mt-3 text-sm leading-relaxed text-foreground">"{t.text}"</blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-luxe py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl md:text-4xl">Bergabung dengan Daftar Kami</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Dapatkan akses awal ke koleksi baru, lookbook eksklusif, dan penawaran tertutup.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}
            className="mx-auto mt-6 flex max-w-md gap-2"
          >
            <input
              type="email"
              required
              placeholder="email@anda.com"
              className="flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <button type="submit" className="btn-gold rounded-md px-5 py-3 text-sm font-medium">Berlangganan</button>
          </form>
        </div>
      </section>
    </div>
  );
}
