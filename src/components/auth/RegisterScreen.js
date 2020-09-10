import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';
import { startRegisterUser } from '../../actions/auth';
import { showError, removeError } from '../../actions/ui';

export const RegisterScreen = () => {
    const {msgError} = useSelector(state => state.ui)
    const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		name: 'Mirco',
		email: 'mirco@carlos.com',
		password: '123456',
		password2: '123456',
	});

	const { name, email, password, password2 } = formValues;

	const handleRegister = (e) => {
        e.preventDefault();
        
        if (isFormValid()) {

            dispatch(startRegisterUser(name, email, password))

        }

    };
    
    const isFormValid = () => {
        if(name.trim() === '') {
            dispatch(showError('Es obligatorio'))
            return false 
        }else if(!validator.isEmail(email)) {
            dispatch(showError('Verifica que el mail ingresado sea correcto'))
            return false
        }else if(password !== password2 || password < 6) {
            dispatch(showError('Los password no coinciden o son menor a seis caracteres'))
            return false
        }

        dispatch(removeError())
        return true
    }

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							Nueva Cuenta
						</h2>
						<form onSubmit={handleRegister}>
                            {msgError && <p className="alert alert-danger">{msgError}</p>}
							<div className="form-group">
								<label>Nombre: </label>
								<input
									type="text"
									className="form-control"
									placeholder="Ingresa tu Nombre..."
									name="name"
									value={name}
									onChange={handleInputChange}
								/>
							</div>
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
							<div className="form-group">
								<label>Repeti tu Password:</label>
								<input
									type="password"
									className="form-control"
									placeholder="Ingresa nuevamente tu Contraseña..."
									name="password2"
									value={password2}
									onChange={handleInputChange}
								/>
							</div>
							<button
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
								type="submit"
							>
								Crear Cuenta
							</button>
						</form>
						<Link to="/auth/login" className="mt-3 d-block">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
