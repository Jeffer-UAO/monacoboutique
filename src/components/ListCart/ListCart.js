import { useCart } from "@/hooks/useCart";
import { Button, CardImg } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";

import { BsTrash3 } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListCart.module.scss";

export function ListCart(props) {
  const { product } = props;
  const { decreaseCart, incrementCart, deleteCart } = useCart();

  const format = (number) => {
    // Redondear o eliminar los decimales usando Math.floor
    const integerPart = Math.floor(number);
    
    // Aplicar el formato de miles con puntos
    return integerPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Calcular el subtotal del carrito
  const subtotal = product.reduce(
    (acc, item) => acc + item[0].price * item.quantity,
    0
  );

  return (
    <div className={styles.list}>
      <h4>CARRITO</h4>
   
      {map(product, (item) => (
        <div key={item[0].codigo} className={styles.card}>
          <div className={styles.body}>

            <div className={styles.body__content}>

              <BsTrash3
                size="20"
                color="gray"
                onClick={() => deleteCart(item[0].codigo)}
              />

              {item[0].images ? (
                <CardImg
                  alt="Card image cap"
                  src={BASE_NAME + item[0].images}
                  className={styles.skeleton}
                />
              ) : (
                <CardImg
                  alt="Card image cap"
                  src={item[0].image_alterna}
                  className={styles.skeleton}
                />
              )}

              <frames className={styles.sizecolor}>
                <p>Talla <label>{item[0].talla}</label></p>
                <p>Color <label>{item[0].color}</label></p>
              </frames>

              <frames className={styles.price}>               
                <p className={styles.unid}>$ {format(item[0].price)} </p>
                <p className={styles.total}>
                  $ {format(item[0].price * item.quantity)}
                </p>
              </frames>

              <frames className={styles.button}>
                <AiOutlineMinusCircle
                  onClick={() => decreaseCart(item[0].codigo)}
                  size={20}
                />
                <p>{item.quantity}</p>
                <AiFillPlusCircle
                  onClick={() => incrementCart(item[0].codigo)}
                  size={20}
                />
              </frames>
            </div>
          </div>

          <div className={styles.foot}>
            <p className={styles.name}>{item[0].name}</p>
          </div>
        </div>
      ))}

      <div className={styles.totales}>
        <p>Subtotal: $ {format(subtotal)}</p>
        <p>Descuento: $ 0</p>
        <p>Total: $ {format(subtotal)}</p>
      </div>
     
    </div>
  );
}
