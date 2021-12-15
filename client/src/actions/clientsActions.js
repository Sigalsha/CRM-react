import axios from "axios";
import { GET_CLIENTS, CLIENTS_LOADING, UPDATE_CLIENT } from "./types";
import { returnErrors } from "./errorActions";
import { URL } from "../utils/consts";

export const getClients = () => (dispatch) => {
  dispatch(setClientsLoading());
  axios
    .get(URL)
    .then((res) => {
      console.log("res from clients backend in actions: ", res.data.data);
      const { data } = res.data;
      return dispatch({
        type: GET_CLIENTS,
        payload: data
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log("err from clients backend: ", err);
    });
};

export const updateClient = (clientToEdit, updatedClient) => (dispatch) => {
  axios
    .put(`${URL}${clientToEdit.id}`, updatedClient)
    .then((res) => {
      console.log("res from update client (put) backend in actions", res);
      dispatch({
        type: UPDATE_CLIENT,
        payload: res
      });
    })
    .catch((err) => console.log("err from update client (put) backend ", err));
};

export const setClientsLoading = () => {
  return {
    type: CLIENTS_LOADING
  };
};
