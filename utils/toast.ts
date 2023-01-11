import { useDispatch } from 'react-redux'
import { displayNotification } from '../store/notificationSlice'

const success = (message: string, dispatch: any) => {
    dispatch(displayNotification({
        id: Math.floor((Math.random() * 101) + 1),
        message,
        autoHideDuration: 3000,
        type: 'success',
        direction: 'fadeLeft',
        position: 'topRight'
    }))
}

const error = (message: string, dispatch: any) => {
    dispatch(displayNotification({
        id: Math.floor((Math.random() * 101) + 1),
        message,
        autoHideDuration: 3000,
        type: 'error',
        direction: 'fadeLeft',
        position: 'topRight'
    }))
}

const info = (message: string, dispatch: any) => {
    dispatch(displayNotification({
        id: Math.floor((Math.random() * 101) + 1),
        message,
        autoHideDuration: 3000,
        type: 'info',
        direction: 'fadeLeft',
        position: 'topRight'
    }))
}

const toast = {
    success,
    error,
    info
}

export default toast;