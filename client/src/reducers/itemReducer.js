import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, CLEAR_ITEMS } from "../actions/types";

const initialState = {
	items: [],
	loading: false,
};

const itemReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ITEMS:
			return {
				...state,
				items: action.payload,
				loading: false,
			};

		case ADD_ITEM:
			return {
				...state,
				items: [action.payload, ...state.items],
			};

		case ITEMS_LOADING:
			return {
				...state,
				loading: true,
			};

		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload),
			};

		case CLEAR_ITEMS:
			return {
				...state,
				items: [],
			};

		default:
			return state;
	}
};

export default itemReducer;
