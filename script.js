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

//CAPS LOCK
var fontType = 0;

// BUTTONS
var button = '';
import letters from './letters.js';

function fill() {
	for (let i = 0; i < letters.length; i++) {
		button +=
			'<div class="buttons" data="' +
			letters[i].button +
			'" >' +
			letters[i].eng[fontType] +
			'</div>';
	}
	keyboard.innerHTML = button;
	// ввод с помощью мыши
	const buttons = document.querySelectorAll('.buttons');
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function (e) {
			mouseClick(e.target);
		});
	}

	if (fontType == 1) {
		buttons[29].classList.add('_active-caps');
	}
}
fill();

function mouseClick(_this) {
	//	let _this = this;
	let attribute = _this.getAttribute('data');
	// Caps lock
	if (attribute == '29') {
		_this.classList.toggle('_active-caps');
		if (fontType == 0) fontType = 1;
		else if (fontType == 1) fontType = 0;
		button = '';
		// while (keyboard.firstChild) {
		// 	keyboard.removeChild(keyboard.firstChild);
		// }

		fill();
	} else {
		textArea.append(letters[attribute].eng[fontType]);
	}
}

// при нажатии кнопки на клавиатуре включается анимания
document.addEventListener('keydown', function (event) {
	console.log(event);
	for (let i = 0; i < letters.length; i++) {
		if (event.key == 'Shift') {
			if (event.code == letters[i].code) {
				document
					.querySelector('.buttons[data="' + letters[i].button + '"]')
					.classList.add('_active');
			}
		} else if (event.key == 'Control') {
			if (event.code == letters[i].code) {
				document
					.querySelector('.buttons[data="' + letters[i].button + '"]')
					.classList.add('_active');
			}
		} else if (event.key == 'Alt') {
			if (event.code == letters[i].code) {
				document
					.querySelector('.buttons[data="' + letters[i].button + '"]')
					.classList.add('_active');
			}
		} else {
			for (let j = 0; j < letters[i].all.length; j++) {
				if (event.key == letters[i].all[j]) {
					let divButton = document.querySelector(
						'.buttons[data="' + letters[i].button + '"]'
					);

					divButton.classList.add('_active');
					divButton.click();
				}
			}
		}
	}
});

// при отжатии кнопки на клавиатуре выключается анимания
document.addEventListener('keyup', function (event) {
	3;
	for (let i = 0; i < letters.length; i++) {
		for (let i = 0; i < letters.length; i++) {
			if (event.key == 'Shift') {
				if (event.code == letters[i].code) {
					document
						.querySelector(
							'.buttons[data="' + letters[i].button + '"]'
						)
						.classList.remove('_active');
				}
			} else if (event.key == 'Control') {
				if (event.code == letters[i].code) {
					document
						.querySelector(
							'.buttons[data="' + letters[i].button + '"]'
						)
						.classList.remove('_active');
				}
			} else if (event.key == 'Alt') {
				if (event.code == letters[i].code) {
					document
						.querySelector(
							'.buttons[data="' + letters[i].button + '"]'
						)
						.classList.remove('_active');
				}
			} else {
				for (let j = 0; j < letters[i].all.length; j++) {
					if (event.key == letters[i].all[j]) {
						document
							.querySelector(
								'.buttons[data="' + letters[i].button + '"]'
							)
							.classList.remove('_active');
					}
				}
			}
		}
	}
});

// description
var description = document.createElement('div');
description.classList.add('description');
var descriptionText = document.createTextNode('Virtual Keyboard');
keyboard.after(descriptionText);

// LANGUAGE
let getLocalStorage = localStorage.getItem('Language');
if (getLocalStorage == null) {
	localStorage.setItem('Language', 'eng');
}
//по клику на кнопку добавляем значение атрибута в Locl Storage
