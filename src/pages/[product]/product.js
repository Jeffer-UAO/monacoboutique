import { BasicLayout } from "@/layouts";
import { DetailProduct, FooterApp, Redes, Separator } from "@/components";
import { Footer } from "@/components";

export default function ProductPage(props) {
  const { product, gallery, relate } = props;

  return (
    <div>
      <DetailProduct product={product} relate={relate} gallery={gallery} />
      <FooterApp />
      {/* <DetailProduct product={product} relate={relate} gallery={gallery} /> */}
      
    
    </div>
  );
}
