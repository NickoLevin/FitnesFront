import { atom } from "recoil";
import axios from "axios";

export const apiState = atom({
  key: "textState",
  default: {
    getEquipment(url = "/api/eqipments/") {
      return axios.get(process.env.REACT_APP_API_URL + url);
    },
    getAbonements() {
      return axios.get(
        `${process.env.REACT_APP_API_URL}/api/abonements/?limit=999`
      );
    },
    createTrainer(trainer) {
      return axios.post(
        `${process.env.REACT_APP_API_URL}/api/trainers/`,
        trainer
      );
    },
  },
});
