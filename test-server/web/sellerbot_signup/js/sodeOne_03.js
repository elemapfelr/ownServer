import modalShow from './import/modalShow.js';

document.querySelector('#nextStep').addEventListener('click', () => {
	if (document.querySelector('#nextStep').classList.contains('active')) {
		// 통합 계정일 경우
		uniteAcc();
		// 통합 계정이 아닐 경우
		// notUniteAcc();
	}
});

// 다음 버튼 활성화용 플래그
let flagObj = {
	email_1: false,
	email_2: false,
	verifFlag: false,
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

//인증번호 요청 클릭 시
document.querySelector('#reqVerificationCode').addEventListener('click', (e) => {
	if (!document.querySelector('#email').value) {
		document.querySelector('#email').focus();
		return false;
	} else if (document.querySelector('#domain').value == '') {
		document.querySelector('#domain').focus();
		return false;
	} else if (
		document.querySelector('#domain').value == 'manual' &&
		!document.querySelector('#manualDomain').value
	) {
		document.querySelector('#manualDomain').focus();
		return false;
	} else {
		let domain;
		if (document.querySelector('#domain').value == 'manual') {
			domain = document.querySelector('#manualDomain').value;
		} else {
			domain = document.querySelector('#domain').value;
		}
		const emailAddress = document.querySelector('#email').value + '@' + domain;
		// 메일로 인증코드 발송
		// ...

		if (document.querySelector('#reqVerificationCode').classList.contains('blue')) {
			document.querySelector(
				'#msg1'
			).innerHTML = `입력하신 이메일<b>(${emailAddress})</b>으로 인증번호가 재발송되었습니다.`;
		} else {
			document.querySelector(
				'#msg1'
			).innerHTML = `입력하신 이메일<b>(${emailAddress})</b>으로 인증번호가 발송되었습니다.`;
		}

		document.querySelector('#reqVerificationCode').innerHTML = '재발송';
		document.querySelector('#reqVerificationCode').classList.add('blue');
	}
});

//인증번호 확인 클릭 시
document.querySelector('#confirmVerificationCode').addEventListener('click', (e) => {
	let codeVal = document.querySelector('#verificationCode').value;

	// 인증번호가 입력되지 않았거나 일치하지 않을 경우
	if (!codeVal) {
		document.querySelector('#msg2').style.display = 'block';
	} else {
		document.querySelector('#confirmVerificationCode').innerHTML = '인증완료';
		document.querySelector('#confirmVerificationCode').classList.add('blue');
		document.querySelector('#confirmVerificationCode').style.pointerEvents = 'none';
		document.querySelector('#verificationCode').setAttribute('disabled', true);
		document.querySelector('#email').setAttribute('disabled', true);
		document.querySelector('#domain').setAttribute('disabled', true);
		document.querySelector('#manualDomain').setAttribute('disabled', true);
		document.querySelector('#reqVerificationCode').setAttribute('disabled', true);
		document.querySelector('#msg2').style.display = 'none';
		flagChecker('verifFlag', true);
	}
});

// 숫자만 입력 가능 🔢
document.querySelectorAll('.onlyNumber').forEach((el) => {
	el.addEventListener('keyup', () => {
		el.value = el.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	});
});

function uniteAcc() {
	let popupHtml = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>통합계정입니다.</p>
        <p>비밀번호 찾기를 진행하시겠습니까?</p>
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
				//비밀번호 찾기 프로세스
				document.querySelector('#modal_01').remove();
				document.querySelector('body').style.overflow = '';
			});
			document.querySelector('#modalConfirm').addEventListener('click', () => {
				location.href = './sodeOne_04.html';
			});
		},
	});
}

function notUniteAcc() {
	let popupHtml = `
    <div class="head">
        <h5></h5>
        <img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
    </div>
    <div class="body">
        <p>해당 이메일아이디는 셀러봇캐시에 가입되어 있어요.</p>
        <p>통합 가입을 진행하시겠습니까?</p>
        <div class="btnFlex">
            <button class="blue_outline" id="modalCancel">취소</button>
            <button class="blue" id="modalConfirm">확인</button>
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
				location.href = './sodeOne_04.html';
			});
		},
	});
}
