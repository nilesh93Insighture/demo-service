const express = require('express')
const cors = require('cors')
const app = express()
const port = 50920
const fs = require('fs');

app.use(cors({
    origin: '*'
}));
app.use(express.json());

const TEST_FILE_PATH = './test.json';

// Read initial file content
fs.readFile(TEST_FILE_PATH, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`file '${TEST_FILE_PATH}'`, data);
});


app.get('/', (req, res) => {
    console.log("request recieved on /")
    res.send('Hello World!')
})

app.get('/env', (req, res) => {
    console.log("request recieved on /env")
    res.json(process.env)
})

app.get('/file', (req, res) => {
    console.log("request received on /file")
    fs.readFile(TEST_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read file' });
            return;
        }
        res.json(JSON.parse(data));
    });
})

app.put('/file', (req, res) => {
    console.log("request received on PUT /file", req.body)
    if (!req.body) {
        res.status(400).json({ error: 'Request body is required' });
        return;
    }

    const fileContent = JSON.stringify(req.body, null, 4);
    fs.writeFile(TEST_FILE_PATH, fileContent, 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to write file' });
            return;
        }
        res.json({ message: 'File updated successfully' });
    });
})


app.listen(port, () => {
    console.log("env: ", process.env)

    console.log(`Demo app listening on port ${port}`)
})
