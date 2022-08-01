window.onload = function() {
	const score = document.querySelector('#score');
	const timer = document.querySelector('#time');
	const life = document.querySelector('#life');
	const notification = document.querySelector('#notification');
	const rgb = document.querySelector('#rgb');
	const flexBoxes = document.querySelectorAll('.flex-item');
	const boxes = document.querySelectorAll('.box');
	const gameOverBtn = document.querySelector('#gameover-btn');
	const easyBtn = document.querySelector('#easy');
	const mediumBtn = document.querySelector('#medium');
	const hardBtn = document.querySelector('#hard');
	const modal = document.querySelector('.game-background');

	const half = document.querySelector('#half');
	const extraLife = document.getElementById('extra-life');
	const skip = document.getElementById('skip');

	const box_1 = document.getElementById('box_1');

	let randomColors = [];
	let currentColor;
	let id;
	let span;
	let undefinedInterval;
	let timerInterval;
	let scoreTimeout;
	let gameScore = 0;
	let lifeRemaining = 6;
	let islevel = 'easy';
	let easyDiv = 6;
	let mediumDiv = 9;

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
		if (islevel == 'easy') {
			id = Math.floor(Math.random() * easyDiv);
			console.log(id);
		} else if (islevel == 'medium') {
			id = Math.floor(Math.random() * mediumDiv);
		} else if (islevel == 'hard') {
			id = Math.floor(Math.random() * boxes.length);
		}

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
		if (islevel == 'easy') {
			lifeRemaining = 6;
		} else if (islevel == 'medium') {
			lifeRemaining = 4;
		} else if (islevel == 'hard') {
			lifeRemaining = 3;
		}
		life.innerText = lifeRemaining;
		newGuess();
		countdown();
		resetHelpers();

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
		// lifeRemaining = 3;
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

	ChangeLevel = () => {
		// if (islevel == 'easy') {
		// 	for (let i = boxes.length - 1; i >= 6; i--) {
		// 		console.log(arr[i]);
		// 	}
		// }
	};

	removeHalf = () => {
		if (randomColors.length != 0) {
			if (islevel == 'easy') {
				let easyHalf = [];
				let easyid;
				for (let i = 0; i < easyDiv; i++) {
					easyid = Math.floor(Math.random() * easyDiv);
					console.log(randomColors[easyid]);
				}
			}

			// else if (islevel == 'medium') {
			// 	id = Math.floor(Math.random() * mediumDiv);
			// } else if (islevel == 'hard') {
			// 	id = Math.floor(Math.random() * boxes.length);
			// }

			console.log('half click and removed');
			half.classList.add('clicked');
			half.onclick = '';
		}
	};

	getLife = () => {
		if (randomColors.length != 0) {
			lifeRemaining += 4;
			life.innerText = lifeRemaining;
			// console.log('life click and removed');
			extraLife.classList.add('clicked');
			extraLife.onclick = '';
		}
	};

	skipGuess = () => {
		if (randomColors.length != 0) {
			newGuess();
			// console.log('skip click and removed');
			skip.classList.add('clicked');
			skip.onclick = '';
		}
	};

	resetHelpers = () => {
		half.classList.remove('clicked');
		half.onclick = removeHalf;
		extraLife.classList.remove('clicked');
		extraLife.onclick = getLife;
		skip.classList.remove('clicked');
		skip.onclick = skipGuess;
	};

	easyBtn.addEventListener('click', (e) => {
		islevel = 'easy';
		easyBtn.classList.add('selected');
		mediumBtn.classList.remove('selected');
		hardBtn.classList.remove('selected');
		for (let box of boxes) {
			box.classList.remove('hide_box');
			box.style.height = '30%';
			box.style.width = '30%';
		}

		for (let i = boxes.length - 1; i >= easyDiv; i--) {
			boxes[i].classList.add('hide_box');
		}
		// for (let div of levelDivs) {
		// 	div.classList.add('hide_box');
		// }

		startGame();
	});

	mediumBtn.addEventListener('click', (e) => {
		islevel = 'medium';
		mediumBtn.classList.add('selected');
		easyBtn.classList.remove('selected');
		hardBtn.classList.remove('selected');
		for (let box of flexBoxes) {
			box.classList.remove('hide_box');
			box.style.height = '30%';
			box.style.width = '30%';
		}
		for (let i = boxes.length - 1; i >= mediumDiv; i--) {
			boxes[i].classList.add('hide_box');
		}

		startGame();
	});

	hardBtn.addEventListener('click', (e) => {
		islevel = 'hard';
		hardBtn.classList.add('selected');
		easyBtn.classList.remove('selected');
		mediumBtn.classList.remove('selected');

		for (let box of flexBoxes) {
			box.classList.remove('hide_box');
			box.style.height = '20%';
			box.style.width = '30%';
		}

		startGame();
	});

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

// if level is hard cha
