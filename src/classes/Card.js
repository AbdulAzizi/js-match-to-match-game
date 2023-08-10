class Card {
	image;
	isFlipped = false;
	element;

	constructor({ image }) {
		this.image = image;
		this.initializeElement();
	}

	initializeElement() {
		this.element = document.createElement('div');
		this.element.className = 'card';

		this.element.innerHTML = `
			<div class="face front"></div>
			<div class="face back">
				<img src="${this.image}" />
			</div>
			<div class="face right"></div>
			<div class="face left"></div>
			<div class="face top"></div>
			<div class="face bottom"></div>
		`;
	}

	flip() {
		// flit the card
	}
}
export default Card;
