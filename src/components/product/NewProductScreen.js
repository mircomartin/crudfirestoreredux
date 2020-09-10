import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks/useForm'
import { showError, removeError } from '../../actions/ui'
import { startAddNewProduct } from '../../actions/products'
import { Spinner } from '../ui/Spinner'

export const NewProductScreen = ({history}) => {

    const dispatch = useDispatch();
    const {msgError, loading} = useSelector(state => state.ui)
    const [formValues, handleInputChange, reset] = useForm({
        name: '',
        price: 0,
    })

    const { name, price } = formValues

    const handleNewProduct = (e) => {
        e.preventDefault();

        if (name.trim() === '') {
            dispatch(showError('El nombre del producto es Obligatorio'))
            return false
        } else if (price.trim() <= 0) {
            dispatch(showError('El precio debe ser mayor a cero'))
            return false
        }

        dispatch(removeError())

        dispatch(startAddNewProduct(formValues))

        reset()

        setTimeout(() => {
            history.push("/");            
        }, 2000);
    }

    if (loading) return <Spinner/>

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">Agregar Nuevo Producto</h2>
                        <form onSubmit={handleNewProduct}>
                            {msgError && <p className="alert alert-danger">{msgError}</p>}
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="name"
                                value={name}
                                onChange={handleInputChange}/>
                            </div>
                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input type="number"
                                className="form-control"
                                placeholder="Precio Producto"
                                name="price"
                                value={price}
                                onChange={handleInputChange}/>
                            </div>
                            <button className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            type="submit">
                                Agregar Producto
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
