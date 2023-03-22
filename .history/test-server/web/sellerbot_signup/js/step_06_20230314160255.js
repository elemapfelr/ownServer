import modalShow from './import/modalShow.js';

document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_05.html';
});
document.querySelector('#nextStep').addEventListener('click', () => {
	location.href = './step_07.html';
});

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

// 약관 동의 시 결제수단 활성화
document.querySelector('#terms_01').addEventListener('change', () => {
	if (document.querySelector('#terms_01').checked) {
		document.querySelector('#creditCard').classList.add('active');
	} else {
		document.querySelector('#creditCard').classList.remove('active');
	}
});

//결제수단 등록 완료 시
document.querySelector('#creditCard').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>판매몰 등록 가이드</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>현재 판매하고 있는 쇼핑몰을 선택 후 등록가이드에 따라 등록해주세요.<br>등록이 어려우신 경우, 우측 하단의 '1:1상담톡'에서 문의주세요.</p>
		<span class="line"></span>
        <p>등록할 판매몰을 하단의 리스트에서 선택하여 추가해주세요.</p>
        <img src="./img/step_05_modal.png" alt="mallGuide">
		<span class="line"></span>
        <div class="flex">
        <p>1. 하단의 TOP10/이름순 항목에서 판매몰 리스트를 추가</p>
        <img class="arrow" src="./img/step_05_rightArrow.svg" alt="arrow">
        <p>2. 판매몰 등록/수정에서 업데이트</p>
        </div>
	</div>`;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {},
	});
});
