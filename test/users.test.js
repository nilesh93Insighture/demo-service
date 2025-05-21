const request = require('supertest');
const express = require('express');
const app = require('../index');

describe('GET /users', () => {
    it('should return an array of 5 users', async () => {
        const response = await request(app)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(5);

        // Check that each user has the required properties
        response.body.forEach(user => {
            expect(user).toHaveProperty('id');
            expect(user).toHaveProperty('name');
            expect(user).toHaveProperty('email');
            expect(user).toHaveProperty('role');
        });
    });
});
