import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { u as useWishlist, a as useCart } from "./router-CcqNGaK4.js";
import { f as formatRupiah } from "./format-rupiah-y_Sr_KjY.js";
import "@tanstack/react-query";
import "react";
import "next-themes";
import "zustand";
import "zustand/middleware";
import "zod";
function WishlistPage() {
  const items = useWishlist((s) => s.items);
  const remove = useWishlist((s) => s.remove);
  const add = useCart((s) => s.add);
  return /* @__PURE__ */ jsxs("div", { className: "container-luxe py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl", children: "Wishlist" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
      items.length,
      " produk disimpan"
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-12 rounded-md border border-dashed border-border p-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Belum ada produk di wishlist." }),
      /* @__PURE__ */ jsx(Link, { to: "/produk", className: "btn-gold mt-6 inline-block rounded-md px-5 py-2.5 text-sm", children: "Telusuri Produk" })
    ] }) : /* @__PURE__ */ jsx("ul", { className: "mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4", children: items.map((i) => /* @__PURE__ */ jsxs("li", { className: "group", children: [
      /* @__PURE__ */ jsx(Link, { to: "/produk/$slug", params: {
        slug: i.slug
      }, className: "block aspect-[4/5] overflow-hidden rounded-md bg-secondary", children: /* @__PURE__ */ jsx("img", { src: i.image, alt: i.name, className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" }) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
        /* @__PURE__ */ jsx(Link, { to: "/produk/$slug", params: {
          slug: i.slug
        }, className: "text-sm font-medium hover:text-gold", children: i.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: formatRupiah(i.price) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
        /* @__PURE__ */ jsxs("button", { onClick: () => {
          add({
            productId: i.productId,
            name: i.name,
            slug: i.slug,
            price: i.price,
            image: i.image,
            quantity: 1
          });
          toast.success("Ditambahkan ke keranjang");
        }, className: "btn-gold inline-flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-2 text-xs", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "h-3 w-3" }),
          " Keranjang"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          remove(i.productId);
          toast.success("Dihapus");
        }, className: "rounded-md border border-border p-2 hover:border-destructive hover:text-destructive", "aria-label": "Hapus", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
      ] })
    ] }, i.productId)) })
  ] });
}
export {
  WishlistPage as component
};
