import Card from './Card.js';
import { shuffle, fetchImages } from '../helpers.js';

class Board {
	dimension;
	element;
	constructor({ dimension }) {
		this.dimension = dimension;
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
				cards.push(new Card({ image: images[Math.trunc(i / 2)]?.urls?.thumb }));
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
