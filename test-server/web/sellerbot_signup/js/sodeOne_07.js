import modalShow from './import/modalShow.js';

document.querySelector('#nextStep').addEventListener('click', () => {
	if (document.querySelector('#nextStep').classList.contains('active')) {
		signupFin();
	}
});

function signupFin() {
	let popupHtml = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>가입이 완료되었습니다.</p>
        <p>로그인 후 판매몰을 등록하세요.</p>
        <div class="btnFlex">
            <button class="blue" id="modalConfirm">로그인</button>
        </div>
    </div>
    `;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {
			document.querySelector('#modalConfirm').addEventListener('click', () => {
				location.href = '/';
			});
		},
	});
}
