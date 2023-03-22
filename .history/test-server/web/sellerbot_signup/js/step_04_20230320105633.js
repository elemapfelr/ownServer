document.querySelector('#stop').addEventListener('click', () => {
	document.querySelector('.timeOutBar').classList.add('stop');
	document.querySelector('#stop').innerHTML = '대기';
	clearTimeout(timeout);
	clearInterval(leftSecCount);
});

document.querySelector('#mallReg').addEventListener('click', () => {
	document.querySelector('#mallReg').classList.add('active');
	document.querySelector('#accountReg').classList.remove('active');
	document.querySelector('.mallRegVid').classList.add('active');
	document.querySelector('.accRegImg').classList.remove('active');
});
document.querySelector('#accountReg').addEventListener('click', () => {
	document.querySelector('#mallReg').classList.remove('active');
	document.querySelector('#accountReg').classList.add('active');
	document.querySelector('.mallRegVid').classList.remove('active');
	document.querySelector('.accRegImg').classList.add('active');
});

document.querySelector('#nextStep').addEventListener('click', () => {
	location.href = './step_05.html';
});
document.querySelector('#nextStep_2').addEventListener('click', () => {
	location.href = './step_05.html';
});

let timeout = setTimeout(() => {
	location.href = './step_05.html';
}, 5000);

let leftSecCount = setInterval(() => {
	if (parseInt(document.querySelector('#leftSec').innerHTML) > 0) {
		document.querySelector('#leftSec').innerHTML =
			parseInt(document.querySelector('#leftSec').innerHTML) - 1;
	} else {
		clearInterval(leftSecCount);
	}
}, 1000);
