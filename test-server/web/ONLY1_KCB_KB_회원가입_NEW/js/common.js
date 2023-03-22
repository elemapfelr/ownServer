import createElement from './import/createElement.js';
import modalShow from './import/modalShow.js';

function footerTerm1Modal() {
	let footerTermModalHtml = createElement('div', {
		className: 'footerTermModal',
	});

	let h1 = createElement('h1', {
		innerHTML: '이용약관',
	});

	let textArea = createElement('div', {
		className: 'textBox',
	});

	let pre = createElement('pre', {
		innerHTML: `셀러봇캐시 이용약관
        
        내용`,
	});
	textArea.append(pre);
	footerTermModalHtml.append(h1, textArea);

	document.querySelector('#footerTerm_1').addEventListener('click', () => {
		modalShow({
			id: 'footerTerm_1_modal',
			content: footerTermModalHtml.outerHTML,
			btns: [
				{
					text: '닫기',
					callback: () => {},
					cancelModal: true,
				},
			],
		});
	});
}

function footerTerm2Modal() {
	let footerTermModalHtml = createElement('div', {
		className: 'footerTermModal',
	});

	let h1 = createElement('h1', {
		innerHTML: '셀러봇캐시 개인정보처리방침',
	});

	let textArea = createElement('div', {
		className: 'textBox',
	});

	let pre = createElement('pre', {
		innerHTML: `개인정보 처리방침
    
    내용`,
	});
	textArea.append(pre);
	footerTermModalHtml.append(h1, textArea);

	document.querySelector('#footerTerm_2').addEventListener('click', () => {
		modalShow({
			id: 'footerTerm_2_modal',
			content: footerTermModalHtml.outerHTML,
			btns: [
				{
					text: '닫기',
					callback: () => {},
					cancelModal: true,
				},
			],
		});
	});
}

footerTerm1Modal();
footerTerm2Modal();

document.querySelector('#sellerbotLogo').addEventListener('click', () => {
	let url = 'https://www.sellerbot.co.kr/';
	window.open(url);
});
document.querySelector('#kbLogo').addEventListener('click', () => {
	let url = 'https://www.kbstar.com/';
	window.open(url);
});
document.querySelector('#kcbLogo').addEventListener('click', () => {
	let url = 'http://koreacb.com/';
	window.open(url);
});
