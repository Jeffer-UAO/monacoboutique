import { BASE_API } from "../config/constants";


export class Payment {
  async createPayload(items, amount, token) {
    
    try {
      const url = `${BASE_API}/api/payment/`;
      const params = {
        method: "POST",
        headers: {       
        //   Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          items,
        //   transaction_amount: amount,          
        ),
      };
   
      const response = await fetch(url, params);
    //   console.log(response)

      const result = await response.json();

      if (response.status !== 201) {
        throw new Error("Occurio un error al crear el pago");
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}
