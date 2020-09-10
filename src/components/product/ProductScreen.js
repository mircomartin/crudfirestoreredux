import React from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { startDeleteProduct } from '../../actions/products';

export const ProductScreen = ({ product }) => {
	const { id, name, price } = product;
    const dispatch = useDispatch()

    const history = useHistory()

    const handleEdit = () => {
		history.push(`/product/edit/${id}`)
    }

    const handleDelete = () => {
		dispatch(startDeleteProduct(id))
		history.push('/')
    }

	return (
		<tr>
			<td>{name}</td>
			<td>
				<span className="font-weight-bold">$ {price}</span>
			</td>
			<td className="acciones">
				<button onClick={handleEdit} className="btn btn-primary mr-2">Editar</button>
				<button type="button" onClick={handleDelete} className="btn btn-danger">
					Eliminar
				</button>
			</td>
		</tr>
	);
};
