import React, { useState } from "react";
import { useCart } from "@/hooks";
import { map } from "lodash";
import {
  Button,
  CardImg,
  Modal,
  ModalBody,  
  ModalHeader,
} from "reactstrap";

// import { CheckoutForm } from "../CheckoutForm";

import { BASE_NAME } from "@/config/constants";

import { AiFillPlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";

import styles from "./ListPayment.module.scss";

export function ListPayment(props) {
  const { product, address } = props;
  const { decreaseCart, incrementCart, deleteCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(
    Array.isArray(address) && address.length > 0 ? address[0] : null
  );

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };

  // Calcular el subtotal del carrito
  const subtotal = product.reduce(
    (acc, item) => acc + item.price1 * item.quantity,
    0
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const selectecAddress = (address) => {
    setSelectedAddress(address);
    setModalOpen(!isModalOpen);
  };

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
        {selectedAddress ? (
          <>
            <p>Titulo: {selectedAddress.title}</p>
            <p>Nombre: {selectedAddress.name_lastname}</p>
            <p>Dirección: {selectedAddress.address}</p>
            <p>Ciudad: {selectedAddress.city}</p>
            <p>Teléfono: {selectedAddress.phone}</p>
          </>
        ) : (
          <p>Dirección no disponible</p>
        )}       
        <Button outline onClick={() => toggleModal()}>Cambiar Dirección de envio</Button>
      </div>

      <div className={styles.totales}>
        <h2>Metodo de pago</h2>       
       {/* <CheckoutForm /> */}
        <Button outline onClick={() => window.location.replace("/payment")}>
          Cambiar metodo de pago
        </Button>
      </div>

        <Button block color="primary" onClick={() => window.location.replace("/")}>
          Pagar
        </Button>

        <Button block outline onClick={() => window.location.replace("/payment")}>
          Continuar Comprando
        </Button>
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

      <Modal centered isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

        <ModalBody>
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h2>Selecciona una Dirección</h2>
              <hr></hr>
              <ul>
                {address.map((addres, index) => (
                  <div key={index}>
                    <li  onClick={() => selectecAddress(addres)}>
                      <h6>{addres.title}</h6>
                      <p>NOMBRE: {addres.name_lastname}</p>
                      <p>DIRECCIÓN: {addres.address}</p>
                      <p>CIUDAD: {addres.city}</p>
                      <p>TELÉFONO: {addres.phone}</p>
                    </li>
                    <hr></hr>
                  </div>
                ))}
              </ul>
              <Button onClick={toggleModal}>Cerrar</Button>
            </div>
          </div>
        </ModalBody>

        {/* <ModalFooter>
          <Button outline size="sm" color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button size="sm" color="success">
            Aceptar
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
}
