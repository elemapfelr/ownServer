const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('/web'));

app.listen(80, () => {
	console.log(`Server listening on http://localhost:30000`);
});

app.get('/:page', (req, res) => {
	let page = req.params.page;
	res.send(page + '.html');
});
