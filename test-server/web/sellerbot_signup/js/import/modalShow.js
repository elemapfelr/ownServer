import createElement from './createElement.js';

function modalShow(option = { id: '', content: '', btns: [], function: null }) {
	document.querySelector('body').style.overflow = 'hidden';

	const modal = createElement('div', { className: 'modal', id: option['id'] });
	const layerPopup = createElement('div', {
		className: 'layerPopup',
	});
	const popupHead = createElement('div', {
		className: 'popupHead',
	});
	const cancelModal = createElement('button', {
		id: 'cancelModal',
		innerHTML: '<span>닫기</span>',
	});
	popupHead.append(cancelModal);

	const popupBody = createElement('div', {
		className: 'popupBody',
		innerHTML: option['content'] ?? null,
	});
	const btnBox = createElement('div', { className: 'btnBox' });
	layerPopup.append(popupHead, popupBody, btnBox);
	modal.append(layerPopup);

	cancelModal.addEventListener('click', () => {
		document.querySelector('body').style.overflow = '';
		modal.remove();
	});

	option.btns?.map((btn) => {
		let button = document.createElement('button');
		btn.callback
			? button.addEventListener('click', () => {
					btn.callback();
					btn.cancelModal
						? (() => {
								document.querySelector('body').style.overflow = '';
								modal.remove();
						  })()
						: null;
			  })
			: null;
		btn.text ? (button.innerHTML = btn.text) : '';
		btnBox.append(button);
	});

	document.querySelector('body').append(modal);

	option.function ? option.function() : null;
}

export default modalShow;
