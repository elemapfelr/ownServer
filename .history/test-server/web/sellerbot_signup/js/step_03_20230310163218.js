import modalShow from './import/modalShow.js';

document.querySelector('#prevStep').addEventListener('click', () => {
	location.href = './step_02.html';
});

const bizName = document.querySelector('#bizName');
const bizNum = document.querySelector('#bizNum');
const userName = document.querySelector('#userName');
const userPhone_1 = document.querySelector('#userPhone_1');
const userPhone_2 = document.querySelector('#userPhone_2');
const talkTime_1 = document.querySelector('#talkTime_1');
const managerName = document.querySelector('#managerName');
const managerPhone_1 = document.querySelector('#managerPhone_1');
const managerPhone_2 = document.querySelector('#managerPhone_2');
const talkTime_2 = document.querySelector('#talkTime_2');

bizName.addEventListener('keyup', () => {
	document.querySelector('#msg1').style.display = 'none';
});

document.querySelector('#nextStep').addEventListener('click', () => {
	if (!bizName.value) {
		document.querySelector('#bizName').focus();
		document.querySelector('#msg1').style.display = 'block';
		return false;
	}
	if (!bizNum) {
	}

	if (document.querySelector('#nextStep').classList.contains('active')) {
		location.href = './step_03.html';
	}
});

document.querySelectorAll('#talkInfo').forEach((el) => {
	let talkInfoHtml = `
	<div class="wrapper">
	<div class="left">
		<img src="./img/talkInfoModal.jpg" alt="talkExample">
	</div>
	<div class="right">
		<div class="row flexRight">
			<img src="./img/sellerbotLogo.svg" alt="sellerbot">
		</div>
		<div class="flexRow">
			<h2>셀러봇캐시 알림톡</h2>
			<span class="line"></span>
		</div>
		<div class="row">
			<p>정산예정금을 판매몰별, 배송상태별, 일자별로 꼼꼼히 계산해서 지정하신 시간에 리포트를 보내드립니다.</p>
		</div>
		<div class="grayBox">
			<h3>셀러봇캐시 알림톡 체험</h3>
			<div class="flexRow">
				<select id="talk_userPhone_1">
					<option value="010" selected>010</option>
					<option value="011">011</option>
					<option value="016">016</option>
					<option value="017">017</option>
					<option value="018">018</option>
					<option value="019">019</option>
				</select>
				<input class="onlyNumber" type="text" id="talk_userPhone_2">
				<button>발송</button>
				<span class="underMsg">입력하신 연락처로 알림톡 SAMPLE 메세지가 발송됩니다.<br>
					( 샘플 발송 외 다른목적 사용 X )</span>
			</div>
		</div>
	</div>
</div>`;
	el.addEventListener('click', () => {
		modalShow({
			id: 'talkInfo',
			content: talkInfoHtml,
			function: () => {},
		});
	});
});

// 숫자만 입력 가능 🔢
document.querySelectorAll('.onlyNumber').forEach((el) => {
	el.addEventListener('keyup', () => {
		el.value = el.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
	});
});
