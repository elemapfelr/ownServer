document.querySelector('#nextStep').addEventListener('click', () => {
	if (!document.querySelector('#terms_01').checked) {
		alert('필수 약관에 동의해주세요');
		document.querySelector('#terms_01').focus();
		return false;
	}
	if (!document.querySelector('#terms_02').checked) {
		alert('필수 약관에 동의해주세요');
		document.querySelector('#terms_02').focus();
		return false;
	}
	if (!document.querySelector('#terms_06').checked) {
		alert('필수 약관에 동의해주세요');
		document.querySelector('#terms_06').focus();
		return false;
	}
	if (!document.querySelector('#terms_07').checked) {
		alert('필수 약관에 동의해주세요');
		document.querySelector('#terms_07').focus();
		return false;
	}

	if (document.querySelector('#nextStep').classList.contains('active')) {
		location.href = './sodeOne_02.html';
	}
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

// 다음 버튼 활성화용 플래그
let flagObj = {
	terms1Flag: false,
	terms2Flag: false,
	terms6Flag: false,
	terms7Flag: false,
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
document.querySelector('#terms_06').addEventListener('change', () => {
	if (document.querySelector('#terms_06').checked) {
		flagChecker('terms6Flag', true);
	} else {
		flagChecker('terms6Flag', false);
	}
});
document.querySelector('#terms_07').addEventListener('change', () => {
	if (document.querySelector('#terms_07').checked) {
		flagChecker('terms7Flag', true);
	} else {
		flagChecker('terms7Flag', false);
	}
});

// 전체 동의 클릭
document.querySelector('#checkAll').addEventListener('change', () => {
	const termsArr = ['#terms_01', '#terms_02', '#terms_03', '#terms_04', '#terms_05'];
	if (document.querySelector('#checkAll').checked) {
		termsArr.forEach((el) => {
			document.querySelector(el).checked !== true ? document.querySelector(el).click() : null;
		});
	} else {
		termsArr.forEach((el) => {
			document.querySelector(el).checked !== false
				? document.querySelector(el).click()
				: null;
		});
	}
});
document.querySelector('#checkAll2').addEventListener('change', () => {
	const termsArr = ['#terms_06', '#terms_07', '#terms_08', '#terms_09'];
	if (document.querySelector('#checkAll2').checked) {
		termsArr.forEach((el) => {
			document.querySelector(el).checked !== true ? document.querySelector(el).click() : null;
		});
	} else {
		termsArr.forEach((el) => {
			document.querySelector(el).checked !== false
				? document.querySelector(el).click()
				: null;
		});
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
