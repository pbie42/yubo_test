const express = require('express');

const db = require('./db/users');

const app = express();

app.get('/test', function (req, res) {
	res.status(200).json({ success: true });
});

app.get('/users', async (req, res) => {
	const users = await db.getAllUsers();
	res.status(200).json({ users });
});

app.listen(5500, () => console.log('listening on port 5500'));
