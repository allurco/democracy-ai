// src/socket.ts
import { io, Socket } from 'socket.io-client'

const URL = import.meta.env.VITE_SERVICE_URL

const socket: Socket = io(URL, {
  transports: ['websocket'],
  withCredentials: true, // Include credentials if your backend requires them
  // Add additional options if necessary
})

export default socket
