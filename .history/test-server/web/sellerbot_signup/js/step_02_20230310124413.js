document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_01.html';
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
			if (panel.scrollHeight < 300) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			} else {
				panel.style.maxHeight = '300px';
			}
		}
	});
});

document.querySelector('#domain').addEventListener('change', () => {
	if (document.querySelector('#domain').value == 'manual') {
		document.querySelector('#manualDomain').removeAttribute('disabled');
	} else {
		document.querySelector('#manualDomain').setAttribute('disabled', true);
	}
});

// 다음 버튼 활성화용 플래그
let flagObj = {
	verifFlag: false,
	pwFlag: false,
	pwCheckFlag: false,
	terms1Flag: false,
	terms2Flag: false,
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
		flagChecker('verifFlag', true);
	}
});

// 비밀번호 유효성 체크
document.querySelector('#pw').addEventListener('keyup', (e) => {
	let regexp = new RegExp(/^(?=.*?[a-zA-Z])(?=.*?\d)(?=.*?[!@#$%^&*+=\-[\]]).{8,20}$/);
	if (!regexp.test(e.target.value)) {
		document.querySelector('#msg3').style.display = 'block';
		flagChecker('pwFlag', false);
	} else {
		document.querySelector('#msg3').style.display = 'none';
		flagChecker('pwFlag', true);
	}
});
// 비밀번호 확인 체크
document.querySelector('#pwCheck').addEventListener('keyup', (e) => {
	if (e.target.value !== document.querySelector('#pw').value) {
		document.querySelector('#msg4').style.display = 'block';
		flagChecker('pwCheckFlag', false);
	} else {
		document.querySelector('#msg4').style.display = 'none';
		flagChecker('pwCheckFlag', true);
	}
});

// 필수 약관 체크
document.querySelector('#terms_01').addEventListener('change', () => {
	if (document.querySelector('#terms_01').checked) {
		flagChecker('terms1Flag', true);
	} else {
		flagChecker('terms1Flag', false);
	}
});

document.querySelector('#terms_02').addEventListener('change', () => {
	if (document.querySelector('#terms_02').checked) {
		flagChecker('terms2Flag', true);
	} else {
		flagChecker('terms2Flag', false);
	}
});

// 전체 동의 클릭
document.querySelector('#checkAll').addEventListener('change', () => {
	if (document.querySelector('#checkAll').checked) {
		document.querySelector('#terms_01').checked = true;
		document.querySelector('#terms_02').checked = true;
		document.querySelector('#terms_03').checked !== true
			? document.querySelector('#terms_03').click()
			: null;
		document.querySelector('#terms_04').checked = true;
		document.querySelector('#terms_05').checked = true;
	} else {
		document.querySelector('#terms_01').checked = false;
		document.querySelector('#terms_02').checked = false;
		document.querySelector('#terms_03').checked !== false
			? document.querySelector('#terms_03').click()
			: null;
		document.querySelector('#terms_04').checked = false;
		document.querySelector('#terms_05').checked = false;
	}
});

document.querySelector('#terms_03').addEventListener('change', () => {
	if (document.querySelector('#terms_03').checked) {
		document.querySelector('#phoneCall').checked = true;
		document.querySelector('#msg').checked = true;
		document.querySelector('#dm').checked = true;
		document.querySelector('#kakaoTalk').checked = true;
	} else {
		document.querySelector('#phoneCall').checked = false;
		document.querySelector('#msg').checked = false;
		document.querySelector('#dm').checked = false;
		document.querySelector('#kakaoTalk').checked = false;
	}
});

document.querySelectorAll('.checkBoxRow input').forEach((el) => {
	el.addEventListener('click', () => {
		if (el.checked) {
			document.querySelector('#terms_03').checked = true;
		}
	});
});

// 약관 텍스트 클릭 시 체크박스 클릭됨
document.querySelectorAll('.text_checkBox').forEach((el) => {
	el.addEventListener('click', () => {
		el.parentNode.querySelector('input.chkBox').click();
	});
});

// 숫자만 입력 가능 🔢
document.querySelectorAll('.onlyNumber').forEach((el) => {
	el.addEventListener('keyup', () => {
		el.value = el.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	});
});
