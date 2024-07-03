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
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };

  // Calcular el subtotal del carrito
  const subtotal = product.reduce(
    (acc, item) => acc + item.price1 * item.quantity,
    0
  );

  return (
    <div className={styles.list}>
      <h4>CARRITO</h4>
      <hr></hr>
      {map(product, (item) => (
        <div key={item.codigo} className={styles.card}>
          <BsTrash3
            size="20"
            color="gray"
            onClick={() => deleteCart(item.codigo)}
          />
          {item.images ? (
            <CardImg
              alt="Card image cap"
              src={BASE_NAME + item.images}
              className={styles.skeleton}
            />
          ) : (
            <CardImg
              alt="Card image cap"
              src={item.image_alterna}
              className={styles.skeleton}
            />
          )}

          <div className={styles.detalle}>
            <label>             
              <p className={styles.name}>{item.name_extend}</p>
            </label>
            <label>
              <h6>Precio:</h6>
              <p className={styles.price}>$ {format(item.price1)} </p>
            </label>

            <label>
              <h6>Cantidad:</h6>
              <div className={styles.btn}>
                <AiOutlineMinusCircle
                  onClick={() => decreaseCart(item.codigo)}
                  size={30}
                />
                <h5>{item.quantity}</h5>
                <AiFillPlusCircle
                  onClick={() => incrementCart(item.codigo)}
                  size={30}
                />
              </div>
            </label>

            <label>
              <h6>Subtotal:</h6>
              <p className={styles.price}>
                $ {format(item.price1 * item.quantity)}{" "}
              </p>
            </label>

            <hr />
          </div>
        </div>
      ))}

      <div className={styles.totales}>
        <p>Subtotal: $ {format(subtotal)}</p>
        <p>Descuento: $ 0</p>
        <p>Total: $ {format(subtotal)}</p>
      </div>
{/* 
      <Button onClick={() => window.location.replace("/payment")}>Finalizar Compra</Button>
     
      <Button color="primary" onClick={() => window.location.replace("/")}>Continuar Comprando</Button>
    */}
   
    </div>
  );
}
