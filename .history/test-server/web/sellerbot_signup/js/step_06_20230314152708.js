document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_05.html';
});
document.querySelector('#nextStep').addEventListener('click', () => {
	location.href = './step_07.html';
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
			if (panel.scrollHeight < 200) {
				panel.style.maxHeight = panel.scrollHeight + 'px';
			} else {
				panel.style.maxHeight = '200px';
			}
		}
	});
});
