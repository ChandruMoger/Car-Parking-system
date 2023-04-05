import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { rest } from "msw";
import userEvent from '@testing-library/user-event';
import CarParking from "../CarParking";
import { server } from '../../mocks/server';
describe("CarParking Component", () => {
 it("render CarParking component", async() => {
    render(<CarParking />);
      const parkingOptionElement = await screen.findByText(/Chinnaswamy Stadium/i)
      expect(parkingOptionElement).toBeInTheDocument()
  });

  it("change car parking place", async() => {
    render(<CarParking />);
      let parkingSelectElement = await screen.findByTestId<HTMLSelectElement>("parking");
      fireEvent.change(parkingSelectElement, { target: { value: '2' } });
      userEvent.selectOptions(parkingSelectElement, '2');
      await waitFor(() => {
        parkingSelectElement = screen.getByTestId<HTMLSelectElement>("parking");
        expect(parkingSelectElement.value).toBe('2');
      })
  });

  it("change car size", async() => {
    render(<CarParking />);
    await waitFor(() => {
      const carSizeSelectElement = screen.getByTestId<HTMLSelectElement>("car-sizes");
      expect(carSizeSelectElement.value).toBe('small');
    })
      let carSizeSelectElement = await screen.findByTestId<HTMLSelectElement>("car-sizes");
      userEvent.selectOptions(carSizeSelectElement, 'medium');
      await waitFor(() => {
        carSizeSelectElement = screen.getByTestId<HTMLSelectElement>("car-sizes");
        expect(carSizeSelectElement.value).toBe('medium');
      })
  });

  it("click park the car", async() => {
    render(<CarParking />);    
      const carParkBtn = await screen.findByRole("button");
      fireEvent.click(carParkBtn)
      await waitFor(() => {
        const carSizeSelectElement = screen.getByTestId<HTMLSelectElement>("car-sizes");
        expect(carSizeSelectElement.value).toBe('small');
      })
  });

  it("click leave parking", async() => {
    render(<CarParking />);
    const carSizeSelectElement = screen.getByRole("button");
      fireEvent.click(carSizeSelectElement)
      await waitFor(() => {
        const slotButton = screen.getByTestId("slot-1-1");
        fireEvent.click(slotButton);
        expect(slotButton.classList.contains('bg-danger')).toBe(false)
      })
  });

  it("handled error response on fetch all slots", async() => {
    server.use(
      rest.get("http://localhost:5000/get_all_slots_by_parking", (req, res, ctx) => {
        console.log(req.url.searchParams.get('parking_id'));
    return res(
      ctx.status(500)
    );
      })
    )
    render(<CarParking />);
    const parkingOptionElement = await screen.findByText(/No Slots in Selected Parking/i)
    expect(parkingOptionElement).toBeInTheDocument()
  });
});
