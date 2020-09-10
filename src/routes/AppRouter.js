import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";

import { firebase } from './../firebase/firebase-config';
import { AuthRoutes } from './AuthRoutes';
import { DashboardRoutes } from './DashboardRoutes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { login } from '../actions/auth';
import { Spinner } from '../components/ui/Spinner';

export const AppRouter = () => {

    const dispatch = useDispatch();
    
	const [checking, setChecking] = useState(true);
	const [isloggedin, setIsloggedin] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged( (user) => {
			if (user?.uid) {
				dispatch(login(user.uid, user.displayName));
				setIsloggedin(true);
			} else {
				setIsloggedin(false);
			}
			setChecking(false);
		});
	}, [dispatch, setChecking, setIsloggedin]);

	if (checking) {
		return <Spinner/>;
	}

    return (
        <Router>
            <Switch>
                <PublicRoute
                    isAuthenticated={isloggedin}
                    component={AuthRoutes}
                    path="/auth"
                />
                <PrivateRoute
                    isAuthenticated={isloggedin}
                    component={DashboardRoutes}
                    path="/"
                />
                <Redirect exact to="/auth/login"/>
            </Switch>
        </Router>
    )
}
