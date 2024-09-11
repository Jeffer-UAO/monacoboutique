import { BasicLayout } from "@/layouts";
import { DetailProduct, FooterApp, Redes, Separator } from "@/components";
import { Footer } from "@/components";

export default function ProductPage(props) {
  const { product, gallery, relate } = props;
  const titel1='Volver'
  const titel2='Inicio'
  const link1='/'


  return (
    <div>
      <DetailProduct product={product} relate={relate} gallery={gallery} />
      <FooterApp title1={titel1} title2={titel2} link1={link1} />  
    </div>
  );
}
