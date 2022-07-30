const score = document.querySelector('#score');
const timer = document.querySelector('#time');
const notification = document.querySelector('#notification');
const rgb = document.querySelector('#rgb');
const colorBoxes = document.querySelector('.color_boxes');
const gameOverBtn = document.querySelector('#gameover-btn');
const boxes = document.querySelectorAll('.box');

const box_1 = document.getElementById('box_1');

//Modal
const modal = document.querySelector('.modal');
const trigger = document.querySelector('.trigger');
const closeButton = document.querySelector('.close-button');

let randomColors = [];
let currentColor;
let id;
let undefinedInterval;
let scoreTimeout;
let gameScore = 0;
let gameOverContent = ``;

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
		if (box.style.backgroundColor.toUpperCase() == randomColors[id]) {
			console.log(box.style.backgroundColor);
			notification.innerText = `Correct Guess!!`;
			rgb.style.backgroundColor = randomColors[id];
			gameScore += 2;

			scoreTimeout = setTimeout(() => {
				score.innerHTML = gameScore;
				newGuess();
			}, 1500);
		} else if (box.style.backgroundColor.toUpperCase() != randomColors[id]) {
			notification.innerText = `Wrong Guess!! try again..`;
		}
		// console.log(box.style.backgroundColor, id);
	});
}

newGuess = () => {
	rgb.style.backgroundColor = 'black';
	id = Math.floor(Math.random() * boxes.length + 1);
	randomColors = [];
	score.innerText = gameScore;
	getRandomColors();
	displayRandomColor();

	clearTimeout(scoreTimeout);
};

gameOver = () => {
	clearInterval(undefinedInterval);
	gameOverContent = `
	<div class="game-over">
		<div class="gameover-text">
			<h2>Your Total score</h2>
			<span>${gameScore}</span>
		</div>
		<div class="gameover-btn">
			<button id="gameover-btn">Start</button>

		</div>
	</div>`;
	colorBoxes.innerHTML = gameOverContent;
	// toggleModal();
};

countdown = () => {
	let minute = 0;
	let sec = 10;
	let timerInterval;
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

	// Reloads app if guess color shows undefines due to unloaded style property

	undefinedInterval = setInterval(function() {
		if (rgb.innerText == 'undefined') {
			newGuess();
		}
		if (timer.innerText == '0:00') {
			gameOver();
			console.log('timer done..');
		}
	}, 1000);
};

window.onload = function() {
	newGuess();
	countdown();

	// console.log(boxes[id].style.backgroundColor, randomColors[id]);
};

// add a gameOver Feature
// add a max attempt feature
//add life lines "eliminate two colors", 'suggest the corect color', 'change rgb background to the correct color'
//
