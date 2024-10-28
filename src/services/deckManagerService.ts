import { card } from '../models/card'

export class deckManagerService {
  private deck: card[] = []

  createDeck(): card[] {
    this.deck = [
      {
        number: 1,
        strength: 10,
        magic: 5,
        fire: 3,
        art: '../images/1.png',
        name: 'Dragão Mestre',
      },
      {
        number: 2,
        strength: 6,
        magic: 8,
        fire: 2,
        art: '../images/2.png',
        name: 'Dragão Dourado',
      },
      {
        number: 3,
        strength: 10,
        magic: 5,
        fire: 3,
        art: '../images/3.png',
        name: 'Dragão Prateado',
      },
      {
        number: 4,
        strength: 6,
        magic: 8,
        fire: 2,
        art: '../images/4.png',
        name: 'Dragão Cobre',
      },
      {
        number: 5,
        strength: 10,
        magic: 5,
        fire: 3,
        art: '../images/1.png',
        name: 'Dragão Mestre 2',
      },
      {
        number: 6,
        strength: 6,
        magic: 8,
        fire: 2,
        art: '../images/2.png',
        name: 'Dragão Dourado 2',
      },
      {
        number: 7,
        strength: 10,
        magic: 5,
        fire: 3,
        art: '../images/3.png',
        name: 'Dragão Prateado 2',
      },
      {
        number: 8,
        strength: 6,
        magic: 8,
        fire: 2,
        art: '../images/4.png',
        name: 'Dragão Cobre 2',
      },
      // Continue adicionando cartas...
    ]
    return this.deck
  }

  shuffleDeck(deck: card[]): card[] {
    return deck.sort(() => Math.random() - 0.5)
  }
}
