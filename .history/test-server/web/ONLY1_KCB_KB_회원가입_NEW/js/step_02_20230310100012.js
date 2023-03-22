document.querySelector('#confirm').addEventListener('click', () => {
	location.href = './step_03.html';
});

document.querySelectorAll('.onlyNumber').forEach((el) => {
	el.addEventListener('keyup', () => {
		el.value = el.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	});
});
