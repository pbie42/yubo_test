const express = require('express');

const db = require('./db/users');

const app = express();
app.use(express.json());
app.use(require('cors')());

app.get('/test', function (req, res) {
	res.status(200).json({ success: true });
});

app.post('/page', async (req, res) => {
	const users = await db.getAllUsers(req.body.page);
	res.status(200).json({ users });
});

app.post('/users/', async (req, res) => {
	console.log(req.body);
	const result = await db.updateUser(req.body.user);
	console.log('result', result);
	res.status(200);
});

app.post('/users/search', async (req, res) => {
	console.log(req.body);
	const users = await db.searchUser(req.body.term, req.body.page);
	console.log('users', users);
	res.status(200).json({ users });
});

app.listen(5500, () => console.log('listening on port 5500'));
