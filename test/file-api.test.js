const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../index');

const TEST_FILE_PATH = path.join(__dirname, '../test.json');
const ORIGINAL_CONTENT = {
    testFile: "hello SkyU"
};

describe('File API Tests', () => {
    beforeEach(() => {
        // Reset the test file to its original state before each test
        fs.writeFileSync(TEST_FILE_PATH, JSON.stringify(ORIGINAL_CONTENT, null, 4));
    });

    it('should read the file content', async () => {
        const response = await request(app)
            .get('/file')
            .expect(200);

        expect(response.body).toEqual(ORIGINAL_CONTENT);
    });

    it('should update the file content', async () => {
        const newContent = {
            testFile: "updated content",
            newField: "test"
        };

        const updateResponse = await request(app)
            .put('/file')
            .send(newContent)
            .expect(200);

        expect(updateResponse.body.message).toBe('File updated successfully');

        // Verify the file was actually updated
        const readResponse = await request(app)
            .get('/file')
            .expect(200);

        expect(readResponse.body).toEqual(newContent);
    });

    it('should handle invalid update requests', async () => {
        await request(app)
            .put('/file')
            .send(null)
            .expect(400);
    });
});
