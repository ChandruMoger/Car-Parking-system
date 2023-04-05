export interface SlotInfo {
  id: number;
  in_use: boolean;
  is_empty: boolean;
  size: string;
  floor_name: string;
  slot_number:string;
  p_id: number;
}

export interface SlotProps {
  slot: SlotInfo;
  onClick: (slot: SlotInfo) =>;
}
export interface allSlots {
  [key: string]: SlotInfo[];
}
