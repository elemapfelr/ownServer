import modalShow from './import/modalShow.js';

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
});

document.querySelector('.m_menu_wra')?.addEventListener('click', () => {
	document.querySelector('.m_menu_wra').classList.toggle('active');
	document.querySelector('.m_sideMenu_wra').classList.toggle('active');
	document.querySelector('.m_sideMenu_cover').classList.toggle('active');

	if (document.querySelector('.m_menu_wra').classList.contains('active')) {
		document.querySelector('body').style.overflow = 'hidden';
	} else {
		document.querySelector('body').style.overflow = '';
	}
});

// footer 각 약관 클릭 했을 때
document.querySelector('#footer_term_1').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>셀러봇캐시 이용약관</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<div class="textDiv">
	<pre>
		셀러봇캐시 통합서비스 약관

제 1 장 환영합니다!

제 1조 ( 목적 )

주식회사 온리원(이하 ‘회사’)이 제공하는 서비스를 이용해 주시는 모든 이용자분들께 감사드립니다. 회사는 이용자님들께 정산예정금 통합관리서비스부터 다양한 판매 통계서비스, 금융 서비스까지 편리하게 제공해드릴 수 있도록 회사 또는 관계사의 개별 서비스에 모두 접속하여 이용할 수 있는 통합로그인계정 정책을 만들고 그에 적용되는 ‘셀러봇캐시 통합서비스 약관(이하 ‘본 약관’)’을 수립하였습니다.

이용자님들께서는 본 약관에 동의함으로써 통합서비스에 가입하여 통합서비스를 이용할 수 있습니다. 단, 회사가 아닌 관계사 등 제3자가 제공하는 개별 서비스(예:㈜소드원대부)에는 처음부터 동의를 거치지 아니한 상태로 통합가입되지 않으며 별도의 약관동의 및 통합절차를 거친 후에 관계사 등 제3자가 제공하는 개별서비스의 이용계약이 성립합니다.
	</pre>
	</div>
	<button class="cancelModal">확인</button>
	</div>
    `;
	modalShow({
		id: 'footer_term_1_modal',
		content: popupHtml,
		function: () => {
			document
				.querySelector('#footer_term_1_modal button.cancelModal')
				.addEventListener('click', () => {
					document.querySelector('#footer_term_1_modal').remove();
					document.querySelector('body').style.overflow = '';
				});
		},
	});
});

document.querySelector('#footer_term_2').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>셀러봇캐시 개인정보 처리 방침</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<div class="textDiv">
	<pre>
	개인정보 처리방침

	주식회사 온리원이 처리하는 모든 개인정보는 「개인정보보호법」, 「정보통신망법」 등 관련 법령에 근거 하거나 정보주체의 동의에 의하여 수집, 보유, 처리되고 있습니다.
	주식회사 온리원은 「개인정보보호법」, 「정보통신망법」에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 「개인정보 처리방침」을 두고 있으며 개정하는 경우 홈페이지를 통하여 공지할 것입니다.
	
	제1조 (개인정보의 처리 목적)
	
	주식회사 온리원은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
	</pre>
	</div>
	<button class="cancelModal">확인</button>
	</div>
    `;
	modalShow({
		id: 'footer_term_2_modal',
		content: popupHtml,
		function: () => {
			document
				.querySelector('#footer_term_2_modal button.cancelModal')
				.addEventListener('click', () => {
					document.querySelector('#footer_term_2_modal').remove();
					document.querySelector('body').style.overflow = '';
				});
		},
	});
});

document.querySelector('#footer_term_3').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>이메일무단수집 거부</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<div class="textDiv">
	<pre>
	영리목적 셀러봇캐시에서는 본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.
</pre>
	</div>
	<button class="cancelModal">확인</button>
	</div>
    `;
	modalShow({
		id: 'footer_term_3_modal',
		content: popupHtml,
		function: () => {
			document
				.querySelector('#footer_term_3_modal button.cancelModal')
				.addEventListener('click', () => {
					document.querySelector('#footer_term_3_modal').remove();
					document.querySelector('body').style.overflow = '';
				});
		},
	});
});
