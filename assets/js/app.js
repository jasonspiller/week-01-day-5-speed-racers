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
			strWinningMessage += " Red Racer"
		} else {
			strWinningMessage += " Blue Racer"
		}
		return console.log(strWinningMessage);
	}
}


// move the raceers
const moveRacer = (keyPressed) => {
	let eleRacer;

	// check for which key was pressed
	if (keyPressed === '>') {
		// get appropriate racer and its position
		eleRacer = document.getElementById('racer1')
	} else if (keyPressed === 'D') {
		eleRacer = document.getElementById('racer2')
	}

	// // get racer's position
	// let intRacerPosition = Number(getComputedStyle(eleRacer).getPropertyValue('left').slice(0,-2));
	//
	// // make sure racer stops after winning
	// if (intRacerPosition !== intFinishLine+64) {
	// 	// move racer
	// 	eleRacer.style.left = `${(intRacerPosition += 16)/16}rem`;
	// }

	console.log(eleRacer);

	return checkForWinner(eleRacer);
}


function contentLoaded () {
  var chars = [],
  container = document.getElementById('container');

  window.addEventListener('keypress', function (e) {
	  if (e.keyCode !== 13) {
	    chars.push(e.key);
	  }
	}, false);

  window.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
      container.textContent = chars.join('');
  		chars = [];

  }, false);
}

window.addEventListener('DOMContentLoaded', contentLoaded, false);
