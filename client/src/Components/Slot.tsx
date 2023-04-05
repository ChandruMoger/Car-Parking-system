import React, { memo } from 'react'
import { SlotProps } from "../utils/interfaces";

const Slot = memo(({ slot, onClick }: SlotProps) => {
  return slot?.in_use ? (
    <button
      data-testid={`slot-${slot?.floor_name}-${slot?.slot_number}`}
      onClick={!slot.is_empty ? () => onClick(slot) : undefined}
      title={slot.is_empty ? "Slot is free" : "slot is full"}
      className={`slots border p-1 d-flex flex-column ${
        slot?.is_empty
          ? "border-success text-dark default-cursor bg-transparent"
          : "bg-danger text-white cursor-pointer"
      }`}
    >
      <span>{slot?.slot_number}</span> <span>{slot?.size}</span>
    </button>
  ) : (
    <span title="Slot not in use" className="slots slot-not-in-use"></span>
  );
});

export default Slot;
