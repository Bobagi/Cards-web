import { card } from './models/card'
import { attributes } from './models/attributes'
import { renderService } from './services/renderService'
import { deckManagerService } from './services/deckManagerService'
import { rules } from './rules'

export class game {
  private playerDeck: card[] = []
  private opponentDeck: card[] = []
  private playerSelectedCard: card | null = null
  private opponentSelectedCard: card | null = null
  private playerHand: card[] = []
  private opponentHand: card[] = []
  private deckService = new deckManagerService()
  private renderService = new renderService()

  constructor() {
    this.playerDeck = this.deckService.createDeck()
    this.playerDeck = this.deckService.shuffleDeck(this.playerDeck)

    this.opponentDeck = this.deckService.createDeck()
    this.opponentDeck = this.deckService.shuffleDeck(this.opponentDeck)

    this.startTurn()
  }

  startTurn() {
    if (this.playerDeck.length > 0) {
      this.dealcards(this.playerDeck, this.playerHand, 1)
      console.log(this.playerDeck)
    } else {
      this.checkGameOver()
    }

    if (this.opponentDeck.length > 0) {
      this.dealcards(this.opponentDeck, this.opponentHand, 1)
    } else {
      this.checkGameOver()
    }

    this.renderService.clearBoard()
    this.callRenderHandsMethod()
  }

  callRenderHandsMethod(whoDrawCards: string = 'Both') {
    if (whoDrawCards !== 'Opponent') {
      this.renderService.renderPlayerHand(
        this.playerHand,
        this.playerDeck,
        (index) => this.selectCard(index)
      )
    }
    if (whoDrawCards !== 'Player') {
      this.renderService.renderOpponentHand(
        this.opponentHand,
        this.opponentDeck
      )
    }
  }

  checkGameOver(): boolean {
    const result = rules.checkGameOver(this.playerDeck, this.opponentDeck)
    if (result) {
      this.renderService.showEndGameScreen(
        result === 'Player' ? 'You won the game!' : 'You lose the game!'
      )
      return true
    }
    return false
  }

  dealcards(deck: card[], hand: card[], numberOfCardsToDraw: number) {
    hand.splice(0, hand.length, ...deck.splice(0, numberOfCardsToDraw))
  }

  selectCard(cardIndex: number) {
    this.playerSelectedCard = this.playerHand.splice(cardIndex, 1)[0]

    this.renderService.updateBoard(
      this.playerSelectedCard,
      'Player',
      (statType) => this.selectAbility(statType)
    )

    this.opponentSelectedCard = this.opponentPlay()
  }

  selectAbility(statType: attributes) {
    if (!this.playerSelectedCard || !this.opponentSelectedCard) {
      alert('FATAL ERROR!')
      return
    } else {
      const result = rules.compareCards(
        this.playerSelectedCard,
        this.opponentSelectedCard,
        statType
      )
      rules.handleRoundOutcome(
        result,
        this.playerSelectedCard,
        this.opponentSelectedCard,
        this.playerDeck,
        this.opponentDeck
      )
      this.checkGameOver()
      this.startTurn()
    }
  }

  opponentPlay(): card | null {
    const card = this.opponentHand.pop()
    if (card) {
      this.renderService.updateBoard(card, 'Opponent', () => null)
      return card
    }
    this.checkGameOver()
    return null
  }
}
