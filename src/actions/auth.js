import { types } from './../types/types'
import { firebase } from '../firebase/firebase-config'
import Swal from 'sweetalert2'


//Async Functions

export const startRegisterUser = (name, email, password) => {
    return async (dispatch) => {

        try {
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, password)

            const { user } = resp;

			await user.updateProfile({ displayName: name });
            dispatch(login(user.uid, user.displayName))
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error', error.message, 'error')
        }
    }
}

export const startLoginEmailPassowrd = (email, password) => {
    return async (dispatch) => {

        try {
            const resp = await firebase.auth().signInWithEmailAndPassword(email, password)

            const { user } = resp;

            dispatch(login(user.uid, user.displayName))
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error', error.message, 'error')
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {

        try {
            
            await firebase.auth().signOut();

            dispatch(logout())
            
        } catch (error) {
            console.log(error)
            Swal.fire('Error', error.message, 'error')
        }
    }
}

//No async
export const login = (uid, name) => ({
    type: types.login,
    payload: {
        uid,
        name
    }
})

export const logout = () => ({
    type: types.logout,
})