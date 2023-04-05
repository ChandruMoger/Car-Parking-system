import {slotUpdate} from "./utility-methods";
test("Test slo update method", () => {
  const slot = {
    id: 1,
    in_use: true,
    is_empty: true,
    size: "small",
    floor_name: "1",
    slot_number: "1",
    p_id: 1,
  }
  const resObject = {
    "1": [
      slot
    ]
  };

  const respObject = {
    "1": [
      {
        id: 1,
        in_use: true,
        is_empty: false,
        size: "small",
        floor_name: "1",
        slot_number: "1",
        p_id: 1,
      }
    ]
  };
  const updatedObj = slotUpdate( resObject, slot, false);
  expect(updatedObj).toEqual(respObject);
});
