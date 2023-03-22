document.querySelector('#stop').addEventListener('click', () => {
	document.querySelector('.timeOutBar').classList.add('stop');
});

document.querySelector('#mallReg').addEventListener('click', () => {
	document.querySelector('#mallReg').classList.add('active');
	document.querySelector('#accountReg').classList.remove('active');
	document.querySelector('.mallRegVid').classList.add('active');
	document.querySelector('.accRegImg').classList.remove('active');
});
document.querySelector('#accountReg').addEventListener('click', () => {
	document.querySelector('.mallRegVid').classList.remove('active');
	document.querySelector('.accRegImg').classList.add('active');
});
