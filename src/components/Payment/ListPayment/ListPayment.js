import { useCart } from "@/hooks/useCart";
import { Button, CardImg } from "reactstrap";
import { map } from "lodash";
import { BASE_NAME } from "@/config/constants";

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
        <h2>Resumen de Compra</h2>
        <p>Subtotal: $ {format(subtotal)}</p>
        <p>Descuento: $ 0</p>
        <p>Total a Pagar: $ {format(subtotal)}</p>
      </div>

      <div className={styles.totales}>
        <h2>Dirección de envío</h2>
        <p>Subtotal: $ {format(subtotal)}</p>
        <p>Descuento: $ 0</p>
        <p>Total a Pagar: $ {format(subtotal)}</p>
        <label>Cambiar dirección</label>
        <Button> Cambiar Dirección</Button>
      </div>

      <div className={styles.totales}>
        <h2>Información de pago</h2>

        <p>Subtotal: $ {format(subtotal)}</p>
        <p>Descuento: $ 0</p>
        <p>Total a Pagar: $ {format(subtotal)}</p>
        <label>Cambiar datos de pago</label>

        <Button onClick={() => window.location.replace("/payment")}>
          Finalizar Compra
        </Button>
        <Button color="primary" onClick={() => window.location.replace("/")}>
          Seguir comprando
        </Button>
      </div>

      <hr></hr>
      <div className={styles.detalle}>
        <h2>Detalle del pedido</h2>
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
