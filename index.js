const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');

fs.readFile('/app/test.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("file '/app/test.json'", data);
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
    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            role: "Developer"
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane.smith@example.com",
            role: "Designer"
        },
        {
            id: 3,
            name: "Bob Johnson",
            email: "bob.johnson@example.com",
            role: "Manager"
        },
        {
            id: 4,
            name: "Alice Brown",
            email: "alice.brown@example.com",
            role: "Analyst"
        },
        {
            id: 5,
            name: "Charlie Wilson",
            email: "charlie.wilson@example.com",
            role: "Engineer"
        }
    ]
    res.json(users)
})



if (require.main === module) {
    app.listen(port, () => {
        console.log("env: ", process.env)
        console.log(`Demo app listening on port ${port}`)
    });
}

module.exports = app;
