import modalShow from './import/modalShow.js';
import numberWithCommas from './import/numberWithCommas.js';

const ticketFixed_pc = document.querySelector('.ticketFixed_pc');

const regItems = {
	ticket: '',
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

document.querySelector('#serviceVid').addEventListener('click', () => {
	let width = window.innerWidth > 800 ? 800 : window.innerWidth - 20;
	let height = width * 0.6;
	modalShow({
		id: 'youtube_00',
		content: `
        <iframe width="${width}" height="${height}" src="https://www.youtube.com/embed/4ZruNOiU07A" title="이용안내 셀러봇캐시 소개" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `,
	});
});

document.querySelectorAll('#subscribe .item').forEach((el, idx, arg) => {
	el.addEventListener('click', () => {
		let subscribingFlag = false;
		arg.forEach((el2) => {
			el2.classList.remove('active');
			if (el2.classList.contains('subscribing')) {
				let popupHtml = `
                    <div class="head">
                        <h5></h5>
                        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
                    </div>
                    <div class="body">
                        <p>이용권 변경, 해지는 [마이페이지 → 결제정보] 를 이용해주세요.</p>
                        <div class="btnFlex">
                            <button class="blue_outline" id="modalCancel">닫기</button>
                            <button class="blue" id="modalConfirm">이동</button>
                        </div>
                    </div>
                    `;
				modalShow({
					id: 'modal_03',
					content: popupHtml,
					function: () => {
						document.querySelector('#modalCancel').addEventListener('click', () => {
							document.querySelector('#modal_03').remove();
							document.querySelector('body').style.overflow = '';
						});
						document.querySelector('#modalConfirm').addEventListener('click', () => {
							location.href = '#'; //마이페이지 → 결제정보 페이지 링크
						});
					},
				});
				subscribingFlag = true;
			}
		});

		if (!subscribingFlag) {
			el.classList.add('active');

			document.querySelector('.fixed').classList.add('active');
			document.querySelector('.ticketFixed').classList.add('active');
			regItems.ticket = el.dataset.itemname;

			let itemText = `${regItems.ticket}`;
			document.querySelector('.ticketFixed p b').innerHTML = itemText;
			ticketFixed_pc.classList.add('show');
			ticketFixed_pc.querySelector('selected-item').innerHTML = itemText;
		}
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

// 20230323 수정 여기부터
//화면에 보이면 숫자 올라가는 애니메이션
let ioCallback = (entries) => {
	entries.forEach((entry) => {
		let num = entry.target.dataset.number;
		let intersected = entry.target.dataset.intersected;
		if (entry.isIntersecting && intersected == 'false') {
			entry.target.dataset.intersected = 'true';
			if (entry.target.classList.contains('decimal')) {
				decimalCounterAnimate(entry.target, num);
			} else {
				counterAnimate(entry.target, num);
			}
		}
	});
};
// 20230323 수정 여기까지
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

// 20230323 추가 여기부터
const decimalCounter = ($counter, max) => {
	let now = max;

	const handle = setInterval(() => {
		let str = Math.ceil(max - now).toString();
		str = str.slice(0, 1) + '.' + str.slice(1);

		$counter.innerHTML = str + '<small>조원↑</small>';

		if (now < 1) {
			clearInterval(handle);
		}

		const step = now / 54;

		now -= step;
	}, 5);
};

function decimalCounterAnimate(target, max) {
	setTimeout(() => decimalCounter(target, max), 0);
}
// 20230323 추가 여기까지

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
        <p>이용권 변경, 해지는 [마이페이지 → 결제정보] 를 이용해주세요.</p>
        <div class="btnFlex">
            <button class="blue_outline" id="modalCancel">닫기</button>
            <button class="blue" id="modalConfirm">이동</button>
        </div>
    </div>
    `;
	if (
		!document.querySelector('#bankBot .item').classList.contains('active') &&
		!document.querySelector('#bankBot .item').classList.contains('subscribing')
	) {
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
							document.querySelector('#bankBot .item').classList.add('subscribing');
							document.querySelector('.ticketFixed').classList.remove('active');
							ticketFixed_pc.classList.remove('show');
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
					location.href = '#'; //마이페이지 → 결제정보 페이지 링크
				});
			},
		});
	}
});
