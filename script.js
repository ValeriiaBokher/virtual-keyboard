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
var button = '';
import letters from './letters.js';
function fill() {
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

// ввод с помощью мыши
const buttons = document.querySelectorAll('.buttons');
for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', function (e) {
		let _this = this;
		let attribute = _this.getAttribute('data');
		textArea.append(letters[attribute].eng[0]);
		console.log(attribute);
	});
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

// при отжатии кнопки на клавиатуре выключается анимания3
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

// document.onkeypress = function (event) {
// 	console.log(event);
// 	for (let i = 0; i < letters.length; i++) {
// 		for (let j = 0; j < letters[i].all.length; j++) {
// 			if (event.key == letters[i].all[j]) {
// 				document.querySelectorAll('.buttons').forEach(function (elem) {
// 					elem.classList.remove('_active');
// 				});
// 				document
// 					.querySelector('.buttons[data="' + letters[i].button + '"]')
// 					.classList.add('_active');
// 			}
// 		}
// 	}
// };

// for (let i = 0; i < letters.length; i++) {
// 	for (let j = 0; j < letters[i].all.length; j++) {
// 		if (event.key == letters[i].all[j]) {
// 			document.querySelectorAll('.buttons').forEach(function (elem) {
// 				elem.classList.remove('_active');
// 			});
// 			2;
// 		}
// 	}
// }
