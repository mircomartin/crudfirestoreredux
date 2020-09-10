import { types } from '../types/types';

export const showError = (msgError) => ({
    type: types.showError,
    payload: msgError
})

export const removeError = () => ({
    type: types.removeError,
})

export const startLoading = () => ({
    type: types.startLoading,
})

export const finishLoading = () => ({
    type: types.finishLoading,
})
