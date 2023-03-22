import createElement from './import/createElement.js';
import modalShow from './import/modalShow.js';

document.querySelector('#confirm').addEventListener('click', () => {
	location.href = '/step_04.html';
});

document.querySelectorAll('.mallList .gridArea .mall').forEach((el) => {
	el.addEventListener('click', () => {
		let mallLogoSrc = el.querySelector('img').getAttribute('src');
		let mallName = el.querySelector('p.mallName').innerHTML;

		let modifyItemModalHtml = createElement('div', {
			className: 'modifyItemModal',
		});

		let h1 = createElement('h1', {
			innerHTML: '계정입력',
		});

		let mallLogoImg = createElement('img', {
			className: 'mallLogo',
			src: mallLogoSrc,
			alt: 'mallLogo',
		});

		let mallNameSmall = createElement('small', {
			className: 'mallName',
			innerHTML: mallName,
		});

		let textArea = createElement('div', {
			className: 'textBox',
		});

		let pre = createElement('pre', {
			innerHTML: `▼세부정보
				[TIP]
				1)무신사 파트너사이트 로그인
				2)[My Menu] - [QR CODE] 클릭
				3)QR CODE 클릭 → 이미지 마우스 우클릭 → 이미지를 다른 이름으로 저장
				4)셀러봇캐시  → 판매몰관리  → 전문몰  →무신사
				5)ID/PW/ 입력, 저장한 QR CODE 파일 등록
				6)입력완료`,
		});
		textArea.append(pre);

		let row_1 = createElement('div', {
			className: 'row',
		});
		let idTitle = createElement('p', {
			className: 'title essential',
			innerHTML: '아이디',
		});
		let idInput = createElement('input', {
			type: 'text',
			id: 'id',
			placeholder: '아이디 입력',
		});
		let idErrMsg = createElement('span', {
			className: 'errMsg',
			innerHTML: '아이디를 입력하세요',
		});
		row_1.append(idInput, idErrMsg);

		let row_2 = createElement('div', {
			className: 'row',
		});
		let pwTitle = createElement('p', {
			className: 'title essential',
			innerHTML: '비밀번호 확인',
		});
		let pwInput = createElement('input', {
			type: 'password',
			id: 'pw',
			placeholder: '비밀번호 입력',
		});
		let pwErrMsg = createElement('span', {
			className: 'errMsg',
			innerHTML: '비밀번호를 입력하세요',
		});
		row_2.append(pwInput, pwErrMsg);

		let row_3 = createElement('div', {
			className: 'row spaceBetween',
		});
		let otpTitle = createElement('p', {
			className: 'title essential',
			innerHTML: 'OTP인증',
		});
		let otpInput = createElement('input', {
			type: 'password',
			id: 'otp',
			disabled: true,
		});
		let qrBtn = createElement('button', {
			id: 'regQR',
			innerHTML: 'QR등록',
		});
		let otpErrMsg = createElement('span', {
			className: 'errMsg',
			innerHTML: 'OTP 인증이 유효하지 않습니다',
		});
		row_3.append(otpInput, qrBtn, otpErrMsg);

		let row_4 = createElement('div', {
			className: 'row',
		});
		let categoryTitle = createElement('p', {
			className: 'title essential',
			innerHTML: '카테고리',
		});
		let categorySelect = createElement('select', {
			id: 'category',
			innerHTML: '<option value="" selected>카테고리 선택</option>',
		});
		['아이템1', '아이템2', '아이템3', '아이템4', '아이템5'].forEach((el) => {
			let option = createElement('option', {
				innerHTML: el,
				value: el,
			});
			categorySelect.append(option);
		});
		let categoryErrMsg = createElement('span', {
			className: 'errMsg',
			innerHTML: '카테고리를 선택하세요',
		});
		row_4.append(categorySelect, categoryErrMsg);

		modifyItemModalHtml.append(
			h1,
			mallLogoImg,
			mallNameSmall,
			textArea,
			idTitle,
			row_1,
			pwTitle,
			row_2,
			otpTitle,
			row_3,
			categoryTitle,
			row_4
		);

		modalShow({
			id: 'regItem',
			content: modifyItemModalHtml.outerHTML,
			btns: [
				{
					text: '입력완료',
					callback: () => {
						const item = createElement('div', {
							className: 'item',
						});
						const left = createElement('div', {
							className: 'left',
						});
						const right = createElement('div', {
							className: 'right',
						});
						const mallName = createElement('p', {
							className: 'mallName',
							innerHTML: el.querySelector('p.mallName').innerHTML,
						});
						const userId = createElement('small', {
							className: 'userId',
							innerHTML: 'User ID',
						});
						const modBtn = createElement('button', {
							id: 'modItem',
							innerHTML: '수정',
						});
						const delBtn = createElement('button', {
							id: 'delItem',
							innerHTML: '삭제',
						});
						item.append(left, right);
						left.append(mallName, userId);
						right.append(modBtn, delBtn);

						document.querySelector('.regItems .regList').append(item);

						delBtn.addEventListener('click', () => {
							modalShow({
								id: 'alert',
								content:
									'<p>쇼핑몰 수정 및 삭제는<br>셀러봇캐시 홈페이지에서 가능합니다.</p>',
								btns: [
									{
										text: '확인',
										callback: () => {},
										cancelModal: true,
									},
								],
							});
						});

						modBtn.addEventListener('click', () => {
							modalShow({
								id: 'alert',
								content:
									'<p>쇼핑몰 수정 및 삭제는<br>셀러봇캐시 홈페이지에서 가능합니다.</p>',
								btns: [
									{
										text: '확인',
										callback: () => {},
										cancelModal: true,
									},
								],
							});
						});
					},
					cancelModal: true,
				},
			],
		});
	});
});
