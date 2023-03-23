import modalShow from './import/modalShow.js';

document.querySelector('#skipStep').addEventListener('click', () => {
	location.href = './sodeOne_03.html';
});
document.querySelector('#nextStep').addEventListener('click', () => {
	if (document.querySelector('#nextStep').classList.contains('active')) {
		// 소드원 계정이 아닐 경우
		// notSodeOneAcc();
		// 소드원 계정일 경우
		existSodeOneAcc();
	}
});

// 다음 버튼 활성화용 플래그
let flagObj = {
	email_1: false,
	email_2: false,
	pwFlag: false,
};
function flagChecker(flag, bool) {
	flagObj[flag] = bool;

	let notChecked = Object.keys(flagObj).find((key) => flagObj[key] === false);

	if (!notChecked) {
		document.querySelector('#nextStep').classList.add('active');
	} else {
		document.querySelector('#nextStep').classList.remove('active');
	}
}

document.querySelector('#email').addEventListener('keyup', () => {
	if (document.querySelector('#email').value == '') {
		flagChecker('email_1', false);
	} else {
		flagChecker('email_1', true);
	}
});
document.querySelector('#domain').addEventListener('change', () => {
	if (document.querySelector('#domain').value == 'manual') {
		document.querySelector('#manualDomain').removeAttribute('disabled');
		if (document.querySelector('#manualDomain').value == '') {
			flagChecker('email_2', false);
		} else {
			flagChecker('email_2', true);
		}
	} else {
		document.querySelector('#manualDomain').setAttribute('disabled', true);
		flagChecker('email_2', true);
	}
});
document.querySelector('#manualDomain').addEventListener('keyup', () => {
	if (document.querySelector('#manualDomain').value == '') {
		flagChecker('email_2', false);
	} else {
		flagChecker('email_2', true);
	}
});
// 비밀번호 유효성 체크
document.querySelector('#pw').addEventListener('keyup', (e) => {
	let regexp = new RegExp(/^(?=.*?[a-zA-Z])(?=.*?\d)(?=.*?[!@#$%^&*+=\-[\]]).{8,20}$/);
	if (!regexp.test(e.target.value)) {
		flagChecker('pwFlag', false);
	} else {
		flagChecker('pwFlag', true);
	}
});

function notSodeOneAcc() {
	let popupHtml = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>해당 이메일 아이디는 소드원 계정이 아닙니다.</p>
        <p>소드원 계정이 없으시다면 건너뛰기를 눌러주세요.</p>
        <div class="btnFlex">
            <button class="blue_outline" id="modalCancel">확인</button>
            <button class="blue" id="modalConfirm">건너뛰기</button>
        </div>
    </div>
    `;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {
			document.querySelector('#modalCancel').addEventListener('click', () => {
				document.querySelector('#modal_01').remove();
				document.querySelector('body').style.overflow = '';
			});
			document.querySelector('#modalConfirm').addEventListener('click', () => {
				location.href = './sodeOne_03.html';
			});
		},
	});
}

function existSodeOneAcc() {
	let popupHtml = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>소드원 회원정보가 존재합니다.</p>
        <p>셀러봇캐시 계정으로 통합하시겠습니까?</p>
        <div class="btnFlex">
            <button class="blue_outline" id="modalCancel">취소</button>
            <button class="blue" id="modalConfirm">통합하기</button>
        </div>
    </div>
    `;
	modalShow({
		id: 'modal_02',
		content: popupHtml,
		function: () => {
			document.querySelector('#modalCancel').addEventListener('click', () => {
				document.querySelector('#modal_02').remove();
				document.querySelector('body').style.overflow = '';
			});
			document.querySelector('#modalConfirm').addEventListener('click', () => {
				location.href = './sodeOne_03.html';
			});
		},
	});
}
