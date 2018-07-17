import Card from '../interfaces/Card';
import { shuffle } from 'lodash';

export default class Dictionary {
  cards: Card[];
  portionSize: number = 3;
  positionInPortion: number = 0;
  currentPortion: Card[] = [];
  currentCard: Card;

  constructor(deck: Card[]) {
    this.cards = deck.map((card: Card) => ({ ...card, guessed: false }));

    if (this.cards.length) {
      this.currentCard = this.cards[0];
    } else {
      this.currentCard = { word: '', translation: '' };
    }

    this.currentPortion = this.getNewPortion();
  }

  getNextCard() {
    this.positionInPortion++;

    if (this.positionInPortion >= this.portionSize) {
      this.positionInPortion = 0;

      this.currentPortion.forEach(asked => this.cards = this.cards
        .map(word => word.word === asked.word ? asked : word));


      this.currentPortion = this.getNewPortion();
    }

    this.currentCard = this.currentPortion[this.positionInPortion];
  }

  setGuessed() {
    this.currentCard.guessed = true;
  }

  setUnguessed() {
    this.currentCard.guessed = false;
  }

  private getNewPortion() {
    let additional: Card[] = [];
    const notGuessed: Card[] = shuffle(this.cards.filter(word => !word.guessed))
      .slice(0, this.portionSize);

    if (notGuessed.length < this.portionSize) {
      additional = shuffle(this.cards.filter(word => word.guessed))
        .slice(0, this.portionSize - notGuessed.length);
    }

    return shuffle([...notGuessed, ...additional]);
  }
}

