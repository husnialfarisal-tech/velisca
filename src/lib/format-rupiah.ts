// Format harga ke Rupiah: 1250000 -> "Rp 1.250.000"
export function formatRupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}
