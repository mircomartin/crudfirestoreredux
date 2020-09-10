import React from 'react'
import { Header } from '../components/ui/Header'
import { Switch, Route } from 'react-router-dom'

import { NewProductScreen } from '../components/product/NewProductScreen'
import { ProductsList } from '../components/product/ProductsList'
import { EditScreen } from '../components/product/EditScreen'

export const DashboardRoutes = () => {
    return (
        <>
           <Header/>
           <div className="container mt-5">
                <Switch>
                    <Route exact path="/product/newproduct" component={NewProductScreen}/>
                    <Route exact path="/" component={ProductsList}/>
                    <Route exact path="/product/edit/:id" component={EditScreen}/>

                </Switch>
           </div>
        </>
    )
}
