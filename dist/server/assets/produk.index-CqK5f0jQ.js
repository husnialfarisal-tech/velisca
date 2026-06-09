import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { P as ProductCard } from "./product-card-Ba00yum8.js";
import { b as Route, p as products } from "./router-CcqNGaK4.js";
import { SlidersHorizontal } from "lucide-react";
import "framer-motion";
import "./format-rupiah-y_Sr_KjY.js";
import "sonner";
import "@tanstack/react-query";
import "next-themes";
import "zustand";
import "zustand/middleware";
import "zod";
function ProductListPage() {
  const search = Route.useSearch();
  const [sort, setSort] = useState("terbaru");
  const [maxPrice, setMaxPrice] = useState(35e5);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filtered = useMemo(() => {
    let list = [...products];
    if (search.category) list = list.filter((p) => p.category === search.category);
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    list = list.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    switch (sort) {
      case "harga-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "harga-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "terlaris":
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [search.category, search.q, sort, maxPrice, minRating]);
  const categoryLabel = search.category === "fashion" ? "Fashion" : search.category === "skincare" ? "Skincare" : "Semua Produk";
  return /* @__PURE__ */ jsxs("div", { className: "container-luxe py-12", children: [
    /* @__PURE__ */ jsxs("nav", { "aria-label": "Breadcrumb", className: "mb-6 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", children: "Beranda" }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "mx-2", children: "/" }),
      " ",
      /* @__PURE__ */ jsx("span", { className: "text-foreground", children: categoryLabel })
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "mb-10 flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Katalog" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-4xl md:text-5xl", children: categoryLabel }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          filtered.length,
          " produk"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => setFiltersOpen(!filtersOpen), className: "inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm md:hidden", children: [
          /* @__PURE__ */ jsx(SlidersHorizontal, { className: "h-4 w-4" }),
          " Filter"
        ] }),
        /* @__PURE__ */ jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold", children: [
          /* @__PURE__ */ jsx("option", { value: "terbaru", children: "Terbaru" }),
          /* @__PURE__ */ jsx("option", { value: "terlaris", children: "Terlaris" }),
          /* @__PURE__ */ jsx("option", { value: "harga-asc", children: "Harga: Rendah ke Tinggi" }),
          /* @__PURE__ */ jsx("option", { value: "harga-desc", children: "Harga: Tinggi ke Rendah" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-[240px_1fr]", children: [
      /* @__PURE__ */ jsxs("aside", { className: `${filtersOpen ? "block" : "hidden"} space-y-8 md:block`, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Kategori" }),
          /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/produk/", search: {}, className: !search.category ? "text-gold" : "hover:text-foreground", children: "Semua" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/produk/", search: {
              category: "fashion"
            }, className: search.category === "fashion" ? "text-gold" : "hover:text-foreground", children: "Fashion" }) }),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/produk/", search: {
              category: "skincare"
            }, className: search.category === "skincare" ? "text-gold" : "hover:text-foreground", children: "Skincare" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Harga Maks." }),
          /* @__PURE__ */ jsx("input", { type: "range", min: 3e5, max: 35e5, step: 1e5, value: maxPrice, onChange: (e) => setMaxPrice(Number(e.target.value)), className: "w-full accent-[var(--gold)]" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
            "Hingga Rp ",
            maxPrice.toLocaleString("id-ID")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Rating Min." }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: [0, 4, 4.5, 4.8].map((r) => /* @__PURE__ */ jsx("button", { onClick: () => setMinRating(r), className: `rounded-md border px-3 py-1.5 text-xs ${minRating === r ? "border-gold bg-gold text-ink" : "border-border hover:border-foreground"}`, children: r === 0 ? "Semua" : `★ ${r}+` }, r)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "rounded-md border border-dashed border-border p-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Tidak ada produk yang cocok dengan filter Anda." }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3", children: filtered.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) }) })
    ] })
  ] });
}
export {
  ProductListPage as component
};
