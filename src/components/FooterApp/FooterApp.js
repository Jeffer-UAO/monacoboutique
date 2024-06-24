import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useWhatsApp } from "@/hooks/useWhatsApp";
import { BASE_API } from "@/config/constants";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { BsWhatsapp } from "react-icons/bs";
import Link from "next/link";

import styles from "./FooterApp.module.scss";

import { BtnLink } from "../Common";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  CardImg,
} from "reactstrap";

export function FooterApp() {
  const { total } = useCart();
  const { generateWhatsAppLink, items, selectedItem, handleItemClick } =
    useWhatsApp();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const addData = () => {
    const whatsappLink = generateWhatsAppLink(
      selectedItem,
      "Hola, me gustaría obtener más información sobre sus productos."
    );

    window.location.href = whatsappLink;

    toggleModal();
  };

  return (
    <div className={styles.btnWhatsapp}>
      <div className={styles.paneluser}>
        <Link href={`/`}>
          <CardImg src="/image/btn-home.jpg" alt="Home" />{" "}
        </Link>

        <Link href={`/featured`}>
          <CardImg src="/image/btn-lupa.jpg" alt="Buscar" />{" "}
        </Link>

        <Button
          className={styles.whatsapp}
          color="succefull"
          onClick={() => toggleModal()}
        >
          <BsWhatsapp size={35} color="green" />
        </Button>

        <div className={styles.cart}>
          {total > 0 && <p>{total}</p>}
          <Link href={`/cart`}>
            <CardImg src="/image/btn-car.jpg" alt="Carrito" />{" "}
          </Link>
        </div>

        <Link
          href={`https://infinitymarket.suprainnovations.store/admin-dashboard/login/?next=/admin-dashboard/`}
        >
          <CardImg src="/image/btn-user.jpg" alt="Usuario" />{" "}
        </Link>
      </div>

      <Modal centered isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccione una Linea</ModalHeader>

        <ModalBody>
          <FormGroup>
            {items.map((item, index) => (
              <Button
                key={index}
                color="success"
                outline
                size="sm"
                className={index === selectedItem ? "selected" : ""}
                onClick={() => handleItemClick(item)}
              >
                <BsWhatsapp size={20} /> Linea {index + 1}
              </Button>
            ))}
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button outline size="sm" color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button size="sm" color="success" onClick={addData}>
            Aceptar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
