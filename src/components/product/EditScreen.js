import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startActiveProduct, startUpdateProduct } from '../../actions/products';
import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { Spinner } from '../ui/Spinner';

export const EditScreen = ({history}) => {
	const dispatch = useDispatch();

	const { loading } = useSelector((state) => state.ui);
	const { productActive } = useSelector((state) => state.products);

	const { id } = useParams();

	const [formValues, handleInputChange, reset] = useForm(productActive);
	const { price, name } = formValues;

	useEffect(() => {
		dispatch(startActiveProduct(id));
	}, [dispatch, id]);

	const activeId = useRef(productActive.id);

	useEffect(() => {
		if (productActive.id !== activeId.current) {
			reset(productActive);
			activeId.current = productActive.id;
		}
	}, [productActive, reset]);

	const handleUpdated = (e) => {
		e.preventDefault()

		dispatch(startUpdateProduct({name, price}))

		history.push('/')
	}

	if (loading) return <Spinner/>
	
	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Editar Producto
						</h2>
						<form onSubmit={handleUpdated}>
							<div className="form-group">
								<label>Nombre Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="name"
									onChange={handleInputChange}
									value={name || ''}
								/>
							</div>
							<div className="form-group">
								<label>Precio Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="price"
									onChange={handleInputChange}
									value={price || ''}
								/>
							</div>
							<button
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
								type="submit"
							>
								Guardar Cambios
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
