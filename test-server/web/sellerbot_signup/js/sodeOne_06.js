document.querySelector('#nextStep').addEventListener('click', () => {
	if (document.querySelector('#nextStep').classList.contains('active')) {
		location.href = './sodeOne_07.html';
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
