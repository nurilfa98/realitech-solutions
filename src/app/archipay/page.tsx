import { ProductPage, productMetadata } from "@/components/product-page";
import { ARCHIPAY } from "@/content/products";

export const metadata = productMetadata(ARCHIPAY);

export default function Page() {
  return <ProductPage product={ARCHIPAY} />;
}
