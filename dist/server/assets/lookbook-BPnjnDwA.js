import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { p as products } from "./router-CcqNGaK4.js";
import "@tanstack/react-query";
import "react";
import "next-themes";
import "sonner";
import "lucide-react";
import "zustand";
import "zustand/middleware";
import "zod";
function LookbookPage() {
  const looks = products.slice(0, 12).map((p, i) => ({
    img: p.images[i % p.images.length],
    caption: p.name,
    slug: p.slug,
    span: i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
  }));
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "container-luxe py-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Spring / Summer 2026" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-5xl md:text-6xl", children: "Lookbook" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto mt-4 max-w-xl text-sm text-muted-foreground", children: "Sebuah meditasi tentang cahaya, tekstur, dan kesederhanaan yang disengaja. Setiap potongan adalah ritual." })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "container-luxe pb-20", children: /* @__PURE__ */ jsx("div", { className: "grid auto-rows-[280px] grid-cols-2 gap-3 md:grid-cols-4", children: looks.map((l, i) => /* @__PURE__ */ jsxs(motion.figure, { initial: {
      opacity: 0,
      scale: 0.98
    }, whileInView: {
      opacity: 1,
      scale: 1
    }, viewport: {
      once: true,
      margin: "-50px"
    }, transition: {
      duration: 0.5,
      delay: Math.min(i * 0.04, 0.3)
    }, className: `group relative overflow-hidden rounded-md bg-secondary ${l.span}`, children: [
      /* @__PURE__ */ jsx("img", { src: l.img, alt: l.caption, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }),
      /* @__PURE__ */ jsx(Link, { to: "/produk/$slug", params: {
        slug: l.slug
      }, className: "absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100", children: /* @__PURE__ */ jsx("span", { className: "text-xs uppercase tracking-[0.2em]", children: l.caption }) })
    ] }, i)) }) })
  ] });
}
export {
  LookbookPage as component
};
