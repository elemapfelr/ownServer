import modalShow from './import/modalShow.js';

document.querySelector('#mallGuide').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>판매몰 등록 가이드</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>현재 판매하고 있는 쇼핑몰을 선택 후 등록가이드에 따라 등록해주세요.<br>등록이 어려우신 경우, 우측 하단의 '1:1상담톡'에서 문의주세요.</p>
		<p>등록할 판매몰을 하단의 리스트에서 선택하여 추가해주세요.</p>
		<span class="line"></span>
		<p class="btmTxt">*해지 경로 : [ 셀러봇캐시 페이지 → 마이페이지 → 결제정보 → (이용권 우측) 해지 ]</p>
	</div>`;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {},
	});
});
