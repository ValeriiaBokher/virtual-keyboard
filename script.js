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
title.appendChild(textArea);

// KEYBOARD
var keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
textArea.appendChild(keyboard);

// BUTTONS
var button = document.createElement('div');
button.classList.add('buttons');
//let keyboard = [];

keyboard.document.onkeypress = function (event) {
	keyboard.push(event.charCode);
	console.log(keyboard);
};
