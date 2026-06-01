const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); 
const app = express();
const PORT = 3000;

app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '')));

const unapprovedUsers = {};
const approvedUsers = {};
let adminInbox = [];

app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (unapprovedUsers[username] || approvedUsers[username]) {
        return res.status(409).json({ message: 'Username already exists.' });
    }

    unapprovedUsers[username] = { password };

    adminInbox.push({ username, timestamp: new Date() });

    console.log(`New user "${username}" has signed up and is awaiting admin approval.`);
    res.status(201).json({ message: 'Signup successful! Your account is pending admin approval. You will be able to log in after it is approved.' });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (approvedUsers[username] && approvedUsers[username].password === password) {
        res.status(200).json({ message: 'Login successful!' });
    } else if (unapprovedUsers[username]) {
        res.status(403).json({ message: 'Account is pending admin approval.' });
    } else {
        res.status(401).json({ message: 'Invalid username or password.' });
    }
});


app.get('/admin/pending-users', (req, res) => {
    res.json({ pendingUsers: Object.keys(unapprovedUsers) });
});

app.post('/admin/approve', (req, res) => {
    const { username } = req.body;

    if (unapprovedUsers[username]) {
        approvedUsers[username] = unapprovedUsers[username];
        delete unapprovedUsers[username];
        res.status(200).json({ message: `User "${username}" approved successfully.` });
    } else {
        res.status(404).json({ message: 'User not found or already approved.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});