import axios from "axios";
import { GET_ITEMS, ADD_ITEM, EDIT_ITEM, DELETE_ITEM, ITEMS_LOADING, CLEAR_ITEMS } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems =
	(userId = null) =>
	(dispatch, getState) => {
		dispatch(setItemsLoading());

		axios
			.get(`/api/items/${userId}`, tokenConfig(getState))
			.then(res =>
				dispatch({
					type: GET_ITEMS,
					payload: res.data,
				})
			)
			.catch(err => dispatch(returnErrors(err.response.data, err.response.status, "LOGOUT_SUCCESS")));
	};

export const addItem = item => (dispatch, getState) => {
	axios
		.post("/api/items", item, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: ADD_ITEM,
				payload: res.data,
			})
		)
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const editItem = (id, item) => (dispatch, getState) => {
	axios
		.patch(`/api/items/${id}`, item, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: EDIT_ITEM,
				payload: res.data,
			})
		)
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setItemsLoading = () => {
	return {
		type: ITEMS_LOADING,
	};
};

export const deleteItem = id => (dispatch, getState) => {
	axios
		.delete(`/api/items/${id}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_ITEM,
				payload: id,
			})
		)
		.catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const clearItems = () => {
	return {
		type: CLEAR_ITEMS,
	};
};
