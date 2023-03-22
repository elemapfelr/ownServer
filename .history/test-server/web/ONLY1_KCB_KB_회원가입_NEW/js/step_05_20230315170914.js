import createElement from './import/createElement.js';

document.querySelector('#confirm').addEventListener('click', () => {
	location.href = './step_06.html';
});

let acc = document.querySelectorAll('.accordion');

acc.forEach((el) => {
	el.querySelector('.title span').addEventListener('click', () => {
		el.classList.toggle('active');

		let panel = el.querySelector('.panel');
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			if (panel.scrollHeight < 174) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			} else {
				panel.style.maxHeight = '174px';
			}
		}
	});
});

let result = false; //테스트용 플래그
document.querySelector('#creditCard').addEventListener('click', () => {
	// 이니시스 팝업

	//...

	// 다 끝난 후 정상적으로 등록 되었을 경우
	result = result ? false : true; // 테스트용 플래그
	if (result) {
		document.querySelector('span.notification').innerHTML = '신용카드 등록이 완료되었습니다.';
		document.querySelector('span.notification').className = 'notification done';
	} else {
		// 오류 발생시
		document.querySelector('span.notification').innerHTML = '에러 메세지';
		document.querySelector('span.notification').className = 'notification err';
	}
});

let div = createElement('div', {
	width: '300px',
	height: '300px',
	style: "background-color= 'blue'",
});
document.querySelector('body').append(div);
