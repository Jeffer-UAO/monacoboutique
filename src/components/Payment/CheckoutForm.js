import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useMercadoPago } from "@/contexts/MercadoPagoContext"; 


import { Input, Label, Button, Form } from "reactstrap";
import { toast } from "react-toastify";
import styles from "./Payment.module.scss";



export function CheckoutForm() {   
    const { mercadoPago, error } = useMercadoPago();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try {
        console.log(mercadoPago);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });


  

  
  return (
    <Form onSubmit={formik.handleSubmit}>      

      <div className={styles.LoginFormClient}>
        <div className={styles.loginContent}>
          <h4>Iniciar Sesión</h4>

          <div className={styles.input}>
            <Label for="title">Correo</Label>
            <Input
              name="email"
              type="email"
              placeholder=""
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
          </div>
          <div className={styles.input}>
            <Label for="password">Contraseña</Label>
            <Input
              type="password"
              name="password"
              placeholder=""
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
          </div>

          <Button block type="submit">
            Pagar
          </Button>
          
        </div>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email("No es un email valido!")
      .required("Este campo es obligatorio!"),
    password: Yup.string().required("Este campo es obligatorio!"),
  };
}
