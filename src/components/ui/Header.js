import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

import { startLogout } from '../../actions/auth'

export const Header = () => {
    const dispatch = useDispatch();
    const { name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(startLogout())
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
            <div className="container">
                <div className="row justify-content-between align-items-center w-100">
                    <h1 className="col-auto"><Link to="/" className="text-danger">Crud - React - Redux - Firebase</Link> </h1>
                    <div className="col-auto">
                        <p className="text-dark">Hola: <span className="font-weight-bold">{name}</span></p>
                        <button onClick={handleLogout} className="text-primary">Cerrar Sesion</button>
                    </div>
                    <div className="col-auto">
                        <NavLink 
                            className="btn btn-danger nuevo-post d-block d-md-inline-block"
                            exact to="/product/newproduct">Agregar Producto &#43;
                        </NavLink>
                    </div>
                </div>  
            </div>
        </nav>
    )
}
