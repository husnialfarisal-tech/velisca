import { Link } from "@tanstack/react-router";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-luxe grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-3xl tracking-[0.2em]">VELISCA</div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Fashion & skincare premium untuk perempuan modern. Dirancang dengan ketelitian
            artisanal, dibuat untuk memancarkan cahayamu.
          </p>
          <div className="mt-6 flex items-center gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="rounded-full border border-border p-2 hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="mailto:hello@velisca.id" aria-label="Email" className="rounded-full border border-border p-2 hover:text-foreground"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Belanja</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/produk" className="hover:text-foreground">Semua Produk</Link></li>
            <li><Link to="/produk" search={{ category: "fashion" }} className="hover:text-foreground">Fashion</Link></li>
            <li><Link to="/produk" search={{ category: "skincare" }} className="hover:text-foreground">Skincare</Link></li>
            <li><Link to="/lookbook" className="hover:text-foreground">Lookbook</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Bantuan</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-foreground">Pengiriman</a></li>
            <li><a href="#" className="hover:text-foreground">Pengembalian</a></li>
            <li><a href="#" className="hover:text-foreground">Hubungi Kami</a></li>
            <li><a href="#" className="hover:text-foreground">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-luxe flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} VELISCA. Semua hak dilindungi.</span>
          <span className="tracking-[0.2em]">WEAR · YOUR · GLOW</span>
        </div>
      </div>
    </footer>
  );
}
