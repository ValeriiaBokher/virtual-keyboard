const body = document.body;
let shiftAct;
let isShiftPressed = false;
let isAltGraghPressed = false;
let isAltPressed = false;

// LANGUAGE
let getLocalStorage = localStorage.getItem('Language');
let lang;
let altshift = [];
if (getLocalStorage == null) {
	localStorage.setItem('Language', 'eng');
	lang = 'eng';
} else if (getLocalStorage == 'eng') {
	lang = 'eng';
} else if (getLocalStorage == 'rus') {
	lang = 'rus';
}

// TITLE
let title = document.createElement('h1');
let titleText = document.createTextNode('Virtual Keyboard');
title.appendChild(titleText);
title.classList.add('title');
body.appendChild(title);

// TEXTAREA

let textArea = document.createElement('textarea');
textArea.classList.add('textarea');
title.after(textArea);

// KEYBOARD
let keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
textArea.after(keyboard);

//CAPS LOCK
let fontType = 0;

// BUTTONS
let button = '';
import letters from './letters.js';

function fill() {
	for (let i = 0; i < letters.length; i++) {
		if (lang == 'eng') {
			button +=
				'<div class="buttons" data="' +
				letters[i].button +
				'" >' +
				letters[i].eng[fontType] +
				'</div>';
		} else if (lang == 'rus') {
			button +=
				'<div class="buttons" data="' +
				letters[i].button +
				'" >' +
				letters[i].rus[fontType] +
				'</div>';
		}
	}
	keyboard.innerHTML = button;
	// ввод с помощью мыши
	const buttons = document.querySelectorAll('.buttons');
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function (e) {
			mouseClick(e.target);
		});
	}
}
fill();

function caps() {
	const buttons = document.querySelectorAll('.buttons');
	if (fontType == 1) {
		buttons[29].classList.add('_active-caps');
	}
}

// function shiftAlt() {
// 	const buttons = document.querySelectorAll('.buttons');
// 	buttons[altshift[1]].classList.add('_active');
// 	buttons[altshift[0]].classList.add('_active');
// }

function clickadd() {
	const buttons = document.querySelectorAll('.buttons');

	if (isShiftPressed == true) {
		buttons[shiftAct].classList.add('_active');
	}
	if (isAltGraghPressed == true) {
		buttons[59].classList.add('_active');
	}
	if (isAltPressed == true) {
		buttons[57].classList.add('_active');
	}
}

function mouseClick(_this) {
	//	let _this = this;
	let attribute = _this.getAttribute('data');
	// Caps lock
	if (attribute == '29') {
		_this.classList.toggle('_active-caps');
		if (fontType == 0) fontType = 1;
		else if (fontType == 1) fontType = 0;
		button = '';
		fill();
		caps();
	} else if (attribute == '58') {
		textArea.append(Space());
		//Tab
	} else if (attribute == '14') {
		textArea.append(Tab());
		//Backspace
	} else if (attribute == '13') {
		textArea.append(Backspace());
	} else if (attribute == '28') {
		textArea.append(Delete());
		//Enter
	} else if (attribute == '41') {
		textArea.append(Enter());
		//arrowLeft
	} else if (attribute == '60') {
		textArea.append(ArrowLeft());
		//arrowRight
	} else if (attribute == '62') {
		textArea.append(ArrowRight());
		//arrowUp
	} else if (attribute == '53') {
		textArea.append(ArrowUp());
		//arrowDown
	} else if (attribute == '61') {
		//Alt + Shift
	} else if (
		((attribute == '57' || attribute == '59') &&
			(document
				.querySelector('.buttons[data="42"]')
				.classList.contains('_active') ||
				document
					.querySelector('.buttons[data="54"]')
					.classList.contains('_active'))) ||
		((attribute == '42' || attribute == '54') &&
			(document
				.querySelector('.buttons[data="57"]')
				.classList.contains('_active') ||
				document
					.querySelector('.buttons[data="59"]')
					.classList.contains('_active')))
	) {
		textArea.append('');
		if (lang == 'eng') {
			localStorage.setItem('Language', 'rus');
			lang = 'rus';
		} else if (lang == 'rus') {
			localStorage.setItem('Language', 'eng');
			lang = 'eng';
		}
		// altshift = [];

		// if (
		// 	document
		// 		.querySelector('.buttons[data="42"]')
		// 		.classList.contains('_active')
		// )
		// 	altshift.push('42');
		// if (
		// 	document
		// 		.querySelector('.buttons[data="54"]')
		// 		.classList.contains('_active')
		// )
		// 	altshift.push('54');
		// if (
		// 	document
		// 		.querySelector('.buttons[data="57"]')
		// 		.classList.contains('_active')
		// )
		// 	altshift.push('57');
		// if (
		// 	document
		// 		.querySelector('.buttons[data="59"]')
		// 		.classList.contains('_active')
		// )
		// 	altshift.push('59');

		button = '';
		fill();

		clickadd();
	} else if (
		attribute == '57' ||
		attribute == '59' ||
		attribute == '55' ||
		attribute == '56' ||
		attribute == '63' ||
		attribute == '42' ||
		attribute == '54'
	) {
		textArea.append('');
		//Enter
	} else {
		// textArea.append(letters[attribute].eng[fontType]);
		textArea.append(Else(letters[attribute].eng[fontType]));
	}
}

// при нажатии кнопки на клавиатуре включается анимания
document.addEventListener('keydown', function (event) {
	// console.log(event.key + '  ' + event.code);
	for (let i = 0; i < letters.length; i++) {
		let divButton = document.querySelector(
			'.buttons[data="' + letters[i].button + '"]'
		);

		if (event.key == 'Shift') {
			if (isShiftPressed == true) {
			} else {
				if (event.code == letters[i].code) {
					divButton.classList.add('_active');
					event.preventDefault();
					divButton.click();
					if (fontType == 0) fontType = 1;
					else if (fontType == 1) fontType = 0;
					if (
						document
							.querySelector('.buttons[data="42"]')
							.classList.contains('_active')
					)
						shiftAct = '42';
					if (
						document
							.querySelector('.buttons[data="54"]')
							.classList.contains('_active')
					)
						shiftAct = '54';
					button = '';
					fill();
					isShiftPressed = true;
					clickadd();
					break;
				}
			}
		} else if (event.key == 'AltGraph') {
			if (isAltGraghPressed == true) {
			} else {
				if (event.code == letters[i].code) {
					divButton.classList.add('_active');
					divButton.click();
					event.preventDefault();
					isAltGraghPressed = true;
					clickadd();
					break;
				}
			}
		} else if (event.key == 'Alt') {
			if (isAltPressed == true) {
			} else {
				if (event.code == letters[i].code) {
					divButton.classList.add('_active');
					divButton.click();
					event.preventDefault();
					isAltPressed = true;
					clickadd();
					break;
				}
			}
		} else if (event.key == 'Control') {
			if (event.code == letters[i].code) {
				divButton.classList.add('_active');
				divButton.click();
				event.preventDefault();
				break;
			}
		} else {
			for (let j = 0; j < letters[i].all.length; j++) {
				if (event.key == letters[i].all[j]) {
					divButton.classList.add('_active');
					divButton.click();
					break;
				}
			}
		}
	}
});

// при отжатии кнопки на клавиатуре выключается анимания
document.addEventListener('keyup', function (event) {
	for (let i = 0; i < letters.length; i++) {
		for (let i = 0; i < letters.length; i++) {
			let divButton = document.querySelector(
				'.buttons[data="' + letters[i].button + '"]'
			);
			if (event.key == 'Shift') {
				if (isShiftPressed == false) {
				} else {
					if (event.code == letters[i].code) {
						divButton.classList.remove('_active');
						if (fontType == 0) fontType = 1;
						else if (fontType == 1) fontType = 0;
						button = '';
						fill();
						isShiftPressed = false;
						break;
					}
				}
			} else if (event.key == 'AltGraph') {
				if (isAltGraghPressed == false) {
				} else {
					if (event.code == letters[i].code) {
						divButton.classList.remove('_active');
						isAltGraghPressed = false;
						break;
					}
				}
			} else if (event.key == 'Alt') {
				if (isAltPressed == false) {
				} else {
					if (event.code == letters[i].code) {
						divButton.classList.remove('_active');
						isAltPressed = false;
						break;
					}
				}
			} else if (event.key == 'Control') {
				if (event.code == letters[i].code) {
					divButton.classList.remove('_active');
					break;
				}
			} else {
				for (let j = 0; j < letters[i].all.length; j++) {
					if (event.key == letters[i].all[j]) {
						divButton.classList.remove('_active');
						break;
					}
				}
			}
		}
	}
});

// description
let description = document.createElement('div');
let description2 = document.createElement('div');
description.classList.add('description');
description2.classList.add('description2');
description.innerText = 'Клавиатура создана в операционной системы Windows';
description2.innerText = 'Для смены языка используйте комбинацию Alt + Shift';
keyboard.after(description);
description.after(description2);

// TextArea Cursor for Backspace
function getCaret(el) {
	if (el.selectionStart) {
		return el.selectionStart;
	} else if (document.selection) {
		el.focus();

		let r = document.selection.createRange();
		if (r == null) {
			return 0;
		}

		let re = el.createTextRange(),
			rc = re.duplicate();
		re.moveToBookmark(r.getBookmark());
		rc.setEndPoint('EndToStart', re);

		return rc.text.length;
	}
	return 0;
}

function resetCursor(txtElement, currentPos) {
	if (txtElement.setSelectionRange) {
		txtElement.focus();
		txtElement.setSelectionRange(currentPos, currentPos);
	} else if (txtElement.createTextRange) {
		let range = txtElement.createTextRange();
		range.moveStart('character', currentPos);
		range.select();
	}
}

function Backspace() {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let backSpace =
		text.substr(0, currentPos - 1) + text.substr(currentPos, text.length);

	textarea.value = backSpace;

	resetCursor(textarea, currentPos - 1);
}

// TextArea Cursor for Delete
function Delete() {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let Delete =
		text.substr(0, currentPos) + text.substr(currentPos + 1, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos);
}

// TextArea ArrowLeft
function ArrowLeft() {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let Delete =
		text.substr(0, currentPos) + text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos - 1);
}

// TextArea ArrowrRight
function ArrowRight() {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let Delete =
		text.substr(0, currentPos) + text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos + 1);
}
// TextArea Enter
function Enter() {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let Delete =
		text.substr(0, currentPos) +
		'\n' +
		text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos + 1);
}

// Else
function Else(x) {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let Delete =
		text.substr(0, currentPos) + x + text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos + 1);
}

// Space
function Space() {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let Delete =
		text.substr(0, currentPos) + ' ' + text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos + 1);
}
// Tab
function Tab() {
	let textarea = document.querySelector('.textarea');
	let currentPos = getCaret(textarea);
	let text = textarea.value;

	let Delete =
		text.substr(0, currentPos) +
		'    ' +
		text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos + 4);
}
