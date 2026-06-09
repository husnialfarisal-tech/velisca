import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useWishlist } from "@/store/wishlist-store";
import { useCart } from "@/store/cart-store";
import { formatRupiah } from "@/lib/format-rupiah";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — VELISCA" },
      { name: "description", content: "Daftar keinginan Anda di VELISCA." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const items = useWishlist((s) => s.items);
  const remove = useWishlist((s) => s.remove);
  const add = useCart((s) => s.add);

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl">Wishlist</h1>
      <p className="mt-2 text-sm text-muted-foreground">{items.length} produk disimpan</p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-md border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">Belum ada produk di wishlist.</p>
          <Link to="/produk" className="btn-gold mt-6 inline-block rounded-md px-5 py-2.5 text-sm">Telusuri Produk</Link>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {items.map((i) => (
            <li key={i.productId} className="group">
              <Link to="/produk/$slug" params={{ slug: i.slug }} className="block aspect-[4/5] overflow-hidden rounded-md bg-secondary">
                <img src={i.image} alt={i.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Link>
              <div className="mt-3">
                <Link to="/produk/$slug" params={{ slug: i.slug }} className="text-sm font-medium hover:text-gold">{i.name}</Link>
                <p className="text-sm font-semibold">{formatRupiah(i.price)}</p>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => { add({ productId: i.productId, name: i.name, slug: i.slug, price: i.price, image: i.image, quantity: 1 }); toast.success("Ditambahkan ke keranjang"); }}
                  className="btn-gold inline-flex flex-1 items-center justify-center gap-1 rounded-md px-3 py-2 text-xs"
                >
                  <ShoppingBag className="h-3 w-3" /> Keranjang
                </button>
                <button onClick={() => { remove(i.productId); toast.success("Dihapus"); }} className="rounded-md border border-border p-2 hover:border-destructive hover:text-destructive" aria-label="Hapus">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
