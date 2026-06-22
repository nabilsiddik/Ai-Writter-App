import {io} from 'socket.io-client'

export function connectWS() {
    return io('http://localhost:5000', {
        withCredentials: true,
        transports: ['polling', 'websocket']
    })
}