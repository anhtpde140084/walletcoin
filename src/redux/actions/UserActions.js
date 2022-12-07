export const CURRENT_USER = "CURRENT_USER";
export const ADD_CHANGE_TRANSFER = "ADD_CHANGE_TRANSFER";
export const UPDATE_LOADING = "UPDATE_LOADING";

export const addCurrentUser = data=> async (dispatch) => {
  dispatch({
    type: CURRENT_USER,
    payload: data,
  });
};

export const addChangeTransfer = data=> async (dispatch) => {
  dispatch({
    type: ADD_CHANGE_TRANSFER,
    payload: data,
  });
};


export const updateLoading = data=> async (dispatch) => {
  dispatch({
    type: UPDATE_LOADING,
    payload: data,
  });
};
