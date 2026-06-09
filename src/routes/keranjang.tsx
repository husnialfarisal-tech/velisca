import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/store/cart-store";
import { formatRupiah } from "@/lib/format-rupiah";

export const Route = createFileRoute("/keranjang")({
  head: () => ({
    meta: [
      { title: "Keranjang — VELISCA" },
      { name: "description", content: "Keranjang belanja Anda di VELISCA." },
    ],
  }),
  component: CartPage,
});

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

  const shipping = total > 500_000 || total === 0 ? 0 : 25_000;
  const grand = Math.max(0, total - discount) + shipping;

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl">Keranjang Belanja</h1>
      <p className="mt-2 text-sm text-muted-foreground">{items.length} item</p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-md border border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">Keranjang Anda masih kosong.</p>
          <Link to="/produk" className="btn-gold mt-6 inline-block rounded-md px-5 py-2.5 text-sm">Mulai Belanja</Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-border">
            {items.map((i) => (
              <li key={i.productId + (i.variant ?? "")} className="flex gap-4 py-6">
                <Link to="/produk/$slug" params={{ slug: i.slug }} className="block h-28 w-24 shrink-0 overflow-hidden rounded-md bg-secondary">
                  <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link to="/produk/$slug" params={{ slug: i.slug }} className="text-sm font-medium hover:text-gold">{i.name}</Link>
                      {i.variant && <p className="text-xs text-muted-foreground">Varian: {i.variant}</p>}
                    </div>
                    <button onClick={() => { remove(i.productId, i.variant); toast.success("Dihapus"); }} aria-label="Hapus" className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-center rounded-md border border-border">
                      <button onClick={() => updateQty(i.productId, i.quantity - 1, i.variant)} className="p-2"><Minus className="h-3 w-3" /></button>
                      <span className="w-8 text-center text-sm">{i.quantity}</span>
                      <button onClick={() => updateQty(i.productId, i.quantity + 1, i.variant)} className="p-2"><Plus className="h-3 w-3" /></button>
                    </div>
                    <p className="text-sm font-semibold">{formatRupiah(i.price * i.quantity)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-md border border-border bg-secondary/40 p-6">
            <h2 className="font-display text-xl">Ringkasan</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatRupiah(total)}</dd></div>
              {discount > 0 && (
                <div className="flex justify-between text-gold"><dt>Diskon Voucher</dt><dd>− {formatRupiah(discount)}</dd></div>
              )}
              <div className="flex justify-between"><dt className="text-muted-foreground">Pengiriman</dt><dd>{shipping === 0 ? "GRATIS" : formatRupiah(shipping)}</dd></div>
            </dl>
            <div className="my-4 flex gap-2">
              <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Kode voucher (VELISCA10)" className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold" />
              <button onClick={applyPromo} className="rounded-md border border-border px-3 py-2 text-sm hover:border-foreground">Terapkan</button>
            </div>
            <div className="flex justify-between border-t border-border pt-4 font-display text-lg">
              <span>Total</span>
              <span className="text-gold">{formatRupiah(grand)}</span>
            </div>
            <Link to="/checkout" className="btn-gold mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-medium">
              Lanjut ke Checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
