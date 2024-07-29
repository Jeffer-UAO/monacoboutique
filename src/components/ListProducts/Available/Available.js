import { useState } from "react";
import { BASE_NAME } from "@/config/constants";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks";
import Link from "next/link";
import { toast } from "react-toastify";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  CardImg,
} from "reactstrap";

import { BsWhatsapp } from "react-icons/bs";

import styles from "./Available.module.scss";

export function Available(props) {
  const { product } = props;
  const { addCart } = useCart();
  const { generateWhatsAppLink, items, selectedItem, handleItemClick } =
    useWhatsApp();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [idProduct, setIdPropduct] = useState();
  const [propductWhatsApp, setPropductWhatsApp] = useState("");
  const [propductAlternaWhatsApp, setPropductAlternaWhatsApp] = useState("");

  const format = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Cambia 'es-ES' por tu configuración regional
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addData = () => {
    addCart(idProduct, quantity);
    toast.success("¡Se agrego con exito!");
    toggleModal();
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value);
  };

  const addProductId = (id) => {
    setIdPropduct(id);
    toggleModal();
  };

  //----------------------------------------------

  const toggleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const addProductToWhatsApp = (data) => {
    setPropductWhatsApp(data);
    toggleModal2();
  };

  const addProductAlternaToWhatsApp = (data) => {
    setPropductAlternaWhatsApp(data);
    toggleModal2();
  };

  const addDataToWhatsApp = () => {
    if (propductWhatsApp != "") {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        BASE_NAME + propductWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal2();
    } else {
      const whatsappLink = generateWhatsAppLink(
        selectedItem,
        propductAlternaWhatsApp
      );

      window.location.href = whatsappLink;
      toggleModal2();
    }
  };

  return (
    <div className={styles.list__product}>
      {product.productData.images ? (
        <Link href={`/${product.productData.slug}`}>
          <CardImg
            alt="Card image cap"
            src={BASE_NAME + product.productData.images}
          />
        </Link>
      ) : (
        <Link href={`/${product.productData.slug}`}>
          <CardImg
            alt="Card image cap"
            src={product.productData.image_alterna}
          />
        </Link>
      )}

      <h5>{product.productData.name_extend}</h5>
      <div className={styles.product}>
        <div className={styles.price}>
          {product.productData.price1 > 0 && (
            <h6>$ {format(product.productData.price1)}</h6>
          )}
         
        </div>
      </div>
    
      <Button
        color="primary"
        onClick={() => addProductId(product.productData.codigo)}
      >
        Agregar al Carrito
      </Button>

      <Modal centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Ingrese Cantidad</ModalHeader>

        <ModalBody>
          Cantidad
          <FormGroup>
            <Input
              value={quantity}
              type="number"
              name="cantidad"
              id="cantidad"
              placeholder="Cantidad"
              onChange={handleQuantityChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={addData}>
            Aceptar
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal centered isOpen={isOpen2} toggle={toggleModal2}>
        <ModalHeader toggle={toggleModal2}>Seleccione una Línea</ModalHeader>

        <ModalBody>
          <FormGroup>
            {items.map((item, index) => (
              <Button
                size="sm"
                key={index}
                color="success"
                outline
                className={index === selectedItem ? "selected" : ""}
                onClick={() => handleItemClick(item)}
              >
                <BsWhatsapp size={20} /> Linea {index + 1}
              </Button>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button siz="sm" outline color="secondary" onClick={toggleModal2}>
            Cancelar
          </Button>
          <Button size="sm" color="success" onClick={addDataToWhatsApp}>
            Aceptar
          </Button>{" "}
        </ModalFooter>
      </Modal>
    </div>
  );
}
