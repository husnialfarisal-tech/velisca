import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { Search as SearchIcon } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/pencarian")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Pencarian — VELISCA" },
      { name: "description", content: "Cari produk fashion & skincare di VELISCA." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const [q, setQ] = useState(search.q ?? "");

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const needle = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.subcategory.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <div className="container-luxe py-12">
      <h1 className="font-display text-4xl">Pencarian</h1>
      <div className="mt-6 flex items-center gap-2 rounded-md border border-border bg-background px-4 py-3">
        <SearchIcon className="h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari serum, gaun, blazer..."
          className="flex-1 bg-transparent text-sm outline-none"
        />
      </div>

      {q.trim() === "" ? (
        <p className="mt-10 text-sm text-muted-foreground">Mulai mengetik untuk mencari produk.</p>
      ) : results.length === 0 ? (
        <div className="mt-12 rounded-md border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">Tidak ada hasil untuk "{q}".</p>
          <Link to="/produk" className="btn-gold mt-4 inline-block rounded-md px-4 py-2 text-sm">Lihat semua produk</Link>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-muted-foreground">{results.length} hasil ditemukan</p>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {results.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </>
      )}
    </div>
  );
}
