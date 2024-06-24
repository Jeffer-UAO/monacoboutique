import { size } from "lodash";
import { Listproducts, Footer, NotFound, FooterApp, Redes } from "@/components";

import { BasicLayout } from "@/layouts";


export default function category(props) {
  const { products, category } = props;
  const hasProduct = size(products) > 0;

  return (
    <BasicLayout>
         
      {hasProduct ? (
        <Listproducts products={products} title={category.name} />
      ) : (
        <NotFound
          title={"Upppss... No hay productos para mostrar en esta categoría"}
        />
      )}
     
      <Footer />
    </BasicLayout>
  );
}
