import { types } from '../types/types';

const initialState = {
	products: [],
	productActive: {},
};

export const productsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.newProduct:
			return {
				...state,
				products: [...state.products, action.payload],
			};
		case types.listProducts:
			return {
				...state,
				products: action.payload,
				productActive: {},
			};
		case types.activeProduct:
			return {
				...state,
				productActive: action.payload,
			};
		case types.deleteProduct:
			return {
				...state,
				products: state.products.filter(
					(product) => product.id !== action.payload,
				),
			};
		case types.updatedProduct:
			return {
				...state,
                productActive: {},
				products: state.products.map((product) =>
					product.id === action.payload.id ? action.payload : product,
				),
			};
		default:
			return state;
	}
};
