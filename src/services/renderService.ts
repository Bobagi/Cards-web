import { card } from '../models/card'
import { attributes, attributeType } from '../models/attributes'
export class renderService {
  renderPlayerHand(
    playerHand: card[],
    playerDeck: card[],
    playerPlayCallback: (index: number, statType: attributes) => void
  ) {
    const playerHandContainer = document.getElementById('player-hand')!
    const playerDeckContainer = document.getElementById('playerDeckDiv')!

    playerHandContainer.innerHTML = ''

    // create cards
    playerHand.forEach((card, index) => {
      const cardDiv = document.createElement('div')
      cardDiv.className = 'card js-tilt'

      cardDiv.innerHTML = `
        <div class="card-content" style="background-image: url('${card.art}'); position: relative;">
          <div class="card-overlay" style="background-image: url('images/card_template.png');"></div>
          <div class="card-header" style="background: none !important"><span class="card-number" style="display: none !important">${card.name} #${card.number}</span></div>
          <div class="card-stats">
            <div class="stat-icon" data-stat="magic" data-stat-value="${card.magic}"></div>
            <div class="stat-icon" data-stat="strength" data-stat-value="${card.strength}"></div>
            <div class="stat-icon" data-stat="fire" data-stat-value="${card.fire}"></div>
          </div>
        </div>`

      const icons = cardDiv.querySelectorAll('.stat-icon')
      icons.forEach((icon) => {
        icon.addEventListener('click', (event) => {
          event.stopPropagation()

          const statType: attributeType = (icon as HTMLDivElement).getAttribute(
            'data-stat'
          ) as attributeType

          if (statType) {
            let iconAttribute: attributes = new attributes(statType)
            playerPlayCallback(index, iconAttribute)
          }
        })
      })

      this.animateCard(cardDiv, playerDeckContainer, playerHandContainer)
    })

    $('.js-tilt').tilt({
      scale: 1.2,
      maxTilt: 15,
      speed: 800,
      glare: true,
      maxGlare: 0.3,
    })
    this.renderDeck(playerDeck, 'playerDeckDiv')
  }

  renderOpponentHand(opponentHand: card[], opponentDeck: card[]) {
    const opponentHandContainer = document.getElementById('opponent-hand')!
    const opponentDeckContainer = document.getElementById('opponentDeckDiv')!

    opponentHandContainer.innerHTML = ''

    opponentHand.forEach(() => {
      const cardDiv = document.createElement('div')
      cardDiv.className = 'card'
      cardDiv.innerHTML = `<img src="images/card_back.png" alt="Card Back" class="card-art">`

      this.animateCard(cardDiv, opponentDeckContainer, opponentHandContainer)
    })

    this.renderDeck(opponentDeck, 'opponentDeckDiv')
  }

  animateCard(
    cardElement: HTMLElement,
    originContainer: HTMLElement,
    targetContainer: HTMLElement
  ) {
    const originRect = originContainer.getBoundingClientRect()
    cardElement.style.position = 'absolute'
    cardElement.style.left = `${originRect.left}px`
    cardElement.style.top = `${originRect.top}px`
    cardElement.style.opacity = '0'

    document.body.appendChild(cardElement)

    const handRect = targetContainer.getBoundingClientRect()
    setTimeout(() => {
      cardElement.style.transition = 'all 0.5s ease'
      cardElement.style.left = `${
        handRect.left + targetContainer.childElementCount * 120
      }px`
      cardElement.style.top = `${handRect.top}px`
      cardElement.style.opacity = '1'

      setTimeout(() => {
        cardElement.style.position = ''
        cardElement.style.left = ''
        cardElement.style.top = ''
        cardElement.style.transition = ''
        targetContainer.appendChild(cardElement)
        this.scrollBoard()
      }, 500)
    }, 10)
  }

  renderDeck(deck: card[], deckDivName: string) {
    const deckContainer = document.getElementById(deckDivName)!
    deckContainer.innerHTML = ''

    if (deck.length > 0) {
      const deckDiv = document.createElement('div')
      deckDiv.className = 'card'
      deckDiv.innerHTML = `
      <div class="card-content" style="background-image: url('images/card_back.png')">
        <div class="card-header"><span class="card-number">${deck.length}</span></div>
      </div>`

      deckContainer.appendChild(deckDiv)
    }
  }

  updateBoard(card: card, player: string) {
    const boardContainer = document.getElementById('game-board')!
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card js-tilt'
    cardDiv.innerHTML = `
      <div class="card-content" style="background-image: url('${card.art}'); position: relative;">
        <div class="card-overlay" style="background-image: url('images/card_template.png');"></div>
        <div class="card-header"><span class="card-number">${card.name} #${card.number}</span></div>
        <div class="card-stats">
          <div class="stat-icon" data-stat="magic" data-stat-value="${card.magic}"></div>
          <div class="stat-icon" data-stat="strength" data-stat-value="${card.strength}"></div>
          <div class="stat-icon" data-stat="fire" data-stat-value="${card.fire}"></div>
        </div>
      </div>`

    if (player != 'Player') {
      this.animateCard(
        cardDiv,
        document.getElementById('opponent-hand')!,
        boardContainer
      )
      const boardDivisor = document.createElement('div')
      boardDivisor.className = 'divider'
      boardDivisor.innerHTML = ''
      boardContainer.appendChild(boardDivisor)
    } else {
      this.animateCard(
        cardDiv,
        document.getElementById('player-hand')!,
        boardContainer
      )
    }

    this.scrollBoard()
  }

  scrollBoard() {
    const container = document.getElementById('fieldset-game-board')!
    container.scrollLeft = container.scrollWidth
  }
  showEndGameScreen(message: String) {
    alert(message)
  }
}
