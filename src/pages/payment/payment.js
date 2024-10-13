import React, { useEffect, useState } from "react";
import { useCart, useAuth } from "@/hooks";
import { Products, Address, User, Auth } from "@/api";



import {
  Separator,
  NotFound,
  Footer,
  ListPayment,
  FooterApp,
} from "@/components";
import { BasicLayout } from "@/layouts";
import { size } from "lodash";

const productCtrl = new Products();
const addressCtrl = new Address();
const userCtrl = new User();
const authCtrl = new Auth();

export default function PaymentPage() {
  const { user, accesToken, login } = useAuth();
  const { cart } = useCart();
  const [product, setProduct] = useState("");
  const [address, setAddress] = useState("");
  const [change, setChange] = useState(false);
  const [load, setLoad] = useState(true);
  const hasProduct = size(product) > 0;

  const userTemporal = async() => {   
      const initialValue = {
        email: "hh@gmail.com",
        password: "1452",
      };    

    try {
      const response = await authCtrl.login(initialValue);
      login(response.access);
 //   window.location.replace("/payment");
    } catch (error) {
      console.log(error.message);      
    }
  }

  useEffect(() => {
    if (!user) {
      userTemporal();
    }
  }, []);  // Dependencia de `user`, para no ejecutar repetidamente
 


  const addChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    (async () => {
      try {
        const data = [];
        for await (const item of cart) {
          const response = await productCtrl.getProductByCode(item.id);
          data.push({ ...response, quantity: item.quantity });
        }
        setProduct(data);
        setLoad(false);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, [cart]);

  useEffect(() => {
    (async () => {
      try {
         const response = await addressCtrl.getAddress(accesToken, user.id);
         setAddress(response);                 
         setLoad(false);
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    })();
  }, [change]);


  // useEffect(() => {
  //   (async () => {
  //     try {
  //        const response = await addressCtrl.getAddress(accesToken, user.id);

  //        setAddress(response);
  //        setLoad(false);
  //     } catch (error) {
  //       console.error(`Error: ${error}`);
  //     }
  //   })();
  // }, []);





  return (
    <BasicLayout>
      <Separator />
      {load ? (
        <h1>Cargando ...</h1>
      ) : (
        <>
          {hasProduct ? (
            <>            
              <ListPayment addChange={addChange} product={product} address={address} payMethod={'payMethod'} />
          
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
