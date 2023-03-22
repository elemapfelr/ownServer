let acc = document.querySelectorAll('.accordion');

acc.forEach((el) => {
	el.querySelector('.title span').addEventListener('click', () => {
		el.classList.toggle('active');

		let panel = el.querySelector('.panel');
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			if (panel.scrollHeight < 174) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			} else {
				panel.style.maxHeight = '174px';
			}
		}
	});
});

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

document.querySelector('#cancel').addEventListener('click', () => {
	location.href = '/intro.html';
});

document.querySelector('#confirm').addEventListener('click', () => {
	location.href = '/step_02.html';
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

document.querySelector('#domain').addEventListener('change', (e) => {
	if (e.target.value == 'manual') {
		document.querySelector('#manualDomain').removeAttribute('disabled');
	} else {
		document.querySelector('#manualDomain').setAttribute('disabled', true);
	}
});

document.querySelectorAll('.onlyNumber').forEach((el) => {
	el.addEventListener('keyup', () => {
		el.value = el.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	});
});
