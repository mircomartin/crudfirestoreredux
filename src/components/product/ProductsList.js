import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startListProducts } from '../../actions/products';
import { Spinner } from '../ui/Spinner';
import { ProductScreen } from './ProductScreen';

export const ProductsList = () => {
	const { products } = useSelector((state) => state.products);
	const { loading } = useSelector((state) => state.ui);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startListProducts());
	}, [dispatch]);

	if (loading) return <Spinner />;

	return (
		<>
			{products.length === 0 ? (
				<h2 className="text-center my-5">No hay productos cargados</h2>
			) : (
				<>
					<h2 className="text-center my-5">Listado de Productos</h2>

					<table className="table table-striped">
						<thead className="bg-primary table-dark">
							<tr>
								<th scope="col">Nombre:</th>
								<th scope="col">Precio:</th>
								<th scope="col">Acciones:</th>
							</tr>
						</thead>
						<tbody>
							{products.length === 0 ? (
								<tr>
									<td>No hay productos</td>
								</tr>
							) : (
								products.map((product) => (
									<ProductScreen key={product.id} product={product} />
								))
							)}
						</tbody>
					</table>
				</>
			)}
		</>
	);
};
