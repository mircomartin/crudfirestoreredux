import Swal from 'sweetalert2';

import { types } from '../types/types';
import { db } from '../firebase/firebase-config';
import { startLoading, finishLoading } from './ui';
import { loadProductsAll } from '../helpers/loadProduct';

//Async Functions
export const startAddNewProduct = (product) => {
	return async (dispatch, getState) => {

		const { name: userName, uid } = getState().auth;
		const { name, price } = product;

		try {

			const newProduct = {
				name,
				price,
				user: {
					userName,
					uid,
				},
			};

			const doc = await db.collection('products').add(newProduct);
			dispatch(addNewProduct(doc.id, newProduct));
			Swal.fire('Exito', 'Su producto se cargo correctamente', 'success');

		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Ha habido un error probar nuevamente', 'error');
			dispatch(finishLoading());
		}
	};
};

export const startListProducts = () => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const products = await loadProductsAll();
			dispatch(listProducts(products));
			dispatch(finishLoading());
		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Ha habido un error', 'error');
			dispatch(finishLoading());
		}
	};
};

export const startActiveProduct = (id) => {
	return async (dispatch) => {
		dispatch(startLoading());
		try {
			const productQuery = db.collection('products').doc(id);
			const product = await productQuery.get();
			const active = product.data();

			dispatch(createActiveProduct(product.id, active));

			dispatch(finishLoading());

		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Ha habido un error', 'error');
			dispatch(finishLoading());
		}
	};
};

export const startDeleteProduct = (id) => {
	return async (dispatch) => {

		try {

			await db.doc(`products/${id}`).delete();
			dispatch(deleteProduct(id));

			Swal.fire('Success', 'Producto eliminado con exito', 'success');
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

export const startUpdateProduct = (product) => {
	return async (dispatch, getState) => {
		const { productActive } = getState().products
		const { id } = productActive
		try {

			const newProduct = {
				id,
				...product
			}

			await db.doc(`products/${id}`).update(newProduct);
			dispatch(updateProduct(newProduct));
			Swal.fire('Success', 'Producto editado con exito', 'success');
		} catch (error) {
			console.log(error);
			Swal.fire('Error', error.message, 'error');
		}
	};
};

//No AsyncFunctions
const addNewProduct = (id, product) => ({
	type: types.newProduct,
	payload: {
		id,
		product,
	},
});

const listProducts = (products) => ({
	type: types.listProducts,
	payload: products,
});

export const createActiveProduct = (id, product) => ({
	type: types.activeProduct,
	payload: {
		id,
		...product,
	},
});

const deleteProduct = (id) => ({
	type: types.deleteProduct,
	payload: id
	
});

const updateProduct = (product) => ({
	type: types.updatedProduct,
	payload: product
});