const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const config = require('./config');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const tokenInfo = require('./jsModule/tokenInfo');
const { default: axios } = require('axios');
const ejs = require('ejs');

// const menuData = fs.readFileSync('menuData.json', 'utf8');

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static(__dirname + '/views'));

app.listen(80, () => {
	console.log(`Server listening on http://localhost:29100`);
});

// API 요청 시
app.use('/api/v1', require('./api/v1'));

// SSH 요청 처리
app.use('/ssh/ssh', require('./ssh/ssh'));

// hiworks 로그인 처리
app.use('/api/hiworksLogin', require('./api/hiworksLogin'));

// ejs 세팅 (default)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

function loginValidChecker(req) {
	if (req.cookies['access_token']) {
		let expireTime = JSON.parse(
			Buffer.from(tokenInfo.extract(req.cookies['access_token']), 'base64').toString('utf8')
		)['exp'];
		// 토큰 만료시 false, 정상이면 true 반환
		return new Date(expireTime) > new Date();
	} else {
		// 토큰 없을 시 false 반환
		return false;
	}
}

async function callMenuData(access_token) {
	try {
		const headerData = {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${access_token}`,
		};

		const response = await axios({
			headers: headerData,
			method: 'get',
			url: `${config['api_url']}/api/v1/menu/info`,
		});
		// console.log(response['data']);
		return JSON.stringify(response['data']);
	} catch (error) {
		console.error(error);
		return null;
	}
}

async function ejsRender(req, res, page, option = {}) {
	if (page == 'login') {
		res.clearCookie('access_token');
		res.clearCookie('refresh_token');
	}
	option['req'] = req;
	option['config'] = config;
	option['access_token'] = tokenInfo.extract(req.cookies['access_token']);
	option['menuState'] = req.cookies['menuState'];
	option['asideState'] = req.cookies['asideState'];
	res.render(page, option);
}

app.get('/', (req, res) => {
	loginValidChecker(req) ? res.redirect('/system/index') : res.redirect('/system/login');
});

app.get('/logout', (req, res) => {
	res.redirect('/system/login');
});

app.get('/:dir/:page', async (req, res) => {
	let dir = req.params.dir;
	let page = req.params.page;

	app.set('views', path.join(__dirname, `/views/${dir}`));

	if (loginValidChecker(req)) {
		const filePath = path.join(__dirname, `/views/${dir}/${page}.ejs`);

		if (fs.existsSync(filePath)) {
			let result = await callMenuData(req.cookies['access_token']);
			if (result) {
				ejsRender(req, res, page, {
					path: req.path,
					menuData: result,
				});
			} else {
				app.set('views', path.join(__dirname, '/views/system'));
				ejsRender(req, res, 'errorpage', {
					title: '500 Internal Server Error',
					msg_title: 'INTERNAL SERVER ERROR',
					code: '500',
					msg: '서버에 문제가 발생하여 페이지를 표시할 수 없습니다. 잠시 후 시도해 주세요.',
				});
			}
		} else {
			app.set('views', path.join(__dirname, '/views/system'));
			ejsRender(req, res, 'errorpage', {
				title: '404 Not Found',
				msg_title: 'PAGE NOT FOUND',
				code: '404',
				msg: '요청하신 페이지를 찾을 수 없습니다. 올바른 URL을 입력하였는지 확인하세요.',
			});
		}
	} else {
		if (page !== 'login') {
			res.redirect('/system/login');
		} else {
			ejsRender(req, res, 'login');
		}
	}
});

app.get('/:page', async (req, res) => {
	let page = req.params.page;

	app.set('views', path.join(__dirname, `/views`));

	if (loginValidChecker(req)) {
		const filePath = path.join(__dirname, `/views/${page}.ejs`);

		if (fs.existsSync(filePath)) {
			let result = await callMenuData(req.cookies['access_token']);
			ejsRender(req, res, page, {
				path: req.path,
				menuData: result,
			});
		} else {
			app.set('views', path.join(__dirname, '/views/system'));
			ejsRender(req, res, 'errorpage', {
				title: '404 Not Found',
				msg_title: 'PAGE NOT FOUND',
				code: '404',
				msg: '요청하신 페이지를 찾을 수 없습니다. 올바른 URL을 입력하였는지 확인하세요.',
			});
		}
	} else {
		if (page !== 'login') {
			res.redirect('/system/login');
		} else {
			ejsRender(req, res, 'login');
		}
	}
});
