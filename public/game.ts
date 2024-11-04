import { io, Socket } from 'socket.io-client'

class GameClient {
  private socket: Socket
  private playerHand: any[] = []
  private opponentHand: any[] = []

  constructor() {
    this.socket = io('http://localhost:3050') // Conecta ao servidor Socket.IO

    // Evento de conexão inicial
    this.socket.on('connected', (data) => {
      console.log(data.message) // Exibe a mensagem de conexão
    })

    // Recebe atualizações de estado do servidor
    this.socket.on('update', (data) => {
      console.log('Game state updated:', data.state)
      this.updateGameState(data.state)
    })

    // Recebe mensagem de fim de jogo
    this.socket.on('gameOver', (data) => {
      console.log(data.message) // Exibe mensagem de vitória ou derrota
      this.handleGameOver(data.message)
    })
  }

  // Método para iniciar a vez do jogador
  startTurn() {
    console.log('Sending startTurn to server')
    this.socket.emit('startTurn') // Envia o evento 'startTurn' para o servidor
  }

  // Método para selecionar uma carta
  selectCard(index: number) {
    console.log(`Sending selectCard with index: ${index}`)
    this.socket.emit('selectCard', { index }) // Envia o evento 'selectCard' com o índice da carta
  }

  // Atualiza o estado do jogo no cliente
  updateGameState(state: any) {
    this.playerHand = state.playerHand
    this.opponentHand = state.opponentHand
    // Atualize a interface de usuário aqui com o novo estado
  }

  // Manipula o fim do jogo
  handleGameOver(message: string) {
    console.log('Game Over:', message)
    // Aqui você pode exibir uma mensagem de fim de jogo na interface do usuário
  }
}

// Instancia o cliente do jogo
const gameClient = new GameClient()

// Exemplo de uso: iniciar a vez e selecionar uma carta
// Chame esses métodos a partir da interface do usuário quando necessário
gameClient.startTurn()
gameClient.selectCard(0)
