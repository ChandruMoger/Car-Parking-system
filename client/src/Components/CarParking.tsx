import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Slot from "./Slot";
import { allSlots, SlotInfo } from "../utils/interfaces";
import { slotUpdate } from "../utils/utility-methods";

const CarParking = () => {
    const [parkings, setParkings] = useState([]);
    const [selectedParking, setSelectedParking] = useState<number>(1);
    const [selectedCarSize, setSelectedCarSize] = useState<string>('small');
    const [allSlots, setAllSlots] = useState<any>({});
    const carSizes = ["Small", "Medium", "Large", "xLarge"];
  
    const getAllSlotsById = async (parkingid: number) => {
      try {
        const allAvailSlots = await axios.get(
          `http://localhost:5000/get_all_slots_by_parking?parking_id=${parkingid}`
        );
        setAllSlots(allAvailSlots?.data || {});
      } catch (error) {
        setAllSlots({});
      }
    };
  
    const getAllPlarkings = async () => {
      try {
        const parkings = await axios.get(
          "http://localhost:5000/get_all_parking_places"
        );
        setParkings(parkings?.data || []);
      } catch (error) {
        setParkings([]);
      }
    };
  
    useEffect(() => {
      
      getAllPlarkings();
      getAllSlotsById(selectedParking);
    }, [selectedParking]);
  
    const parkingChange = (evnt: React.ChangeEvent<any>) => {
      const { value } = evnt.target;
      setSelectedParking(value);
      getAllSlotsById(value);
    };
  
    const selectCarSize = (evnt: React.ChangeEvent<any>) => {
      const { value } = evnt.target;
      setSelectedCarSize(value);
    };
  
    const leaveParking = useCallback(async (slot: SlotInfo) => {
        try {
            const response = await axios.post(
              `http://localhost:5000/leave_from_parking`, {
                parking_id: slot.p_id,
                slot_number: slot.slot_number
              }
            );
            toast.success(response.data.message)
            setAllSlots((prevSlots: allSlots) => {
                return {...slotUpdate(prevSlots, slot, true)}
            })
        } catch (error) {
          if (error instanceof AxiosError) {
            return toast.error(error?.message || "Something went wrong")
          }
        }
    }, [])
  
    const parkTheCar = async () => {
      try {
  
        if(!selectedParking) return toast.warn("Please select your parking place");
        if(!selectedCarSize) return toast.warn("Please select car size");
        
        const reqObject: any = {
          parking_id:selectedParking,
          size: selectedCarSize
        }
        const response = await axios.get(`http://localhost:5000/get_parking_slots_by_size?${new URLSearchParams(reqObject)}`);
        toast.success(response.data.message)
        const { slot } = response.data;
        setAllSlots((prevSlots: allSlots) => {
          return {...slotUpdate(prevSlots, slot, false)}
      })
      } catch (error) {
        if (error instanceof AxiosError) {
          return toast.error(error?.message || "Something went wrong")
        }
      }
    }
    return (
      <div className="container my-4">
        <div data-testid="packing-slot-conteiner" className="parking-slots">
          {Object.keys(allSlots).length > 0 ? (
            Object.keys(allSlots).map((key, idx) => (
              <div key={idx}>
                <div className="my-2">Floor {key}</div>
                <div className="slots-container d-flex flex-wrap">
                  {((allSlots as any)[key as string]).map((slot: any, index: number) => {
                    return <Slot key={index} slot={slot} onClick={leaveParking} />
                  })}
                </div>
              </div>
            ))
          ) : (
            <span>No Slots in Selected Parking</span>
          )}
        </div>
        <div className="parkings d-flex flex-column">
          <h2 className="mb-5">Parking System</h2>
          <div className="parking-places mb-4">
            <label data-testid="parking-selection" htmlFor="parking">Select Parking:</label>
            <select
              data-testid="parking"
              value={selectedParking}
              onChange={parkingChange}
              className="parkings_options"
            >
              {parkings.map((parking: any, idx) => {
                return (
                  <option data-testid="select-option" key={idx} value={parking?.id}>
                    {parking?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="parking-car-sizes mb-4">
            <label htmlFor="car-sizes">Select Car Size:</label>
            <select data-testid="car-sizes" value={selectedCarSize} onChange={selectCarSize} className="parkings_options">
              {carSizes.map((size, idx) => {
                return (
                  <option key={idx} value={size.toLowerCase()}>
                    {size}
                  </option>
                );
              })}
            </select>
          </div>
          <button onClick={parkTheCar} className="btn btn-primary align-self-start">Park The Car</button>
        </div>
      </div>
    )
}

export default CarParking