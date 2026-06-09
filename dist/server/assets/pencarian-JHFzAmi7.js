import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { P as ProductCard } from "./product-card-Ba00yum8.js";
import { R as Route, p as products } from "./router-CcqNGaK4.js";
import "framer-motion";
import "./format-rupiah-y_Sr_KjY.js";
import "sonner";
import "@tanstack/react-query";
import "next-themes";
import "zustand";
import "zustand/middleware";
import "zod";
function SearchPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");
  const results = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return products.filter((p) => p.name.toLowerCase().includes(needle) || p.description.toLowerCase().includes(needle) || p.subcategory.toLowerCase().includes(needle));
  }, [q]);
  return /* @__PURE__ */ jsxs("div", { className: "container-luxe py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl", children: "Pencarian" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-2 rounded-md border border-border bg-background px-4 py-3", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx("input", { autoFocus: true, value: q, onChange: (e) => setQ(e.target.value), placeholder: "Cari serum, gaun, blazer...", className: "flex-1 bg-transparent text-sm outline-none" })
    ] }),
    q.trim() === "" ? /* @__PURE__ */ jsx("p", { className: "mt-10 text-sm text-muted-foreground", children: "Mulai mengetik untuk mencari produk." }) : results.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-12 rounded-md border border-dashed border-border p-12 text-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
        'Tidak ada hasil untuk "',
        q,
        '".'
      ] }),
      /* @__PURE__ */ jsx(Link, { to: "/produk", className: "btn-gold mt-4 inline-block rounded-md px-4 py-2 text-sm", children: "Lihat semua produk" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "mt-6 text-sm text-muted-foreground", children: [
        results.length,
        " hasil ditemukan"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4", children: results.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] })
  ] });
}
export {
  SearchPage as component
};
