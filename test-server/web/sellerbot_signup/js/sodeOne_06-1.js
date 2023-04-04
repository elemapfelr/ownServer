document.querySelector('#stop').addEventListener('click', () => {
	document.querySelector('.timeOutBar').classList.add('stop');
	clearTimeout(timeout);
	clearInterval(leftSecCount);
});

document.querySelector('#mallReg').addEventListener('click', () => {
	document.querySelector('#mallReg').classList.add('active');
	document.querySelector('#accountReg').classList.remove('active');
	document.querySelector('.mallRegVid').classList.add('active');
	document.querySelector('.accRegVid').classList.remove('active');
});
document.querySelector('#accountReg').addEventListener('click', () => {
	document.querySelector('#mallReg').classList.remove('active');
	document.querySelector('#accountReg').classList.add('active');
	document.querySelector('.mallRegVid').classList.remove('active');
	document.querySelector('.accRegVid').classList.add('active');
});

const redirectToLogin = () => {
	location.href = 'https://www.sellerbot.co.kr/login';
};

document.querySelector('#nextStep').addEventListener('click', redirectToLogin);
document.querySelector('#nextStep_2').addEventListener('click', redirectToLogin);

let timeout = setTimeout(redirectToLogin, 5000);

let leftSecCount = setInterval(() => {
	const leftSec = document.querySelector('#leftSec');
	if (parseInt(leftSec.innerHTML) > 0) {
		leftSec.innerHTML = parseInt(leftSec.innerHTML) - 1;
	} else {
		clearInterval(leftSecCount);
	}
}, 1000);
