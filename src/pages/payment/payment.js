import React, { useEffect, useState } from "react";
import { useCart, useAuth } from "@/hooks";
import { Products } from "@/api";
import {
  Separator,
  NotFound,
  Payment,
  Footer,
  ListPayment,
} from "@/components";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";
import { BASE_NAME } from "@/config/constants";

const productCtrl = new Products();

export default function PaymentPage() {
  const { user } = useAuth();
  const { cart } = useCart();
  const [product, setProduct] = useState("");
  const [load, setLoad] = useState(true);
  const hasProduct = size(product) > 0;

  if (!user) {
    window.location.replace("/join/login");
    return null;
  }

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await productCtrl.getProductById(item.id);
          data.push({ ...response, quantity: item.quantity });
        }
        setProduct(data);
        setLoad(false);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, [cart]);

  return (
    <BasicLayout>
      <Separator />
      {load ? (
        <h1>Cargando ...</h1>
      ) : (
        <>
          {hasProduct ? (
            <>
              <ListPayment product={product} />
              <Payment product={product} />
              <Footer />
            </>
          ) : (
            <NotFound
              title={"Uppss... en este momento no hay productos para pagar"}
            />
          )}
        </>
      )}
    </BasicLayout>
  );
}
