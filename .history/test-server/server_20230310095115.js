const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname + '/web'));

app.listen(80, () => {
	console.log(`Server listening on http://localhost:30000`);
});

app.get('/:page', (req, res) => {
	let page = req.params.page;
	res.sendFile(`/${page}.html`);
});

app.get('/:dir/:page', (req, res) => {
	let dir = req.params.dir;
	let page = req.params.page;
	res.sendFile(`/${dir}/${page}.html`);
});
