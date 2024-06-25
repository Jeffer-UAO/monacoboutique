import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  CardImg,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import Link from "next/link";

import styles from "./TopBar.module.scss";
import { Redes } from "@/components/Redes";
export function TopBar() {
  const router = useRouter();
  const { total } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.topbar_component}>
        <div className={styles.right}>
          <div onClick={() => toggleModal()}>
            <BiMenu size={30} color="gray" />
          </div>

          <div>
            <BiMenu size={30} color="#FAF6F3" />
          </div>
        </div>

        <Link href="/">
          <CardImg src="/image/monaco-header-phone-2.png" alt="No hay logo" />{" "}
        </Link>

        <div className={styles.right}>
          <div onClick={() => router.push("/featured")}>
            <BsSearch size={30} color="gray" />
          </div>

          <div className={styles.cart} onClick={() => router.push("/cart")}>
            <p> {total > 0 ? total : ""}</p>
            <AiOutlineShoppingCart size={30} color="gray" />
          </div>
        </div>
      </div>


      <Redes />

      <div className={styles.topbar_category}>
        <p>categoria</p>
        <p>categoria</p>
        <p>categoria</p>
        <p>categoria</p>
        <p>categoria</p>
      </div>

      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Selección</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Link href="/">
              <p>Ir a...</p>
            </Link>
            <Link href="/">
              <p>Ir a...</p>
            </Link>
            <Link href="/">
              <p>Ir a...</p>
            </Link>
            <Link href="/">
              <p>Ir a...</p>
            </Link>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <p>Footer</p>
        </ModalFooter>
      </Modal>
    </div>
  );
}
