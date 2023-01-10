import { useDispatch } from 'react-redux'
import { displayNotification } from '../store/notificationSlice'

const success = (message: string) => {
    const dispatch = useDispatch()
    dispatch(displayNotification({
        id: Math.floor((Math.random() * 101) + 1),
        message,
        autoHideDuration: 5000,
        type: 'success',
        direction: 'fadeLeft',
        position: 'topRight'
    }))
}

const error = (message: string) => {
    const dispatch = useDispatch()
    dispatch(displayNotification({
        id: Math.floor((Math.random() * 101) + 1),
        message,
        autoHideDuration: 5000,
        type: 'success',
        direction: 'fadeLeft',
        position: 'topRight'
    }))
}

const info = (message: string) => {
    const dispatch = useDispatch()
    dispatch(displayNotification({
        id: Math.floor((Math.random() * 101) + 1),
        message,
        autoHideDuration: 5000,
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