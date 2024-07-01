import { BASE_API } from "../config/constants";
import { authFetch } from "@/config";

export class User {
   async getMeAPi() {
    try {
      const url = `${BASE_API}/api/auth/me/`;  
      const response = await authFetch(url);
      const result = await response.json();

      if(response.status !== 200) throw result;
      
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async getUsersApi(token) {
    try {
      const url = `${BASE_API}/api/users/`;
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  async getUserByIdApi(id, token) {
    try {
      const url = `${BASE_API}/api/users/${id}`;
      const params = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
