import modalShow from './import/modalShow.js';

document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_05.html';
});
document.querySelector('#nextStep').addEventListener('click', () => {
	location.href = './step_07.html';
});

// 이용권 좌 우 클릭 20230323 수정 ticketSelect 함수 전체
function ticketSelect() {
	let index = 0;
	let galleryItem = document.querySelectorAll('.ticket_gallery ul li');

	if (document.querySelector('#prevTicket').clickHandler) {
		document
			.querySelector('#prevTicket')
			.removeEventListener('click', document.querySelector('#prevTicket').clickHandler);
	}
	if (document.querySelector('#nextTicket').clickHandler) {
		document
			.querySelector('#nextTicket')
			.removeEventListener('click', document.querySelector('#nextTicket').clickHandler);
	}

	let tickets = [
		{
			name: '파이봇',
			price: '100,000원',
		},
		{
			name: '파이봇 할인형',
			price: '50,000원',
		},
		{
			name: '로니봇',
			price: '50,000원',
		},
	];

	document.querySelector('#prevTicket').clickHandler = () => {
		index - 1 < 0 ? (index = galleryItem.length - 1) : index--;
		document.querySelector('.ticket_gallery ul ').style.left = index * -100 + '%';
		document.querySelector('#ticketName').innerHTML = tickets[index]['name'];
		document.querySelector('#ticketPrice').innerHTML = `월 ${tickets[index]['price']}`;
		document.querySelector('#totalPrice').innerHTML = tickets[index]['price'];
	};
	document
		.querySelector('#prevTicket')
		.addEventListener('click', document.querySelector('#prevTicket').clickHandler);

	document.querySelector('#nextTicket').clickHandler = () => {
		index + 1 > galleryItem.length - 1 ? (index = 0) : index++;
		document.querySelector('.ticket_gallery ul').style.left = index * -100 + '%';
		document.querySelector('#ticketName').innerHTML = tickets[index]['name'];
		document.querySelector('#ticketPrice').innerHTML = `월 ${tickets[index]['price']}`;
		document.querySelector('#totalPrice').innerHTML = tickets[index]['price'];
	};
	document
		.querySelector('#nextTicket')
		.addEventListener('click', document.querySelector('#nextTicket').clickHandler);
}
ticketSelect();

// 갤러리 좌 우 클릭
function slideGallery() {
	let index = 0;
	let galleryItem = document.querySelectorAll('.gallery ul li');
	document.querySelector('#galleryLeft').addEventListener('click', () => {
		index - 1 < 0 ? (index = galleryItem.length - 1) : index--;
		document.querySelector('.gallery ul').style.left = index * -100 + '%';
		document.querySelectorAll('ul.bottomUl li').forEach((el) => el.classList.remove('active'));
		document.querySelectorAll('ul.bottomUl li')[index].classList.add('active');
	});
	document.querySelector('#galleryRight').addEventListener('click', () => {
		index + 1 > galleryItem.length - 1 ? (index = 0) : index++;
		document.querySelector('.gallery ul').style.left = index * -100 + '%';
		document.querySelectorAll('ul.bottomUl li').forEach((el) => el.classList.remove('active'));
		document.querySelectorAll('ul.bottomUl li')[index].classList.add('active');
	});
}
slideGallery();

// 아코디언 🎵
let acc = document.querySelectorAll('.accordion');
acc.forEach((el) => {
	el.querySelector('.title span').addEventListener('click', () => {
		el.classList.toggle('active');

		/* Toggle between hiding and showing the active panel */
		let panel = el.querySelector('.panel');
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			if (panel.scrollHeight < 200) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			} else {
				panel.style.maxHeight = '200px';
			}
		}
	});
});

// 약관 텍스트 클릭 시 체크박스 클릭됨
document.querySelectorAll('.text_checkBox').forEach((el) => {
	el.addEventListener('click', () => {
		el.parentNode.querySelector('input.chkBox').click();
	});
});

// 약관 동의 시 결제수단 활성화
document.querySelector('#terms_01').addEventListener('change', () => {
	if (document.querySelector('#terms_01').checked) {
		document.querySelector('#creditCard').classList.add('active');
		document.querySelector('.fixed').classList.add('active');
		document.querySelector('#terms_01_1').checked = true;
	} else {
		document.querySelector('#creditCard').classList.remove('active');
		document.querySelector('.fixed').classList.remove('active');
		document.querySelector('#terms_01_1').checked = false;
	}
});

// 모바일 한정 bottomSticky 클릭시 약관 체크박스 클릭
document.querySelector('#terms_01_1').addEventListener('change', () => {
	if (document.querySelector('#terms_01_1').checked) {
		document.querySelector('#terms_01').checked == false
			? document.querySelector('#terms_01').click()
			: null;
	} else {
		document.querySelector('#terms_01').checked == true
			? document.querySelector('#terms_01').click()
			: null;
	}
});
// bottomSticky 자세히보기 클릭
document.querySelector('.bottomSticky span').addEventListener('click', () => {
	let offsetY = document.querySelector('#terms').offsetTop;
	scrollTo({ top: offsetY, behavior: 'smooth' });
	document.querySelector('#terms .accordion').classList.contains('active')
		? null
		: document.querySelector('#terms .accordion span').click();
});

//화면에 약관동의 나오면 bottomSticky 숨김
let ioCallback = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			document.querySelector('.bottomSticky').classList.add('hide');
		} else {
			document.querySelector('.bottomSticky').classList.remove('hide');
		}
	});
};
let io = new IntersectionObserver(ioCallback);
let target = document.querySelectorAll('#terms');
target.forEach((el) => {
	io.observe(el);
});

//결제수단 등록 완료 시
document.querySelector('#creditCard').addEventListener('click', () => {
	location.href = './step_07.html';
});

// 유료 결제 약관
fetch('./pay_term.txt')
	.then((res) => res.text())
	.then((data) => {
		document.querySelector('#termContent').innerHTML = data;
	});

// 이전단게에서 로니봇 선택했는데 몰을 5개 초과로 등록한 경우 20230323 수정
function loanyBotAlert() {
	let popupHtml = `
    <div class="head">
        <h5>이용권 변경 안내</h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>등록 가능한 판매몰(5개) 초과로 <br>선택한 이용권이 '파이봇'으로 변경되었어요.</p>
		<span class="line"></span>
		<p><b>- 로니봇 이용을 원하시면</b></p>
		<p>'이전'단계에서 판매몰을 5개 이하로 변경해주세요.</p>
		<br>
		<p><b>- 파이봇 이용을 원하시는 경우</b></p>
		<p>'확인'또는 '닫기'를 눌러 결제를 진행해주세요.</p>
        <div class="btnFlex">
            <button class="blue_outline" id="modalPrevPage">이전</button>
            <button class="blue" id="modalConfirm">확인</button>
        </div>
    </div>
    `;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {
			document.querySelector('#modalPrevPage').addEventListener('click', () => {
				location.href = './step_05.html';
			});
			function convertToFiBot() {
				document.querySelectorAll('.ticket_gallery ul li')[2].remove();
				document.querySelector('.ticket_gallery ul').style.width = '200%';
				document.querySelectorAll('.ticket_gallery ul li')[0].style.width = '50%';
				document.querySelectorAll('.ticket_gallery ul li')[1].style.width = '50%';
				ticketSelect();
			}
			document.querySelector('#modal_01 #modalConfirm').addEventListener('click', () => {
				document.querySelector('#modal_01').remove();
				document.querySelector('body').style.overflow = '';
				convertToFiBot();
			});
			document
				.querySelector('#modal_01 #cancelModal')
				.addEventListener('click', convertToFiBot);
		},
	});
}
loanyBotAlert();

// 금융사전용 결제수단 선택 시
function fiBotDCAlert() {
	let popupHtml = `
    <div class="head">
        <h5>무료체험 안내 (결제수단 등록 안내)</h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <h4>금융사 전용 고객이시군요!</h4>
        <h4>선택한 이용권은 '파이봇 할인형'입니다.</h4>
		<span class="line"></span>
		<div class="row">
		<span class="check"></span>
		<p>가입을 위해서는 결제수단 등록이 필수이며, <br>결제수단 등록 시 무료체험 14일이 제공됩니다.</p>
		</div>
		<br>
		<div class="row">
		<span class="check"></span>
		<p>체험 종료 후 매월 자동 정기결제가 되며, <br>해지는 언제든지 가능합니다.</p>
		</div>
        <div class="btnFlex">
            <button class="blue" id="modalConfirm">확인</button>
        </div>
    </div>
    `;
	modalShow({
		id: 'modal_02',
		content: popupHtml,
		function: () => {
			const closeModal = () => {
				document.querySelector('#modal_02').remove();
				document.querySelector('body').style.overflow = '';
			};

			document.querySelector('#modal_02 #modalConfirm').addEventListener('click', closeModal);
		},
	});
}
fiBotDCAlert();
