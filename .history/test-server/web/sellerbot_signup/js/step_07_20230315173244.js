import createElement from './import/createElement.js';
import modalShow from './import/modalShow.js';

document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_06.html';
});

document.querySelector('#regAcc').addEventListener('click', () => {
	let popupHtml = `
    <div class="head">
		<h5>계좌정보 등록 <img id="regAccManual" src="./img/questionBtn.svg" alt="manual open"></h5>
		<img src="./img/sellerbotLogo.svg" alt="sellerbot cash">
	</div>
	<div class="body">
		<p>정산계좌 통합관리 서비스를 이용하시려면</p>
		<p class="red">은행별 홈페이지에서 빠른조회서비스 등록을 진행하신 후 계좌정보를 입력하셔야 합니다.</p>
        <form action="action.do">
			<div class="titleFlex">
				<p>은행명</p>
				<a href="#">선택은행 바로가기</a>
			</div>
			<div class="row">
				<select id="bankName">
					<option value="" selected>선택해주세요</option>
					<option value="신한">신한은행</option>
					<option value="국민">국민은행</option>
					<option value="농협">농협은행</option>
				</select>
			</div>
			<p>예금주</p>
			<div class="row">
				<input type="text" id="accUser" placeholder="예금주 입력">
			</div>
			<p>계좌번호</p>
			<div class="flexRow">
				<input type="text" id="accNum" class="onlyNumber" placeholder="계좌번호 입력">
				<button id="confirmAccNum">중복확인</button>
			</div>
			<p>계좌 비밀번호</p>
			<div class="row">
				<input type="text" id="accPw" class="onlyNumber" placeholder="계좌 비밀번호 입력">
			</div>
			<p>주민등록(사업자) 번호</p>
			<div class="row">
				<input type="text" id="bizNum" class="onlyNumber" placeholder="주민등록번호 앞 6자리 또는 사업자번호 10자리 입력">
			</div>
			<p>계좌 사업자 여부</p>
			<div class="row">
				<select id="accBizUserYN">
					<option value="" selected>선택해주세요</option>
				</select>
			</div>
		</form>
		<div class="bottomDiv">
			<button id="accTest" class="gray">계정테스트</button>
			<button id="closeModal" class="blue_outline">닫기</button>
			<button id="submit" class="blue">등록</button>
		</div>
	</div>`;
	modalShow({
		id: 'modal_01',
		content: popupHtml,
		function: () => {
			document.querySelector('#modal_01 #closeModal').addEventListener('click', () => {
				document.querySelector('#modal_01').remove();
				document.querySelector('body').style.overflow = '';
			});

			document.querySelector('#regAccManual').addEventListener('click', () => {
				let popupHtml2 = `
					<div class="popupWrap">
						<div class="grayBox">
							<p>정산계좌 통합관리 서비스를 이용하시려면 각 은행별 홈페이지에서 빠른조회서비스 등록을 진행하신 후 계좌정보를 입력하셔야 합니다. 하단의 은행명을 선택해주시면 은행별 빠른조회서비스 등록 절차를 확인하실 수 있습니다.</p>
						</div>
						<span class="line"></span>
						<p>KEB하나은행</p>
						<span class="line"></span>
						<pre>
						▣ 개인뱅킹

① KEB하나은행 홈페이지(<a href="http://www.kebhana.com">http://www.kebhana.com</a>)
에 접속

② 공인인증서를 통한 인터넷뱅킹에 로그인

③ 마이하나 &gt; 계좌정보관리 &gt; 빠른조회관리에서 신청
						</pre>
						<span class="line dot"></span>
						<pre>
						▣ 기업뱅킹

① KEB하나은행 홈페이지(<a href="http://www.kebhana.com">http://www.kebhana.com</a>)
에 접속

② 공인인증서를 통한 인터넷뱅킹에 로그인 - 기업/CMS 로 
분류되며, 
CMS인 경우 지점방문 후 신청해야 합니다.

③ 뱅킹관리 &gt; 계좌관리 &gt; 빠른조회계좌관리에서 신청
						</pre>
						<button class="blue_outline" id="closeModal2">닫기</button>
					</div>
				`;
				modalShow({
					id: 'modal_02',
					content: popupHtml2,
					function: () => {
						document
							.querySelector('#modal_02 #closeModal2')
							.addEventListener('click', () => {
								document.querySelector('#modal_02').remove();
							});
					},
				});
			});

			document.querySelector('#modal_01 #submit').addEventListener('click', () => {
				document.querySelector('#modal_01').remove();
				document.querySelector('body').style.overflow = '';

				let tr = createElement('tr');
				[
					`신한은행`,
					`11012349876`,
					`0원`,
					`없음`,
					`없음`,
					`<i class="fa-solid fa-circle-notch"></i> 업데이트 일자: 2023-01-01`,
				].forEach((el, idx) => {
					let td = createElement('td', {
						innerHTML: el,
					});
					tr.append(td);
					if (idx == 0) {
						td.dataset.bank = 'shinhan';
					}
				});
				document.querySelector('#accountList tbody').append(tr);
				if (document.querySelector('#accountList tbody').querySelector('.noData')) {
					document.querySelector('#accountList tbody').querySelector('.noData').remove();
				}
				tr.addEventListener('click', () => {
					document.querySelectorAll('#accountList tbody tr').forEach((el) => {
						el.classList.remove('active');
					});
					tr.classList.add('active');
				});
			});
		},
	});
});
