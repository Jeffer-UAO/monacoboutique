import { useCart } from "@/hooks/useCart";
import { Button, CardImg } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";

import { BsTrash3 } from "react-icons/bs";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListPayment.module.scss";

export function ListPayment(props) {
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
      <div className={styles.totales}>
        <h1>Resumen de la compra</h1>
        <p>Subtotal: $ {format(subtotal)}</p>
        <p>Descuento: $ 0</p>
        <p>Total: $ {format(subtotal)}</p>
      </div>

      <div className={styles.delivery}>
        <h1>Informacion de envio</h1>
      </div>

      <div className={styles.payment}>
        <h1>Informacion de pago</h1>
      <Button onClick={() => window.location.replace("/payment")}>
        Finalizar Compra
      </Button>
      <Button color="primary" onClick={() => window.location.replace("/")}>
        Seguir comprando
      </Button>
      </div>


      <div className={styles.detalle}>
        <h1>Detalle del pedido</h1>
        {map(product, (item) => (
          <div key={item.codigo} className={styles.card}>
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
             
                <p className={styles.name}>{item.name_extend}</p>
                <p className={styles.price}>
                  $ {format(item.price1 * item.quantity)}{" "}
                </p>
              

              <label>
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
            </div>
            <hr></hr>
          </div>
        ))}

        <Button onClick={() => window.location.replace("/payment")}>
          Finalizar Compra
        </Button>

        <Button color="primary" onClick={() => window.location.replace("/")}>
          Seguir comprando
        </Button>
      </div>
    </div>
  );
}
