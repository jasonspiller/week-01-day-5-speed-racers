//
// Jason Spiller
// 03.24.18
// https://github.com/jasonspiller/week-01-day-5-speed-racers
//
// Description:
// Browser game, synthesizing all the knowledge you've packed
// into your brain over the past week! You'll be leveraging
// the power of JavaScript to create a Racing Game, where two
// players can move their "cars" across the browser to compete
// for the win.
//

// global variable(s)
const intFinishLine = 672;
let bolRaceWon = false,
		intRacer1Wins = 0,
		intRacer2Wins = 0;


// put a cool checker board pattern behind title
const checkerBoardTitle = (eleContainer) => {
	// get title text from page
	let elePageTitle = document.getElementsByTagName(eleContainer)[0],
			arrPageTitle = elePageTitle.textContent.split('')

	// wrap each letter and space with a span tag to checkerboard
	for (let i = 0; i < arrPageTitle.length; i+=2) {
		// check for spaces and replace with non-breaking space to fix display issue
		if (arrPageTitle[i] === ' ') arrPageTitle[i] = '&nbsp'
		if (arrPageTitle[i+1] === ' ') arrPageTitle[i+1] = '&nbsp'

		// wrap in alternated black and white classes
		arrPageTitle[i] = `<span class="title-black">${arrPageTitle[i]}</span>`;
		arrPageTitle[i+1] = `<span class="title-white">${arrPageTitle[i+1]}</span>`;
	}

	// join new title text and output to DOM
	elePageTitle.innerHTML = arrPageTitle.join('');

	return;
}
checkerBoardTitle('h1')


// put a cool checker board pattern on the finish line
const checkerBoardFinish = (element) => {

	// determine the rem of element and size of the container by getting w * h
	let eleContainer = document.getElementById(element);
	let intRemSize = Number(window.getComputedStyle(eleContainer).getPropertyValue('font-size').slice(0,-2));

	let intContainerSize = Number(window.getComputedStyle(eleContainer).getPropertyValue('width').slice(0,-2)) * Number(window.getComputedStyle(eleContainer).getPropertyValue('height').slice(0,-2));

	// create boxes of alternating colors based on the sites rem squared
	for (let i = 0; i < intContainerSize / Math.pow(intRemSize,2); i++) {
		if (i%2 === 0) {
			eleContainer.innerHTML += `<span class="finish-black"></span>`;
		} else {
			eleContainer.innerHTML += `<span class="finish-white"></span>`;
		}
	}
	return;
}
checkerBoardFinish('finish-line')


// check to see if someone has won
const checkForWinner = (ele) => {

	// check the racer's ID
	let intRacerNewPosition = Number(getComputedStyle(ele).getPropertyValue('left').slice(0,-2)),
			strWinningMessage = 'Congratulations';

	// check to see if a racer is at the finish inline
	if (intRacerNewPosition === intFinishLine) {
		if (ele.id === 'racer1') {
			strWinningMessage += " Red Racer!";
			intRacer1Wins += 1;
		} else {
			strWinningMessage += " Blue Racer!";
			intRacer2Wins += 1;
		}

		// mark race as won, show race again button, display message and update totals
		bolRaceWon = true;
		document.getElementsByTagName('button')[0].style.visibility = 'visible';
		document.getElementById('message').textContent = strWinningMessage;
		document.getElementById('racer1wins').childNodes[1].textContent = intRacer1Wins;
		document.getElementById('racer2wins').childNodes[1].textContent = intRacer2Wins;

		return
	}
}


// move the raceers
const moveRacer = (keyPressed) => {
	let eleRacer;

	// check for which key was pressed
	if (keyPressed === 68) {
		eleRacer = document.getElementById('racer1')
	} else if (keyPressed === 39) {
		eleRacer = document.getElementById('racer2')
	}

	// make sure the key pressed was valid
	if (eleRacer) {

		// get racer's position
		let intRacerPosition = Number(getComputedStyle(eleRacer).getPropertyValue('left').slice(0,-2));

		// make sure racer stops after winning
		if ((intRacerPosition !== intFinishLine) && !bolRaceWon) {
			// move racer
			eleRacer.style.left = `${(intRacerPosition += 16)/16}rem`;
			checkForWinner(eleRacer);
		}

		return;
	}
}


// reset game to race again
const raceAgain = () => {
	bolRaceWon = false;
	document.getElementById('message').textContent = '';
	document.getElementsByTagName('button')[0].style.visibility = 'hidden';
	document.getElementById('racer1').style.left = '2rem';
	document.getElementById('racer2').style.left = '2rem';
};


// capture keypress and call move function
const keyCapture = () => {
  window.addEventListener('keyup', function (e) {
    moveRacer(e.keyCode);
  });
}
keyCapture();
