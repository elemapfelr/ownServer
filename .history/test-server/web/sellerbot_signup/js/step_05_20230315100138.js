import modalShow from './import/modalShow.js';
import createElement from './import/createElement.js';

document.querySelector('#mallGuide').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>판매몰 등록 가이드</h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>현재 판매하고 있는 쇼핑몰을 선택 후 등록가이드에 따라 등록해주세요.<br>등록이 어려우신 경우, 우측 하단의 '1:1상담톡'에서 문의주세요.</p>
		<span class="line"></span>
        <p>등록할 판매몰을 하단의 리스트에서 선택하여 추가해주세요.</p>
        <img src="./img/step_05_modal.png" alt="mallGuide">
		<span class="line"></span>
        <div class="flex">
        <p>1. 하단의 TOP10/이름순 항목에서 판매몰 리스트를 추가</p>
        <img class="arrow" src="./img/step_05_rightArrow.svg" alt="arrow">
        <p>2. 판매몰 등록/수정에서 업데이트</p>
        </div>
	</div>`;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {},
	});
});

document.querySelector('#nextStep').addEventListener('click', () => {
	location.href = './step_06.html';
});

(async () => {
	// 202212161513 수정
	// 브라우저 너비 별, 모달 크기 설정
	// ReiszeObserver가 body 크기 변화 감지
	const modalSize = {};
	const window_ro = new ResizeObserver((entries) => {
		for (let entry of entries) {
			const cr = entry.contentRect; // 감시 대상의 사이즈 정보를 가지고있는 객체
			if (cr.width < 860) {
				modalSize['smallSize'] = '90%';
				modalSize['mediumSize'] = '90%';
				modalSize['largeSize'] = '90%';
			} else {
				modalSize['smallSize'] = '280px';
				modalSize['mediumSize'] = '365px';
				modalSize['largeSize'] = '465px';
			}
		}
	});
	window_ro.observe(document.querySelector('body'));

	modalInit();
	let total = document.querySelector('.bottomBar #total');
	let reg = document.querySelector('.bottomBar #reg');
	let mod = document.querySelector('.bottomBar #mod');

	const userMallData = await fetch('/userMall.json')
		.then((res) => res.json())
		.then((data) => {
			return data;
		})
		.catch((error) => {
			console.error(error);
		});

	const openedMallData = await fetch('/openedMall.json')
		.then((res) => res.json())
		.then((data) => {
			data.forEach((el) => {
				el['count'] = 0;
			});
			return data;
		})
		.catch((error) => {
			console.error(error);
		});

	const beOpenedMallData = await fetch('/beOpenedMall.json')
		.then((res) => res.json())
		.then((data) => {
			data.forEach((el) => {
				el['count'] = 0;
			});
			return data;
		})
		.catch((error) => {
			console.error(error);
		});

	const mallModRegNoDataText = document.querySelector(
		'#article_2 .flexArea .left .contents h3.noDataText'
	);
	const mallModRegObj = {
		num: {
			reg: 0,
			mod: 0,
		},
	};

	// 202212161513 수정
	const bottomBar = document.querySelector('.bottomBar');
	bottomBar.querySelector('#hideBottomBar').addEventListener('click', () => {
		bottomBar.classList.remove('show');
	});
	bottomBar.querySelector('#closeBottomBar').addEventListener('click', () => {
		bottomBar.classList.remove('show');
	});

	// 판매몰 등록/수정 카드 삭제단계를 여기서 처리
	function bottomBarShow(action) {
		let mallObj = mallModRegObj['num'];
		switch (action) {
			case 'reg':
				mallObj['reg']++;
				reg.innerHTML = mallObj['reg'];
				mod.innerHTML = mallObj['mod'];
				total.innerHTML = mallObj['reg'] + mallObj['mod'];
				mallModRegNoDataText.classList.add('hide');
				bottomBar.classList.add('show');
				break;

			case 'mod':
				mallObj['mod']++;
				reg.innerHTML = mallObj['reg'];
				mod.innerHTML = mallObj['mod'];
				total.innerHTML = mallObj['reg'] + mallObj['mod'];
				mallModRegNoDataText.classList.add('hide');
				bottomBar.classList.add('show');
				break;

			case 'regMinus':
				mallObj['reg']--;
				reg.innerHTML = mallObj['reg'];
				mod.innerHTML = mallObj['mod'];
				total.innerHTML = mallObj['reg'] + mallObj['mod'];
				if (mallObj['reg'] == 0 && mallObj['mod'] == 0) {
					mallModRegNoDataText.classList.remove('hide');
				}
				break;

			case 'modMinus':
				mallObj['mod']--;
				reg.innerHTML = mallObj['reg'];
				mod.innerHTML = mallObj['mod'];
				total.innerHTML = mallObj['reg'] + mallObj['mod'];
				if (mallObj['reg'] == 0 && mallObj['mod'] == 0) {
					mallModRegNoDataText.classList.remove('hide');
				}
				break;

			default:
				break;
		}
	}

	// 등록 판매몰 리스트 생성
	function userMallListMaker() {
		let article = document.querySelector('article#article_0');
		let mallUl = article.querySelector('.listWrap ul');
		// ul은 데스크탑, ol은 모바일전용
		let mallOl = article.querySelector('.listWrap ol');

		if (userMallData !== null && userMallData.length > 0) {
			//데스크탑
			userMallData.forEach((el) => {
				let li = createElement('li', {
					class: el['cust_mall_sts_cd'],
					data: {
						seq_no: el['cust_mall_seq_no'],
					},
				});
				let dd_0 = createElement('dd', {
					class: 'status',
				});
				let span = createElement('span');
				dd_0.append(span);
				let dd_1 = createElement('dd', {
					html: el['mall_cd_nm'],
				});
				let dd_2 = createElement('dd', {
					html: el['mall_cert_1st_id'],
				});
				let dd_3 = createElement('dd');
				if (el['cert_step'] > 0) {
					dd_3.classList.add('extraInfo');
					if (el['cert_step'] == 1) {
						dd_3.dataset.infoKey = '업체번호';
						dd_3.innerHTML = el['sub_mall_cert_1st'];
					} else if (el['cert_step'] == 2) {
						dd_3.dataset.infoKey = '업체번호 / 부계정';
						dd_3.innerHTML = el['sub_mall_cert_1st'] + '/' + el['sub_mall_cert_2nd'];
					}
				}
				let dd_4 = createElement('dd', {
					class: 'logos',
				});
				if (el['loan_cust_use_info'] !== null) {
					if (el['loan_cust_use_info'].length > 0) {
						let moreLogo = createElement('div', {
							class: 'moreLogo',
						});
						if (el['loan_cust_use_info'].length > 3) {
							dd_4.classList.add('more');
							dd_4.append(moreLogo);
						}
						el['loan_cust_use_info'].forEach((el2, idx2) => {
							let imgDiv = createElement('div', {
								class: 'imgDiv',
							});
							let img = createElement('img', {
								src: el2['logo_path'],
								alt: el2['svc_id'],
							});
							imgDiv.append(img);
							switch (el2['svc_id']) {
								case 'kcbkbbank':
									imgDiv.dataset.logoName = 'KB 국민은행';
									break;

								case 'sodeone':
									imgDiv.dataset.logoName = '소드원쇼핑몰론';
									break;

								case 'kcbshinhan':
									imgDiv.dataset.logoName = '신한은행';
									break;

								default:
									break;
							}
							if (idx2 > 2) {
								moreLogo.append(imgDiv);
							} else {
								dd_4.append(imgDiv);
							}
						});
					}
				}
				let dd_5 = createElement('dd', {
					class: 'tip',
					html: el['scra_err_cd_nm'] ?? '',
				});
				if (el['scra_err_cd_desc'] !== null) {
					dd_5.classList.add('msg');
					dd_5.dataset.msg = el['scra_err_cd_desc'];
				}
				let dd_6 = createElement('dd', {
					class: 'btns',
				});
				let modLi = createElement('button', {
					id: 'modLi',
					html: '수정',
				});
				let delLi = createElement('button', {
					id: 'delLi',
					html: '삭제',
				});
				dd_6.append(modLi, delLi);
				li.append(dd_0, dd_1, dd_2, dd_3, dd_4, dd_5, dd_6);
				mallUl.append(li);
			});

			//모바일
			userMallData.forEach((el) => {
				let li = createElement('li', {
					class: el['cust_mall_sts_cd'],
					data: {
						seq_no: el['cust_mall_seq_no'],
					},
				});

				let top = createElement('div', {
					class: 'top',
				});
				li.append(top);
				let p = createElement('p', {
					html: el['mall_cd_nm'],
				});
				let span = createElement('span');
				top.append(p, span);

				let mid = createElement('div', {
					class: 'mid',
				});
				li.append(mid);

				let row_0 = createElement('div', {
					class: 'row',
				});
				let row_0_dt = createElement('dt', {
					html: '아이디',
				});
				let row_0_dd = createElement('dd', {
					html: el['mall_cert_1st_id'],
				});
				row_0.append(row_0_dt, row_0_dd);
				mid.append(row_0);

				let row_1 = createElement('div', {
					class: 'row',
				});
				mid.append(row_1);
				let row_1_dt = createElement('dt', {
					html: '부가정보',
				});
				let row_1_dd = createElement('dd');
				row_1.append(row_1_dt, row_1_dd);
				if (el['cert_step'] > 0) {
					let text = '';
					if (el['cert_step'] == 1) {
						text += `업체번호 ${el['sub_mall_cert_1st']}`;
					} else if (el['cert_step'] == 2) {
						text += `업체번호 ${el['sub_mall_cert_1st']} <br> 부계정 ${el['sub_mall_cert_2nd']}`;
					}
					row_1_dd.innerHTML = text;
				}

				let row_2 = createElement('div', {
					class: 'row logos',
				});
				mid.append(row_2);
				let imgDt = createElement('dt', {
					html: '제휴서비스',
				});
				let imgDd = createElement('dd', {
					html: '',
				});
				row_2.append(imgDt, imgDd);
				if (el['loan_cust_use_info'] !== null) {
					if (el['loan_cust_use_info'].length > 0) {
						el['loan_cust_use_info'].forEach((el2, idx2) => {
							let imgDiv = createElement('div', {
								class: 'imgDiv',
							});
							let img = createElement('img', {
								src: el2['logo_path'],
								alt: el2['svc_id'],
							});
							imgDiv.append(img);
							switch (el2['svc_id']) {
								case 'kcbkbbank':
									imgDiv.dataset.logoName = 'KB 국민은행';
									break;

								case 'sodeone':
									imgDiv.dataset.logoName = '소드원쇼핑몰론';
									break;

								case 'kcbshinhan':
									imgDiv.dataset.logoName = '신한은행';
									break;

								default:
									break;
							}
							imgDd.append(imgDiv);
						});
					}
				}

				let row_3 = createElement('div', {
					class: 'row',
				});
				mid.append(row_3);
				let row_3_dt = createElement('dt', {
					html: 'TIP',
				});
				let row_3_dd = createElement('dd', {
					html: el['scra_err_cd_nm'] ?? '',
				});
				row_3.append(row_3_dt, row_3_dd);

				let bot = createElement('div', {
					class: 'bot',
				});
				li.append(bot);
				let b = createElement('b', {
					html: '관리',
				});
				let btns = createElement('div', {
					class: 'btns',
				});
				bot.append(b, btns);
				let modLi = createElement('button', {
					id: 'modLi',
					html: '수정',
				});
				let delLi = createElement('button', {
					id: 'delLi',
					html: '삭제',
				});
				btns.append(modLi, delLi);

				mallOl.append(li);
			});
		} else {
			// 데이터가 없을경우
			let h3 = createElement('h3', {
				class: 'noDataText',
				html: '등록한 판매몰이 없습니다.<br>등록할 판매몰을 [ 지원 판매몰 리스트 ] 에서 선택해주세요.', // 20221229 수정
			});
			let h3_copy = h3.cloneNode(true);
			mallUl.append(h3);
			mallOl.append(h3_copy);
		}
	}
	userMallListMaker();

	// 지원 판매몰 리스트 생성
	function mallListMaker() {
		let article = document.querySelector('article#article_1');
		let top10 = article.querySelector('#top10 .gridArea');
		let allMalls = article.querySelector('#allMalls .gridArea');
		openedMallData.forEach((el) => {
			let item = createElement('div', {
				class: 'item',
				data: {
					mallcd: el['mallcd'],
				},
			});
			let img = createElement('img', {
				src: el['logo_path'],
				alt: '몰 로고',
			});
			let b = createElement('b', {
				html: el['mall_name'],
			});
			item.append(img, b);
			allMalls.append(item);

			if (el['top'] == true) {
				let item2 = item.cloneNode(true);
				top10.append(item2);
			}
		});
	}
	mallListMaker();

	//KB 매출더하기론 판매몰 관리 버튼
	document.querySelector('button.kbBtn').addEventListener('click', () => {
		let html =
			'<p style="text-align: left;">KB매출더하기론 대출을 이용하는 고객은 대출 대상의 판매몰을 선택, 해지 할 수 있습니다.</p>';

		modalShow(html, {
			width: modalSize['mediumSize'],
			title: 'KB매출더하기론 대출판매몰 관리',
			button: [
				{
					html: '닫기',
					click: modalHide,
					class: 'silver',
				},
				{
					html: '저장',
					click: () => {
						// 저장을 눌렀을 때 콜백
						console.log('kb매출더하기론 저장');
						modalHide();
					},
					class: 'blue',
				},
			],
		});
	});

	// statusBtns 클릭
	document.querySelectorAll('.statusBtns button').forEach((el, idx, arg) => {
		el.addEventListener('click', () => {
			arg.forEach((el2) => el2.classList.remove('on'));
			el.classList.add('on');
		});
	});

	// 판매몰 제휴서비스 더보기 버튼
	if (document.querySelectorAll('dd.logos.more')) {
		document.querySelectorAll('dd.logos.more').forEach((el) => {
			el.addEventListener('click', () => {
				if (!el.classList.contains('show')) {
					el.classList.add('show');
				} else {
					el.classList.remove('show');
				}
			});
		});
	}

	//등록한 판매몰 전체보기 버튼
	document.querySelector('#showListBtn').addEventListener('click', (e) => {
		let target = e.target;
		const listWrap = document.querySelector('#article_0 .listWrap');
		if (listWrap.classList.contains('open')) {
			// 전체보기 상태일경우
			listWrap.classList.remove('open');
			target.innerHTML = '<b>전체보기</b>';
			target.classList.remove('open');
			window.scrollTo({
				top: document.querySelector('#article_0').offsetTop,
			});
		} else {
			// 접혀있는 상태일경우
			listWrap.classList.add('open');
			target.innerHTML = '<b>접기</b>';
			target.classList.add('open');
		}
	});

	// 판매몰 별 관리 -> 삭제 버튼 클릭
	document.querySelectorAll('#delLi').forEach((el) => {
		el.addEventListener('click', () => {
			modalShow('<p>계정을 삭제하시겠습니까?</p>', {
				width: modalSize['smallSize'],
				button: [
					{
						html: '취소',
						click: modalHide,
						class: 'silver',
					},
					{
						html: '확인',
						click: () => {
							// 삭제확인을 눌렀을 때 콜백
							console.log('계정 삭제');
							modalHide();
						},
						class: 'blue',
					},
				],
			});
		});
	});

	// 판매몰 별 관리 -> 수정 버튼 클릭
	document.querySelectorAll('#modLi').forEach((modLi) => {
		modLi.addEventListener('click', () => {
			let targetLi = modLi.parentNode.parentNode;
			if (targetLi.classList.contains('bot')) {
				// 모바일 예외처리
				targetLi = modLi.parentNode.parentNode.parentNode;
			}
			let seqNo = targetLi.dataset.seq_no;

			// 이미 클릭한 아이템일 경우
			if (document.querySelectorAll('.modifyArea .modifyBox')) {
				let stopFlag = false;
				document.querySelectorAll('.modifyArea .modifyBox').forEach((el) => {
					if (seqNo == el.dataset.seq_no) {
						modalShow('이미 리스트에 추가되어 있습니다', {
							width: modalSize['smallSize'],
							button: [
								{
									html: '확인',
									click: modalHide,
									class: 'silver',
								},
							],
						});
						stopFlag = true;
					}
				});

				if (stopFlag == true) {
					return false;
				}
			}

			userMallData.forEach((el) => {
				if (el['cust_mall_seq_no'] == seqNo) {
					let modifyBox = createElement('div', {
						class: 'modifyBox',
						data: {
							seq_no: seqNo,
						},
					});
					document.querySelector('.modifyArea').append(modifyBox);
					let main = createElement('div', {
						class: 'main',
					});
					let modifyOkBtn = createElement('button', {
						id: 'modifyOkBtn',
						html: '확인',
					});
					modifyBox.append(main, modifyOkBtn);
					let top = createElement('div', {
						class: 'top',
					});
					let smallLine = createElement('span', {
						class: 'smallLine',
					});
					let middle = createElement('div', {
						class: 'middle',
					});
					let errorMsg = createElement('p', {
						class: 'errorMsg',
						html: el['scra_err_cd_desc'] ?? '<br>',
					});
					main.append(top, smallLine, middle, errorMsg);
					let b = createElement('b', {
						id: 'mallName',
						html: el['mall_cd_nm'],
					});
					let img = createElement('img', {
						class: 'mallLogo',
						src: `https://www.sellerbot.co.kr/imagefile/${el['stor_path']}${el['stor_file_nm']}`,
						alt: '몰 로고',
					});
					top.append(b, img);
					if (el['scra_err_cd_nm'] !== null) {
						let span = createElement('span', {
							class: `msg ${el['cust_mall_sts_cd']}`,
							html: el['scra_err_cd_nm'],
						});
						top.append(span);
					} else {
						let span = createElement('span', {
							class: `msg`,
							html: '',
						});
						top.append(span);
					}
					let button = createElement('button', {
						id: 'deleteItem',
					});
					top.append(button);
					let btnImg = createElement('img', {
						src: '/img/xmark.svg',
						alt: 'xmark',
					});
					button.append(btnImg);
					let inputArr = [
						{
							p: '아이디',
							p_checker: false,
						},
						{
							p: '비밀번호',
							p_checker: false,
						},
						{
							p: '업체번호',
							p_checker: true,
						},
						{
							p: '공급계약일련번호',
							p_checker: false,
						},
						{
							p: '주요 판매 품목',
							p_checker: false,
						},
					];
					for (let obj of inputArr) {
						let item = createElement('div', {
							class: 'item',
						});
						middle.append(item);
						let p = createElement('p', {
							html: obj['p'],
						});
						if (obj['p_checker'] == true) {
							p.classList.add('checkNeed');
							p.innerHTML = obj['p'] + '<b>확인</b>';
						}
						item.append(p);
						if (obj['p'] == '주요 판매 품목') {
							let select = createElement('select', {
								id: 'sellProduct',
							});
							let option = createElement('option', {
								html: '의류',
								value: '의류',
							});
							select.append(option);
							item.append(select);
						} else {
							let input = createElement('input', {
								type: 'text',
							});
							item.append(input);
						}
					}

					// 202212161513 수정
					modifyBox.addEventListener('click', () => {
						if (document.querySelector('.registerArea .registerBox.active')) {
							document
								.querySelector('.registerArea .registerBox.active')
								.classList.remove('active');
						}
						if (document.querySelector('.modifyArea .modifyBox.active')) {
							document
								.querySelector('.modifyArea .modifyBox.active')
								.classList.remove('active');
						}
						modifyBox.classList.add('active');
					});

					modifyBox.querySelector('#deleteItem').addEventListener('click', (e) => {
						// 202212221034 수정
						e.stopPropagation();
						bottomBarShow('modMinus');
						modifyBox.remove();
					});

					// 수정 버튼 클릭 시
					modifyOkBtn.addEventListener('click', () => {
						// 유효성 체크
						let inputArr = modifyBox.querySelectorAll('.main .middle .item input');
						for (let input of inputArr) {
							if (input.value == '' || input.value == null) {
								let text = input.parentNode.querySelector('p').innerHTML;
								modalShow(`${text} 을/를 입력해주세요`, {
									width: modalSize['smallSize'],
									button: [
										{
											html: '확인',
											class: 'silver',
											click: () => {
												input.focus();
												modalHide();
											},
										},
									],
								});
								return false;
							}
						}
					});
				}
			});

			mallModRegObj['num']['mod'] = mallModRegObj['num']['mod']++;
			bottomBarShow('mod');
		});
	});

	// 판매몰 등록 추가 함수
	function addMallCard(data) {
		let registerBox = createElement('div', { class: 'registerBox' });
		document.querySelector('.registerArea').append(registerBox);
		let main = createElement('div', { class: 'main' });
		let registerOkBtn = createElement('button', {
			id: 'registerOkBtn',
			html: '확인',
		});
		registerBox.append(main, registerOkBtn);
		let top = createElement('div', { class: 'top' });
		let smallLine = createElement('span', { class: 'smallLine' });
		let middle = createElement('div', { class: 'middle' });
		let errorMsg = createElement('p', {
			class: 'errorMsg',
			html: data['scra_err_cd_desc'] ?? '<br>',
		});
		main.append(top, smallLine, middle, errorMsg);
		let top_b = createElement('b', {
			id: 'mallName',
			html: data['mall_name'],
		});
		let top_img = createElement('img', {
			class: 'mallLogo',
			src: data['logo_path'],
			alt: '몰 로고',
		});
		let top_msg = createElement('span', {
			class: 'msg',
		});
		if (data['scra_err_cd_nm'] !== null) {
			top_msg.classList.add(data['cust_mall_sts_cd']);
			top_msg.innerHTML = data['scra_err_cd_nm'] ?? '';
		} else {
			top_msg.innerHTML = '';
		}
		let delBtn = createElement('button', {
			id: 'deleteItem',
			html: '<img src="/img/xmark.svg" alt="xmark">',
		});
		top.append(top_b, top_img, top_msg, delBtn);
		let inputArr = [
			{
				// 20221229 수정 여기부터
				p: '몰 인증 유형',
				p_checker: false,
				id: 'mall_verify_type',
				// 20221229 수정 여기까지
			},
			{
				p: '아이디',
				p_checker: false,
				id: 'id',
			},
			{
				p: '비밀번호',
				p_checker: false,
				id: 'pw',
			},
			{
				p: 'API 연동용 판매자 ID',
				p_checker: true,
				id: 'appId',
			},
			{
				p: '부계정',
				p_checker: true,
				id: 'subId',
			},
			{
				p: '공급계약일련번호',
				p_checker: false,
				id: 'supplyContractSeqNo',
			},
			{
				p: '주요 판매 품목',
				p_checker: false,
				id: 'sellingItem',
			},
		];
		inputArr.forEach((el) => {
			let item = createElement('div', { class: 'item' });
			middle.append(item);
			let p = createElement('p', { html: el['p'] });
			item.append(p);
			if (el['p_checker'] == true) {
				p.classList.add('checkNeed');
				p.innerHTML = el['p'];
			}
			// 20221229 수정 여기부터
			if (el['p'] == '몰 인증 유형') {
				item.classList.add('row_100');
				let select = createElement('select', {
					id: el['id'],
				});
				let option = createElement('option', {
					html: '네이버 아이디',
					value: '네이버 아이디',
				});
				select.append(option);
				item.append(select);
				// 20221229 수정 여기까지
			} else if (el['p'] == '주요 판매 품목') {
				let select = createElement('select', {
					id: el['id'],
				});
				let option = createElement('option', {
					html: '의류',
					value: '의류',
				});
				select.append(option);
				item.append(select);
			} else {
				let input = createElement('input', {
					id: el['id'],
					type: 'text',
				});
				item.append(input);
			}
		});

		// 202212161513 수정
		registerBox.addEventListener('click', () => {
			// 클릭시 active class추가
			if (document.querySelector('.registerArea .registerBox.active')) {
				document
					.querySelector('.registerArea .registerBox.active')
					.classList.remove('active');
			}
			if (document.querySelector('.modifyArea .modifyBox.active')) {
				document.querySelector('.modifyArea .modifyBox.active').classList.remove('active');
			}
			registerBox.classList.add('active');

			if (window.innerWidth < 860) {
				const thisTop = registerBox.offsetTop;
				const parentTop = document.querySelector('#article_2 .left .contents').offsetTop;

				document.querySelector('#article_2 .left .contents').scrollTo({
					top: thisTop - parentTop,
				});
				window.scrollTo({
					top: parentTop,
				});
				const viewportTop = registerBox.getBoundingClientRect().top;
				window.scrollBy({
					top: viewportTop,
				});
			}
		});

		// 202212221034 수정
		delBtn.addEventListener('click', (e) => {
			e.stopPropagation();
		});

		registerBox.querySelector('#deleteItem').addEventListener('click', () => {
			beOpenedMallData.forEach((el) => {
				if (el['mallcd'] == data['mallcd']) {
					el['count']--;
				}
			});
			openedMallData.forEach((el) => {
				if (el['mallcd'] == data['mallcd']) {
					el['count']--;
					syncCount();
				}
			});
			bottomBarShow('regMinus');
			registerBox.remove();
		});

		// 확인 버튼 클릭 시
		registerOkBtn.addEventListener('click', () => {
			// 유효성 체크
			let inputArr = registerBox.querySelectorAll('.main .middle .item input');
			for (let input of inputArr) {
				if (input.value == '' || input.value == null) {
					let text = input.parentNode.querySelector('p').innerHTML;
					modalShow(`${text} 을/를 입력해주세요`, {
						width: modalSize['smallSize'],
						button: [
							{
								html: '확인',
								class: 'silver',
								click: () => {
									input.focus();
									modalHide();
								},
							},
						],
					});
					return false;
				}
			}
		});
	}

	// 지원 판매몰 리스트 -> 오픈예정몰 버튼 클릭
	document.querySelector('#beOpenedBtn').addEventListener('click', () => {
		let html = `
            <h2>오픈예정몰 사전등록</h2>
            <br>
            <h3>[아래 리스트에서 판매몰을 선택해주세요]</h3>
            <br>
            <h4>오픈 준비 중인 판매몰을 미리 등록하시면<br>
            추후 오픈 시 정산예정금 정보를 바로 확인하실 수 있습니다.<br>
            (등록한 오픈예정몰 계정 확인 → 등록한 판매몰)</h4>
            <br>
            <div id="beOpenedMallList" class="scrollable">`;
		beOpenedMallData.forEach((el) => {
			let string;
			if (el['count'] > 0) {
				string = `<div class="item on" data-mallcd="${el['mallcd']}" data-num="${el['count']}">`;
			} else {
				string = `<div class="item" data-mallcd="${el['mallcd']}">`;
			}
			string += `
                        <img src="${el['logo_path']}" alt="몰 로고">
                        <b>${el['mall_name']}</b>
                    </div>
                    `;
			html += string;
		});

		html += '</div>';

		modalShow(html, {
			width: modalSize['largeSize'],
			class: 'beOpenedModal',
			saveId: 'openMall',
			button: [
				{
					html: '닫기',
					class: 'dark',
					click: modalHide,
				},
			],
		});

		// 오픈예정몰 각 판매몰 클릭시
		document.querySelectorAll('#beOpenedMallList .item').forEach((el, idx) => {
			el.addEventListener('click', () => {
				let count = el.dataset.num ?? 0;
				el.classList.add('on');
				el.dataset.num = parseInt(count) + 1;
				beOpenedMallData.forEach((el2) => {
					if (el2['mallcd'] == el.dataset.mallcd) {
						el2['count']++;
						bottomBarShow('reg');
						addMallCard(el2);
					}
				});
			});
		});
	});

	// top10 및 전체 몰 클릭 시
	const allMalls = document.querySelectorAll('#allMalls .gridArea .item');
	const top10 = document.querySelectorAll('#top10 .gridArea .item');
	const mallsArr = [...allMalls, ...top10];
	mallsArr.forEach((el) => {
		el.addEventListener('click', () => {
			openedMallData.forEach((el2) => {
				if (el2['mallcd'] == el.dataset.mallcd) {
					el2['count']++;
					syncCount();
					bottomBarShow('reg');
					addMallCard(el2);
				}
			});
		});
	});

	// 클릭 카운트 싱크 맞추는 함수
	function syncCount() {
		let allMalls = document.querySelectorAll('#allMalls .gridArea .item');
		let top10 = document.querySelectorAll('#top10 .gridArea .item');
		let mallsArr = [...allMalls, ...top10];
		openedMallData.forEach((el) => {
			mallsArr.forEach((el2) => {
				if (el['mallcd'] == el2.dataset.mallcd) {
					if (el['count'] !== el2.dataset.num) {
						el2.dataset.num = el['count'];
						if (el['count'] > 0) {
							el2.classList.add('on');
						} else {
							el2.classList.remove('on');
						}
					}
				}
			});
		});
	}

	// 판매몰 등록/수정 초기화 버튼 클릭 시
	document.querySelector('#article_2 #initialize').addEventListener('click', () => {
		if (
			document.querySelector('#article_2 .flexArea .left .contents .modifyArea .modifyBox') ||
			document.querySelector(
				'#article_2 .flexArea .left .contents .registerArea .registerBox'
			)
		) {
			function initialize() {
				document
					.querySelectorAll('#article_2 .flexArea .left #deleteItem')
					.forEach((el) => {
						el.click();
					});
				modalHide();
				mallModRegNoDataText.classList.remove('hide');
			}
			modalShow('정말 초기화 하시겠습니까?', {
				width: modalSize['smallSize'],
				button: [
					{
						html: '취소',
						class: 'silver',
						click: modalHide,
					},
					{
						html: '초기화',
						class: 'dark',
						click: initialize,
					},
				],
			});
		} else {
			modalShow('초기화할 데이터가 없습니다!', {
				width: modalSize['smallSize'],
				button: [
					{
						html: '확인',
						class: 'silver',
						click: modalHide,
					},
				],
			});
		}
	});

	// bottomBar의 바로가기 버튼 클릭 시
	document.querySelector('#goto').addEventListener('click', () => {
		window.scrollTo({
			top: document.querySelector('#article_2').offsetTop,
			behavior: 'smooth',
		});
		bottomBar.classList.remove('show');
	});

	// Top 버튼 클릭 시
	document.querySelector('#goTop').addEventListener('click', () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});

	// 20221226 수정
	// 판매몰 도움말 버튼 클릭시 "등록 방법" <-> "오류 안내" 전환 기능
	const manualBtn = document.querySelector('#article_2 .flexArea .right .topTitle button');
	manualBtn.addEventListener('click', (e) => {
		if (e.target.classList.contains('reg')) {
			e.target.className = 'err';
			e.target.innerHTML = '오류 안내';
			// 오류 안내 도움말 표시 callback
		} else {
			e.target.className = 'reg';
			e.target.innerHTML = '등록 방법';
			// 등록 방법 도움말 표시 callback
		}
	});
})();
