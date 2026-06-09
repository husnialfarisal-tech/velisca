import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Truck, ShieldCheck } from "lucide-react";
import { p as products } from "./router-CcqNGaK4.js";
import { P as ProductCard } from "./product-card-Ba00yum8.js";
import { useState, useEffect } from "react";
import "@tanstack/react-query";
import "next-themes";
import "sonner";
import "zustand";
import "zustand/middleware";
import "zod";
import "./format-rupiah-y_Sr_KjY.js";
const heroImg = "/assets/hero-4txt-8LO.jpg";
const fashionImg = "/assets/category-fashion-BuIQoK0C.jpg";
const skincareImg = "/assets/category-skincare-BbGABYWc.jpg";
function CountdownTimer({ targetDate }) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 864e5),
      h: Math.floor(diff / 36e5 % 24),
      m: Math.floor(diff / 6e4 % 60),
      s: Math.floor(diff / 1e3 % 60)
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1e3);
    return () => clearInterval(i);
  }, [targetDate]);
  const Cell = ({ v, label }) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "grid h-14 w-14 place-items-center rounded-md border border-border bg-background/80 font-display text-2xl tabular-nums", children: String(v).padStart(2, "0") }),
    /* @__PURE__ */ jsx("span", { className: "mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: label })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx(Cell, { v: t.d, label: "Hari" }),
    /* @__PURE__ */ jsx(Cell, { v: t.h, label: "Jam" }),
    /* @__PURE__ */ jsx(Cell, { v: t.m, label: "Menit" }),
    /* @__PURE__ */ jsx(Cell, { v: t.s, label: "Detik" })
  ] });
}
const promoEnd = new Date(Date.now() + 1e3 * 60 * 60 * 48);
function HomePage() {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxs("div", { className: "container-luxe grid items-center gap-12 py-12 md:grid-cols-2 md:py-24", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7
      }, className: "order-2 md:order-1", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3 text-gold" }),
          " Koleksi Musim Baru"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 font-display text-5xl leading-[1.05] tracking-tight text-foreground md:text-7xl", children: [
          "Wear",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("em", { className: "text-gold", children: "Your Glow." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 max-w-md text-base text-muted-foreground md:text-lg", children: "Fashion dan skincare premium yang dirancang artisanal — untuk perempuan yang tahu nilai dirinya, dan tidak perlu meneriakkannya." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxs(Link, { to: "/produk", className: "btn-gold inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium", children: [
            "Belanja Sekarang ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsx(Link, { to: "/lookbook", className: "inline-flex items-center gap-2 rounded-md border border-foreground/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background", children: "Lihat Lookbook" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-wrap items-center gap-6 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Truck, { className: "h-4 w-4 text-gold" }),
            " Gratis Ongkir > Rp 500.000"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }),
            " Garansi Otentisitas"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        scale: 1.05
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 1
      }, className: "order-1 md:order-2", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "aspect-[3/4] overflow-hidden rounded-md bg-secondary shadow-luxe", children: /* @__PURE__ */ jsx("img", { src: heroImg, alt: "VELISCA — koleksi fashion premium", width: 1080, height: 1440, className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "absolute -bottom-6 -left-6 hidden rounded-md border border-border bg-background/95 px-5 py-4 backdrop-blur md:block", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: "Penilaian" }),
          /* @__PURE__ */ jsx("p", { className: "font-display text-2xl text-gold", children: "★ 4.9 / 5.0" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "2.480+ ulasan terverifikasi" })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "container-luxe py-20", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-10 flex items-end justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Kategori" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-3xl md:text-4xl", children: "Dua Dunia, Satu Estetika" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid gap-6 md:grid-cols-2", children: [{
        to: "/produk",
        search: {
          category: "fashion"
        },
        img: fashionImg,
        title: "Fashion",
        desc: "Siluet timeless untuk hari Anda"
      }, {
        to: "/produk",
        search: {
          category: "skincare"
        },
        img: skincareImg,
        title: "Skincare",
        desc: "Formula premium untuk kulit bercahaya"
      }].map((c) => /* @__PURE__ */ jsxs(Link, { to: c.to, search: c.search, className: "group relative aspect-[4/5] overflow-hidden rounded-md md:aspect-[5/4]", children: [
        /* @__PURE__ */ jsx("img", { src: c.img, alt: c.title, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-0 left-0 p-8 text-white", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] opacity-80", children: "Koleksi" }),
          /* @__PURE__ */ jsx("h3", { className: "mt-2 font-display text-4xl", children: c.title }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 max-w-xs text-sm opacity-90", children: c.desc }),
          /* @__PURE__ */ jsxs("span", { className: "mt-4 inline-flex items-center gap-2 text-sm", children: [
            "Jelajahi ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
          ] })
        ] })
      ] }, c.title)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "container-luxe py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid items-center gap-8 rounded-md border border-gold/40 bg-gradient-to-br from-gold-soft/30 via-cream to-background p-8 md:grid-cols-2 md:p-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-gold", children: "Penawaran Terbatas" }),
        /* @__PURE__ */ jsxs("h3", { className: "mt-2 font-display text-3xl md:text-4xl", children: [
          "Diskon hingga 30%",
          /* @__PURE__ */ jsx("br", {}),
          "untuk koleksi pilihan."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-md text-sm text-muted-foreground", children: "Berakhir dalam hitungan jam. Jangan lewatkan kesempatan memiliki potongan favorit dengan harga terbaik." }),
        /* @__PURE__ */ jsxs(Link, { to: "/produk", className: "btn-gold mt-6 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium", children: [
          "Belanja Promo ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "md:justify-self-end", children: /* @__PURE__ */ jsx(CountdownTimer, { targetDate: promoEnd }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "container-luxe py-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Pilihan Editor" }),
          /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-3xl md:text-4xl", children: "Yang Sedang Dicintai" })
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/produk", className: "hidden text-sm text-muted-foreground hover:text-foreground md:inline-flex", children: "Lihat semua →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4", children: bestSellers.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "container-luxe py-12", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-10 flex items-end justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Baru Tiba" }),
        /* @__PURE__ */ jsx("h2", { className: "mt-2 font-display text-3xl md:text-4xl", children: "Edisi Terkini" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4", children: newArrivals.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "container-luxe py-20", children: /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-secondary/50 p-10 md:p-16", children: [
      /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Suara Pelanggan" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-3 text-center font-display text-3xl md:text-4xl", children: "Mereka tentang VELISCA" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid gap-8 md:grid-cols-3", children: [{
        name: "Sasha A.",
        text: "Belanja di sini selalu terasa seperti hadiah untuk diri sendiri. Kualitasnya melampaui harga."
      }, {
        name: "Rania P.",
        text: "Skincare-nya nyata bekerja. Wajah lebih sehat dalam 3 minggu. Packaging juga sangat estetik."
      }, {
        name: "Maya L.",
        text: "Customer service responsif. Pengiriman rapi. Brand favorit baru saya tahun ini."
      }].map((t) => /* @__PURE__ */ jsxs("figure", { className: "rounded-md bg-background p-6 shadow-soft", children: [
        /* @__PURE__ */ jsx("p", { className: "text-gold", children: "★★★★★" }),
        /* @__PURE__ */ jsxs("blockquote", { className: "mt-3 text-sm leading-relaxed text-foreground", children: [
          '"',
          t.text,
          '"'
        ] }),
        /* @__PURE__ */ jsxs("figcaption", { className: "mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: [
          "— ",
          t.name
        ] })
      ] }, t.name)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "container-luxe py-20", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl md:text-4xl", children: "Bergabung dengan Daftar Kami" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Dapatkan akses awal ke koleksi baru, lookbook eksklusif, dan penawaran tertutup." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        e.currentTarget.reset();
      }, className: "mx-auto mt-6 flex max-w-md gap-2", children: [
        /* @__PURE__ */ jsx("input", { type: "email", required: true, placeholder: "email@anda.com", className: "flex-1 rounded-md border border-border bg-background px-4 py-3 text-sm outline-none focus:border-gold" }),
        /* @__PURE__ */ jsx("button", { type: "submit", className: "btn-gold rounded-md px-5 py-3 text-sm font-medium", children: "Berlangganan" })
      ] })
    ] }) })
  ] });
}
export {
  HomePage as component
};
