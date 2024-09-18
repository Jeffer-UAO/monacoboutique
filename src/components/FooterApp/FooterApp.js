import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";


import styles from "./FooterApp.module.scss";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Button
} from "reactstrap";

export function FooterApp(props) {

  const { title, component, title1, title2, link1, link2, modal, user } = props;
  const [showModal, setShowModal] = useState(false);
  const { total } = useCart();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  
  return (
    <div className={styles.btnWhatsapp}>

      {user ? (
        <Link href={link1 ? link1 : "/payment"}>
        <div className={styles.title1}>{title1}</div>
      </Link>
      ):(
        <div onClick={() => toggleModal(true)} className={styles.title1}>
          {title1}
        </div>
      )}


      {!modal ? (
        <Link href={link2 ? link2 : "/"}>
          <div className={styles.title2}>{title2}</div>
        </Link>
      ) : (
        <div onClick={() => toggleModal(true)} className={styles.title2}>
          {title2}
        </div>
      )}

      <Modal centered isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{title}</ModalHeader>

        <ModalBody>
          <FormGroup>{component}</FormGroup>
        </ModalBody>
      </Modal>
    </div>
  );
}
