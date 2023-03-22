import modalShow from './import/modalShow.js';
import numberWithCommas from './import/numberWithCommas.js';

const ticketFixed_pc = document.querySelector('.ticketFixed_pc');

const regItems = {
	ticket: '',
	bankBot: false,
};

ticketFixed_pc.querySelector('#closeTicketFixed_pc').addEventListener('click', () => {
	ticketFixed_pc.classList.remove('show');
});
ticketFixed_pc.querySelector('#hideTicketFixed_pc').addEventListener('click', () => {
	ticketFixed_pc.classList.remove('show');
});
ticketFixed_pc.querySelector('#goto').addEventListener('click', () => {
	location.href = './regPay_02.html';
});

document.querySelector('#nextStep').addEventListener('click', () => {
	if (document.querySelector('#nextStep').classList.contains('active')) {
		location.href = './regPay_02.html';
	} else {
		// 셀러봇캐시 alert으로 변경 필요
		alert('이용권을 선택해주세요');
	}
});

document.querySelectorAll('#subscribe .item').forEach((el, idx, arg) => {
	el.addEventListener('click', () => {
		arg.forEach((el2) => el2.classList.remove('active'));
		el.classList.add('active');

		document.querySelector('.fixed').classList.add('active');
		document.querySelector('.ticketFixed').classList.add('active');
		regItems.ticket = el.dataset.itemname;

		let itemText = `${regItems.ticket}${bankBot ? ' + 뱅크봇' : ''}`;
		document.querySelector('.ticketFixed p b').innerHTML = el.dataset.itemname;
		ticketFixed_pc.classList.add('show');
		ticketFixed_pc.querySelector('selected-item').innerHTML = el.dataset.itemname;
	});
});

document.querySelector('.ticketFixed span.close').addEventListener('click', () => {
	document.querySelector('.ticketFixed').classList.remove('active');
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
			counterAnimate(entry.target, num);
		}
	});
};
let io = new IntersectionObserver(ioCallback);
let target = document.querySelectorAll('.serviceBanner h4');
target.forEach((el) => {
	io.observe(el);
});

const counter = ($counter, max) => {
	let now = max;

	const handle = setInterval(() => {
		// 아이폰에서 구동안되는 문제 때문에 추가 20230320 수정
		$counter.innerHTML = numberWithCommas(Math.ceil(max - now).toString());

		// 목표수치에 도달하면 정지
		if (now < 1) {
			clearInterval(handle);
		}

		// 증가되는 값이 계속하여 작아짐
		const step = now / 10;

		// 값을 적용시키면서 다음 차례에 영향을 끼침
		now -= step;
	}, 10);
};

function counterAnimate(target, max) {
	setTimeout(() => counter(target, max), 0);
}

document.querySelector('#bankBot .item').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>뱅크봇 프로모션을 신청하시겠습니까?</p>
        <div class="btnFlex">
            <button class="blue_outline" id="modalCancel">닫기</button>
            <button class="blue" id="modalConfirm">신청</button>
        </div>
    </div>
    `;
	let popupHtml2 = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>뱅크봇 프로모션이 신청되었습니다</p>
    </div>
    `;
	let popupHtml3 = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>뱅크봇 프로모션 신청을 취소하시겠습니까?</p>
        <div class="btnFlex">
            <button class="blue_outline" id="modalCancel">닫기</button>
            <button class="blue" id="modalConfirm">신청취소</button>
        </div>
    </div>
    `;
	if (!document.querySelector('#bankBot .item').classList.contains('active')) {
		modalShow({
			id: 'modal_01',
			content: popupHtml,
			function: () => {
				document.querySelector('#modalCancel').addEventListener('click', () => {
					document.querySelector('#modal_01').remove();
					document.querySelector('body').style.overflow = '';
				});
				document.querySelector('#modalConfirm').addEventListener('click', () => {
					document.querySelector('#modal_01').remove();
					document.querySelector('body').style.overflow = '';
					modalShow({
						id: 'modal_02',
						content: popupHtml2,
						function: () => {
							document.querySelector('#bankBot .item').classList.add('active');
						},
					});
				});
			},
		});
	} else {
		modalShow({
			id: 'modal_03',
			content: popupHtml3,
			function: () => {
				document.querySelector('#modalCancel').addEventListener('click', () => {
					document.querySelector('#modal_03').remove();
					document.querySelector('body').style.overflow = '';
				});
				document.querySelector('#modalConfirm').addEventListener('click', () => {
					document.querySelector('#modal_03').remove();
					document.querySelector('body').style.overflow = '';
					document.querySelector('#bankBot .item').classList.remove('active');
				});
			},
		});
	}
});
