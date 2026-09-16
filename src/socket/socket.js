import { io } from 'socket.io-client'
import { BACKEND_BASE_URL } from '../api/api'
const socket = io(BACKEND_BASE_URL, {
    autoConnect: false
})
export default socket;