import { Response, Request } from 'express'
import db from '../sequelize/models';
interface floorDetail {
    id: number,
    in_use: boolean,
    is_empty: boolean,
    size: string,
    floor_name: string,
    slot_number: string,
    p_id: number
}

const allSizes = ['small', 'medium', 'large', 'xlarge']

interface floorWise {
    [field: string]: object[]
}
const getAllParkingPlaces = async (req: Request, res: Response) => {
    try {
        const allPPlaces = await db.ParkingPlace.findAll();
        res.send(allPPlaces)
    } catch (error) {
        res.status(500).send(error.message || error)
    }
}

const getAllslotsByParkingPlace = async (req: Request, res: Response) => {
    try {
        const { parking_id } = req.query;
        const allSlots = await db.ParkingSlot.findAll({
            where: {
                p_id: parking_id
            },
            order: ['id'],
        });
        const floorWiseData = (allSlots || []).reduce((acc: floorWise, item: floorDetail) => {
            if(acc[item?.floor_name])  {
                acc[item?.floor_name] = [...acc[item?.floor_name], item]
            } else {
                acc[item?.floor_name] = [item]
            }
            return acc
        }, {})
        res.send(floorWiseData)
    } catch (error) {
        res.status(500).send(error.message || error)
    }
}

const getParkingSlottoPark = async (req: Request, res: Response) => {
    try {
        
        const { parking_id, size } = req.query;
        const sizeArray = allSizes.slice(allSizes.indexOf(size as string));
        let freeSlot = null;
        for(let i = 0; i < sizeArray.length; i++) {
            freeSlot = await db.ParkingSlot.findOne({
                where: {
                    p_id: parking_id,
                    size: sizeArray[i],
                    in_use: true, //Checking slot is use.
                    is_empty: true //Checking slot is empty.
                },
                order: ['id'],
                raw: true
            })
            if(freeSlot) {
                await db.ParkingSlot.update({is_empty: false}, {
                    where: {
                        p_id: parking_id,
                        slot_number: freeSlot?.slot_number
                    },
                    order: ['id'],
                    raw: true
                })
                break;
            };
        }
        res.send({
            slot: freeSlot,
            message: `Your car parking slot is: floor no: ${freeSlot?.floor_name} - Slot no: ${freeSlot?.slot_number}`})
    } catch (error) {
        res.status(500).send(error.message || error)
    }
}

const leaveFromParking = async (req: Request, res: Response) => {
    try {
        const {parking_id, slot_number} = req.body;
        const updatedSlot = await db.ParkingSlot.update({is_empty: true}, {
            where: {
                p_id: parking_id,
                slot_number: slot_number
            },
            raw: true
        });
        res.send({message: `parking slot ${slot_number} is available now`})
    } catch (error) {
        res.status(500).send(error.message || error)
    }
}
export {
    getAllParkingPlaces,
    getAllslotsByParkingPlace,
    getParkingSlottoPark,
    leaveFromParking
}