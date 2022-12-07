import { ADD_CHANGE_TRANSFER, CURRENT_USER } from "../actions/UserActions";
import { UPDATE_LOADING } from './../actions/UserActions';

const initialState = {
  currentUser: "",
  hasTransfer: false,
  notification: '',
  loadingGlobal: false
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ADD_CHANGE_TRANSFER:
      return {
        ...state,
        hasTransfer: action.payload,
      };
    case UPDATE_LOADING:
      return {
        ...state,
        loadingGlobal: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
