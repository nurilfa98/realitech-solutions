// Memilih mockup sesuai produk.

import type { ProductSlug } from "@/content/products";
import { ArchiPayMockup } from "./archipay-mockup";
import { SakuDagangMockup } from "./sakudagang-mockup";

export function ProductMockup({ slug, className }: { slug: ProductSlug; className?: string }) {
  return slug === "archipay" ? <ArchiPayMockup className={className} /> : <SakuDagangMockup className={className} />;
}
