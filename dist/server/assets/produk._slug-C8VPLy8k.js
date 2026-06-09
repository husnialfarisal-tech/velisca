import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Star, Minus, Plus, Heart, Share2, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { c as Route, a as useCart, u as useWishlist, g as getRelated } from "./router-CcqNGaK4.js";
import { f as formatRupiah } from "./format-rupiah-y_Sr_KjY.js";
import { P as ProductCard } from "./product-card-Ba00yum8.js";
import "@tanstack/react-query";
import "next-themes";
import "zustand";
import "zustand/middleware";
import "zod";
const reviews = [
  { id: "r1", productId: "f1", author: "Anya R.", rating: 5, date: "2026-04-12", comment: "Kualitas bahannya luar biasa, jatuh kainnya sempurna." },
  { id: "r2", productId: "f1", author: "Salma D.", rating: 5, date: "2026-03-22", comment: "Dapat banyak pujian saat dipakai ke acara." },
  { id: "r3", productId: "f1", author: "Karen P.", rating: 4, date: "2026-02-10", comment: "Sangat elegan, ukuran sesuai panduan." },
  { id: "r4", productId: "s1", author: "Dinda M.", rating: 5, date: "2026-05-01", comment: "Wajah jadi lebih cerah setelah 2 minggu pemakaian." },
  { id: "r5", productId: "s1", author: "Rara A.", rating: 5, date: "2026-04-15", comment: "Tekstur ringan, cepat meresap, glowingnya natural." },
  { id: "r6", productId: "s4", author: "Tasya N.", rating: 5, date: "2026-05-20", comment: "Sunscreen terbaik yang pernah saya coba, no white cast." },
  { id: "r7", productId: "f3", author: "Mira K.", rating: 5, date: "2026-04-30", comment: "Linen yang dingin di kulit, nyaman untuk Jakarta." }
];
function reviewsFor(productId) {
  return reviews.filter((r) => r.productId === productId);
}
function ProductDetailPage() {
  const {
    product
  } = Route.useLoaderData();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [variant, setVariant] = useState(product.variants?.[0]?.options[0]);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("deskripsi");
  const addToCart = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const isWished = useWishlist((s) => s.has(product.id));
  const reviews2 = reviewsFor(product.id);
  const related = getRelated(product);
  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: qty,
      variant
    });
    toast.success(`${product.name} ditambahkan ke keranjang`);
  };
  const handleCheckout = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: qty,
      variant
    });
    navigate({
      to: "/keranjang"
    });
  };
  const handleWish = () => {
    toggleWish({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]
    });
    toast.success(isWished ? "Dihapus dari wishlist" : "Disimpan ke wishlist");
  };
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success("Link disalin");
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "grid lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-[#f5f3f0] dark:bg-secondary", children: /* @__PURE__ */ jsxs("div", { className: "sticky top-0 flex h-screen flex-col", children: [
        /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, exit: {
          opacity: 0
        }, transition: {
          duration: 0.35
        }, className: "relative flex-1 overflow-hidden", children: [
          /* @__PURE__ */ jsx("img", { src: product.images[activeImage], alt: product.name, className: "h-full w-full object-cover object-center" }),
          product.badge && /* @__PURE__ */ jsx("span", { className: "absolute left-6 top-6 rounded-full bg-background/90 px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] backdrop-blur", children: product.badge }),
          product.originalPrice && /* @__PURE__ */ jsxs("span", { className: "absolute right-6 top-6 rounded-full bg-gold/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink backdrop-blur", children: [
            "-",
            Math.round((1 - product.price / product.originalPrice) * 100),
            "%"
          ] })
        ] }, activeImage) }),
        product.images.length > 1 && /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto p-4 scrollbar-none", children: product.images.map((src, i) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveImage(i), className: `h-20 w-20 flex-shrink-0 overflow-hidden rounded transition-all duration-200 ${activeImage === i ? "ring-2 ring-foreground ring-offset-2" : "opacity-50 hover:opacity-100"}`, children: /* @__PURE__ */ jsx("img", { src, alt: `Foto ${i + 1}`, className: "h-full w-full object-cover" }) }, i)) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24", children: [
        /* @__PURE__ */ jsxs("nav", { className: "mb-8 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Beranda" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsx(Link, { to: "/produk", search: {
            category: product.category
          }, className: "hover:text-foreground transition-colors", children: product.category === "fashion" ? "Fashion" : "Skincare" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3" }),
          /* @__PURE__ */ jsx("span", { className: "text-foreground", children: product.name })
        ] }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.5
        }, children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: product.subcategory }),
          /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl leading-tight md:text-4xl lg:text-5xl", children: product.name }),
          (product.material || product.ingredients) && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: product.material ?? product.ingredients })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center gap-0.5", children: Array.from({
            length: 5
          }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: `h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-gold text-gold" : "fill-muted text-muted-foreground"}` }, i)) }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
            product.rating,
            " · ",
            product.reviewCount,
            " ulasan"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "font-display text-3xl tracking-tight", children: formatRupiah(product.price) }),
          product.originalPrice && /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground line-through", children: formatRupiah(product.originalPrice) })
        ] }),
        product.variants && product.variants.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-8 space-y-5", children: product.variants.map((v) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("p", { className: "mb-2.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: [
            v.label,
            ":",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: variant })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: v.options.map((o) => /* @__PURE__ */ jsx("button", { onClick: () => setVariant(o), className: `min-w-[44px] rounded border px-3 py-2 text-xs transition-all duration-200 ${variant === o ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`, children: o }, o)) })
        ] }, v.label)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Jumlah" }),
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center rounded border border-border", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setQty((q) => Math.max(1, q - 1)), className: "grid h-10 w-10 place-items-center text-muted-foreground transition hover:text-foreground", children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsx("span", { className: "w-10 text-center text-sm font-medium", children: qty }),
            /* @__PURE__ */ jsx("button", { onClick: () => setQty((q) => Math.min(product.stock, q + 1)), className: "grid h-10 w-10 place-items-center text-muted-foreground transition hover:text-foreground", children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1.5 text-[10px] text-muted-foreground", children: [
            "Stok tersedia: ",
            product.stock
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 space-y-3", children: [
          /* @__PURE__ */ jsx("button", { onClick: handleCheckout, className: "w-full rounded border border-foreground bg-background py-4 text-[11px] uppercase tracking-[0.25em] text-foreground transition-all duration-200 hover:bg-foreground hover:text-background", children: "Checkout Sekarang" }),
          /* @__PURE__ */ jsx("button", { onClick: handleAddToCart, className: "w-full rounded bg-foreground py-4 text-[11px] uppercase tracking-[0.25em] text-background transition-all duration-200 hover:bg-gold hover:text-ink", children: "Tambah ke Keranjang" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs("button", { onClick: handleWish, className: "flex flex-1 items-center justify-center gap-2 py-2 text-xs text-muted-foreground transition hover:text-foreground", children: [
              /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${isWished ? "fill-gold text-gold" : ""}` }),
              isWished ? "Tersimpan" : "Simpan ke Wishlist"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: handleShare, className: "flex items-center gap-2 py-2 text-xs text-muted-foreground transition hover:text-foreground", children: [
              /* @__PURE__ */ jsx(Share2, { className: "h-4 w-4" }),
              "Bagikan"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("ul", { className: "mt-8 space-y-3 border-t border-border pt-6 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4 flex-shrink-0 text-gold" }),
            "Gratis ongkir untuk pesanan di atas Rp 500.000"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx(RotateCcw, { className: "h-4 w-4 flex-shrink-0 text-gold" }),
            "Pengembalian gratis dalam 14 hari"
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 flex-shrink-0 text-gold" }),
            "Jaminan keaslian produk VELISCA"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-10 border-t border-border pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "flex gap-6 border-b border-border", children: ["deskripsi", "detail", "pengiriman"].map((tab) => /* @__PURE__ */ jsx("button", { onClick: () => setActiveTab(tab), className: `pb-3 text-[11px] uppercase tracking-[0.2em] transition-colors ${activeTab === tab ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"}`, children: tab === "deskripsi" ? "Deskripsi" : tab === "detail" ? "Material & Detail" : "Pengiriman & Retur" }, tab)) }),
          /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxs(motion.div, { initial: {
            opacity: 0,
            y: 6
          }, animate: {
            opacity: 1,
            y: 0
          }, exit: {
            opacity: 0
          }, transition: {
            duration: 0.2
          }, className: "mt-5 text-sm leading-relaxed text-muted-foreground", children: [
            activeTab === "deskripsi" && /* @__PURE__ */ jsx("p", { children: product.description }),
            activeTab === "detail" && /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
              product.material && /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: "Material: " }),
                product.material
              ] }),
              product.ingredients && /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: "Bahan aktif: " }),
                product.ingredients
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: "Kategori: " }),
                product.subcategory
              ] }),
              /* @__PURE__ */ jsxs("li", { children: [
                /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: "Stok: " }),
                product.stock,
                " unit"
              ] })
            ] }),
            activeTab === "pengiriman" && /* @__PURE__ */ jsxs("ul", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("li", { children: "Pengiriman ke seluruh Indonesia via JNE, J&T, dan SiCepat." }),
              /* @__PURE__ */ jsx("li", { children: "Estimasi tiba 2–5 hari kerja." }),
              /* @__PURE__ */ jsx("li", { children: "Retur dalam 14 hari sejak barang diterima, kondisi produk belum dibuka." }),
              /* @__PURE__ */ jsx("li", { children: "Hubungi customer service VELISCA untuk pengajuan retur." })
            ] })
          ] }, activeTab) })
        ] })
      ] })
    ] }),
    reviews2.length > 0 && /* @__PURE__ */ jsxs("section", { className: "container-luxe py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Dari Pelanggan" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-3xl", children: "Ulasan" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-5 md:grid-cols-2", children: reviews2.map((r) => /* @__PURE__ */ jsxs("article", { className: "rounded-md border border-border p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium", children: r.author }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-0.5", children: Array.from({
            length: 5
          }).map((_, i) => /* @__PURE__ */ jsx(Star, { className: `h-3 w-3 ${i < r.rating ? "fill-gold text-gold" : "fill-muted text-muted-foreground"}` }, i)) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: new Date(r.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric"
        }) }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed", children: r.comment })
      ] }, r.id)) })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxs("section", { className: "container-luxe border-t border-border py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Koleksi" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-3xl", children: "Anda Mungkin Juga Suka" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4", children: related.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] })
  ] });
}
export {
  ProductDetailPage as component
};
