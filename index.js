const express = require('express');
const cors = require('cors');
const app = express();
const port = 54234;  // Using the first available port from runtime info
const fs = require('fs');
const path = require('path');

// Enable CORS for all routes
app.use(cors({
    origin: true,
    credentials: true
}));

// Mock users data
const users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" }
];

// Read test.json file
fs.readFile(path.join(__dirname, 'test.json'), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("file 'test.json':", data);
});


app.get('/', (req, res) => {
    console.log("request recieved on /")
    res.send('Hello World!')
})

app.get('/env', (req, res) => {
    console.log("request recieved on /env")
    res.json(process.env)
})

app.get('/users', (req, res) => {
    console.log("request received on /users")
    res.json(users)
})


if (require.main === module) {
    app.listen(port, () => {
        console.log("env: ", process.env)
        console.log(`Demo app listening on port ${port}`)
    });
}

module.exports = app;
