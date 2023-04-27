var body = document.body;

// TITLE
var title = document.createElement('h1');
var titleText = document.createTextNode('Virtual Keyboard');
title.appendChild(titleText);
title.classList.add('title');
body.appendChild(title);

// TEXTAREA

var textArea = document.createElement('textarea');
textArea.classList.add('textarea');
title.after(textArea);

// KEYBOARD
var keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
textArea.after(keyboard);

// BUTTONS
import letters from './letters.js';
function fill() {
	let button = '';
	for (let i = 0; i < letters.length; i++) {
		button +=
			'<div class="buttons" data="' +
			letters[i].button +
			'" >' +
			letters[i].eng[0] +
			'</div>';
	}
	keyboard.innerHTML = button;
}
fill();

document.onkeypress = function (event) {
	console.log(event);
	for (let i = 0; i < letters.length; i++) {
		for (let j = 0; j < letters[i].all.length; j++) {
			if (event.key == letters[i].all[j]) {
				let niu = document.querySelector(
					'.buttons[data="' + letters[i].button + '"]'
				);
				console.log(niu);
			}
		}
	}
};
