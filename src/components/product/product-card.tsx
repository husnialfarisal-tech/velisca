import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/types";
import { formatRupiah } from "@/lib/format-rupiah";
import { useWishlist } from "@/store/wishlist-store";
import { useCart } from "@/store/cart-store";
import { toast } from "sonner";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const wished = useWishlist((s) => s.has(product.id));
  const toggle = useWishlist((s) => s.toggle);
  const addToCart = useCart((s) => s.add);

  // Tambah ke wishlist
  const onWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
    });
    toast.success(wished ? "Dihapus dari wishlist" : "Disimpan ke wishlist");
  };

  // Tambah ke keranjang langsung dari card
  const onAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      variant: product.variants?.[0]?.options[0],
    });
    toast.success("Ditambahkan ke keranjang");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
    >
      <Link
        to="/produk/$slug"
        params={{ slug: product.slug }}
        className="group block"
      >
        {/* Gambar produk */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}

          {/* Badge */}
          {product.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur">
              {product.badge}
            </span>
          )}

          {/* Tombol wishlist */}
          <button
            onClick={onWish}
            aria-label="Wishlist"
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-foreground backdrop-blur transition hover:bg-background"
          >
            <Heart className={`h-4 w-4 ${wished ? "fill-gold text-gold" : ""}`} />
          </button>

          {/* Tombol tambah ke keranjang — muncul saat hover */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={onAddToCart}
              className="flex w-full items-center justify-center gap-2 bg-foreground py-3 text-[11px] uppercase tracking-[0.2em] text-background transition hover:bg-gold hover:text-ink"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Tambah ke Keranjang
            </button>
          </div>
        </div>

        {/* Info produk */}
        <div className="mt-4 space-y-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {product.subcategory}
          </p>
          <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-gold">
            {product.name}
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">{formatRupiah(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatRupiah(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
