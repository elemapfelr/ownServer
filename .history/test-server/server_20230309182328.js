const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('/'));

app.listen(80, () => {
	console.log(`Server listening on http://localhost:30000`);
});
