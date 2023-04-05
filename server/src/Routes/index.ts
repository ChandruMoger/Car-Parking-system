import { Router } from "express";
import { getAllParkingPlaces, getAllslotsByParkingPlace, getParkingSlottoPark, leaveFromParking } from "../Controllers";

const carParkingRouter = Router();

carParkingRouter.get('/get_all_parking_places', getAllParkingPlaces);

carParkingRouter.get('/get_all_slots_by_parking', getAllslotsByParkingPlace);

carParkingRouter.get('/get_parking_slots_by_size', getParkingSlottoPark);

carParkingRouter.post('/leave_from_parking', leaveFromParking);

export {
    carParkingRouter
};