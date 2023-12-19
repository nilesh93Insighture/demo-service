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



app.listen(port, () => {
    console.log("env: ", process.env)

    console.log(`Demo app listening on port ${port}`)
})