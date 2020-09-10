import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import { LoginScreen } from '../components/auth/LoginScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'

export const AuthRoutes = () => {
    return (
        
        <div className="container mt-5">
            <Switch>

                <Route 
                    exact
                    path="/auth/login"
                    component={ LoginScreen }
                />

                <Route 
                    exact
                    path="/auth/register"
                    component={ RegisterScreen }
                />

                <Redirect to="/auth/login" />

            </Switch>
        </div>

    )
}
