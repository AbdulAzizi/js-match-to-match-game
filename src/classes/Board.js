import Card from './Card.js';
import { shuffle, fetchImages } from '../helpers.js';

class Board {
	dimension;
	element;
	selectedPair;
	gameTheme;

	constructor({ dimension, gameTheme }) {
		this.dimension = dimension;
		this.gameTheme = gameTheme;
		this.selectedPair = [];
		this.initilize();
	}

	async initilize() {
		const images = await fetchImages(Math.round((this.dimension * this.dimension) / 2), this.gameTheme);

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
						card.flip();
						this.selectedPair.push(card);
						this.checkIfCardPairsMatch();
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

	checkIfCardPairsMatch() {
		if (this.selectedPair.length === 2 && this.selectedPair[0].image !== this.selectedPair[1].image) {
			setTimeout(() => {
				this.selectedPair[0].flip();
				this.selectedPair[1].flip();
				this.selectedPair = [];
			}, 400);
		}
		if (this.selectedPair.length === 2 && this.selectedPair[0].image === this.selectedPair[1].image) {
			this.selectedPair = [];
		}
	}
}

export default Board;
