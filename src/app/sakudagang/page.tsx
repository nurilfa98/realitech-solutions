import { ProductPage, productMetadata } from "@/components/product-page";
import { SAKUDAGANG } from "@/content/products";

export const metadata = productMetadata(SAKUDAGANG);

export default function Page() {
  return <ProductPage product={SAKUDAGANG} />;
}
