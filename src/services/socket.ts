// src/socket.ts
import { io, Socket } from 'socket.io-client'

const URL = 'https://democracy-ai.allur.co' // Replace with your backend URL if different

const socket: Socket = io(URL, {
  transports: ['websocket'],
  withCredentials: true, // Include credentials if your backend requires them
  // Add additional options if necessary
})

export default socket
