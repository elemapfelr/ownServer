document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_05.html';
});
document.querySelector('#nextStep').addEventListener('click', () => {
	location.href = './step_07.html';
});

// 이용권 좌 우 클릭
function ticketSelect() {
	let index = 0;
	let galleryItem = document.querySelectorAll('.ticket_gallery ul li');
	let tickets = [
		{
			name: '파이봇',
			price: '111,000원',
		},
		{
			name: '파이봇 할인형',
			price: '55,000원',
		},
		{
			name: '로니봇',
			price: '55,000원',
		},
	];
	document.querySelector('#prevTicket').addEventListener('click', () => {
		index - 1 < 0 ? (index = galleryItem.length - 1) : index--;
		document.querySelector('.ticket_gallery ul').style.left = index * -100 + '%';
		document.querySelector('#ticketName').innerHTML = tickets[index]['name'];
		document.querySelector('#ticketPrice').innerHTML = `월 ${tickets[index]['price']}`;
		document.querySelector('#totalPrice').innerHTML = tickets[index]['price'];
	});
	document.querySelector('#nextTicket').addEventListener('click', () => {
		index + 1 > galleryItem.length - 1 ? (index = 0) : index++;
		document.querySelector('.ticket_gallery ul').style.left = index * -100 + '%';
		document.querySelector('#ticketName').innerHTML = tickets[index]['name'];
		document.querySelector('#ticketPrice').innerHTML = `월 ${tickets[index]['price']}`;
		document.querySelector('#totalPrice').innerHTML = tickets[index]['price'];
	});
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
