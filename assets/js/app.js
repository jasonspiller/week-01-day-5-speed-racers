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

// put a cool checker board pattern on
const checkerBoardFinish = (element) => {

	// determine the rem of site and size of the container by getting w * h
	let eleContainer = document.getElementById(element);
	let intRemSize = Number(window.getComputedStyle(eleContainer).getPropertyValue('font-size').slice(0,-2));

	let intContainerSize = Number(window.getComputedStyle(eleContainer).getPropertyValue('width').slice(0,-2)) * Number(window.getComputedStyle(eleContainer).getPropertyValue('height').slice(0,-2));

	console.log(element + " " + eleContainer.innerHTML + " " + intRemSize + " " + intContainerSize);

	// create boxes of alternating colors based on the sites rem squared
	for (let i = 0; i < intContainerSize / Math.pow(intRemSize,2); i++) {
		if (i%2 === 0) {
			eleContainer.innerHTML += `<span class="finish-black"></span>`;
		} else {
			eleContainer.innerHTML += `<span class="finish-white"></span>`;	
		}
	}

	console.log( + ' ' + eleContainer.innerHTML);

	return;
}
checkerBoardFinish('finish-line')
