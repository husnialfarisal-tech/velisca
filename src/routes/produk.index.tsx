import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/data/products";
import { SlidersHorizontal } from "lucide-react";

const searchSchema = z.object({
  category: z.enum(["fashion", "skincare"]).optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/produk/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Produk — VELISCA" },
      { name: "description", content: "Jelajahi katalog fashion & skincare premium VELISCA." },
      { property: "og:title", content: "Produk — VELISCA" },
      { property: "og:description", content: "Jelajahi katalog fashion & skincare premium VELISCA." },
      { property: "og:url", content: "/produk" },
    ],
    links: [{ rel: "canonical", href: "/produk" }],
  }),
  component: ProductListPage,
});

type Sort = "terbaru" | "terlaris" | "harga-asc" | "harga-desc";

function ProductListPage() {
  const search = Route.useSearch();
  const [sort, setSort] = useState<Sort>("terbaru");
  const [maxPrice, setMaxPrice] = useState<number>(3_500_000);
  const [minRating, setMinRating] = useState<number>(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (search.category) list = list.filter((p) => p.category === search.category);
    if (search.q) {
      const q = search.q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    list = list.filter((p) => p.price <= maxPrice && p.rating >= minRating);
    switch (sort) {
      case "harga-asc": list.sort((a, b) => a.price - b.price); break;
      case "harga-desc": list.sort((a, b) => b.price - a.price); break;
      case "terlaris": list.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [search.category, search.q, sort, maxPrice, minRating]);

  const categoryLabel =
    search.category === "fashion"
      ? "Fashion"
      : search.category === "skincare"
      ? "Skincare"
      : "Semua Produk";

  return (
    <div className="container-luxe py-12">
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-muted-foreground">
        <Link to="/">Beranda</Link> <span className="mx-2">/</span>{" "}
        <span className="text-foreground">{categoryLabel}</span>
      </nav>

      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Katalog</p>
          <h1 className="mt-2 font-display text-4xl md:text-5xl">{categoryLabel}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filtered.length} produk</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm md:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
          >
            <option value="terbaru">Terbaru</option>
            <option value="terlaris">Terlaris</option>
            <option value="harga-asc">Harga: Rendah ke Tinggi</option>
            <option value="harga-desc">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </header>

      <div className="grid gap-10 md:grid-cols-[240px_1fr]">
        <aside className={`${filtersOpen ? "block" : "hidden"} space-y-8 md:block`}>
          <div>
            <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Kategori</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/produk/"
                  search={{}}
                  className={!search.category ? "text-gold" : "hover:text-foreground"}
                >
                  Semua
                </Link>
              </li>
              <li>
                <Link
                  to="/produk/"
                  search={{ category: "fashion" }}
                  className={search.category === "fashion" ? "text-gold" : "hover:text-foreground"}
                >
                  Fashion
                </Link>
              </li>
              <li>
                <Link
                  to="/produk/"
                  search={{ category: "skincare" }}
                  className={search.category === "skincare" ? "text-gold" : "hover:text-foreground"}
                >
                  Skincare
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Harga Maks.</h3>
            <input
              type="range"
              min={300_000}
              max={3_500_000}
              step={100_000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[var(--gold)]"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Hingga Rp {maxPrice.toLocaleString("id-ID")}
            </p>
          </div>
          <div>
            <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Rating Min.</h3>
            <div className="flex gap-2">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`rounded-md border px-3 py-1.5 text-xs ${
                    minRating === r
                      ? "border-gold bg-gold text-ink"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {r === 0 ? "Semua" : `★ ${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-md border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                Tidak ada produk yang cocok dengan filter Anda.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}