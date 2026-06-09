import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { f as formatRupiah } from "./format-rupiah-y_Sr_KjY.js";
import { u as useWishlist, a as useCart } from "./router-CcqNGaK4.js";
import { toast } from "sonner";
function ProductCard({ product, index = 0 }) {
  const wished = useWishlist((s) => s.has(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const addToCart = useCart((s) => s.add);
  const onWish = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]
    });
    toast.success(wished ? "Dihapus dari wishlist" : "Disimpan ke wishlist");
  };
  const onAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      variant: product.variants?.[0]?.options[0]
    });
    toast.success("Ditambahkan ke keranjang");
  };
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-50px" },
      transition: { duration: 0.5, delay: Math.min(index * 0.05, 0.3) },
      children: /* @__PURE__ */ jsxs(
        Link,
        {
          to: "/produk/$slug",
          params: { slug: product.slug },
          className: "group block",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden rounded-md bg-secondary", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: product.images[0],
                  alt: product.name,
                  loading: "lazy",
                  className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                }
              ),
              product.images[1] && /* @__PURE__ */ jsx(
                "img",
                {
                  src: product.images[1],
                  alt: "",
                  loading: "lazy",
                  className: "absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                }
              ),
              product.badge && /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur", children: product.badge }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onWish,
                  "aria-label": "Wishlist",
                  className: "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:bg-background",
                  children: /* @__PURE__ */ jsx(Heart, { className: `h-4 w-4 ${wished ? "fill-gold text-gold" : ""}` })
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0", children: /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: onAddToCart,
                  className: "flex w-full items-center justify-center gap-2 bg-foreground py-3 text-[11px] uppercase tracking-[0.2em] text-background transition hover:bg-gold hover:text-ink",
                  children: [
                    /* @__PURE__ */ jsx(ShoppingBag, { className: "h-3.5 w-3.5" }),
                    "Tambah ke Keranjang"
                  ]
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-1", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-[0.2em] text-muted-foreground", children: product.subcategory }),
              /* @__PURE__ */ jsx("h3", { className: "text-sm font-medium text-foreground transition-colors group-hover:text-gold", children: product.name }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: formatRupiah(product.price) }),
                product.originalPrice && /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground line-through", children: formatRupiah(product.originalPrice) })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  ProductCard as P
};
