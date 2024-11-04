import express from 'express'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'
import path from 'path'
import { Game } from './gameLogic'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })

app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

const gameInstance = new Game()

io.on('connection', (socket: Socket) => {
  console.log('New connection:', socket.id)

  socket.emit('connected', {
    action: 'connected',
    message: 'Connection established',
  })

  socket.on('startTurn', () => {
    console.log('Starting turn on server')
    const gameState = gameInstance.startTurn()
    console.log('Sending update to client:', {
      action: 'update',
      state: gameState,
    })
    socket.emit('update', { action: 'update', state: gameState })
  })

  socket.on('selectCard', (data: { index: number }) => {
    const { index } = data
    console.log(`Card selected on server: ${index}`)
    const gameState = gameInstance.selectCard(index)
    console.log('Sending update to client:', {
      action: 'update',
      state: gameState,
    })
    socket.emit('update', { action: 'update', state: gameState })
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

const PORT = process.env.PORT || 3050
httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on http://localhost:${PORT}`)
})
