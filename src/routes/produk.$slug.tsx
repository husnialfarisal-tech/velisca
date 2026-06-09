import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, RotateCcw, Share2, ShieldCheck, Truck, ChevronRight, Minus, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { getProductBySlug, getRelated } from "@/data/products";
import type { Product } from "@/types";
import { reviewsFor } from "@/data/reviews";
import { formatRupiah } from "@/lib/format-rupiah";
import { useCart } from "@/store/cart-store";
import { useWishlist } from "@/store/wishlist-store";
import { ProductCard } from "@/components/product/product-card";

export const Route = createFileRoute("/produk/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} — VELISCA` : "Produk — VELISCA" },
        { name: "description", content: p?.description ?? "Produk VELISCA" },
        { property: "og:title", content: p ? `${p.name} — VELISCA` : "VELISCA" },
        { property: "og:description", content: p?.description ?? "" },
        { property: "og:image", content: p?.images[0] ?? "" },
        { property: "og:type", content: "product" },
      ],
      links: p ? [{ rel: "canonical", href: `/produk/${p.slug}` }] : [],
    };
  },
  component: ProductDetailPage,
  notFoundComponent: () => (
    <div className="container-luxe py-24 text-center">
      <h1 className="font-display text-3xl">Produk tidak ditemukan</h1>
      <Link to="/produk" className="btn-gold mt-6 inline-block rounded-md px-5 py-2.5 text-sm">
        Lihat semua produk
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="container-luxe py-24 text-center">
      <p className="text-muted-foreground">Gagal memuat produk: {error.message}</p>
    </div>
  ),
});

function ProductDetailPage() {
  const { product } = Route.useLoaderData() as { product: Product };
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [variant, setVariant] = useState<string | undefined>(
    product.variants?.[0]?.options[0]
  );
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"deskripsi" | "detail" | "pengiriman">("deskripsi");

  const addToCart = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const isWished = useWishlist((s) => s.has(product.id));
  const reviews = reviewsFor(product.id);
  const related = getRelated(product);

  // Tambah ke keranjang
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: qty,
      variant,
    });
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };

  // Checkout langsung
  const handleCheckout = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: qty,
      variant,
    });
    navigate({ to: "/keranjang" });
  };

  // Wishlist
  const handleWish = () => {
    toggleWish({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
    });
    toast.success(isWished ? "Dihapus dari wishlist" : "Disimpan ke wishlist");
  };

  // Share
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link disalin");
  };

  return (
    <div>
      {/* ===== SPLIT SCREEN — HERO ===== */}
      <div className="grid lg:grid-cols-2">

        {/* KIRI — Galeri foto */}
        <div className="bg-[#f5f3f0] dark:bg-secondary">
          <div className="sticky top-0 flex h-screen flex-col">

            {/* Foto utama */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative flex-1 overflow-hidden"
              >
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
                {/* Badge */}
                {product.badge && (
                  <span className="absolute left-6 top-6 rounded-full bg-background/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] backdrop-blur">
                    {product.badge}
                  </span>
                )}
                {/* Diskon persen */}
                {product.originalPrice && (
                  <span className="absolute right-6 top-6 rounded-full bg-gold/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink backdrop-blur">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </span>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-4 scrollbar-none">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded transition-all duration-200 ${
                      activeImage === i
                        ? "ring-2 ring-foreground ring-offset-2"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={src} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KANAN — Info produk */}
        <div className="flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24">

          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Beranda</Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              to="/produk"
              search={{ category: product.category }}
              className="hover:text-foreground transition-colors"
            >
              {product.category === "fashion" ? "Fashion" : "Skincare"}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Nama produk */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              {product.subcategory}
            </p>
            <h1 className="font-display text-3xl leading-tight md:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            {(product.material || product.ingredients) && (
              <p className="mt-2 text-sm text-muted-foreground">
                {product.material ?? product.ingredients}
              </p>
            )}
          </motion.div>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating)
                      ? "fill-gold text-gold"
                      : "fill-muted text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {product.rating} · {product.reviewCount} ulasan
            </span>
          </div>

          {/* Harga */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl tracking-tight">
              {formatRupiah(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Varian */}
          {product.variants && product.variants.length > 0 && (
            <div className="mt-8 space-y-5">
              {product.variants.map((v) => (
                <div key={v.label}>
                  <p className="mb-2.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {v.label}:{" "}
                    <span className="font-medium text-foreground">{variant}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((o) => (
                      <button
                        key={o}
                        onClick={() => setVariant(o)}
                        className={`min-w-[44px] rounded border px-3 py-2 text-xs transition-all duration-200 ${
                          variant === o
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Kuantitas */}
          <div className="mt-6">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Jumlah
            </p>
            <div className="inline-flex items-center rounded border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-10 w-10 place-items-center text-muted-foreground transition hover:text-foreground"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="grid h-10 w-10 place-items-center text-muted-foreground transition hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">
              Stok tersedia: {product.stock}
            </p>
          </div>

          {/* 2 Tombol utama — persis seperti Dior */}
          <div className="mt-8 space-y-3">
            {/* Tombol 1: Checkout (outline) */}
            <button
              onClick={handleCheckout}
              className="w-full rounded border border-foreground bg-background py-4 text-[11px] uppercase tracking-[0.25em] text-foreground transition-all duration-200 hover:bg-foreground hover:text-background"
            >
              Checkout Sekarang
            </button>

            {/* Tombol 2: Keranjang (solid hitam) */}
            <button
              onClick={handleAddToCart}
              className="w-full rounded bg-foreground py-4 text-[11px] uppercase tracking-[0.25em] text-background transition-all duration-200 hover:bg-gold hover:text-ink"
            >
              Tambah ke Keranjang
            </button>

            {/* Wishlist + Share */}
            <div className="flex gap-3">
              <button
                onClick={handleWish}
                className="flex flex-1 items-center justify-center gap-2 py-2 text-xs text-muted-foreground transition hover:text-foreground"
              >
                <Heart className={`h-4 w-4 ${isWished ? "fill-gold text-gold" : ""}`} />
                {isWished ? "Tersimpan" : "Simpan ke Wishlist"}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 py-2 text-xs text-muted-foreground transition hover:text-foreground"
              >
                <Share2 className="h-4 w-4" />
                Bagikan
              </button>
            </div>
          </div>

          {/* Info pengiriman */}
          <ul className="mt-8 space-y-3 border-t border-border pt-6 text-xs text-muted-foreground">
            <li className="flex items-center gap-2.5">
              <Truck className="h-4 w-4 flex-shrink-0 text-gold" />
              Gratis ongkir untuk pesanan di atas Rp 500.000
            </li>
            <li className="flex items-center gap-2.5">
              <RotateCcw className="h-4 w-4 flex-shrink-0 text-gold" />
              Pengembalian gratis dalam 14 hari
            </li>
            <li className="flex items-center gap-2.5">
              <ShieldCheck className="h-4 w-4 flex-shrink-0 text-gold" />
              Jaminan keaslian produk VELISCA
            </li>
          </ul>

          {/* Tab: Deskripsi / Detail / Pengiriman */}
          <div className="mt-10 border-t border-border pt-8">
            <div className="flex gap-6 border-b border-border">
              {(["deskripsi", "detail", "pengiriman"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-[11px] uppercase tracking-[0.2em] transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-foreground text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "deskripsi"
                    ? "Deskripsi"
                    : tab === "detail"
                    ? "Material & Detail"
                    : "Pengiriman & Retur"}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-5 text-sm leading-relaxed text-muted-foreground"
              >
                {activeTab === "deskripsi" && <p>{product.description}</p>}

                {activeTab === "detail" && (
                  <ul className="space-y-2">
                    {product.material && (
                      <li><span className="font-medium text-foreground">Material: </span>{product.material}</li>
                    )}
                    {product.ingredients && (
                      <li><span className="font-medium text-foreground">Bahan aktif: </span>{product.ingredients}</li>
                    )}
                    <li><span className="font-medium text-foreground">Kategori: </span>{product.subcategory}</li>
                    <li><span className="font-medium text-foreground">Stok: </span>{product.stock} unit</li>
                  </ul>
                )}

                {activeTab === "pengiriman" && (
                  <ul className="space-y-2">
                    <li>Pengiriman ke seluruh Indonesia via JNE, J&T, dan SiCepat.</li>
                    <li>Estimasi tiba 2–5 hari kerja.</li>
                    <li>Retur dalam 14 hari sejak barang diterima, kondisi produk belum dibuka.</li>
                    <li>Hubungi customer service VELISCA untuk pengajuan retur.</li>
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ===== ULASAN PELANGGAN ===== */}
      {reviews.length > 0 && (
        <section className="container-luxe py-20">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Dari Pelanggan</p>
            <h2 className="mt-2 font-display text-3xl">Ulasan</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {reviews.map((r) => (
              <article key={r.id} className="rounded-md border border-border p-6">
                <div className="flex items-start justify-between">
                  <p className="font-medium">{r.author}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < r.rating ? "fill-gold text-gold" : "fill-muted text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(r.date).toLocaleDateString("id-ID", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
                <p className="mt-3 text-sm leading-relaxed">{r.comment}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ===== PRODUK TERKAIT ===== */}
      {related.length > 0 && (
        <section className="container-luxe border-t border-border py-20">
          <div className="mb-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Koleksi</p>
            <h2 className="mt-2 font-display text-3xl">Anda Mungkin Juga Suka</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}