export const shuffle = items => {
	const shuffledArray = [...items];
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
	}
	return shuffledArray;
};

export async function fetchImages(amount, theme) {
	const response = await fetch(
		`https://api.unsplash.com/search/photos?page=1&per_page=${amount}&query=${theme}&client_id=TCMqimfUi8HL3q-Eb4VUKTzXr7ZFjiAtfZcYwCvd3Qw`
	);
	const images = await response.json();

	return images.results;
}

export const createElement = (parentQuery, child) => {
	const root = document.querySelector(parentQuery);
	root.innerHTML = child;
};
