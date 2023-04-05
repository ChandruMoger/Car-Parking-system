import { render, screen, fireEvent } from "@testing-library/react";
import Slot from "../Slot";
let slotObject = {
  id: 2,
  in_use: true,
  is_empty: true,
  size: "small",
  floor_name: "1",
  slot_number: "2",
  p_id: 1,
};
describe("Slot Component", () => {
 it("render slot component", () => {
    render(<Slot slot={slotObject} onClick={() => {}} />);
    const spanElement = screen.getByText(/small/i);
    expect(spanElement).toBeInTheDocument();
  });

  it("click on slot", () => {
    let onClickMock = jest.fn();
    render(<Slot slot={slotObject} onClick={onClickMock()} />);
    const buttonElement = screen.getByTestId("slot-1-2");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(onClickMock).toBeCalled();
  });

  it("click on slot", () => {
    let onClickMock = jest.fn();
    slotObject = {...slotObject, is_empty: false}
    render(<Slot slot={slotObject} onClick={onClickMock} />);
    const buttonElement = screen.getByTestId("slot-1-2");
    expect(buttonElement).toBeInTheDocument();
    fireEvent.click(buttonElement);
    expect(onClickMock).toBeCalled();
  });
});
