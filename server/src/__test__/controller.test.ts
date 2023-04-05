import request from "supertest";
import { app } from '../server';

describe("Testing apis", () => {
    let server;
    beforeAll(async () => {
        server = app;
    });
    
    it("Check get all parking places api", async () => {
        const response = await request(server).get('/get_all_parking_places');
        expect(response.statusCode).toBe(200)
    })

    it("Check get all slots by parkign id", async () => {
        const response = await request(server).get('/get_all_slots_by_parking?parking_id=1');
        expect(response.statusCode).toBe(200)
    })

    it("Check get parking slots by size", async () => {
        const response = await request(server).get('/get_parking_slots_by_size?parking_id=1&size=medium');
        expect(response.statusCode).toBe(200)
    })

    it("Check leave parking", async () => {
        const response = await request(server).post('/leave_from_parking').send({
            "parking_id": "1",
            "slot_number": "2"
        });
        expect(response.statusCode).toBe(200)
    })
})