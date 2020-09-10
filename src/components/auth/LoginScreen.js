import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { startLoginEmailPassowrd } from '../../actions/auth';

export const LoginScreen = () => {
	const dispatch = useDispatch()
	
	const [formValues, handleInputChange] = useForm({
		email: 'mirco@carlos.com',
		password: '123456',
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();

		dispatch(startLoginEmailPassowrd(email, password))

	};

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Iniciar Sesion
						</h2>
						<form onSubmit={handleLogin}>
							<div className="form-group">
								<label>Email: </label>
								<input
									type="text"
									className="form-control"
									placeholder="Ingresa Email..."
									name="email"
									value={email}
									onChange={handleInputChange}
								/>
							</div>
							<div className="form-group">
								<label>Password:</label>
								<input
									type="password"
									className="form-control"
									placeholder="Ingresa Contraseña..."
									name="password"
									value={password}
									onChange={handleInputChange}
								/>
							</div>
							<button
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
								type="submit"
							>
								Iniciar Sesion
							</button>
						</form>
						<Link to="/auth/register" className="mt-3 d-block">
							Crear Cuenta
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
