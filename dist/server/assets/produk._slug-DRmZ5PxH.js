import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
const SplitNotFoundComponent = () => /* @__PURE__ */ jsxs("div", { className: "container-luxe py-24 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl", children: "Produk tidak ditemukan" }),
  /* @__PURE__ */ jsx(Link, { to: "/produk", className: "btn-gold mt-6 inline-block rounded-md px-5 py-2.5 text-sm", children: "Lihat semua produk" })
] });
export {
  SplitNotFoundComponent as notFoundComponent
};
