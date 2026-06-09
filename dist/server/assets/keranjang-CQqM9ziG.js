import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { a as useCart } from "./router-CcqNGaK4.js";
import { f as formatRupiah } from "./format-rupiah-y_Sr_KjY.js";
import "@tanstack/react-query";
import "next-themes";
import "zustand";
import "zustand/middleware";
import "zod";
function CartPage() {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);
  const total = useCart((s) => s.total());
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const applyPromo = () => {
    if (promo.toUpperCase() === "VELISCA10") {
      setDiscount(Math.round(total * 0.1));
      toast.success("Voucher diterapkan: 10%");
    } else {
      setDiscount(0);
      toast.error("Kode voucher tidak valid");
    }
  };
  const shipping = total > 5e5 || total === 0 ? 0 : 25e3;
  const grand = Math.max(0, total - discount) + shipping;
  return /* @__PURE__ */ jsxs("div", { className: "container-luxe py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl", children: "Keranjang Belanja" }),
    /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
      items.length,
      " item"
    ] }),
    items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-12 rounded-md border border-dashed border-border p-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Keranjang Anda masih kosong." }),
      /* @__PURE__ */ jsx(Link, { to: "/produk", className: "btn-gold mt-6 inline-block rounded-md px-5 py-2.5 text-sm", children: "Mulai Belanja" })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-10 md:grid-cols-[1fr_360px]", children: [
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border", children: items.map((i) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 py-6", children: [
        /* @__PURE__ */ jsx(Link, { to: "/produk/$slug", params: {
          slug: i.slug
        }, className: "block h-28 w-24 shrink-0 overflow-hidden rounded-md bg-secondary", children: /* @__PURE__ */ jsx("img", { src: i.image, alt: i.name, className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-1 flex-col", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Link, { to: "/produk/$slug", params: {
                slug: i.slug
              }, className: "text-sm font-medium hover:text-gold", children: i.name }),
              i.variant && /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Varian: ",
                i.variant
              ] })
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              remove(i.productId, i.variant);
              toast.success("Dihapus");
            }, "aria-label": "Hapus", className: "text-muted-foreground hover:text-destructive", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-end justify-between", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-md border border-border", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => updateQty(i.productId, i.quantity - 1, i.variant), className: "p-2", children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsx("span", { className: "w-8 text-center text-sm", children: i.quantity }),
              /* @__PURE__ */ jsx("button", { onClick: () => updateQty(i.productId, i.quantity + 1, i.variant), className: "p-2", children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: formatRupiah(i.price * i.quantity) })
          ] })
        ] })
      ] }, i.productId + (i.variant ?? ""))) }),
      /* @__PURE__ */ jsxs("aside", { className: "h-fit rounded-md border border-border bg-secondary/40 p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl", children: "Ringkasan" }),
        /* @__PURE__ */ jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Subtotal" }),
            /* @__PURE__ */ jsx("dd", { children: formatRupiah(total) })
          ] }),
          discount > 0 && /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-gold", children: [
            /* @__PURE__ */ jsx("dt", { children: "Diskon Voucher" }),
            /* @__PURE__ */ jsxs("dd", { children: [
              "− ",
              formatRupiah(discount)
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("dt", { className: "text-muted-foreground", children: "Pengiriman" }),
            /* @__PURE__ */ jsx("dd", { children: shipping === 0 ? "GRATIS" : formatRupiah(shipping) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "my-4 flex gap-2", children: [
          /* @__PURE__ */ jsx("input", { value: promo, onChange: (e) => setPromo(e.target.value), placeholder: "Kode voucher (VELISCA10)", className: "flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold" }),
          /* @__PURE__ */ jsx("button", { onClick: applyPromo, className: "rounded-md border border-border px-3 py-2 text-sm hover:border-foreground", children: "Terapkan" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between border-t border-border pt-4 font-display text-lg", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsx("span", { className: "text-gold", children: formatRupiah(grand) })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/checkout", className: "btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium", children: [
          "Lanjut ke Checkout ",
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] })
    ] })
  ] });
}
export {
  CartPage as component
};
