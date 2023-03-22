import createElement from './import/createElement.js';
import modalShow from './import/modalShow.js';

document.querySelector('#nextStep').addEventListener('click', () => {
	if (document.querySelector('#nextStep').classList.contains('active')) {
		location.href = './step_02.html';
	}
});

document.querySelectorAll('#subscribe .item').forEach((el, idx, arg) => {
	el.addEventListener('click', () => {
		arg.forEach((el2) => el2.classList.remove('active'));
		el.classList.add('active');

		document.querySelector('.fixed').classList.add('active');
		document.querySelector('.ticketFixed').classList.add('active');
		document.querySelector('.ticketFixed p b').innerHTML = el.dataset.itemname;
	});
});

document.querySelector('.ticketFixed span.close').addEventListener('click', () => {
	document.querySelector('.ticketFixed').classList.remove('active');
});

// 이용권 안내 팝업
document.querySelector('#ticketInfo').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>셀러봇캐시 이용권 안내</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>셀러봇캐시 이용권 선택 시 무료체험 14일이 제공되며 체험종료 후 매월 자동 정기결제가 진행됩니다.</p>
		<p class="red">체험 종료 전 해지가 가능하며, 셀러봇캐시는 자동정기 결제가 되기 7일 전 고객님께 알림을 보내드리고 있는 점 참고해주세요.</p>
		<span class="line"></span>
		<p class="btmTxt">*해지 경로 : [ 셀러봇캐시 페이지 → 마이페이지 → 결제정보 → (이용권 우측) 해지 ]</p>
	</div>
    `;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {},
	});
});

// 아코디언 🎵
let acc = document.querySelectorAll('.accordion');
acc.forEach((el) => {
	el.addEventListener('click', () => {
		el.classList.toggle('active');

		/* Toggle between hiding and showing the active panel */
		let panel = el.querySelector('.panel');
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + 'px';
		}
	});
});

//화면에 보이면 숫자 올라가는 애니메이션
let ioCallback = (entries) => {
	entries.forEach((entry) => {
		let num = entry.target.dataset.number;
		let intersected = entry.target.dataset.intersected;
		if (entry.isIntersecting && intersected == 'false') {
			entry.target.dataset.intersected = 'true';
		}
	});
};
let io = new IntersectionObserver(ioCallback);
let target = document.querySelectorAll('.serviceBanner h4')[0];
target.forEach((el) => {
	io.observe(el);
});

const counter = ($counter, max) => {
	let now = max;

	const handle = setInterval(() => {
		$counter.innerHTML = Math.ceil(max - now)
			.toString()
			.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

		// 목표수치에 도달하면 정지
		if (now < 1) {
			clearInterval(handle);
		}

		// 증가되는 값이 계속하여 작아짐
		const step = now / 10;

		// 값을 적용시키면서 다음 차례에 영향을 끼침
		now -= step;
	}, 20);
};

function counterAnimate(target, max) {
	setTimeout(() => counter(target, max), 0);
}
