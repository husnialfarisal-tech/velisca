import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, Menu, X, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useCart } from "@/store/cart-store";
import { useWishlist } from "@/store/wishlist-store";

const NAV = [
  { to: "/", label: "Beranda" },
  { to: "/produk", label: "Produk" },
  { to: "/lookbook", label: "Lookbook" },
  { to: "/pencarian", label: "Cari" },
] as const;

export function Navbar() {
  const cartCount = useCart((s) => s.count());
  const wishCount = useWishlist((s) => s.items.length);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="container-luxe flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-[0.2em] text-foreground">
            VELISCA
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
            Wear Your Glow
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm tracking-wide transition-colors hover:text-foreground ${
                pathname === n.to ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Link to="/pencarian" className="rounded-full p-2 hover:bg-secondary md:hidden" aria-label="Cari">
            <Search className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-secondary"
            aria-label="Ganti tema"
          >
            {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/wishlist" className="relative rounded-full p-2 hover:bg-secondary" aria-label="Wishlist">
            <Heart className="h-4 w-4" />
            {wishCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">
                {wishCount}
              </span>
            )}
          </Link>
          <Link to="/keranjang" className="relative rounded-full p-2 hover:bg-secondary" aria-label="Keranjang">
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-ink">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 hover:bg-secondary md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-luxe flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm hover:bg-secondary"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
