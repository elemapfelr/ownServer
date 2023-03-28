// document.querySelector('header .top .text .notiWrap ul li');

function headerSlider() {
	let i = 0; // i 변수 초기화
	setInterval(() => {
		// 5초마다 실행되는 함수
		i++; // i 증가
		if (i > document.querySelectorAll('header .top .text .notiWrap ul li').length - 1) {
			// i가 li 요소의 개수보다 크면
			i = 0; // i를 0으로 초기화
		}
		document.querySelector('header .top .text .notiWrap ul').style.top = i * -20 + 'px'; // ul 요소의 top 값을 i * -20으로 설정
	}, 5000); // 5초마다 실행
}
headerSlider();

// #closeHeaderNoti 요소를 클릭했을 때
document.querySelector('#closeHeaderNoti').addEventListener('click', () => {
	// header 요소에 notiClose 클래스 추가
	document.querySelector('header').classList.add('notiClose');
	// main section 요소의 paddingTop 값을 140px로 변경
	document.querySelector('main section').style.paddingTop = '140px';
});
