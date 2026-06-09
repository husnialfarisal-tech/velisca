import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { products } from "@/data/products";

export const Route = createFileRoute("/lookbook")({
  head: () => ({
    meta: [
      { title: "Lookbook — VELISCA" },
      { name: "description", content: "Editorial visual dari koleksi VELISCA — fashion dan skincare dalam satu estetika." },
      { property: "og:title", content: "Lookbook — VELISCA" },
      { property: "og:description", content: "Editorial visual dari koleksi VELISCA." },
      { property: "og:url", content: "/lookbook" },
    ],
    links: [{ rel: "canonical", href: "/lookbook" }],
  }),
  component: LookbookPage,
});

function LookbookPage() {
  // Bangun lookbook dari image produk yang sudah tone-selaras
  const looks = products.slice(0, 12).map((p, i) => ({
    img: p.images[i % p.images.length],
    caption: p.name,
    slug: p.slug,
    span: i % 5 === 0 ? "md:col-span-2 md:row-span-2" : "",
  }));

  return (
    <div>
      <section className="container-luxe py-16 text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Spring / Summer 2026</p>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Lookbook</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
          Sebuah meditasi tentang cahaya, tekstur, dan kesederhanaan yang disengaja. Setiap potongan adalah ritual.
        </p>
      </section>

      <section className="container-luxe pb-20">
        <div className="grid auto-rows-[280px] grid-cols-2 gap-3 md:grid-cols-4">
          {looks.map((l, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
              className={`group relative overflow-hidden rounded-md bg-secondary ${l.span}`}
            >
              <img src={l.img} alt={l.caption} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <Link to="/produk/$slug" params={{ slug: l.slug }} className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
                <span className="text-xs uppercase tracking-[0.2em]">{l.caption}</span>
              </Link>
            </motion.figure>
          ))}
        </div>
      </section>
    </div>
  );
}
