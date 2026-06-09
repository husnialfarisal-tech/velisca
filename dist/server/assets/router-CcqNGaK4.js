import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, notFound, createRouter } from "@tanstack/react-router";
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useTheme, ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Search, Sun, Moon, Heart, ShoppingBag, X, Menu, Instagram, Mail } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { z } from "zod";
const appCss = "/assets/styles-BRReyPou.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const useCart = create()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => set((s) => {
        const idx = s.items.findIndex(
          (i) => i.productId === item.productId && i.variant === item.variant
        );
        if (idx >= 0) {
          const next = [...s.items];
          next[idx] = { ...next[idx], quantity: next[idx].quantity + item.quantity };
          return { items: next };
        }
        return { items: [...s.items, item] };
      }),
      remove: (productId, variant) => set((s) => ({
        items: s.items.filter(
          (i) => !(i.productId === productId && i.variant === variant)
        )
      })),
      updateQty: (productId, quantity, variant) => set((s) => ({
        items: s.items.map(
          (i) => i.productId === productId && i.variant === variant ? { ...i, quantity: Math.max(1, quantity) } : i
        )
      })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0)
    }),
    { name: "velisca-cart" }
  )
);
const useWishlist = create()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => set(
        (s) => s.items.some((i) => i.productId === item.productId) ? { items: s.items.filter((i) => i.productId !== item.productId) } : { items: [...s.items, item] }
      ),
      remove: (productId) => set((s) => ({ items: s.items.filter((i) => i.productId !== productId) })),
      has: (productId) => get().items.some((i) => i.productId === productId),
      clear: () => set({ items: [] })
    }),
    { name: "velisca-wishlist" }
  )
);
const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Produk" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/pencarian", label: "Cari" }
];
function Navbar() {
  const cartCount = useCart((s) => s.count());
  const wishCount = useWishlist((s) => s.items.length);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxs("div", { className: "container-luxe flex h-16 items-center justify-between gap-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-baseline gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-display text-2xl tracking-[0.2em] text-foreground", children: "VELISCA" }),
        /* @__PURE__ */ jsx("span", { className: "hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline", children: "Wear Your Glow" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-8 md:flex", children: NAV.map((n) => /* @__PURE__ */ jsx(
        Link,
        {
          to: n.to,
          className: `text-sm tracking-wide transition-colors hover:text-foreground ${pathname === n.to ? "text-foreground" : "text-muted-foreground"}`,
          children: n.label
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Link, { to: "/pencarian", className: "rounded-full p-2 hover:bg-secondary md:hidden", "aria-label": "Cari", children: /* @__PURE__ */ jsx(Search, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
            className: "rounded-full p-2 hover:bg-secondary",
            "aria-label": "Ganti tema",
            children: mounted && resolvedTheme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxs(Link, { to: "/wishlist", className: "relative rounded-full p-2 hover:bg-secondary", "aria-label": "Wishlist", children: [
          /* @__PURE__ */ jsx(Heart, { className: "h-4 w-4" }),
          wishCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink", children: wishCount })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/keranjang", className: "relative rounded-full p-2 hover:bg-secondary", "aria-label": "Keranjang", children: [
          /* @__PURE__ */ jsx(ShoppingBag, { className: "h-4 w-4" }),
          cartCount > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink", children: cartCount })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setOpen(!open),
            className: "rounded-full p-2 hover:bg-secondary md:hidden",
            "aria-label": "Menu",
            children: open ? /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    open && /* @__PURE__ */ jsx("div", { className: "border-t border-border bg-background md:hidden", children: /* @__PURE__ */ jsx("div", { className: "container-luxe flex flex-col gap-1 py-4", children: NAV.map((n) => /* @__PURE__ */ jsx(
      Link,
      {
        to: n.to,
        onClick: () => setOpen(false),
        className: "rounded-md px-3 py-2 text-sm hover:bg-secondary",
        children: n.label
      },
      n.to
    )) }) })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxs("footer", { className: "mt-24 border-t border-border bg-secondary/40", children: [
    /* @__PURE__ */ jsxs("div", { className: "container-luxe grid gap-10 py-16 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-2", children: [
        /* @__PURE__ */ jsx("div", { className: "font-display text-3xl tracking-[0.2em]", children: "VELISCA" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 max-w-sm text-sm text-muted-foreground", children: "Fashion & skincare premium untuk perempuan modern. Dirancang dengan ketelitian artisanal, dibuat untuk memancarkan cahayamu." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center gap-3 text-muted-foreground", children: [
          /* @__PURE__ */ jsx("a", { href: "#", "aria-label": "Instagram", className: "rounded-full border border-border p-2 hover:text-foreground", children: /* @__PURE__ */ jsx(Instagram, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("a", { href: "mailto:hello@velisca.id", "aria-label": "Email", className: "rounded-full border border-border p-2 hover:text-foreground", children: /* @__PURE__ */ jsx(Mail, { className: "h-4 w-4" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Belanja" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/produk", className: "hover:text-foreground", children: "Semua Produk" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/produk", search: { category: "fashion" }, className: "hover:text-foreground", children: "Fashion" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/produk", search: { category: "skincare" }, className: "hover:text-foreground", children: "Skincare" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: "/lookbook", className: "hover:text-foreground", children: "Lookbook" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground", children: "Bantuan" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Pengiriman" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Pengembalian" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Hubungi Kami" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "FAQ" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-border", children: /* @__PURE__ */ jsxs("div", { className: "container-luxe flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row", children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " VELISCA. Semua hak dilindungi."
      ] }),
      /* @__PURE__ */ jsx("span", { className: "tracking-[0.2em]", children: "WEAR · YOUR · GLOW" })
    ] }) })
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-7xl text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl text-foreground", children: "Halaman tidak ditemukan" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Halaman yang kamu cari tidak tersedia atau telah dipindahkan." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "btn-gold inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium",
        children: "Kembali ke beranda"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl text-foreground", children: "Halaman tidak dapat dimuat" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Terjadi kesalahan. Coba muat ulang atau kembali ke beranda." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "btn-gold inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
          children: "Coba lagi"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-secondary",
          children: "Beranda"
        }
      )
    ] })
  ] }) });
}
const Route$8 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VELISCA — Wear Your Glow" },
      { name: "description", content: "Fashion & skincare premium untuk perempuan modern. Dirancang artisanal, dibuat untuk memancarkan cahayamu." },
      { name: "author", content: "VELISCA" },
      { property: "og:title", content: "VELISCA — Wear Your Glow" },
      { property: "og:description", content: "Fashion & skincare premium untuk perempuan modern." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "VELISCA" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "id", suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$8.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(ThemeProvider, { attribute: "class", defaultTheme: "light", enableSystem: false, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsx(Navbar, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] }),
    /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true, closeButton: true })
  ] }) });
}
const $$splitComponentImporter$7 = () => import("./wishlist-vyX-7bXp.js");
const Route$7 = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{
      title: "Wishlist — VELISCA"
    }, {
      name: "description",
      content: "Daftar keinginan Anda di VELISCA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./produk-BFsOu0JM.js");
const Route$6 = createFileRoute("/produk")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./pencarian-JHFzAmi7.js");
const searchSchema$1 = z.object({
  q: z.string().optional()
});
const Route$5 = createFileRoute("/pencarian")({
  validateSearch: searchSchema$1,
  head: () => ({
    meta: [{
      title: "Pencarian — VELISCA"
    }, {
      name: "description",
      content: "Cari produk fashion & skincare di VELISCA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./lookbook-BPnjnDwA.js");
const Route$4 = createFileRoute("/lookbook")({
  head: () => ({
    meta: [{
      title: "Lookbook — VELISCA"
    }, {
      name: "description",
      content: "Editorial visual dari koleksi VELISCA — fashion dan skincare dalam satu estetika."
    }, {
      property: "og:title",
      content: "Lookbook — VELISCA"
    }, {
      property: "og:description",
      content: "Editorial visual dari koleksi VELISCA."
    }, {
      property: "og:url",
      content: "/lookbook"
    }],
    links: [{
      rel: "canonical",
      href: "/lookbook"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./keranjang-CQqM9ziG.js");
const Route$3 = createFileRoute("/keranjang")({
  head: () => ({
    meta: [{
      title: "Keranjang — VELISCA"
    }, {
      name: "description",
      content: "Keranjang belanja Anda di VELISCA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-C7uYaod4.js");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "VELISCA — Wear Your Glow"
    }, {
      name: "description",
      content: "Koleksi fashion & skincare premium VELISCA. Dirancang artisanal, dibuat untuk memancarkan cahayamu."
    }, {
      property: "og:title",
      content: "VELISCA — Wear Your Glow"
    }, {
      property: "og:description",
      content: "Koleksi fashion & skincare premium VELISCA."
    }, {
      property: "og:url",
      content: "/"
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./produk.index-CqK5f0jQ.js");
const searchSchema = z.object({
  category: z.enum(["fashion", "skincare"]).optional(),
  q: z.string().optional()
});
const Route$1 = createFileRoute("/produk/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [{
      title: "Produk — VELISCA"
    }, {
      name: "description",
      content: "Jelajahi katalog fashion & skincare premium VELISCA."
    }, {
      property: "og:title",
      content: "Produk — VELISCA"
    }, {
      property: "og:description",
      content: "Jelajahi katalog fashion & skincare premium VELISCA."
    }, {
      property: "og:url",
      content: "/produk"
    }],
    links: [{
      rel: "canonical",
      href: "/produk"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const img = (id) => `https://images.unsplash.com/${id}?w=900&q=80&auto=format&fit=crop`;
const photos = {
  // Fashion — neutral beige/cream/black
  fashion1: ["photo-1490481651871-ab68de25d43d", "photo-1483985988355-763728e1935b"],
  fashion2: ["photo-1492707892479-7bc8d5a4ee93", "photo-1539109136881-3be0616acf4b"],
  fashion3: ["photo-1551488831-00ddcb6c6bd3", "photo-1485518882345-15568b007407"],
  fashion4: ["photo-1469334031218-e382a71b716b", "photo-1496747611176-843222e1e57c"],
  fashion5: ["photo-1525507119028-ed4c629a60a3", "photo-1543163521-1bf539c55dd2"],
  fashion6: ["photo-1539109136881-3be0616acf4b", "photo-1483985988355-763728e1935b"],
  fashion7: ["photo-1591047139829-d91aecb6caea", "photo-1611652022419-a9419f74343d"],
  fashion8: ["photo-1601762603339-fd61e28b698a", "photo-1485968579580-b6d095142e6e"],
  fashion9: ["photo-1605518216938-7c31b7b14ad0", "photo-1566479179817-c0c5b4f5b9c5"],
  fashion10: ["photo-1542838132-92c53300491e", "photo-1620799140408-edc6dcb6d633"],
  // Skincare — minimal beige bottles
  sk1: ["photo-1556228720-195a672e8a03", "photo-1570194065650-d99fb4bedf0a"],
  sk2: ["photo-1620916566398-39f1143ab7be", "photo-1556228453-efd6c1ff04f6"],
  sk3: ["photo-1608248543803-ba4f8c70ae0b", "photo-1571781926291-c477ebfd024b"],
  sk4: ["photo-1556228841-7d6a2295bc88", "photo-1571875257727-256c39da42af"],
  sk5: ["photo-1612817288484-6f916006741a", "photo-1631730486572-226d1f595b68"],
  sk6: ["photo-1598440947619-2c35fc9aa908", "photo-1567721913486-6585f069b332"],
  sk7: ["photo-1522338242992-e1a54906a8da", "photo-1620916297893-2f8a3a91ed0c"],
  sk8: ["photo-1601049676869-702ea24cfd58", "photo-1607602132700-068258431c6c"],
  sk9: ["photo-1631730359585-38a4935cbec4", "photo-1608248597279-f99d160bfcbc"],
  sk10: ["photo-1612817159949-195b6eb9e31a", "photo-1556228578-8c89e6adf883"]
};
const products = [
  // ===== FASHION =====
  {
    id: "f1",
    name: "Gaun Sutra Aurelia",
    slug: "gaun-sutra-aurelia",
    category: "fashion",
    subcategory: "Dress",
    price: 245e4,
    originalPrice: 32e5,
    images: photos.fashion1.map(img),
    description: "Gaun sutra premium dengan potongan elegan, dijahit tangan oleh artisan terpilih. Sentuhan klasik yang menonjolkan siluet feminin.",
    material: "100% Mulberry Silk",
    rating: 4.9,
    reviewCount: 128,
    stock: 12,
    badge: "Sale",
    isOnSale: true,
    isBestSeller: true,
    variants: [{ label: "Ukuran", options: ["S", "M", "L"] }]
  },
  {
    id: "f2",
    name: "Outer Wool Maren",
    slug: "outer-wool-maren",
    category: "fashion",
    subcategory: "Outer",
    price: 189e4,
    images: photos.fashion2.map(img),
    description: "Outerwear wool tebal dengan jatuh kain yang sempurna, cocok untuk look kasual maupun formal.",
    material: "Wool Blend 80%",
    rating: 4.8,
    reviewCount: 96,
    stock: 18,
    badge: "Baru",
    isNew: true,
    variants: [{ label: "Ukuran", options: ["S", "M", "L", "XL"] }]
  },
  {
    id: "f3",
    name: "Kemeja Linen Sera",
    slug: "kemeja-linen-sera",
    category: "fashion",
    subcategory: "Atasan",
    price: 78e4,
    images: photos.fashion3.map(img),
    description: "Kemeja linen ringan dengan finishing halus, sirkulasi udara baik untuk iklim tropis.",
    material: "100% Linen Eropa",
    rating: 4.7,
    reviewCount: 211,
    stock: 30,
    isBestSeller: true,
    badge: "Terlaris",
    variants: [{ label: "Ukuran", options: ["S", "M", "L"] }]
  },
  {
    id: "f4",
    name: "Celana Pleated Noir",
    slug: "celana-pleated-noir",
    category: "fashion",
    subcategory: "Celana",
    price: 95e4,
    images: photos.fashion4.map(img),
    description: "Celana pleated high-waist dengan struktur tegas yang memanjangkan kaki secara visual.",
    material: "Polyester Crepe",
    rating: 4.6,
    reviewCount: 74,
    stock: 22,
    variants: [{ label: "Ukuran", options: ["S", "M", "L"] }]
  },
  {
    id: "f5",
    name: "Blazer Crepe Eloise",
    slug: "blazer-crepe-eloise",
    category: "fashion",
    subcategory: "Outer",
    price: 165e4,
    originalPrice: 21e5,
    images: photos.fashion5.map(img),
    description: "Blazer single-breasted dengan padding minimalis, struktur halus untuk siluet ramping.",
    material: "Crepe Premium",
    rating: 4.8,
    reviewCount: 154,
    stock: 9,
    badge: "Sale",
    isOnSale: true,
    variants: [{ label: "Ukuran", options: ["S", "M", "L"] }]
  },
  {
    id: "f6",
    name: "Rok Midi Lumiere",
    slug: "rok-midi-lumiere",
    category: "fashion",
    subcategory: "Rok",
    price: 69e4,
    images: photos.fashion6.map(img),
    description: "Rok midi A-line dengan lipatan halus, ideal untuk look kantor hingga acara malam.",
    material: "Satin Twill",
    rating: 4.5,
    reviewCount: 62,
    stock: 25,
    variants: [{ label: "Ukuran", options: ["S", "M", "L"] }]
  },
  {
    id: "f7",
    name: "Tas Kulit Mira",
    slug: "tas-kulit-mira",
    category: "fashion",
    subcategory: "Aksesoris",
    price: 218e4,
    images: photos.fashion7.map(img),
    description: "Tas tangan kulit asli dengan jahitan presisi, hardware emas brushed.",
    material: "Kulit Sapi Italia",
    rating: 4.9,
    reviewCount: 188,
    stock: 7,
    isBestSeller: true,
    badge: "Terlaris"
  },
  {
    id: "f8",
    name: "Scarf Sutra Astrée",
    slug: "scarf-sutra-astree",
    category: "fashion",
    subcategory: "Aksesoris",
    price: 54e4,
    images: photos.fashion8.map(img),
    description: "Scarf sutra dengan motif eksklusif, sentuhan akhir untuk setiap penampilan.",
    material: "Silk 90×90 cm",
    rating: 4.7,
    reviewCount: 43,
    stock: 40,
    badge: "Baru",
    isNew: true
  },
  {
    id: "f9",
    name: "Sweater Cashmere Ivory",
    slug: "sweater-cashmere-ivory",
    category: "fashion",
    subcategory: "Atasan",
    price: 198e4,
    images: photos.fashion9.map(img),
    description: "Sweater cashmere lembut dengan rajutan padat, menghangatkan tanpa terasa berat.",
    material: "100% Cashmere",
    rating: 4.9,
    reviewCount: 121,
    stock: 11,
    variants: [{ label: "Ukuran", options: ["S", "M", "L"] }]
  },
  {
    id: "f10",
    name: "Sepatu Loafer Onyx",
    slug: "sepatu-loafer-onyx",
    category: "fashion",
    subcategory: "Sepatu",
    price: 145e4,
    images: photos.fashion10.map(img),
    description: "Loafer kulit dengan sol nyaman, klasik dan timeless untuk segala kesempatan.",
    material: "Kulit Asli + Sol Karet",
    rating: 4.8,
    reviewCount: 89,
    stock: 14,
    variants: [{ label: "Ukuran", options: ["38", "39", "40", "41"] }]
  },
  // ===== SKINCARE =====
  {
    id: "s1",
    name: "Serum Glow Renaissance",
    slug: "serum-glow-renaissance",
    category: "skincare",
    subcategory: "Serum",
    price: 68e4,
    originalPrice: 85e4,
    images: photos.sk1.map(img),
    description: "Serum pencerah dengan Vitamin C stabil dan Niacinamide untuk kulit lebih cerah merata.",
    ingredients: "Vitamin C 15%, Niacinamide 5%, Hyaluronic Acid",
    rating: 4.9,
    reviewCount: 312,
    stock: 45,
    badge: "Sale",
    isOnSale: true,
    isBestSeller: true
  },
  {
    id: "s2",
    name: "Moisturizer Velvet Dew",
    slug: "moisturizer-velvet-dew",
    category: "skincare",
    subcategory: "Moisturizer",
    price: 52e4,
    images: photos.sk2.map(img),
    description: "Pelembap ringan dengan tekstur velvet, melembapkan tanpa rasa berat.",
    ingredients: "Ceramide Complex, Squalane, Centella Asiatica",
    rating: 4.8,
    reviewCount: 198,
    stock: 60,
    isBestSeller: true,
    badge: "Terlaris"
  },
  {
    id: "s3",
    name: "Toner Hydra Lumière",
    slug: "toner-hydra-lumiere",
    category: "skincare",
    subcategory: "Toner",
    price: 42e4,
    images: photos.sk3.map(img),
    description: "Toner hidrasi mendalam yang mempersiapkan kulit menerima rangkaian skincare berikutnya.",
    ingredients: "Polyglutamic Acid, Beta-Glucan, Rose Water",
    rating: 4.7,
    reviewCount: 145,
    stock: 80
  },
  {
    id: "s4",
    name: "Sunscreen Soleil SPF50",
    slug: "sunscreen-soleil-spf50",
    category: "skincare",
    subcategory: "Sunscreen",
    price: 38e4,
    images: photos.sk4.map(img),
    description: "Sunscreen SPF50 PA++++ tekstur ringan, no white cast, cocok di bawah makeup.",
    ingredients: "Tinosorb S, Uvinul A Plus, Niacinamide",
    rating: 4.9,
    reviewCount: 421,
    stock: 100,
    badge: "Terlaris",
    isBestSeller: true
  },
  {
    id: "s5",
    name: "Masker Clay Rituel",
    slug: "masker-clay-rituel",
    category: "skincare",
    subcategory: "Masker",
    price: 45e4,
    images: photos.sk5.map(img),
    description: "Masker clay dengan ekstrak white kaolin untuk mengangkat kotoran pori secara lembut.",
    ingredients: "White Kaolin, Kaolinite, Bentonite, Honey",
    rating: 4.6,
    reviewCount: 87,
    stock: 38,
    badge: "Baru",
    isNew: true
  },
  {
    id: "s6",
    name: "Eye Cream Lueur",
    slug: "eye-cream-lueur",
    category: "skincare",
    subcategory: "Eye Care",
    price: 59e4,
    images: photos.sk6.map(img),
    description: "Krim mata dengan peptide kompleks untuk mengurangi tampilan garis halus dan lingkaran hitam.",
    ingredients: "Peptide Complex, Caffeine, Vitamin K",
    rating: 4.7,
    reviewCount: 102,
    stock: 28
  },
  {
    id: "s7",
    name: "Cleansing Oil Pure Silk",
    slug: "cleansing-oil-pure-silk",
    category: "skincare",
    subcategory: "Cleanser",
    price: 36e4,
    images: photos.sk7.map(img),
    description: "Cleansing oil ringan yang mengangkat makeup dan sunscreen tanpa meninggalkan rasa berminyak.",
    ingredients: "Jojoba Oil, Camellia Oil, Sweet Almond",
    rating: 4.8,
    reviewCount: 167,
    stock: 55
  },
  {
    id: "s8",
    name: "Essence Riche Élixir",
    slug: "essence-riche-elixir",
    category: "skincare",
    subcategory: "Essence",
    price: 72e4,
    originalPrice: 92e4,
    images: photos.sk8.map(img),
    description: "Essence fermentasi premium untuk tekstur kulit lebih halus dan glowing dari dalam.",
    ingredients: "Galactomyces 90%, Bifida Ferment, Adenosine",
    rating: 4.9,
    reviewCount: 234,
    stock: 22,
    badge: "Sale",
    isOnSale: true
  },
  {
    id: "s9",
    name: "Lip Serum Rosé d'Or",
    slug: "lip-serum-rose-dor",
    category: "skincare",
    subcategory: "Lip Care",
    price: 28e4,
    images: photos.sk9.map(img),
    description: "Serum bibir dengan rose oil yang melembapkan dan memberi kilau alami.",
    ingredients: "Rose Oil, Shea Butter, Vitamin E",
    rating: 4.6,
    reviewCount: 76,
    stock: 70,
    badge: "Baru",
    isNew: true
  },
  {
    id: "s10",
    name: "Body Lotion Honey Veil",
    slug: "body-lotion-honey-veil",
    category: "skincare",
    subcategory: "Body Care",
    price: 41e4,
    images: photos.sk10.map(img),
    description: "Body lotion dengan honey extract, melembapkan kulit hingga 48 jam.",
    ingredients: "Honey Extract, Shea Butter, Panthenol",
    rating: 4.7,
    reviewCount: 119,
    stock: 48
  }
];
function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}
function getRelated(product, n = 4) {
  return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, n);
}
const $$splitErrorComponentImporter = () => import("./produk._slug-cLaPAUcC.js");
const $$splitNotFoundComponentImporter = () => import("./produk._slug-DRmZ5PxH.js");
const $$splitComponentImporter = () => import("./produk._slug-C8VPLy8k.js");
const Route = createFileRoute("/produk/$slug")({
  loader: ({
    params
  }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return {
      product
    };
  },
  head: ({
    loaderData
  }) => {
    const p = loaderData?.product;
    return {
      meta: [{
        title: p ? `${p.name} — VELISCA` : "Produk — VELISCA"
      }, {
        name: "description",
        content: p?.description ?? "Produk VELISCA"
      }, {
        property: "og:title",
        content: p ? `${p.name} — VELISCA` : "VELISCA"
      }, {
        property: "og:description",
        content: p?.description ?? ""
      }, {
        property: "og:image",
        content: p?.images[0] ?? ""
      }, {
        property: "og:type",
        content: "product"
      }],
      links: p ? [{
        rel: "canonical",
        href: `/produk/${p.slug}`
      }] : []
    };
  },
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const WishlistRoute = Route$7.update({
  id: "/wishlist",
  path: "/wishlist",
  getParentRoute: () => Route$8
});
const ProdukRoute = Route$6.update({
  id: "/produk",
  path: "/produk",
  getParentRoute: () => Route$8
});
const PencarianRoute = Route$5.update({
  id: "/pencarian",
  path: "/pencarian",
  getParentRoute: () => Route$8
});
const LookbookRoute = Route$4.update({
  id: "/lookbook",
  path: "/lookbook",
  getParentRoute: () => Route$8
});
const KeranjangRoute = Route$3.update({
  id: "/keranjang",
  path: "/keranjang",
  getParentRoute: () => Route$8
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$8
});
const ProdukIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => ProdukRoute
});
const ProdukSlugRoute = Route.update({
  id: "/$slug",
  path: "/$slug",
  getParentRoute: () => ProdukRoute
});
const ProdukRouteChildren = {
  ProdukSlugRoute,
  ProdukIndexRoute
};
const ProdukRouteWithChildren = ProdukRoute._addFileChildren(ProdukRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  KeranjangRoute,
  LookbookRoute,
  PencarianRoute,
  ProdukRoute: ProdukRouteWithChildren,
  WishlistRoute
};
const routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$5 as R,
  useCart as a,
  Route$1 as b,
  Route as c,
  getRelated as g,
  products as p,
  router as r,
  useWishlist as u
};
