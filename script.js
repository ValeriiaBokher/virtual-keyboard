var body = document.body;

// LANGUAGE
let getLocalStorage = localStorage.getItem('Language');
var lang;
if (getLocalStorage == null) {
	localStorage.setItem('Language', 'eng');
	lang = 'eng';
} else if (getLocalStorage == 'eng') {
	lang = 'eng';
} else if (getLocalStorage == 'rus') {
	lang = 'rus';
}

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
		fill();
	} else if (attribute == '58') {
		textArea.append(' ');
		//Tab
	} else if (attribute == '14') {
		textArea.append('    ');
		//Backspace
	} else if (attribute == '13') {
		textArea.append(Backspace());
		//Alt, Ctrl, Win
	} else if (attribute == '28') {
		textArea.append(Delete());
	} else if (
		attribute == '57' ||
		attribute == '59' ||
		attribute == '55' ||
		attribute == '56' ||
		attribute == '63'
	) {
		textArea.append('');
		//Enter
	} else if (attribute == '41') {
		textArea.append('\n');
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
		textArea.append(ArrowDown());
		//Alt + Shift
	} else if (
		(attribute == '42' || attribute == '54') &&
		(document
			.querySelector('.buttons[data="57"]')
			.classList.contains('_active') ||
			document
				.querySelector('.buttons[data="59"]')
				.classList.contains('_active'))
	) {
		textArea.append('');
		if (lang == 'eng') {
			localStorage.setItem('Language', 'rus');
			lang = 'rus';
			button = '';
			fill();
		} else if (lang == 'rus') {
			localStorage.setItem('Language', 'eng');
			lang = 'eng';
			button = '';
			fill();
		}
	} else if (
		(attribute == '57' || attribute == '59') &&
		(document
			.querySelector('.buttons[data="42"]')
			.classList.contains('_active') ||
			document
				.querySelector('.buttons[data="54"]')
				.classList.contains('_active'))
	) {
		textArea.append('');
		if (lang == 'eng') {
			localStorage.setItem('Language', 'rus');
			lang = 'rus';
			button = '';
			fill();
		} else if (lang == 'rus') {
			localStorage.setItem('Language', 'eng');
			lang = 'eng';
			button = '';
			fill();
		}
	} else if (attribute == '42' || attribute == '54') {
		textArea.append('');
	} else {
		textArea.append(letters[attribute].eng[fontType]);
	}
}

// при нажатии кнопки на клавиатуре включается анимания
document.addEventListener('keydown', function (event) {
	for (let i = 0; i < letters.length; i++) {
		let divButton = document.querySelector(
			'.buttons[data="' + letters[i].button + '"]'
		);

		if (
			event.key == 'Shift' ||
			event.key == 'AltGraph' ||
			event.key == 'Alt' ||
			event.key == 'Control'
		) {
			if (event.code == letters[i].code) {
				event.preventDefault();
				divButton.classList.add('_active');
				divButton.click();
			}
		} else {
			for (let j = 0; j < letters[i].all.length; j++) {
				if (event.key == letters[i].all[j]) {
					divButton.classList.add('_active');
					divButton.click();
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

			if (
				event.key == 'Shift' ||
				event.key == 'AltGraph' ||
				event.key == 'Alt' ||
				event.key == 'Control'
			) {
				if (event.code == letters[i].code) {
					divButton.classList.remove('_active');
				}
			} else {
				for (let j = 0; j < letters[i].all.length; j++) {
					if (event.key == letters[i].all[j]) {
						divButton.classList.remove('_active');
					}
				}
			}
		}
	}
});

// description
var description = document.createElement('div');
var description2 = document.createElement('div');
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

		var r = document.selection.createRange();
		if (r == null) {
			return 0;
		}

		var re = el.createTextRange(),
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
		var range = txtElement.createTextRange();
		range.moveStart('character', currentPos);
		range.select();
	}
}

function Backspace() {
	var textarea = document.querySelector('.textarea');
	var currentPos = getCaret(textarea);
	var text = textarea.value;

	var backSpace =
		text.substr(0, currentPos - 1) + text.substr(currentPos, text.length);

	textarea.value = backSpace;

	resetCursor(textarea, currentPos - 1);
}

// TextArea Cursor for Delete
function Delete() {
	var textarea = document.querySelector('.textarea');
	var currentPos = getCaret(textarea);
	var text = textarea.value;

	var Delete =
		text.substr(0, currentPos) + text.substr(currentPos + 1, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos);
}

// TextArea ArrowLeft
function ArrowLeft() {
	var textarea = document.querySelector('.textarea');
	var currentPos = getCaret(textarea);
	var text = textarea.value;

	var Delete =
		text.substr(0, currentPos) + text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos - 1);
}

// TextArea ArrowrRight
function ArrowRight() {
	var textarea = document.querySelector('.textarea');
	var currentPos = getCaret(textarea);
	var text = textarea.value;

	var Delete =
		text.substr(0, currentPos) + text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos + 1);
}

// TextArea ArrowrUp
function ArrowUp() {
	var textarea = document.querySelector('.textarea');
	var currentPos = getCaret(textarea);
	var text = textarea.value;

	var Delete =
		text.substr(0, currentPos) + text.substr(currentPos, text.length);

	textarea.value = Delete;

	resetCursor(textarea, currentPos);
}
