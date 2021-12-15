import {
  GET_CLIENTS,
  CLIENTS_LOADING,
  LOGIN_FAIL,
  UPDATE_CLIENT
} from "../actions/types";

const initialState = {
  clients: [],
  loading: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        loading: false
      };
    case UPDATE_CLIENT:
      return {
        ...state
      };
    /*  case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      }; */
    case CLIENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
