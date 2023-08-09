class Card {
	image;
	isFlipped = false;

	constructor({ image }) {
		this.image = image;
	}

	flip() {
		// flit the card
	}

	html() {
		return `<div class="card">
					<div class="face front">
						<img src="${this.image}" />
					</div>
					<div class="face back"></div>
					<div class="face right"></div>
					<div class="face left"></div>
					<div class="face top"></div>
					<div class="face bottom"></div>
				</div>`;
	}
}
export default Card;
