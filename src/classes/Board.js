import Card from './Card.js';
import render from '../render.js';

class Board {
	dimension;
	constructor({ dimension }) {
		this.dimension = dimension;
	}

	initilize() {
		let html = '<div class="board">';
		for (let row = 0; row < this.dimension; row++) {
			for (let column = 0; column < this.dimension; column++) {
				const card = new Card({ image: 'image.jpg' });
				html += card.html;
			}
		}
		html += '</div>';
		render(html);
	}
}

export default Board;
