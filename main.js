window.onload = function() {
	const score = document.querySelector('#score');
	const timer = document.querySelector('#time');
	const life = document.querySelector('#life');
	const notification = document.querySelector('#notification');
	const rgb = document.querySelector('#rgb');
	const colorBoxes = document.querySelector('.color_boxes');
	const boxes = document.querySelectorAll('.box');
	const gameOverBtn = document.querySelector('#gameover-btn');
	const modal = document.querySelector('.game-background');

	const box_1 = document.getElementById('box_1');

	let randomColors = [];
	let currentColor;
	let id;
	let span;
	let undefinedInterval;
	let timerInterval;
	let scoreTimeout;
	let gameScore = 0;
	let lifeRemaining = 3;

	makeRandomColors = () => {
		let r = Math.floor(Math.random() * 256);
		let g = Math.floor(Math.random() * 256);
		let b = Math.floor(Math.random() * 256);

		currentColor = `RGB(${r}, ${g}, ${b})`;
	};

	getRandomColors = () => {
		for (let i = 0; i < boxes.length; i++) {
			makeRandomColors();
			randomColors.push(currentColor);
		}
		console.log(randomColors);
	};

	displayRandomColor = () => {
		for (let j = 0; j < boxes.length; j++) {
			boxes[j].style.backgroundColor = randomColors[j];
			// boxes[j].innerText = randomColors[j];
		}

		rgb.innerText = randomColors[id];
		boxes[id].style.backgroundColor = randomColors[id];
		notification.innerText = `Inprogress ${id + 1}`;
	};

	for (let box of boxes) {
		box.addEventListener('click', (e) => {
			if (box.style.backgroundColor.toUpperCase() == randomColors[id] && randomColors.length != 0) {
				console.log(box.style.backgroundColor);
				notification.innerText = `Correct Guess!!`;
				rgb.style.backgroundColor = randomColors[id];
				gameScore += 2;

				scoreTimeout = setTimeout(() => {
					score.innerHTML = gameScore;
					newGuess();
				}, 1500);
			} else if (box.style.backgroundColor.toUpperCase() != randomColors[id] && randomColors.length != 0) {
				notification.innerText = `Wrong Guess!! try again..`;
				lifeRemaining--;
				life.innerText = lifeRemaining;
			}

			// console.log(box.style.backgroundColor, id);
		});
	}

	newGuess = () => {
		rgb.style.backgroundColor = 'black';
		id = Math.floor(Math.random() * boxes.length);
		randomColors = [];
		score.innerText = gameScore;

		getRandomColors();
		displayRandomColor();

		clearTimeout(scoreTimeout);
	};

	startGame = () => {
		clearInterval(undefinedInterval);
		clearInterval(timerInterval);
		gameScore = 0;
		lifeRemaining = 3;
		life.innerText = lifeRemaining;
		newGuess();
		countdown();

		if (document.getElementById('final-score').childElementCount != 0) {
			document.getElementById('final-score').removeChild(span);
		}
	};

	gameOver = () => {
		clearInterval(undefinedInterval);
		clearInterval(timerInterval);

		let item = `${gameScore}`;
		span = document.createElement('span');
		let text = document.createTextNode(item);
		span.appendChild(text);
		document.getElementById('final-score').appendChild(span);
		toggleModal();
		gameScore = 0;
		lifeRemaining = 3;
	};

	countdown = () => {
		let minute = 5;
		let sec = 59;

		timerInterval = setInterval(function() {
			timer.innerText = `${minute}:${sec} `;
			sec--;
			if (sec == 00 && minute != 0) {
				minute--;
				sec = 60;
				if (minute == 0) {
					sec = 60;
				}
			}

			if (timer.innerText == '0:0') {
				timer.innerText = `0:00`;
				clearInterval(timerInterval);
			}
		}, 1000);

		undefinedInterval = setInterval(function() {
			if (rgb.innerText == 'undefined') {
				newGuess();
			}
			if (timer.innerText == '0:00') {
				gameOver();
				console.log('timer done..');
			}

			if (lifeRemaining == 0) {
				gameOver();
			}

			// let newId = Math.floor(Math.random() * boxes.length);
			// console.log(newId);
		}, 1000);
	};

	toggleModal = () => {
		modal.classList.toggle('show-modal');
	};

	gameOverBtn.addEventListener('click', toggleModal);
	notification.addEventListener('click', startGame);
};

// add a gameOver Feature
// add a max attempt feature
//add life lines "eliminate two colors", 'suggest the corect color', 'change rgb background to the correct color'
//
