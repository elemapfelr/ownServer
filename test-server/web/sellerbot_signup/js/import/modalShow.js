import createElement from './createElement.js';

// |이 코드는 모달 창을 생성하는 함수입니다.
// |
// |좋은 점:
// |- 옵션 파라미터를 사용하여 모달 창의 내용, 버튼, 콜백 함수 등을 설정할 수 있습니다.
// |- createElement 함수를 사용하여 동적으로 HTML 요소를 생성합니다.
// |- 취소 버튼을 클릭하면 모달 창이 닫히고, 버튼이나 콜백 함수가 설정되어 있으면 해당 기능을 수행합니다.
// |
// |나쁜 점:
// |- 옵션 파라미터의 기본값이이 객체므로, 함수를 호출할 때 빈 객체를 전달해야 하는 번거로움이 있습니다.
// |- 옵션 파라미터의 속성들이 모두 선택적이므로, 필수적인 속성이 누락될 수 있습니다.
// |- 버튼 생성 부분에서 삼항 연산자를 중첩하여 가독성이 떨어집니다.
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
