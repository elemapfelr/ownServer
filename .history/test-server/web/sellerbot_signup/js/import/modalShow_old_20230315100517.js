const modal = document.querySelector('.myModal'); /* 20221221 수정 */
const title_closeModal = modal.querySelector('#title_closeModal');
const content = modal.querySelector('.content');
const closeModal = modal.querySelector('#closeModal');
const top = modal.querySelector('.top');
const modalTitle = modal.querySelector('.top p.modalTitle');
const mainText = modal.querySelector('.main p');
const bottom = modal.querySelector('.bottom');

const memory = {};
let saveid = null;

export function modalInit_old() {
	title_closeModal.addEventListener('click', modalHide);
	closeModal.addEventListener('click', modalHide);
}

export function modalHide_old() {
	if (saveid !== null) {
		memory[saveid]['msg'] = mainText.innerHTML;
		saveid = null;
	}

	modal.className = 'myModal'; /* 20221221 수정 */
	mainText.innerHTML = '';
	top.classList.remove('show');
	modalTitle.innerHTML = '';
	closeModal.classList.remove('hide');
	if (bottom.querySelectorAll('button')) {
		bottom.querySelectorAll('button').forEach((el) => el.remove());
	}
}

export function modalShow_old(msg, option) {
	modal.classList.add('on');
	mainText.innerHTML = msg;

	if (option && typeof option == 'object') {
		for (let key in option) {
			switch (key) {
				case 'width':
					content.style.width = option[key];
					break;

				case 'title':
					top.classList.add('show');
					modalTitle.innerHTML = option[key];
					closeModal.classList.add('hide');
					break;

				case 'class':
					modal.classList.add(option[key]);
					break;

				case 'saveId':
					saveid = option[key];
					memory[saveid] = {};
					memory[saveid]['msg'] = msg;
					memory[saveid]['option'] = option;
					break;

				case 'button':
					if (bottom.querySelectorAll('button')) {
						bottom.querySelectorAll('button').forEach((el) => el.remove());
					}
					option[key].forEach((el) => {
						let button = document.createElement('button');
						for (let btnOpt in el) {
							switch (btnOpt) {
								case 'html':
									button.innerHTML = el[btnOpt];
									break;

								case 'click':
									button.addEventListener('click', el[btnOpt]);
									break;

								case 'id':
									button.setAttribute('id', el[btnOpt]);
									break;

								case 'class':
									button.className = el[btnOpt];
									break;

								default:
									break;
							}

							bottom.append(button);
						}
					});
					break;

				default:
					break;
			}
		}
	}
}

export function modalLoad_old(loadid) {
	if (memory[loadid]) {
		let msg = memory[loadid]['msg'];
		let option = memory[loadid]['option'];

		modalShow(msg, option);
	} else {
		console.error('There is no saved ID with this name! "' + loadid + '"');
	}
}

// modalShow('모달내용', {
// 	title: '제목',
// 	button: [
// 		{
// 			html: '확인버튼',
// 			click: () => {
// 				console.log('어쩌구저쩌구');
// 			},
// 			id: 'id',
// 			class: 'class',
// 		},
// 	],
// });
