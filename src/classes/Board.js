import Card from './Card.js';
import render from '../render.js';
import { shuffle } from '../helpers.js';

class Board {
	dimension;
	constructor({ dimension }) {
		this.dimension = dimension;
	}

	async initilize() {
		const images = await this.fetchImages((this.dimension * this.dimension) / 2, 'flowers');
		const cards = [];

		let i = 0;
		for (let row = 0; row < this.dimension; row++) {
			for (let column = 0; column < this.dimension; column++) {
				cards.push(new Card({ image: images[Math.trunc(i / 2)]?.urls?.thumb }));
				i++;
			}
		}
		let html = `<div class="container"><div style="grid-template-columns: repeat(${this.dimension}, 100px); grid-template-rows: repeat(${this.dimension}, 100px)" class="board">`;

		const shuffledCards = shuffle(cards);

		shuffledCards.forEach(card => {
			html += card.html();
		});

		html += '</div></div>';

		render(html);
	}

	async fetchImages(amount, theme) {
		const response = await fetch(
			`https://api.unsplash.com/search/photos?page=1&per_page=${amount}&query=${theme}&client_id=TCMqimfUi8HL3q-Eb4VUKTzXr7ZFjiAtfZcYwCvd3Qw`
		);
		const images = await response.json();

		return images.results;
	}
}

export default Board;
