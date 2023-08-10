import Card from './Card.js';
import { shuffle, fetchImages } from '../helpers.js';

class Board {
	dimension;
	element;
	selectedPair;

	constructor({ dimension }) {
		this.dimension = dimension;
		this.selectedPair = [];
	}

	async initilize() {
		const images = await fetchImages((this.dimension * this.dimension) / 2, 'flowers');

		const container = document.createElement('div');
		container.className = 'container';

		this.initilizeElement();

		container.appendChild(this.element);

		const cards = [];
		let i = 0;
		for (let row = 0; row < this.dimension; row++) {
			for (let column = 0; column < this.dimension; column++) {
				const card = new Card({
					image: images[Math.trunc(i / 2)]?.urls?.thumb
				});
				card.element.addEventListener('click', event => {
					if (!card.isFlipped && this.selectedPair.length < 2) {
						card.isFlipped = !card.isFlipped;
						if (card.isFlipped) event.currentTarget.classList.add('flipped');
						else event.currentTarget.classList.remove('flipped');
						this.selectedPair.push(card);
						if (this.selectedPair.length === 2 && this.selectedPair[0].image !== this.selectedPair[1].image) {
							setTimeout(() => {
								this.selectedPair[0].element.classList.remove('flipped');
								this.selectedPair[0].isFlipped = false;
								this.selectedPair[1].element.classList.remove('flipped');
								this.selectedPair[1].isFlipped = false;
								this.selectedPair = [];
							}, 500);
						}
						if (this.selectedPair.length === 2 && this.selectedPair[0].image === this.selectedPair[1].image) {
							this.selectedPair = [];
						}
					}
				});

				cards.push(card);
				i++;
			}
		}
		const shuffledCards = shuffle(cards);
		shuffledCards.forEach(card => {
			this.element.appendChild(card.element);
		});

		const root = document.getElementById('root');
		root.appendChild(container);
	}

	initilizeElement() {
		this.element = document.createElement('div');
		this.element.style = `grid-template-columns: repeat(${this.dimension}, 100px); grid-template-rows: repeat(${this.dimension}, 100px)`;
		this.element.className = 'board';
	}
}

export default Board;
