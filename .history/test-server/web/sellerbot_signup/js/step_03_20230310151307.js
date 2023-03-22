import modalShow from './import/modalShow';

document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_02.html';
});

document.querySelectorAll('#talkInfo').forEach((el) => {
	el.addEventListener('click', () => {
		modalShow({
			id: 'talkInfo',
			content: talkInfoHtml,
			function: () => {},
		});
	});
});
