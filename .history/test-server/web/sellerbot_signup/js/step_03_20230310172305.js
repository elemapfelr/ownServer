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
const funnel = document.querySelector('#funnel');

// 다음 버튼 활성화용 플래그
let flagObj = {
	bizNameFlag: false,
	bizNumFlag: false,
	userNameFlag: false,
	userPhone_2Flag: false,
	funnelFlag: false,
};
function flagChecker(flag, bool) {
	flagObj[flag] = bool;

	let notChecked = Object.keys(flagObj).find((key) => flagObj[key] === false);

	if (!notChecked) {
		document.querySelector('#nextStep').classList.add('active');
	} else {
		document.querySelector('#nextStep').classList.remove('active');
	}
}

bizName.addEventListener('keyup', () => {
	if (bizName.value) {
		document.querySelector('#msg1').style.display = 'none';
		flagChecker('bizNameFlag', true);
	} else {
		document.querySelector('#msg1').style.display = 'block';
		flagChecker('bizNameFlag', false);
	}
});

bizNum.addEventListener('keyup', () => {
	if (bizNum.value) {
		document.querySelector('#msg2').style.display = 'none';
		flagChecker('bizNumFlag', true);
	} else {
		document.querySelector('#msg2').innerHTML = '사업자번호를 입력해주세요';
		document.querySelector('#msg2').style.display = 'block';
		flagChecker('bizNumFlag', false);
	}
});

userName.addEventListener('keyup', () => {
	if (userName.value) {
		document.querySelector('#msg3').style.display = 'none';
		flagChecker('userNameFlag', true);
	} else {
		document.querySelector('#msg3').style.display = 'block';
		flagChecker('userNameFlag', false);
	}
});

userPhone_2.addEventListener('keyup', () => {
	if (userPhone_2.value) {
		document.querySelector('#msg4').style.display = 'none';
		flagChecker('userPhone_2Flag', true);
	} else {
		document.querySelector('#msg4').style.display = 'block';
		flagChecker('userPhone_2Flag', false);
	}
});

funnel.addEventListener('change', () => {
	if (funnel.value) {
		document.querySelector('#msg5').style.display = 'none';
		flagChecker('funnelFlag', true);
	} else {
		document.querySelector('#msg5').style.display = 'block';
		flagChecker('funnelFlag', false);
	}
});

document.querySelector('#nextStep').addEventListener('click', () => {
	if (!bizName.value) {
		bizName.focus();
		document.querySelector('#msg1').style.display = 'block';
		return false;
	}
	if (!bizNum.value) {
		bizNum.focus();
		document.querySelector('#msg2').style.display = 'block';
		return false;
	}
	if (document.querySelector('#bizNumCheck').dataset.verified !== 'true') {
		document.querySelector('#bizNum').focus();
		document.querySelector('#msg2').innerHTML = '사업자번호 중복확인을 해주세요.';
		document.querySelector('#msg2').style.display = 'block';
		return false;
	}
	if (!userName.value) {
		userName.focus();
		document.querySelector('#msg3').style.display = 'block';
		return false;
	}
	if (!userPhone_2.value) {
		userPhone_2.focus();
		document.querySelector('#msg4').style.display = 'block';
		return false;
	}
	if (!funnel.value) {
		funnel.focus();
		document.querySelector('#msg5').style.display = 'block';
		return false;
	}

	if (document.querySelector('#nextStep').classList.contains('active')) {
		location.href = './step_03.html';
	}
});

// 사업자번호 중복체크
document.querySelector('#bizNumCheck').addEventListener('click', () => {
	if (!bizNum.value) {
		// 미입력
		document.querySelector('#msg2').innerHTML = '사업자번호를 입력해주세요';
		document.querySelector('#msg2').style.display = 'block';
	} else if (bizNum.value.length < 10) {
		// 오입력 (10자리 미만)
		document.querySelector('#msg2').innerHTML = '사업자 번호가 정확하지 않습니다';
		document.querySelector('#msg2').style.display = 'block';
	}
	// else if () {
	// 유효하지 않을 경우
	// document.querySelector('#msg2').innerHTML = '휴업/폐업/정보없음';
	// document.querySelector('#msg2').style.display = 'block';
	// }
	else {
		// 유효함
		document.querySelector('#msg2').innerHTML = '사용 가능한 사업자번호입니다.';
		document.querySelector('#msg2').classList.add('blue');
		document.querySelector('#msg2').style.display = 'block';

		document.querySelector('#bizNumCheck').dataset.verified = 'true';
		document.querySelector('#bizNumCheck').style.pointerEvents = 'none';
		bizNum.setAttribute('disabled', true);
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
