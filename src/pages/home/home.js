import React, { useEffect, useState } from "react";
import { Categories } from "@/api/category";
import { Products } from "@/api/products";
import { Videos } from "@/api/videos";
import { ListCategories, Footer, Promotion, Exclusive } from "@/components";

import { BasicLayout } from "../../layouts";

const categoriesCtrl = new Categories();
const productsCtrl = new Products();
const videosCtrl = new Videos();


export default function HomePage() {
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState(null);
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoriesCtrl.getAll();
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await videosCtrl.getAll();
        setVideos(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);


  useEffect(() => {
    (async () => {
      try {
        const response = await productsCtrl.getProducts();
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);



  if (categories !== null) {
    return (
      <>
        <BasicLayout>
         
          <ListCategories categories={categories} />

          {/* <ListVideos videos={videos} /> */}

          <Promotion products={products} />
        
          <Exclusive products={products} />

          {/* <FooterApp />*/}
          <Footer /> 
        </BasicLayout>
      </>
    );
  } else {
    return (
      <>
        <BasicLayout>
         <p>Cargando...</p>        
        </BasicLayout>
      </>
    );
  }
}
