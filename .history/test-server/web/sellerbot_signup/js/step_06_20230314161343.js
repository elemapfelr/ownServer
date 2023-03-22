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
		<h5>결제수단 등록 완료</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>셀러봇캐시를 이용해주셔서 감사합니다.</p>
        <p>셀러봇캐시 요금제(파이봇) / 자동대사서비스(뱅크봇) 이용이 시작되었습니다.</p>
		<p><b>다음 정기결제일은 2023년 00월 00일 입니다.</b></p>
        <h2>최종 결제금액</h2>
        <div class="flexBox">
			<div class="left">
				<h5>총 결제 금액</h5>
				<h4>149,800원</h4>
				<small>(VAT 포함)</small>
			</div>
			<div class="right">
				<div class="content">
					<p class="gray">셀러봇캐시 이용권</p>
					<div class="box">
						<div class="blue">파이봇</div>
						<p>월 111,000원</p>
					</div>
					<span class="line"></span>
					<p class="gray">자동대사서비스</p>
					<div class="box">
						<div class="blue_outline">뱅크봇</div>
						<p>월 8,800원</p>
					</div>
					<span class="line"></span>
					<p class="gray">가입비</p>
					<p>30,000원</p>
				</div>
			</div>
		</div>
        <h2>결제정보</h2>
        <div class="flexBox">
            <div class="left">
                <h4>신용카드</h4>
            </div>
            <div class="right">
                <p>027**********1</p>
            </div>
        </div>
        </div>
	</div>`;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {},
	});
});
