import { allSlots, SlotInfo } from "./interfaces";
export const slotUpdate = (slots: allSlots, slot:SlotInfo, value: boolean) => {
    let allSlotsTemp = {...slots};
    let floorWise: SlotInfo[] = (allSlotsTemp as allSlots)[slot?.floor_name];
    const index = floorWise.findIndex((item: SlotInfo) => item?.slot_number === slot?.slot_number)
    floorWise[index] = {...floorWise[index], is_empty: value};
    (allSlotsTemp as allSlots)[slot?.floor_name] = [...floorWise]
    return {...allSlotsTemp}
}