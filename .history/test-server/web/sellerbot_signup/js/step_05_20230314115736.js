import modalShow from './import/modalShow.js';

document.querySelector('#mallGuide').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>판매몰 등록 가이드</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>셀러봇캐시 이용권 선택 시 무료체험 14일이 제공되며 체험종료 후 매월 자동 정기결제가 진행됩니다.</p>
		<p class="red">체험 종료 전 해지가 가능하며, 셀러봇캐시는 자동정기 결제가 되기 7일 전 고객님께 알림을 보내드리고 있는 점 참고해주세요.</p>
		<span class="line"></span>
		<p class="btmTxt">*해지 경로 : [ 셀러봇캐시 페이지 → 마이페이지 → 결제정보 → (이용권 우측) 해지 ]</p>
	</div>`;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {},
	});
});
